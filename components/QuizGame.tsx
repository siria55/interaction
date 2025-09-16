'use client'

import { motion } from 'framer-motion'
import { useState, useRef, useEffect } from 'react'

interface QuizGameProps {
  onQuizComplete: (accuracy: number) => void
}

interface Model {
  id: string
  name: string
  description: string
  color: string
  responses: string[]
}

export default function QuizGame({ onQuizComplete }: QuizGameProps) {
  const [selectedModel, setSelectedModel] = useState<string>('数学')
  const [inputText, setInputText] = useState('今天')
  const [generatedText, setGeneratedText] = useState('')
  const [isGenerating, setIsGenerating] = useState(false)
  const [gameScore, setGameScore] = useState(0)
  const [totalRounds, setTotalRounds] = useState(0)
  const [currentRound, setCurrentRound] = useState(1)
  const [showResult, setShowResult] = useState(false)

  // 预定义的模型
  const models: Model[] = [
    {
      id: '古文',
      name: '古文',
      description: '古代文学文本训练',
      color: 'gray',
      responses: [
        '天地玄黄，宇宙洪荒。日月盈昃，辰宿列张。',
        '学而时习之，不亦说乎？有朋自远方来，不亦乐乎？',
        '山不在高，有仙则名。水不在深，有龙则灵。'
      ]
    },
    {
      id: '数学',
      name: '数学',
      description: '数学教材文本训练',
      color: 'green',
      responses: [
        '一加一等于二，二加二等于四，这是最基本的加法运算。',
        '圆的面积等于π乘以半径的平方，即S=πr²。',
        '三角形内角和等于180度，这是几何学的基本定理。'
      ]
    },
    {
      id: '童话',
      name: '童话',
      description: '童话故事文本训练',
      color: 'gray',
      responses: [
        '从前有一个美丽的小公主，她住在一座高高的城堡里。',
        '小红帽提着篮子，走在去外婆家的小路上。',
        '白雪公主和七个小矮人快乐地生活在一起。'
      ]
    }
  ]

  const currentModel = models.find(m => m.id === selectedModel) || models[1]

  // 生成文本
  const generateText = () => {
    if (isGenerating) return
    
    setIsGenerating(true)
    setShowResult(false)
    
    // 模拟AI生成过程
    setTimeout(() => {
      const randomResponse = currentModel.responses[Math.floor(Math.random() * currentModel.responses.length)]
      setGeneratedText(randomResponse)
      setIsGenerating(false)
      setShowResult(true)
      setTotalRounds(totalRounds + 1)
      
      // 模拟评分（基于输入长度和生成质量）
      const score = Math.min(100, Math.floor(Math.random() * 40) + 60)
      setGameScore(gameScore + score)
      
      // 如果完成足够轮次，触发完成回调
      if (totalRounds >= 3) {
        const accuracy = gameScore / (totalRounds * 100)
        onQuizComplete(accuracy)
      }
    }, 1500)
  }

  // 重新开始
  const startOver = () => {
    setInputText('今天')
    setGeneratedText('')
    setIsGenerating(false)
    setShowResult(false)
    setGameScore(0)
    setTotalRounds(0)
    setCurrentRound(1)
  }

  // 重新生成
  const regenerateResponse = () => {
    generateText()
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className="bg-white rounded-2xl shadow-xl p-6 border-4 border-purple-200 max-w-4xl mx-auto"
    >
      {/* 顶部说明 */}
      <div className="text-center mb-6">
        <h3 className="text-2xl font-bold text-purple-600 mb-2">
          🤖 大语言模型文字接龙
        </h3>
        <p className="text-gray-600 mb-4">
          选择一个模型并输入一些起始词。如果你缺乏灵感，试试输入"今天"，看看每个模型会给你什么！
        </p>
      </div>

      {/* 主界面 - 深色主题 */}
      <div className="bg-gray-800 rounded-xl p-6">
        {/* 模型选择按钮 */}
        <div className="flex space-x-4 mb-6">
          {models.map((model) => (
            <motion.button
              key={model.id}
              onClick={() => setSelectedModel(model.id)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`px-4 py-2 rounded-lg font-semibold transition-all ${
                selectedModel === model.id
                  ? 'bg-white text-gray-800 border-2 border-green-400'
                  : 'bg-gray-700 text-white border-2 border-gray-600'
              }`}
            >
              {model.name}
            </motion.button>
          ))}
        </div>

        {/* 文本生成区域 */}
        <div className="bg-black rounded-lg p-6 min-h-[200px]">
          <div className="text-white">
            {/* 输入提示词 */}
            <span className="text-green-400 text-lg font-semibold">
              {inputText}
            </span>
            
            {/* 生成的文本 */}
            {generatedText && (
              <span className="text-white text-lg ml-2">
                {generatedText}
              </span>
            )}
            
            {/* 生成中状态 */}
            {isGenerating && (
              <span className="text-gray-400 text-lg ml-2">
                正在生成...
              </span>
            )}
          </div>
        </div>

        {/* 底部控制按钮 */}
        <div className="flex justify-between items-center mt-6">
          <motion.button
            onClick={startOver}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center space-x-2 bg-gray-700 text-white px-4 py-2 rounded-lg font-semibold"
          >
            <span>🔄</span>
            <span>Start over</span>
          </motion.button>
          
          <motion.button
            onClick={regenerateResponse}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-gray-900 text-white px-6 py-2 rounded-lg font-semibold"
          >
            Regenerate response
          </motion.button>
        </div>
      </div>

      {/* 游戏统计 */}
      <div className="mt-6 bg-gradient-to-r from-purple-50 to-blue-50 rounded-xl p-4">
        <div className="grid grid-cols-3 gap-4 text-center">
          <div>
            <div className="text-2xl font-bold text-purple-600">{gameScore}</div>
            <div className="text-sm text-gray-600">总分</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-blue-600">{totalRounds}</div>
            <div className="text-sm text-gray-600">轮次</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-green-600">
              {totalRounds > 0 ? Math.round((gameScore / (totalRounds * 100)) * 100) : 0}%
            </div>
            <div className="text-sm text-gray-600">平均分</div>
          </div>
        </div>
      </div>

      {/* 结果提示 */}
      {showResult && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-4 bg-green-50 rounded-lg p-4 border border-green-200"
        >
          <p className="text-green-700 text-center">
            🎉 第 {totalRounds} 轮完成！当前模型：{currentModel.name}
          </p>
        </motion.div>
      )}
    </motion.div>
  )
}
