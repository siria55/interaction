'use client'

import { motion } from 'framer-motion'
import { useState } from 'react'

interface FillInTheBlankTheoryExplanationProps {
  showExplanation: boolean
}

export default function FillInTheBlankTheoryExplanation({ showExplanation }: FillInTheBlankTheoryExplanationProps) {
  const [currentStep, setCurrentStep] = useState(0)

  if (!showExplanation) return null

  const steps = [
    {
      title: "✏️ 什么是填空题？",
      content: "填空题是一种学习形式，给出不完整的句子，学习者需要选择正确的词来补全句子。",
      emoji: "✏️"
    },
    {
      title: "🧩 完形填空原理",
      content: "填空题基于完形填空理论，通过上下文线索帮助学习者理解和记忆词汇。",
      emoji: "🧩"
    },
    {
      title: "🎯 上下文学习",
      content: "填空题让学习者在具体语境中学习词汇，比孤立记忆更有效！",
      emoji: "🎯"
    },
    {
      title: "💭 主动回忆",
      content: "填空题需要学习者主动回忆和选择，比被动阅读更能加深记忆。",
      emoji: "💭"
    },
    {
      title: "🔄 即时反馈",
      content: "填空题提供即时反馈，学习者可以立即知道答案是否正确。",
      emoji: "🔄"
    },
    {
      title: "📚 词汇建构",
      content: "通过填空题，学习者可以更好地理解词汇的用法和语境。",
      emoji: "📚"
    }
  ]

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="bg-white rounded-2xl shadow-xl p-6 border-4 border-orange-200"
    >
      <div className="text-center mb-6">
        <h3 className="text-3xl font-bold text-orange-600 mb-2">
          🎓 填空题学习原理
        </h3>
        <p className="text-gray-600">
          让我们来了解填空题为什么是有效的学习方式！
        </p>
      </div>

      {/* 步骤指示器 */}
      <div className="flex justify-center mb-6">
        <div className="flex space-x-2">
          {steps.map((_, index) => (
            <motion.div
              key={index}
              className={`w-3 h-3 rounded-full ${
                index <= currentStep ? 'bg-orange-500' : 'bg-gray-300'
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

      {/* 完形填空理论可视化 */}
      {currentStep === 1 && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3 }}
          className="bg-gray-100 rounded-xl p-4 mb-6"
        >
          <h5 className="text-lg font-semibold text-gray-700 mb-3">完形填空理论：</h5>
          <div className="space-y-3">
            <div className="bg-white rounded-lg p-3">
              <div className="text-sm text-gray-600 mb-2">原始句子：</div>
              <div className="text-gray-800">&ldquo;用于训练AI模型的文本集合被称为 <span className="bg-yellow-200 px-2 py-1 rounded">_____</span> 。&rdquo;</div>
            </div>
            <div className="bg-white rounded-lg p-3">
              <div className="text-sm text-gray-600 mb-2">上下文线索：</div>
              <div className="text-gray-800">&ldquo;训练AI模型&rdquo; + &ldquo;文本集合&rdquo; → 提示答案应该是&ldquo;corpus&rdquo;</div>
            </div>
            <div className="bg-white rounded-lg p-3">
              <div className="text-sm text-gray-600 mb-2">学习效果：</div>
              <div className="text-gray-800">通过上下文理解词汇含义，比死记硬背更有效</div>
            </div>
          </div>
        </motion.div>
      )}

      {/* 上下文学习可视化 */}
      {currentStep === 2 && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3 }}
          className="bg-gray-100 rounded-xl p-4 mb-6"
        >
          <h5 className="text-lg font-semibold text-gray-700 mb-3">上下文学习的好处：</h5>
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-red-50 rounded-lg p-3">
              <div className="text-sm font-semibold text-red-700 mb-2">孤立记忆</div>
              <div className="text-xs text-red-600">
                • 词汇：corpus<br/>
                • 含义：语料库<br/>
                • 记忆效果：容易遗忘
              </div>
            </div>
            <div className="bg-green-50 rounded-lg p-3">
              <div className="text-sm font-semibold text-green-700 mb-2">上下文学习</div>
              <div className="text-xs text-green-600">
                • 句子：训练AI模型的文本集合<br/>
                • 填空：corpus<br/>
                • 记忆效果：深刻理解
              </div>
            </div>
          </div>
        </motion.div>
      )}

      {/* 主动回忆可视化 */}
      {currentStep === 3 && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3 }}
          className="bg-gray-100 rounded-xl p-4 mb-6"
        >
          <h5 className="text-lg font-semibold text-gray-700 mb-3">主动回忆过程：</h5>
          <div className="space-y-2">
            <div className="flex items-center space-x-3">
              <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center">
                <span className="text-white text-xs">1</span>
              </div>
              <span className="text-sm text-gray-700">阅读不完整的句子</span>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                <span className="text-white text-xs">2</span>
              </div>
              <span className="text-sm text-gray-700">分析上下文线索</span>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-6 h-6 bg-purple-500 rounded-full flex items-center justify-center">
                <span className="text-white text-xs">3</span>
              </div>
              <span className="text-sm text-gray-700">回忆相关词汇</span>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-6 h-6 bg-orange-500 rounded-full flex items-center justify-center">
                <span className="text-white text-xs">4</span>
              </div>
              <span className="text-sm text-gray-700">选择最合适的答案</span>
            </div>
          </div>
        </motion.div>
      )}

      {/* 学习效果对比 */}
      {currentStep === 4 && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3 }}
          className="bg-gray-100 rounded-xl p-4 mb-6"
        >
          <h5 className="text-lg font-semibold text-gray-700 mb-3">学习效果对比：</h5>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-700">记忆保持率</span>
              <div className="flex space-x-1">
                {[1,2,3,4,5].map(i => (
                  <div key={i} className={`w-4 h-4 rounded ${
                    i <= 4 ? 'bg-green-500' : 'bg-gray-300'
                  }`}></div>
                ))}
              </div>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-700">理解深度</span>
              <div className="flex space-x-1">
                {[1,2,3,4,5].map(i => (
                  <div key={i} className={`w-4 h-4 rounded ${
                    i <= 5 ? 'bg-blue-500' : 'bg-gray-300'
                  }`}></div>
                ))}
              </div>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-700">应用能力</span>
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
            太棒了！你现在了解填空题学习的原理了！
          </p>
        </motion.div>
      )}
    </motion.div>
  )
}
