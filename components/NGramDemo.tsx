'use client'

import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'

interface NGramDemoProps {
  onDemoComplete: (isComplete: boolean) => void
}

interface WordCount {
  word: string
  count: number
}

export default function NGramDemo({ onDemoComplete }: NGramDemoProps) {
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentWordIndex, setCurrentWordIndex] = useState(0)
  const [wordCounts, setWordCounts] = useState<WordCount[]>([])
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null)
  const [showAnswer, setShowAnswer] = useState(false)
  const [demoStep, setDemoStep] = useState(0)

  const sentence = "今天天气很好，我们去公园散步，看看美丽的花朵"
  const words = sentence.split('')

  const question = "在这句话中，哪个字出现得最多？"
  const options = ["的", "花", "美"]
  const correctAnswer = 0 // "的"

  // 模拟词频统计
  const simulateWordCounting = () => {
    setIsPlaying(true)
    setCurrentWordIndex(0)
    setWordCounts([])
    setDemoStep(1)

    let index = 0
    const interval = setInterval(() => {
      if (index < words.length) {
        const currentWord = words[index]
        setCurrentWordIndex(index)
        
        // 更新词频统计
        setWordCounts(prev => {
          const existing = prev.find(w => w.word === currentWord)
          if (existing) {
            return prev.map(w => 
              w.word === currentWord 
                ? { ...w, count: w.count + 1 }
                : w
            )
          } else {
            return [...prev, { word: currentWord, count: 1 }]
          }
        })
        
        index++
      } else {
        clearInterval(interval)
        setIsPlaying(false)
        setDemoStep(2)
        onDemoComplete(true)
      }
    }, 800)
  }

  const handleAnswerSelect = (index: number) => {
    if (showAnswer) return
    
    setSelectedAnswer(index)
    setShowAnswer(true)
    setDemoStep(3)
  }

  const resetDemo = () => {
    setIsPlaying(false)
    setCurrentWordIndex(0)
    setWordCounts([])
    setSelectedAnswer(null)
    setShowAnswer(false)
    setDemoStep(0)
  }

  return (
    <div className="bg-white rounded-2xl shadow-xl p-6 border-4 border-indigo-200 max-w-6xl mx-auto">
      {/* 顶部说明文字 */}
      <div className="text-center mb-6">
        <p className="text-lg text-gray-700 leading-relaxed">
          让我们用一句中文句子作为例子。N-gram算法首先遍历整个句子，统计每个字出现的次数。
        </p>
      </div>

      {/* 主演示区域 */}
      <div className="flex gap-8 mb-8">
        {/* 左侧：字符块 */}
        <div className="flex-1">
          <div className="grid grid-cols-8 gap-2">
            {words.map((word, index) => (
              <motion.div
                key={index}
                className={`p-2 rounded-lg border-2 transition-all duration-300 ${
                  index === currentWordIndex && isPlaying
                    ? 'bg-green-100 border-green-400'
                    : index < currentWordIndex
                    ? 'bg-orange-100 border-orange-300'
                    : 'bg-gray-100 border-gray-300'
                }`}
                animate={{
                  scale: index === currentWordIndex && isPlaying ? 1.05 : 1,
                }}
                transition={{ duration: 0.3 }}
              >
                <span className="text-base font-medium text-gray-800">
                  {word}
                </span>
              </motion.div>
            ))}
          </div>
        </div>

        {/* 右侧：可视化面板 */}
        <div className="w-64">
          <div className="bg-white border-2 border-gray-300 rounded-lg p-4 h-64">
            <h4 className="text-sm font-semibold text-gray-600 mb-3 text-center">字符统计</h4>
            <div className="space-y-2">
              {wordCounts.map((wordCount, index) => (
                <motion.div
                  key={wordCount.word}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-center justify-between"
                >
                  <span className="text-gray-700 font-medium">
                    {wordCount.word}:
                  </span>
                  <div className="bg-green-100 border-2 border-green-400 rounded px-2 py-1">
                    <span className="text-green-800 font-bold">
                      {wordCount.count}
                    </span>
                  </div>
                </motion.div>
              ))}
              
              {/* 占位线 */}
              {wordCounts.length < 8 && (
                <div className="space-y-1">
                  {Array.from({ length: 8 - wordCounts.length }, (_, i) => (
                    <div key={i} className="h-5 bg-gray-200 rounded"></div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* 开始按钮 */}
      <div className="text-center mb-8">
        <motion.button
          onClick={simulateWordCounting}
          disabled={isPlaying}
          whileHover={{ scale: isPlaying ? 1 : 1.05 }}
          whileTap={{ scale: isPlaying ? 1 : 0.95 }}
          className={`px-8 py-3 rounded-lg font-semibold text-lg transition-all ${
            isPlaying
              ? 'bg-gray-400 text-gray-600 cursor-not-allowed'
              : 'bg-black text-white hover:bg-gray-800'
          }`}
        >
          <div className="flex items-center space-x-2">
            {isPlaying ? (
              <>
                <div className="w-5 h-5 border-2 border-gray-600 border-t-transparent rounded-full animate-spin"></div>
                <span>统计中...</span>
              </>
            ) : (
              <>
                <div className="w-0 h-0 border-l-4 border-l-white border-y-4 border-y-transparent"></div>
                <span>开始统计</span>
              </>
            )}
          </div>
        </motion.button>
      </div>

      {/* 底部问题 */}
      <div className="space-y-4">
        <h3 className="text-xl font-semibold text-gray-800 text-center">
          {question}
        </h3>
        
        <div className="flex justify-center space-x-4">
          {options.map((option, index) => (
            <motion.button
              key={index}
              onClick={() => handleAnswerSelect(index)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`px-6 py-3 rounded-lg border-2 font-medium transition-all ${
                showAnswer
                  ? index === correctAnswer
                    ? 'border-green-500 bg-green-50 text-green-700'
                    : index === selectedAnswer
                    ? 'border-red-500 bg-red-50 text-red-700'
                    : 'border-gray-300 bg-gray-50 text-gray-500'
                  : 'border-gray-300 bg-white text-gray-700 hover:border-indigo-400 hover:bg-indigo-50'
              }`}
            >
              &ldquo;{option}&rdquo;
            </motion.button>
          ))}
        </div>

        {/* 答案反馈 */}
        {showAnswer && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <div className={`inline-block px-4 py-2 rounded-lg ${
              selectedAnswer === correctAnswer
                ? 'bg-green-100 text-green-700'
                : 'bg-red-100 text-red-700'
            }`}>
              {selectedAnswer === correctAnswer ? (
                <span className="font-semibold">✓ 正确！&ldquo;的&rdquo; 是最常见的字</span>
              ) : (
                <span className="font-semibold">✗ 不对，正确答案是 &ldquo;的&rdquo;</span>
              )}
            </div>
          </motion.div>
        )}
      </div>

      {/* 重置按钮 */}
      <div className="text-center mt-6">
        <motion.button
          onClick={resetDemo}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="btn-secondary px-6 py-2 rounded-lg font-semibold"
        >
          🔄 重新开始
        </motion.button>
      </div>
    </div>
  )
}
