'use client'

import { motion } from 'framer-motion'
import { useState } from 'react'

interface LLMTheoryExplanationProps {
  showExplanation: boolean
}

export default function LLMTheoryExplanation({ showExplanation }: LLMTheoryExplanationProps) {
  const [currentStep, setCurrentStep] = useState(0)

  if (!showExplanation) return null

  const steps = [
    {
      title: "🤖 什么是大语言模型？",
      content: "大语言模型就像一个超级聪明的机器人，它读过很多很多书，学会了人类的语言规律！",
      emoji: "🤖"
    },
    {
      title: "📚 自回归模型",
      content: "自回归就是'自己预测自己'！模型根据前面的文字，预测下一个最可能的字。",
      emoji: "📚"
    },
    {
      title: "🧠 注意力机制",
      content: "就像人类读书时会注意重要的词，AI也会'注意'句子中重要的部分来做出预测！",
      emoji: "🧠"
    },
    {
      title: "🔮 概率预测",
      content: "AI不是随便猜的！它会计算每个字出现的概率，选择最可能的那个字。",
      emoji: "🔮"
    },
    {
      title: "🎯 训练过程",
      content: "AI通过阅读大量文本学习，就像我们通过读书学习语言一样！",
      emoji: "🎯"
    },
    {
      title: "✨ 实际应用",
      content: "ChatGPT、文心一言等AI助手都是基于这种技术，可以聊天、写文章、回答问题！",
      emoji: "✨"
    }
  ]

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="bg-white rounded-2xl shadow-xl p-6 border-4 border-green-200"
    >
      <div className="text-center mb-6">
        <h3 className="text-3xl font-bold text-green-600 mb-2">
          🎓 大语言模型原理
        </h3>
        <p className="text-gray-600">
          让我们来了解AI是如何学会说话的！
        </p>
      </div>

      {/* 步骤指示器 */}
      <div className="flex justify-center mb-6">
        <div className="flex space-x-2">
          {steps.map((_, index) => (
            <motion.div
              key={index}
              className={`w-3 h-3 rounded-full ${
                index <= currentStep ? 'bg-green-500' : 'bg-gray-300'
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

      {/* 自回归模型可视化 */}
      {currentStep === 1 && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3 }}
          className="bg-gray-100 rounded-xl p-4 mb-6"
        >
          <h5 className="text-lg font-semibold text-gray-700 mb-3">自回归预测示例：</h5>
          <div className="text-center">
            <div className="text-xl font-mono bg-white rounded-lg p-4 inline-block">
              <span className="text-blue-600">今天天气</span>
              <span className="text-red-600 animate-pulse">?</span>
            </div>
            <div className="mt-2 text-sm text-gray-600">
              AI预测下一个字：很、真、不、很...
            </div>
          </div>
        </motion.div>
      )}

      {/* 注意力机制可视化 */}
      {currentStep === 2 && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3 }}
          className="bg-gray-100 rounded-xl p-4 mb-6"
        >
          <h5 className="text-lg font-semibold text-gray-700 mb-3">注意力机制：</h5>
          <div className="text-center">
            <div className="text-lg bg-white rounded-lg p-4 inline-block">
              <span className="text-yellow-400 font-bold">我</span>
              <span className="text-gray-600">喜欢</span>
              <span className="text-yellow-400 font-bold">吃</span>
              <span className="text-gray-600">苹果</span>
            </div>
            <div className="mt-2 text-sm text-gray-600">
              高亮显示AI&ldquo;注意&rdquo;的关键词
            </div>
          </div>
        </motion.div>
      )}

      {/* 概率预测可视化 */}
      {currentStep === 3 && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3 }}
          className="bg-gray-100 rounded-xl p-4 mb-6"
        >
          <h5 className="text-lg font-semibold text-gray-700 mb-3">概率预测：</h5>
          <div className="space-y-2">
            <div className="flex items-center justify-between bg-white rounded-lg p-2">
              <span>很</span>
              <div className="flex items-center">
                <div className="w-20 bg-gray-200 rounded-full h-2 mr-2">
                  <div className="bg-green-500 h-2 rounded-full" style={{width: '80%'}}></div>
                </div>
                <span className="text-sm text-gray-600">80%</span>
              </div>
            </div>
            <div className="flex items-center justify-between bg-white rounded-lg p-2">
              <span>真</span>
              <div className="flex items-center">
                <div className="w-20 bg-gray-200 rounded-full h-2 mr-2">
                  <div className="bg-blue-500 h-2 rounded-full" style={{width: '15%'}}></div>
                </div>
                <span className="text-sm text-gray-600">15%</span>
              </div>
            </div>
            <div className="flex items-center justify-between bg-white rounded-lg p-2">
              <span>不</span>
              <div className="flex items-center">
                <div className="w-20 bg-gray-200 rounded-full h-2 mr-2">
                  <div className="bg-yellow-500 h-2 rounded-full" style={{width: '5%'}}></div>
                </div>
                <span className="text-sm text-gray-600">5%</span>
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
            太棒了！你现在了解大语言模型的工作原理了！
          </p>
        </motion.div>
      )}
    </motion.div>
  )
}
