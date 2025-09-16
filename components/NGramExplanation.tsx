'use client'

import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'

interface NGramExplanationProps {
  onComplete?: () => void
}

export default function NGramExplanation({ onComplete }: NGramExplanationProps) {
  const [currentStep, setCurrentStep] = useState(0)
  const [showCursor, setShowCursor] = useState(false)

  useEffect(() => {
    const interval = setInterval(() => {
      setShowCursor(prev => !prev)
    }, 500)
    return () => clearInterval(interval)
  }, [])

  const steps = [
    {
      id: 'introduction',
      title: 'N-gram模型介绍',
      content: (
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            N-gram模型使用 n-1 个词的上下文来预测下一个词
          </h2>
          <p className="text-gray-600 text-lg">
            让我们来看看不同类型的N-gram模型是如何工作的
          </p>
        </div>
      )
    },
    {
      id: 'bigram',
      title: 'BI-GRAM (2-gram)',
      content: (
        <div className="space-y-4">
          <h3 className="text-xl font-bold text-white bg-gray-800 px-4 py-2 rounded-lg">
            BI-GRAM
          </h3>
          <div className="bg-gray-800 text-white p-4 rounded-lg font-mono text-lg">
            <span className="text-gray-300">掌握</span>
            <span className="text-yellow-300"> | </span>
            <span className="bg-yellow-200 text-black px-1">的</span>
            {showCursor && <span className="animate-pulse">|</span>}
          </div>
          <p className="text-gray-600">
            使用1个词（"掌握"）作为上下文来预测下一个词（"的"）
          </p>
        </div>
      )
    },
    {
      id: 'trigram',
      title: 'TRI-GRAM (3-gram)',
      content: (
        <div className="space-y-4">
          <h3 className="text-xl font-bold text-white bg-gray-800 px-4 py-2 rounded-lg">
            TRI-GRAM
          </h3>
          <div className="bg-gray-800 text-white p-4 rounded-lg font-mono text-lg">
            <span className="text-gray-300">掌握 的</span>
            <span className="text-yellow-300"> | </span>
            <span className="bg-yellow-200 text-black px-1">艺术</span>
            {showCursor && <span className="animate-pulse">|</span>}
          </div>
          <p className="text-gray-600">
            使用2个词（"掌握 的"）作为上下文来预测下一个词（"艺术"）
          </p>
        </div>
      )
    },
    {
      id: 'fourgram',
      title: '4-GRAM',
      content: (
        <div className="space-y-4">
          <h3 className="text-xl font-bold text-white bg-gray-800 px-4 py-2 rounded-lg">
            4-GRAM
          </h3>
          <div className="bg-gray-800 text-white p-4 rounded-lg font-mono text-lg">
            <span className="text-gray-300">掌握 的 艺术</span>
            <span className="text-yellow-300"> | </span>
            <span className="bg-yellow-200 text-black px-1">的</span>
            {showCursor && <span className="animate-pulse">|</span>}
          </div>
          <p className="text-gray-600">
            使用3个词（"掌握 的 艺术"）作为上下文来预测下一个词（"的"）
          </p>
        </div>
      )
    }
  ]

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1)
    } else {
      onComplete?.()
    }
  }

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
    }
  }

  const progress = ((currentStep + 1) / steps.length) * 100

  return (
    <div className="bg-white rounded-2xl shadow-xl p-6 border-4 border-purple-200 max-w-4xl mx-auto">
      {/* 顶部导航栏 */}
      <div className="flex items-center justify-between mb-6">
        <motion.button
          onClick={handleBack}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="w-8 h-8 flex items-center justify-center text-gray-600 hover:text-gray-800"
        >
          <span className="text-xl">×</span>
        </motion.button>

        <div className="flex-1 mx-4">
          <div className="w-full bg-gray-200 rounded-full h-2">
            <motion.div
              className="bg-green-500 h-2 rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.5 }}
            />
          </div>
        </div>

        <div className="flex items-center space-x-2 text-gray-600">
          <span className="text-lg">1</span>
          <span className="text-yellow-500">⚡</span>
        </div>
      </div>

      {/* 主内容区域 */}
      <div className="min-h-[400px]">
        <motion.div
          key={currentStep}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="space-y-6"
        >
          {/* 当前步骤内容 */}
          <div className="bg-gray-50 rounded-xl p-6 border border-gray-200">
            {steps[currentStep].content}
          </div>

          {/* 步骤指示器 */}
          <div className="space-y-3">
            {steps.map((step, index) => (
              <motion.div
                key={step.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className={`p-4 rounded-lg border-2 transition-all ${
                  index === currentStep
                    ? 'border-purple-500 bg-purple-50'
                    : index < currentStep
                    ? 'border-green-500 bg-green-50'
                    : 'border-gray-300 bg-white'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                      index === currentStep
                        ? 'bg-purple-500 text-white'
                        : index < currentStep
                        ? 'bg-green-500 text-white'
                        : 'bg-gray-300 text-gray-600'
                    }`}>
                      {index < currentStep ? '✓' : index + 1}
                    </div>
                    <h3 className={`font-semibold ${
                      index === currentStep
                        ? 'text-purple-700'
                        : index < currentStep
                        ? 'text-green-700'
                        : 'text-gray-600'
                    }`}>
                      {step.title}
                    </h3>
                  </div>
                  {index < currentStep && (
                    <span className="text-green-600 text-sm">已完成</span>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* 底部控制按钮 */}
      <div className="mt-6 text-center">
        <motion.button
          onClick={handleNext}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="bg-gray-800 text-white px-8 py-3 rounded-lg font-semibold"
        >
          {currentStep < steps.length - 1 ? 'Continue' : '完成'}
        </motion.button>
      </div>
    </div>
  )
}
