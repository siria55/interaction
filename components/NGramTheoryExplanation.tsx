'use client'

import { motion } from 'framer-motion'
import { useState } from 'react'

interface NGramTheoryExplanationProps {
  showExplanation: boolean
}

export default function NGramTheoryExplanation({ showExplanation }: NGramTheoryExplanationProps) {
  const [currentStep, setCurrentStep] = useState(0)

  const nextStep = () => {
    if (currentStep < 4) {
      setCurrentStep(currentStep + 1)
    }
  }

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
    }
  }

  const renderStepContent = () => {
    switch (currentStep) {
      case 0:
        return (
          <div className="space-y-4">
            <p className="text-blue-700 leading-relaxed">
              N-gram算法首先遍历整个文本，统计每个字出现的次数。就像我们刚才演示的那样，
              算法会记录"的"出现了多少次，"天"出现了多少次，等等。
            </p>
            <div className="bg-white rounded-lg p-4 border border-blue-300">
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div className="flex justify-between">
                  <span>的:</span>
                  <span className="font-bold text-blue-600">3次</span>
                </div>
                <div className="flex justify-between">
                  <span>天:</span>
                  <span className="font-bold text-blue-600">2次</span>
                </div>
                <div className="flex justify-between">
                  <span>花:</span>
                  <span className="font-bold text-blue-600">2次</span>
                </div>
                <div className="flex justify-between">
                  <span>美:</span>
                  <span className="font-bold text-blue-600">1次</span>
                </div>
              </div>
            </div>
          </div>
        )
      case 1:
        return (
          <div className="space-y-4">
            <p className="text-green-700 leading-relaxed">
              然后算法会构建N-gram，也就是连续的N个字的组合。比如2-gram（bigram）会记录
              "今天"、"天气"、"很好"等字对出现的频率。
            </p>
            <div className="bg-white rounded-lg p-4 border border-green-300">
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>&ldquo;今天&rdquo;:</span>
                  <span className="font-bold text-green-600">1次</span>
                </div>
                <div className="flex justify-between">
                  <span>&ldquo;天气&rdquo;:</span>
                  <span className="font-bold text-green-600">1次</span>
                </div>
                <div className="flex justify-between">
                  <span>&ldquo;很好&rdquo;:</span>
                  <span className="font-bold text-green-600">1次</span>
                </div>
              </div>
            </div>
          </div>
        )
      case 2:
        return (
          <div className="space-y-4">
            <p className="text-purple-700 leading-relaxed">
              基于统计的频率，算法可以计算在给定前一个字的情况下，下一个字出现的概率。
              比如在"今"后面，出现"天"的概率是多少。
            </p>
            <div className="bg-white rounded-lg p-4 border border-purple-300">
              <div className="text-sm space-y-2">
                <div className="flex justify-between">
                  <span>P(&ldquo;天&rdquo; | &ldquo;今&rdquo;):</span>
                  <span className="font-bold text-purple-600">100%</span>
                </div>
                <div className="flex justify-between">
                  <span>P(&ldquo;气&rdquo; | &ldquo;天&rdquo;):</span>
                  <span className="font-bold text-purple-600">50%</span>
                </div>
                <div className="flex justify-between">
                  <span>P(&ldquo;很&rdquo; | &ldquo;气&rdquo;):</span>
                  <span className="font-bold text-purple-600">50%</span>
                </div>
              </div>
            </div>
          </div>
        )
      case 3:
        return (
          <div className="space-y-4">
            <p className="text-orange-700 leading-relaxed">
              最后，算法可以根据这些概率来生成新的文本。给定一个起始字，
              它会选择概率最高的下一个字，然后继续这个过程。
            </p>
            <div className="bg-white rounded-lg p-4 border border-orange-300">
              <div className="text-sm font-mono">
                <div className="text-orange-600">输入: &ldquo;今&rdquo;</div>
                <div className="text-gray-600">↓</div>
                <div className="text-orange-600">输出: &ldquo;今天天气很好，我们去公园散步...&rdquo;</div>
              </div>
            </div>
          </div>
        )
      case 4:
        return (
          <div className="space-y-4">
            <p className="text-indigo-700 leading-relaxed">
              N-gram算法通过统计字频和字序列的频率，能够学习文本的模式和规律。
              虽然它比较简单，但它是现代自然语言处理技术的基础，包括我们今天使用的大语言模型！
            </p>
            <div className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-lg p-4 border border-indigo-200">
              <div className="text-center">
                <div className="text-2xl mb-2">🎉</div>
                <p className="text-indigo-600 font-semibold">
                  恭喜你学会了N-gram算法！
                </p>
              </div>
            </div>
          </div>
        )
      default:
        return null
    }
  }

  const getStepTitle = () => {
    const titles = [
      "📈 第一步：字符频率统计",
      "🔗 第二步：N-gram构建", 
      "🧮 第三步：概率计算",
      "✍️ 第四步：文本生成",
      "🎯 总结"
    ]
    return titles[currentStep]
  }

  const getStepColors = () => {
    const colors = [
      { bg: 'bg-blue-50', border: 'border-blue-200', text: 'text-blue-800' },
      { bg: 'bg-green-50', border: 'border-green-200', text: 'text-green-800' },
      { bg: 'bg-purple-50', border: 'border-purple-200', text: 'text-purple-800' },
      { bg: 'bg-orange-50', border: 'border-orange-200', text: 'text-orange-800' },
      { bg: 'bg-gradient-to-r from-indigo-50 to-purple-50', border: 'border-indigo-200', text: 'text-indigo-800' }
    ]
    return colors[currentStep]
  }

  const colors = getStepColors()

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className="bg-white rounded-2xl shadow-xl p-6 border-4 border-indigo-200 max-w-4xl mx-auto"
    >
      <div className="text-center mb-6">
        <h3 className="text-2xl font-bold text-indigo-600 mb-2">
          📊 N-gram算法原理
        </h3>
        <p className="text-gray-600">
          学习N-gram算法如何统计字频和预测下一个字！
        </p>
        <div className="flex justify-center mt-4">
          <div className="flex space-x-2">
            {[0, 1, 2, 3, 4].map((index) => (
              <div
                key={index}
                className={`w-3 h-3 rounded-full ${
                  index === currentStep ? 'bg-indigo-500' : 'bg-gray-300'
                }`}
              />
            ))}
          </div>
        </div>
      </div>

      <div className="min-h-[400px] flex flex-col">
        {/* 当前步骤内容 */}
        <motion.div
          key={currentStep}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.3 }}
          className="flex-1 flex flex-col justify-center"
        >
          <div className={`rounded-xl p-6 border ${colors.bg} ${colors.border}`}>
            <h4 className={`text-xl font-semibold mb-4 ${colors.text}`}>
              {getStepTitle()}
            </h4>
            {renderStepContent()}
          </div>
        </motion.div>

        {/* 导航按钮 */}
        <div className="flex justify-between items-center mt-6">
          <motion.button
            onClick={prevStep}
            disabled={currentStep === 0}
            whileHover={{ scale: currentStep === 0 ? 1 : 1.05 }}
            whileTap={{ scale: currentStep === 0 ? 1 : 0.95 }}
            className={`px-6 py-2 rounded-lg font-semibold transition-all ${
              currentStep === 0
                ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
                : 'bg-gray-500 text-white hover:bg-gray-600'
            }`}
          >
            ← 上一步
          </motion.button>

          <div className="text-sm text-gray-500">
            {currentStep + 1} / 5
          </div>

          <motion.button
            onClick={nextStep}
            disabled={currentStep === 4}
            whileHover={{ scale: currentStep === 4 ? 1 : 1.05 }}
            whileTap={{ scale: currentStep === 4 ? 1 : 0.95 }}
            className={`px-6 py-2 rounded-lg font-semibold transition-all ${
              currentStep === 4
                ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
                : 'bg-indigo-500 text-white hover:bg-indigo-600'
            }`}
          >
            {currentStep === 4 ? '完成' : '下一步 →'}
          </motion.button>
        </div>
      </div>
    </motion.div>
  )
}