'use client'

import { motion } from 'framer-motion'
import { useState, useRef, useEffect } from 'react'

interface TextChainGameProps {
  onGameComplete: (accuracy: number) => void
}

export default function TextChainGame({ onGameComplete }: TextChainGameProps) {
  const [selectedOption, setSelectedOption] = useState('')
  const [gameHistory, setGameHistory] = useState<Array<{user: string, ai: string, correct: boolean}>>([])
  const [currentTemplate, setCurrentTemplate] = useState<any>(null)
  const [isGenerating, setIsGenerating] = useState(false)
  const [score, setScore] = useState(0)
  const [totalRounds, setTotalRounds] = useState(0)
  const [showResult, setShowResult] = useState(false)

  // 预定义的句子模板，用户需要补全
  const sentenceTemplates = [
    { 
      prefix: '今天天气',
      options: ['很', '真', '不', '很'],
      correct: '很',
      full: '今天天气很好'
    },
    { 
      prefix: '我喜欢',
      options: ['吃', '看', '玩', '学'],
      correct: '吃',
      full: '我喜欢吃饭'
    },
    { 
      prefix: '小猫在',
      options: ['玩', '睡', '跑', '叫'],
      correct: '玩',
      full: '小猫在玩耍'
    },
    { 
      prefix: '春天来',
      options: ['了', '到', '临', '到'],
      correct: '了',
      full: '春天来了'
    },
    { 
      prefix: '学习很',
      options: ['有', '重', '难', '好'],
      correct: '有',
      full: '学习很有趣'
    }
  ]

  // 开始新游戏
  const startNewGame = () => {
    const randomTemplate = sentenceTemplates[Math.floor(Math.random() * sentenceTemplates.length)]
    setCurrentTemplate(randomTemplate)
    setGameHistory([])
    setSelectedOption('')
    setScore(0)
    setTotalRounds(0)
    setShowResult(false)
  }

  // 处理用户选择
  const handleOptionSelect = (option: string) => {
    if (isGenerating || showResult) return
    
    setSelectedOption(option)
    setIsGenerating(true)
    
    setTimeout(() => {
      const isCorrect = option === currentTemplate.correct
      const aiResponse = currentTemplate.full
      
      const newHistory = [...gameHistory, { 
        user: option, 
        ai: aiResponse, 
        correct: isCorrect 
      }]
      setGameHistory(newHistory)
      
      if (isCorrect) {
        setScore(score + 1)
      }
      
      const newTotalRounds = totalRounds + 1
      setTotalRounds(newTotalRounds)
      setShowResult(true)
      setIsGenerating(false)
      
      // 如果达到5轮，结束游戏
      if (newTotalRounds >= 4) {
        setTimeout(() => {
          const accuracy = (score + (isCorrect ? 1 : 0)) / (newTotalRounds + 1)
          onGameComplete(accuracy)
        }, 2000)
      }
    }, 1000) // 模拟AI思考时间
  }

  // 下一题
  const nextQuestion = () => {
    const randomTemplate = sentenceTemplates[Math.floor(Math.random() * sentenceTemplates.length)]
    setCurrentTemplate(randomTemplate)
    setSelectedOption('')
    setShowResult(false)
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
          🤖 大语言模型文字补全
        </h3>
        <p className="text-gray-600 mb-2">
          选择正确的字补全句子，体验AI的预测能力！
        </p>
        <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-lg p-3 max-w-2xl mx-auto">
          <p className="text-sm font-semibold text-green-700">
            🎯 目标：选择最合适的字，完成句子！
          </p>
        </div>
      </div>

      {/* 当前句子显示 */}
      <div className="bg-gray-100 rounded-xl p-6 mb-6 border border-gray-300">
        <div className="flex items-center justify-between mb-4">
          <div className="bg-green-500 text-white px-3 py-1 rounded text-sm font-semibold">
            T&C
          </div>
          <div className="text-gray-600 text-sm">第 {totalRounds + 1} 题</div>
        </div>
        
        <div className="bg-white rounded-lg p-4 mb-4 border border-gray-200">
          <div className="text-2xl font-mono text-gray-800 mb-2">
            {currentTemplate?.prefix}
            <span className="text-green-500 animate-pulse">?</span>
          </div>
          {showResult && (
            <div className="text-lg text-gray-600">
              完整句子：{currentTemplate?.full}
            </div>
          )}
        </div>
        
        {isGenerating && (
          <div className="text-center">
            <div className="text-green-500 animate-pulse">AI正在思考...</div>
          </div>
        )}
      </div>

      {/* 选项选择 */}
      {currentTemplate && !showResult && (
        <div className="mb-6">
          <h4 className="text-lg font-semibold text-gray-700 mb-4 text-center">
            选择最合适的字补全句子：
          </h4>
          <div className="grid grid-cols-2 gap-3">
            {currentTemplate.options.map((option: string, index: number) => (
              <motion.button
                key={index}
                onClick={() => handleOptionSelect(option)}
                disabled={isGenerating}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`p-4 rounded-lg border-2 text-lg font-semibold transition-all ${
                  selectedOption === option
                    ? 'border-green-500 bg-green-100 text-green-700'
                    : 'border-gray-300 bg-white text-gray-700 hover:border-green-400 hover:bg-green-50'
                } disabled:opacity-50 disabled:cursor-not-allowed`}
              >
                {option}
              </motion.button>
            ))}
          </div>
        </div>
      )}

      {/* 结果显示和下一题按钮 */}
      {showResult && (
        <div className="mb-6 text-center">
          <div className={`text-2xl font-bold mb-4 ${
            selectedOption === currentTemplate?.correct ? 'text-green-600' : 'text-red-600'
          }`}>
            {selectedOption === currentTemplate?.correct ? '✅ 正确！' : '❌ 错误'}
          </div>
          <div className="text-gray-600 mb-4">
            正确答案是：<span className="text-green-600 font-bold">{currentTemplate?.correct}</span>
          </div>
          {totalRounds < 4 && (
            <motion.button
              onClick={nextQuestion}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="btn-primary px-6 py-3 rounded-lg font-semibold"
            >
              下一题 →
            </motion.button>
          )}
        </div>
      )}

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
                className={`rounded-lg p-3 border ${
                  item.correct 
                    ? 'bg-green-50 border-green-200' 
                    : 'bg-red-50 border-red-200'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-blue-600 font-semibold">你的选择: </span>
                    <span className="text-gray-800">{item.user}</span>
                  </div>
                  <div className={`text-sm font-bold ${
                    item.correct ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {item.correct ? '✅' : '❌'}
                  </div>
                </div>
                <div className="text-gray-600 text-sm mt-1">
                  完整句子：{item.ai}
                </div>
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
          className="btn-secondary px-6 py-2 rounded-lg font-semibold"
        >
          🔄 重新开始
        </motion.button>
      </div>

      {/* 游戏说明 */}
      <div className="mt-4 text-center">
        <div className="bg-gray-50 rounded-lg p-3">
          <h5 className="text-sm font-semibold text-gray-700 mb-2">🎮 游戏说明</h5>
          <div className="text-xs text-gray-600 space-y-1">
            <p>• 选择最合适的字补全句子</p>
            <p>• 体验大语言模型的预测能力</p>
            <p>• 完成5题后自动结束游戏</p>
          </div>
        </div>
      </div>
    </motion.div>
  )
}
