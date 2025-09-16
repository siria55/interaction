'use client'

import { motion } from 'framer-motion'
import { useState } from 'react'

interface QuizTheoryExplanationProps {
  showExplanation: boolean
}

export default function QuizTheoryExplanation({ showExplanation }: QuizTheoryExplanationProps) {
  const [currentStep, setCurrentStep] = useState(0)

  if (!showExplanation) return null

  const steps = [
    {
      title: "📚 什么是选择题？",
      content: "选择题是一种测试形式，给出一个问题并提供多个选项，学习者需要选择最正确的答案。",
      emoji: "📚"
    },
    {
      title: "🧠 认知负荷理论",
      content: "选择题通过限制选项数量，减少学习者的认知负荷，让学习更加高效！",
      emoji: "🧠"
    },
    {
      title: "🎯 即时反馈",
      content: "选择题提供即时反馈，学习者可以立即知道答案是否正确，加深理解。",
      emoji: "🎯"
    },
    {
      title: "🔄 重复学习",
      content: "通过反复练习选择题，可以巩固知识点，提高记忆效果。",
      emoji: "🔄"
    },
    {
      title: "📊 学习评估",
      content: "选择题是评估学习效果的重要工具，帮助了解知识掌握程度。",
      emoji: "📊"
    },
    {
      title: "💡 知识建构",
      content: "通过选择题的选项设计，学习者可以接触到相关的概念和知识点。",
      emoji: "💡"
    }
  ]

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="bg-white rounded-2xl shadow-xl p-6 border-4 border-purple-200"
    >
      <div className="text-center mb-6">
        <h3 className="text-3xl font-bold text-purple-600 mb-2">
          🎓 选择题学习原理
        </h3>
        <p className="text-gray-600">
          让我们来了解选择题为什么是有效的学习方式！
        </p>
      </div>

      {/* 步骤指示器 */}
      <div className="flex justify-center mb-6">
        <div className="flex space-x-2">
          {steps.map((_, index) => (
            <motion.div
              key={index}
              className={`w-3 h-3 rounded-full ${
                index <= currentStep ? 'bg-purple-500' : 'bg-gray-300'
              }`}
              animate={{
                scale: index === currentStep ? 1.2 : 1
              }}
              transition={{ duration: 0.3 }}
            />
          ))}
        </div>
      </div>

      {/* 当前步骤内容 */}
      <motion.div
        key={currentStep}
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -50 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-6"
      >
        <motion.div
          className="text-6xl mb-4"
          animate={{ 
            rotate: [0, 10, -10, 0],
            scale: [1, 1.1, 1]
          }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          {steps[currentStep].emoji}
        </motion.div>
        
        <h4 className="text-2xl font-bold text-gray-800 mb-3">
          {steps[currentStep].title}
        </h4>
        
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          {steps[currentStep].content}
        </p>
      </motion.div>

      {/* 选择题优势可视化 */}
      {currentStep === 1 && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3 }}
          className="bg-gray-100 rounded-xl p-4 mb-6"
        >
          <h5 className="text-lg font-semibold text-gray-700 mb-3">认知负荷对比：</h5>
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-red-50 rounded-lg p-3">
              <div className="text-sm font-semibold text-red-700 mb-2">开放式问题</div>
              <div className="text-xs text-red-600">
                • 需要回忆具体内容<br/>
                • 组织语言表达<br/>
                • 检查语法和逻辑<br/>
                • 认知负荷：高
              </div>
            </div>
            <div className="bg-green-50 rounded-lg p-3">
              <div className="text-sm font-semibold text-green-700 mb-2">选择题</div>
              <div className="text-xs text-green-600">
                • 只需识别正确选项<br/>
                • 选项提供线索<br/>
                • 快速判断<br/>
                • 认知负荷：低
              </div>
            </div>
          </div>
        </motion.div>
      )}

      {/* 即时反馈可视化 */}
      {currentStep === 2 && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3 }}
          className="bg-gray-100 rounded-xl p-4 mb-6"
        >
          <h5 className="text-lg font-semibold text-gray-700 mb-3">即时反馈的好处：</h5>
          <div className="space-y-2">
            <div className="flex items-center space-x-3">
              <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                <span className="text-white text-xs">✓</span>
              </div>
              <span className="text-sm text-gray-700">立即知道答案是否正确</span>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center">
                <span className="text-white text-xs">💡</span>
              </div>
              <span className="text-sm text-gray-700">加深对正确概念的理解</span>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-6 h-6 bg-purple-500 rounded-full flex items-center justify-center">
                <span className="text-white text-xs">🔄</span>
              </div>
              <span className="text-sm text-gray-700">及时纠正错误认知</span>
            </div>
          </div>
        </motion.div>
      )}

      {/* 学习效果可视化 */}
      {currentStep === 4 && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3 }}
          className="bg-gray-100 rounded-xl p-4 mb-6"
        >
          <h5 className="text-lg font-semibold text-gray-700 mb-3">学习效果评估：</h5>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-700">知识掌握程度</span>
              <div className="flex space-x-1">
                {[1,2,3,4,5].map(i => (
                  <div key={i} className={`w-4 h-4 rounded ${
                    i <= 4 ? 'bg-green-500' : 'bg-gray-300'
                  }`}></div>
                ))}
              </div>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-700">学习效率</span>
              <div className="flex space-x-1">
                {[1,2,3,4,5].map(i => (
                  <div key={i} className={`w-4 h-4 rounded ${
                    i <= 5 ? 'bg-blue-500' : 'bg-gray-300'
                  }`}></div>
                ))}
              </div>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-700">记忆保持</span>
              <div className="flex space-x-1">
                {[1,2,3,4,5].map(i => (
                  <div key={i} className={`w-4 h-4 rounded ${
                    i <= 4 ? 'bg-purple-500' : 'bg-gray-300'
                  }`}></div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      )}

      {/* 控制按钮 */}
      <div className="flex justify-center space-x-4">
        <motion.button
          onClick={() => setCurrentStep(Math.max(0, currentStep - 1))}
          disabled={currentStep === 0}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className={`px-6 py-2 rounded-full font-semibold ${
            currentStep === 0 
              ? 'bg-gray-300 text-gray-500 cursor-not-allowed' 
              : 'bg-blue-500 text-white hover:bg-blue-600'
          }`}
        >
          ← 上一步
        </motion.button>
        
        <motion.button
          onClick={() => setCurrentStep(Math.min(steps.length - 1, currentStep + 1))}
          disabled={currentStep === steps.length - 1}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className={`px-6 py-2 rounded-full font-semibold ${
            currentStep === steps.length - 1 
              ? 'bg-gray-300 text-gray-500 cursor-not-allowed' 
              : 'bg-green-500 text-white hover:bg-green-600'
          }`}
        >
          下一步 →
        </motion.button>
      </div>

      {/* 完成提示 */}
      {currentStep === steps.length - 1 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="text-center mt-6"
        >
          <div className="text-4xl mb-2">🎉</div>
          <p className="text-lg font-semibold text-green-600">
            太棒了！你现在了解选择题学习的原理了！
          </p>
        </motion.div>
      )}
    </motion.div>
  )
}
