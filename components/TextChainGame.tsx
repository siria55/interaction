'use client'

import { motion } from 'framer-motion'
import { useState, useRef, useEffect } from 'react'

interface TextChainGameProps {
  onGameComplete: (accuracy: number) => void
}

export default function TextChainGame({ onGameComplete }: TextChainGameProps) {
  const [inputText, setInputText] = useState('')
  const [gameHistory, setGameHistory] = useState<Array<{user: string, ai: string}>>([])
  const [currentPrompt, setCurrentPrompt] = useState('')
  const [isGenerating, setIsGenerating] = useState(false)
  const [score, setScore] = useState(0)
  const [totalRounds, setTotalRounds] = useState(0)
  const inputRef = useRef<HTMLInputElement>(null)

  // 预定义的提示词和对应的下一个字
  const prompts = [
    { text: '今天天气', next: '很' },
    { text: '我喜欢', next: '吃' },
    { text: '小猫在', next: '玩' },
    { text: '春天来', next: '了' },
    { text: '学习很', next: '有' },
    { text: '朋友一', next: '起' },
    { text: '妈妈做', next: '饭' },
    { text: '老师教', next: '书' },
    { text: '小鸟飞', next: '翔' },
    { text: '花朵开', next: '放' }
  ]

  // 开始新游戏
  const startNewGame = () => {
    const randomPrompt = prompts[Math.floor(Math.random() * prompts.length)]
    setCurrentPrompt(randomPrompt.text)
    setGameHistory([])
    setInputText('')
    setScore(0)
    setTotalRounds(0)
    if (inputRef.current) {
      inputRef.current.focus()
    }
  }

  // 模拟AI生成下一个字
  const generateNextChar = (text: string): string => {
    // 简单的规则基础预测
    const lastChar = text[text.length - 1]
    
    // 基于最后一个字的简单预测规则
    const predictions: { [key: string]: string[] } = {
      '很': ['好', '棒', '美', '快', '慢'],
      '吃': ['饭', '菜', '果', '糖', '面'],
      '玩': ['具', '耍', '球', '水', '火'],
      '了': ['吗', '吧', '呢', '啊', '呀'],
      '有': ['趣', '用', '效', '益', '趣'],
      '起': ['来', '床', '立', '飞', '跑'],
      '饭': ['菜', '香', '好', '热', '冷'],
      '书': ['本', '籍', '店', '包', '桌'],
      '翔': ['在', '向', '到', '过', '去'],
      '放': ['学', '假', '心', '松', '弃']
    }

    const possibleNext = predictions[lastChar] || ['的', '了', '在', '是', '有']
    return possibleNext[Math.floor(Math.random() * possibleNext.length)]
  }

  // 处理用户输入
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!inputText.trim() || isGenerating) return

    const userInput = inputText.trim()
    const newTotalRounds = totalRounds + 1
    setTotalRounds(newTotalRounds)

    // 模拟AI生成
    setIsGenerating(true)
    setTimeout(() => {
      const aiResponse = generateNextChar(currentPrompt + userInput)
      const newHistory = [...gameHistory, { user: userInput, ai: aiResponse }]
      setGameHistory(newHistory)
      
      // 简单的评分逻辑：如果用户输入合理，给分
      const isReasonable = userInput.length === 1 && /[\u4e00-\u9fa5]/.test(userInput)
      if (isReasonable) {
        setScore(score + 1)
      }

      setInputText('')
      setIsGenerating(false)
      
      // 如果达到5轮，结束游戏
      if (newTotalRounds >= 5) {
        const accuracy = (score + (isReasonable ? 1 : 0)) / newTotalRounds
        onGameComplete(accuracy)
      }
    }, 1000) // 模拟AI思考时间
  }

  // 组件挂载时开始游戏
  useEffect(() => {
    startNewGame()
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className="bg-white rounded-2xl shadow-xl p-6 border-4 border-green-200"
    >
      <div className="text-center mb-6">
        <h3 className="text-2xl font-bold text-green-600 mb-2">
          🤖 大语言模型文字接龙
        </h3>
        <p className="text-gray-600 mb-2">
          输入一个字，AI会接下一个字，体验自回归模型！
        </p>
        <div className="bg-gradient-to-r from-blue-50 to-green-50 rounded-lg p-3 max-w-2xl mx-auto">
          <p className="text-sm font-semibold text-green-700">
            🎯 目标：和AI一起完成句子，体验语言模型的预测能力！
          </p>
        </div>
      </div>

      {/* 当前句子显示 */}
      <div className="bg-gray-50 rounded-xl p-4 mb-6">
        <h4 className="text-lg font-semibold text-gray-700 mb-3">当前句子：</h4>
        <div className="text-2xl font-bold text-gray-800 mb-2">
          {currentPrompt}
          {gameHistory.map((item, index) => (
            <span key={index}>
              <span className="text-blue-600">{item.user}</span>
              <span className="text-green-600">{item.ai}</span>
            </span>
          ))}
          {isGenerating && <span className="text-gray-400 animate-pulse">...</span>}
        </div>
        <p className="text-sm text-gray-500">
          蓝色是AI的预测，绿色是你的输入
        </p>
      </div>

      {/* 输入表单 */}
      <form onSubmit={handleSubmit} className="mb-6">
        <div className="flex gap-4 items-center">
          <input
            ref={inputRef}
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="输入一个字..."
            maxLength={1}
            disabled={isGenerating}
            className="flex-1 px-4 py-3 border-2 border-gray-300 rounded-lg text-lg focus:border-green-500 focus:outline-none disabled:bg-gray-100"
          />
          <motion.button
            type="submit"
            disabled={!inputText.trim() || isGenerating}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="btn-primary px-6 py-3 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isGenerating ? '🤔 AI思考中...' : '🚀 提交'}
          </motion.button>
        </div>
      </form>

      {/* 游戏统计 */}
      <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-xl p-4 mb-6">
        <div className="grid grid-cols-3 gap-4 text-center">
          <div>
            <div className="text-2xl font-bold text-green-600">{score}</div>
            <div className="text-sm text-gray-600">得分</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-blue-600">{totalRounds}</div>
            <div className="text-sm text-gray-600">轮数</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-purple-600">
              {totalRounds > 0 ? Math.round((score / totalRounds) * 100) : 0}%
            </div>
            <div className="text-sm text-gray-600">准确率</div>
          </div>
        </div>
      </div>

      {/* 游戏历史 */}
      {gameHistory.length > 0 && (
        <div className="mb-6">
          <h4 className="text-lg font-semibold text-gray-700 mb-3">游戏历史：</h4>
          <div className="space-y-2 max-h-32 overflow-y-auto">
            {gameHistory.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-lg p-3 border border-gray-200"
              >
                <span className="text-blue-600 font-semibold">你: </span>
                <span className="text-gray-800">{item.user}</span>
                <span className="mx-2">→</span>
                <span className="text-green-600 font-semibold">AI: </span>
                <span className="text-gray-800">{item.ai}</span>
              </motion.div>
            ))}
          </div>
        </div>
      )}

      {/* 控制按钮 */}
      <div className="flex justify-center space-x-4">
        <motion.button
          onClick={startNewGame}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="btn-secondary text-sm px-6 py-2"
        >
          🔄 重新开始
        </motion.button>
      </div>

      {/* 游戏说明 */}
      <div className="mt-4 text-center">
        <div className="bg-gray-50 rounded-lg p-3">
          <h5 className="text-sm font-semibold text-gray-700 mb-2">🎮 游戏说明</h5>
          <div className="text-xs text-gray-600 space-y-1">
            <p>• 输入一个字，AI会预测下一个字</p>
            <p>• 体验大语言模型的自回归预测</p>
            <p>• 完成5轮后自动结束游戏</p>
          </div>
        </div>
      </div>
    </motion.div>
  )
}
