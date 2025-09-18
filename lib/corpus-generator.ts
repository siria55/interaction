import { CorpusItem, CorpusModel } from '@/config/corpus-data'

export interface GenerationConfig {
  mode: 'single' | 'paragraph' | 'dialogue'
  difficulty: 'easy' | 'medium' | 'hard' | 'auto'
  length: 'short' | 'medium' | 'long'
  avoidRecent: boolean
}

export interface GenerationHistory {
  usedItems: Set<string>
  userInputHistory: string[]
  preferredCategories: string[]
  sessionStartTime: number
}

export class CorpusGenerator {
  private history: GenerationHistory
  private models: CorpusModel[]

  constructor(models: CorpusModel[]) {
    this.models = models
    this.history = {
      usedItems: new Set(),
      userInputHistory: [],
      preferredCategories: [],
      sessionStartTime: Date.now()
    }
  }

  // 智能生成内容
  generateContent(
    modelId: string,
    userInput: string,
    config: GenerationConfig
  ): CorpusItem | null {
    const model = this.models.find(m => m.id === modelId)
    if (!model) return null

    // 记录用户输入历史
    this.history.userInputHistory.push(userInput)

    // 根据模式选择生成策略
    switch (config.mode) {
      case 'single':
        return this.generateSingle(model, userInput, config)
      case 'paragraph':
        return this.generateParagraph(model, userInput, config)
      case 'dialogue':
        return this.generateDialogue(model, userInput, config)
      default:
        return this.generateSingle(model, userInput, config)
    }
  }

  // 单句生成
  private generateSingle(
    model: CorpusModel,
    userInput: string,
    config: GenerationConfig
  ): CorpusItem | null {
    const candidates = this.filterCandidates(model.items, userInput, config)
    if (candidates.length === 0) return null

    const selected = this.selectBestMatch(candidates, userInput, config)
    if (selected) {
      this.history.usedItems.add(selected.text)
      this.updatePreferences(selected)
    }

    return selected
  }

  // 段落生成
  private generateParagraph(
    model: CorpusModel,
    userInput: string,
    config: GenerationConfig
  ): CorpusItem | null {
    const candidates = this.filterCandidates(model.items, userInput, config)
    if (candidates.length === 0) return null

    // 选择多个相关句子组合成段落
    const sentences = this.selectMultipleSentences(candidates, userInput, config)
    if (sentences.length === 0) return null

    // 组合成段落
    const combinedText = sentences.map(s => s.text).join('，')
    const combinedKeywords = sentences.flatMap(s => s.keywords || [])
    const combinedTags = sentences.flatMap(s => s.tags || [])

    return {
      text: combinedText,
      category: sentences[0].category,
      difficulty: config.difficulty === 'auto' ? this.inferDifficulty(userInput) : config.difficulty,
      keywords: Array.from(new Set(combinedKeywords)),
      explanation: this.generateCombinedExplanation(sentences),
      tags: Array.from(new Set(combinedTags))
    }
  }

  // 对话生成
  private generateDialogue(
    model: CorpusModel,
    userInput: string,
    config: GenerationConfig
  ): CorpusItem | null {
    const candidates = this.filterCandidates(model.items, userInput, config)
    if (candidates.length === 0) return null

    const selected = this.selectBestMatch(candidates, userInput, config)
    if (!selected) return null

    // 为童话模型生成对话形式
    if (model.id === 'fairy') {
      return {
        ...selected,
        text: this.convertToDialogue(selected.text, userInput)
      }
    }

    return selected
  }

  // 过滤候选项
  private filterCandidates(
    items: CorpusItem[],
    userInput: string,
    config: GenerationConfig
  ): CorpusItem[] {
    let candidates = [...items]

    // 避免重复使用最近的内容
    if (config.avoidRecent) {
      candidates = candidates.filter(item => !this.history.usedItems.has(item.text))
    }

    // 难度过滤
    if (config.difficulty !== 'auto') {
      candidates = candidates.filter(item =>
        !item.difficulty || item.difficulty === config.difficulty
      )
    }

    // 如果过滤后没有候选项，放宽限制
    if (candidates.length === 0) {
      candidates = items.filter(item => !this.history.usedItems.has(item.text))
    }

    if (candidates.length === 0) {
      candidates = items.slice(0, 10) // 返回前10个作为后备
    }

    return candidates
  }

  // 选择最佳匹配
  private selectBestMatch(
    candidates: CorpusItem[],
    userInput: string,
    config: GenerationConfig
  ): CorpusItem | null {
    if (candidates.length === 0) return null

    // 计算每个候选项的得分
    const scoredCandidates = candidates.map(item => ({
      item,
      score: this.calculateScore(item, userInput, config)
    }))

    // 按得分排序
    scoredCandidates.sort((a, b) => b.score - a.score)

    // 在前几名中随机选择，增加多样性
    const topCandidates = scoredCandidates.slice(0, Math.min(5, scoredCandidates.length))
    const selected = topCandidates[Math.floor(Math.random() * topCandidates.length)]

    return selected.item
  }

  // 计算匹配得分
  private calculateScore(
    item: CorpusItem,
    userInput: string,
    config: GenerationConfig
  ): number {
    let score = 0

    // 关键词匹配得分
    const inputKeywords = this.extractKeywords(userInput)
    const itemKeywords = item.keywords || []

    for (const keyword of inputKeywords) {
      if (itemKeywords.some(k => k.includes(keyword) || keyword.includes(k))) {
        score += 20
      }
      if (item.text.includes(keyword)) {
        score += 15
      }
    }

    // 类别偏好得分
    if (item.category && this.history.preferredCategories.includes(item.category)) {
      score += 10
    }

    // 长度匹配得分
    const inputLength = userInput.length
    const itemLength = item.text.length
    if (config.length === 'short' && itemLength < 30) score += 5
    if (config.length === 'medium' && itemLength >= 30 && itemLength <= 60) score += 5
    if (config.length === 'long' && itemLength > 60) score += 5

    // 语义相似度得分（简单实现）
    score += this.calculateSemanticSimilarity(userInput, item.text) * 10

    // 新鲜度得分
    if (!this.history.usedItems.has(item.text)) {
      score += 5
    }

    // 随机因子，增加多样性
    score += Math.random() * 3

    return score
  }

  // 提取关键词
  private extractKeywords(text: string): string[] {
    // 简单的中文关键词提取
    const keywords = []

    // 常见关键词模式
    const patterns = [
      /[\u4e00-\u9fa5]{2,4}/g, // 2-4个汉字的词组
    ]

    for (const pattern of patterns) {
      const matches = text.match(pattern) || []
      keywords.push(...matches)
    }

    // 去重并返回
    return Array.from(new Set(keywords)).slice(0, 5)
  }

  // 计算语义相似度（简化版本）
  private calculateSemanticSimilarity(text1: string, text2: string): number {
    const chars1 = new Set(text1.split(''))
    const chars2 = new Set(text2.split(''))

    const intersection = new Set(Array.from(chars1).filter(x => chars2.has(x)))
    const union = new Set([...Array.from(chars1), ...Array.from(chars2)])

    return intersection.size / union.size
  }

  // 推断难度
  private inferDifficulty(userInput: string): 'easy' | 'medium' | 'hard' {
    const length = userInput.length
    const complexity = this.calculateTextComplexity(userInput)

    if (length < 5 || complexity < 0.3) return 'easy'
    if (length < 15 || complexity < 0.7) return 'medium'
    return 'hard'
  }

  // 计算文本复杂度
  private calculateTextComplexity(text: string): number {
    // 简单的复杂度计算
    const rareChars = /[，。；：""''！？（）【】《》]/g
    const matches = text.match(rareChars) || []
    return matches.length / text.length
  }

  // 选择多个句子组合
  private selectMultipleSentences(
    candidates: CorpusItem[],
    userInput: string,
    config: GenerationConfig
  ): CorpusItem[] {
    const count = config.length === 'short' ? 2 : config.length === 'medium' ? 3 : 4
    const selected = []

    for (let i = 0; i < count && candidates.length > 0; i++) {
      const best = this.selectBestMatch(candidates, userInput, config)
      if (best) {
        selected.push(best)
        // 移除已选择的，避免重复
        const index = candidates.findIndex(c => c.text === best.text)
        if (index > -1) candidates.splice(index, 1)
      }
    }

    return selected
  }

  // 生成组合解释
  private generateCombinedExplanation(items: CorpusItem[]): string {
    const explanations = items.map(item => item.explanation).filter(Boolean)
    if (explanations.length === 0) return ''

    return `这段内容包含了${explanations.length}个要点：${explanations.join('；')}`
  }

  // 转换为对话形式
  private convertToDialogue(text: string, userInput: string): string {
    // 为童话内容添加对话元素
    const dialogueStarters = [
      '小朋友说："',
      '故事开始了："',
      '从前有人说："',
      '传说中："'
    ]

    const starter = dialogueStarters[Math.floor(Math.random() * dialogueStarters.length)]
    return `${starter}${text}"`
  }

  // 更新用户偏好
  private updatePreferences(item: CorpusItem): void {
    if (item.category) {
      if (!this.history.preferredCategories.includes(item.category)) {
        this.history.preferredCategories.push(item.category)
      }
      // 保持偏好列表不超过5个
      if (this.history.preferredCategories.length > 5) {
        this.history.preferredCategories.shift()
      }
    }
  }

  // 获取推荐类别
  getRecommendedCategories(modelId: string): string[] {
    const model = this.models.find(m => m.id === modelId)
    if (!model) return []

    const categories = Array.from(new Set(model.items.map(item => item.category).filter(Boolean)))

    // 根据用户偏好排序
    return categories.sort((a, b) => {
      const aScore = this.history.preferredCategories.includes(a!) ? 1 : 0
      const bScore = this.history.preferredCategories.includes(b!) ? 1 : 0
      return bScore - aScore
    }) as string[]
  }

  // 重置历史记录
  resetHistory(): void {
    this.history = {
      usedItems: new Set(),
      userInputHistory: [],
      preferredCategories: [],
      sessionStartTime: Date.now()
    }
  }

  // 获取使用统计
  getUsageStats() {
    return {
      generatedCount: this.history.usedItems.size,
      inputCount: this.history.userInputHistory.length,
      preferredCategories: this.history.preferredCategories,
      sessionDuration: Date.now() - this.history.sessionStartTime
    }
  }
}