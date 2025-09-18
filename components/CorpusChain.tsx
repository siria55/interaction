'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { CorpusGenerator, GenerationConfig } from '@/lib/corpus-generator'
import { corpusModels, CorpusItem } from '@/config/corpus-data'
import { PracticeMode } from './PracticeMode'
import { ModelDecorations } from './ModelDecorations'
import { TypewriterText } from './TypewriterText'

interface CorpusChainProps {
  onBack?: () => void
}

type ModelId = 'classical' | 'math' | 'fairy'

export function CorpusChain({ onBack }: CorpusChainProps) {
  const [generator] = useState(() => new CorpusGenerator(corpusModels))
  const [model, setModel] = useState<ModelId>('math')
  const [inputText, setInputText] = useState('从前')
  const [generatedItem, setGeneratedItem] = useState<CorpusItem | null>(null)
  const [loading, setLoading] = useState(false)
  const [config, setConfig] = useState<GenerationConfig>({
    mode: 'single',
    difficulty: 'auto',
    length: 'medium',
    avoidRecent: true
  })
  const [showExplanation, setShowExplanation] = useState(false)
  const [history, setHistory] = useState<string[]>([])
  const [recommendedCategories, setRecommendedCategories] = useState<string[]>([])
  const [showPractice, setShowPractice] = useState(false)

  const currentModel = corpusModels.find(m => m.id === model)!

  useEffect(() => {
    setRecommendedCategories(generator.getRecommendedCategories(model))
  }, [model, generator])

  const generate = async () => {
    if (!inputText.trim()) return

    setLoading(true)
    setGeneratedItem(null)
    setShowExplanation(false)

    // 模拟生成延迟
    setTimeout(() => {
      const result = generator.generateContent(model, inputText, config)
      setGeneratedItem(result)
      setLoading(false)
    }, 800)
  }

  const append = () => {
    if (!generatedItem) return

    const newText = inputText + generatedItem.text
    setHistory(prev => [...prev, inputText])
    setInputText(newText)
    setGeneratedItem(null)
    setShowExplanation(false)
  }

  const reset = () => {
    setInputText(getDefaultInput(model))
    setGeneratedItem(null)
    setLoading(false)
    setShowExplanation(false)
    setHistory([])
    generator.resetHistory()
    setRecommendedCategories(generator.getRecommendedCategories(model))
  }

  const handleModelChange = (newModel: ModelId) => {
    setModel(newModel)
    setInputText(getDefaultInput(newModel))
    setGeneratedItem(null)
    setShowExplanation(false)
  }

  const getDefaultInput = (modelId: ModelId): string => {
    switch (modelId) {
      case 'classical': return '学而'
      case 'math': return '三角形'
      case 'fairy': return '从前'
      default: return '从前'
    }
  }

  const getModelColors = (modelId: ModelId) => {
    switch (modelId) {
      case 'classical':
        return {
          primary: 'bg-amber-500',
          secondary: 'bg-amber-100',
          border: 'border-amber-300',
          text: 'text-amber-700',
          gradient: 'from-amber-50 to-orange-50'
        }
      case 'math':
        return {
          primary: 'bg-blue-500',
          secondary: 'bg-blue-100',
          border: 'border-blue-300',
          text: 'text-blue-700',
          gradient: 'from-blue-50 to-indigo-50'
        }
      case 'fairy':
        return {
          primary: 'bg-pink-500',
          secondary: 'bg-pink-100',
          border: 'border-pink-300',
          text: 'text-pink-700',
          gradient: 'from-pink-50 to-purple-50'
        }
    }
  }

  const colors = getModelColors(model)

  return (
    <main className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-5xl mx-auto">
        <div className={`relative overflow-hidden rounded-3xl bg-white border-2 shadow-xl ${colors.border}`}>
          <div className="absolute inset-0 pointer-events-none opacity-60">
            <ModelDecorations modelId={model} />
          </div>

          <div className="relative z-10 p-6 md:p-8 space-y-8">
            {/* Header */}
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <button
                onClick={onBack}
                className="text-sm text-blue-600 hover:underline flex items-center gap-2 self-start"
              >
                ← 返回主页
              </button>

              <div className="text-center sm:text-right sm:flex-1">
                <h1 className={`text-3xl font-bold ${colors.text} flex items-center gap-2 justify-center sm:justify-end`}>
                  {currentModel.icon} 语料接龙
                </h1>
                <p className="text-gray-600 text-sm mt-1">{currentModel.description}</p>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* 主要生成区域 */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-xl border-2 border-gray-100 overflow-hidden">
              {/* 模型选择 */}
              <div className="p-4 border-b border-gray-100">
                <div className="flex gap-2">
                  {corpusModels.map((m) => (
                    <button
                      key={m.id}
                      onClick={() => handleModelChange(m.id as ModelId)}
                      className={`px-4 py-2 rounded-lg font-medium transition-all ${
                        model === m.id
                          ? `${getModelColors(m.id as ModelId).primary} text-white shadow-lg`
                          : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                      }`}
                    >
                      {m.icon} {m.name}
                    </button>
                  ))}
                </div>
              </div>

              {/* 生成区域 */}
              <div className="p-6">
                <div className="bg-gray-900 rounded-xl p-4 mb-4">
                  <div className="bg-black text-white rounded-lg p-4 min-h-[100px] flex items-start text-lg">
                    <div className="flex-1">
                      <span className="text-green-400 font-semibold break-all">
                        {inputText}
                      </span>
                      {loading && (
                        <motion.span
                          className="text-gray-400 ml-2"
                          animate={{ opacity: [1, 0.5, 1] }}
                          transition={{ duration: 1, repeat: Infinity }}
                        >
                          正在生成...
                        </motion.span>
                      )}
                      <AnimatePresence>
                        {generatedItem && (
                          <motion.span
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            className="ml-2 text-cyan-300"
                          >
                            <TypewriterText
                              text={generatedItem.text}
                              speed={80}
                              className="text-cyan-300"
                            />
                          </motion.span>
                        )}
                      </AnimatePresence>
                    </div>
                  </div>

                  {/* 输入和控制区域 */}
                  <div className="mt-4 space-y-3">
                    <div className="flex gap-2">
                      <input
                        value={inputText}
                        onChange={(e) => {
                          setInputText(e.target.value)
                          setGeneratedItem(null)
                        }}
                        placeholder="输入开头..."
                        className="flex-1 p-3 rounded-lg bg-gray-800 text-white border border-gray-700 focus:border-cyan-500 focus:outline-none"
                      />
                      <button
                        onClick={generate}
                        disabled={loading || !inputText.trim()}
                        className={`px-6 py-3 rounded-lg font-medium transition-all ${
                          loading || !inputText.trim()
                            ? 'bg-gray-600 text-gray-300 cursor-not-allowed'
                            : `${colors.primary} text-white hover:opacity-90 shadow-lg`
                        }`}
                      >
                        生成
                      </button>
                    </div>

                    {generatedItem && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="flex gap-2"
                      >
                        <button
                          onClick={append}
                          className="flex-1 px-4 py-2 rounded-lg bg-blue-500 text-white hover:bg-blue-600 transition-colors"
                        >
                          接上继续
                        </button>
                        <button
                          onClick={() => setShowExplanation(!showExplanation)}
                          className="px-4 py-2 rounded-lg bg-green-500 text-white hover:bg-green-600 transition-colors"
                        >
                          {showExplanation ? '隐藏' : '解释'}
                        </button>
                      </motion.div>
                    )}
                  </div>
                </div>

                {/* 解释区域 */}
                <AnimatePresence>
                  {showExplanation && generatedItem?.explanation && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className={`${colors.secondary} rounded-xl p-4 mb-4 ${colors.border} border`}
                    >
                      <h4 className={`font-bold ${colors.text} mb-2`}>📖 内容解释</h4>
                      <p className="text-gray-700 leading-relaxed">{generatedItem.explanation}</p>

                      {generatedItem.keywords && generatedItem.keywords.length > 0 && (
                        <div className="mt-3">
                          <span className={`font-medium ${colors.text}`}>关键词：</span>
                          <div className="flex flex-wrap gap-1 mt-1">
                            {generatedItem.keywords.map((keyword, index) => (
                              <span
                                key={index}
                                className={`px-2 py-1 rounded text-xs ${colors.primary} text-white`}
                              >
                                {keyword}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}
                    </motion.div>
                  )}
                </AnimatePresence>

                <button
                  onClick={reset}
                  className="w-full px-4 py-2 rounded-lg bg-indigo-500 text-white hover:bg-indigo-600 transition-colors"
                >
                  重新开始
                </button>
              </div>
            </div>
          </div>

          {/* 侧边栏 */}
          <div className="space-y-4">
            {/* 生成设置 */}
            <div className="bg-white rounded-xl shadow-lg p-4">
              <h3 className="font-bold text-gray-800 mb-3">⚙️ 生成设置</h3>

              <div className="space-y-3">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    生成模式
                  </label>
                  <select
                    value={config.mode}
                    onChange={(e) => setConfig({...config, mode: e.target.value as any})}
                    className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="single">单句模式</option>
                    <option value="paragraph">段落模式</option>
                    <option value="dialogue">对话模式</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    难度级别
                  </label>
                  <select
                    value={config.difficulty}
                    onChange={(e) => setConfig({...config, difficulty: e.target.value as any})}
                    className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="auto">自动</option>
                    <option value="easy">简单</option>
                    <option value="medium">中等</option>
                    <option value="hard">困难</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    内容长度
                  </label>
                  <select
                    value={config.length}
                    onChange={(e) => setConfig({...config, length: e.target.value as any})}
                    className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="short">简短</option>
                    <option value="medium">中等</option>
                    <option value="long">较长</option>
                  </select>
                </div>

                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="avoidRecent"
                    checked={config.avoidRecent}
                    onChange={(e) => setConfig({...config, avoidRecent: e.target.checked})}
                    className="mr-2"
                  />
                  <label htmlFor="avoidRecent" className="text-sm text-gray-700">
                    避免重复内容
                  </label>
                </div>
              </div>
            </div>

            {/* 推荐类别 */}
            {recommendedCategories.length > 0 && (
              <div className="bg-white rounded-xl shadow-lg p-4">
                <h3 className="font-bold text-gray-800 mb-3">🎯 推荐类别</h3>
                <div className="flex flex-wrap gap-2">
                  {recommendedCategories.slice(0, 6).map((category) => (
                    <span
                      key={category}
                      className={`px-3 py-1 rounded-full text-xs ${colors.secondary} ${colors.text} border ${colors.border}`}
                    >
                      {category}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* 历史记录 */}
            {history.length > 0 && (
              <div className="bg-white rounded-xl shadow-lg p-4">
                <h3 className="font-bold text-gray-800 mb-3">📝 历史记录</h3>
                <div className="space-y-2 max-h-40 overflow-y-auto">
                  {history.slice(-5).map((item, index) => (
                    <div
                      key={index}
                      className="text-sm text-gray-600 p-2 bg-gray-50 rounded truncate"
                      title={item}
                    >
                      {item}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* 练习模式 */}
            <div className="bg-white rounded-xl shadow-lg p-4">
              <h3 className="font-bold text-gray-800 mb-3">🎯 学习模式</h3>
              <div className="space-y-3">
                <button
                  onClick={() => setShowPractice(true)}
                  className={`w-full px-4 py-3 rounded-lg font-medium transition-all ${colors.primary} text-white hover:opacity-90 shadow-lg`}
                >
                  开始练习
                </button>
                <p className="text-xs text-gray-600">
                  通过练习题巩固学到的知识
                </p>
              </div>
            </div>

            {/* 使用统计 */}
            <div className="bg-white rounded-xl shadow-lg p-4">
              <h3 className="font-bold text-gray-800 mb-3">📊 本次统计</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">已生成：</span>
                  <span className={`font-medium ${colors.text}`}>
                    {generator.getUsageStats().generatedCount} 次
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">输入次数：</span>
                  <span className={`font-medium ${colors.text}`}>
                    {generator.getUsageStats().inputCount} 次
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    {/* 练习模式弹窗 */}
      {showPractice && (
        <PracticeMode
          items={currentModel.items}
          onClose={() => setShowPractice(false)}
          modelType={model}
        />
      )}
    </main>
  )
}
