'use client'

import { motion } from 'framer-motion'
import { useState } from 'react'

interface PixelTheoryExplanationProps {
  showExplanation: boolean
}

export default function PixelTheoryExplanation({ showExplanation }: PixelTheoryExplanationProps) {
  const [currentStep, setCurrentStep] = useState(0)

  if (!showExplanation) return null

  const steps = [
    {
      title: "🖼️ 什么是像素？",
      content: "像素是图片的最小单位，就像马赛克瓷砖一样！每个像素都有自己的颜色。",
      emoji: "🖼️",
      visual: "pixel"
    },
    {
      title: "📐 像素网格",
      content: "图片是由很多像素排列成网格组成的，就像9×9的棋盘一样！",
      emoji: "📐",
      visual: "grid"
    },
    {
      title: "⚫⚪ 黑白像素",
      content: "每个像素可以是黑色(0)或白色(255)，就像开关一样！",
      emoji: "⚫⚪",
      visual: "binary"
    },
    {
      title: "🔢 数字的像素结构",
      content: "不同的数字有不同的像素模式，就像拼图一样！",
      emoji: "🔢",
      visual: "digits"
    },
    {
      title: "🤖 AI如何识别？",
      content: "AI比较像素模式，找到最相似的数字模板！",
      emoji: "🤖",
      visual: "ai"
    }
  ]

  const renderVisual = (type: string) => {
    switch (type) {
      case "pixel":
        return (
          <div className="flex justify-center space-x-2">
            {[...Array(5)].map((_, i) => (
              <motion.div
                key={i}
                className="w-4 h-4 bg-gradient-to-br from-blue-400 to-purple-500 rounded-sm"
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.5, 1, 0.5]
                }}
                transition={{
                  duration: 1,
                  repeat: Infinity,
                  delay: i * 0.2
                }}
              />
            ))}
          </div>
        )
      
      case "grid":
        return (
          <div className="grid grid-cols-3 gap-1 w-fit mx-auto">
            {[...Array(9)].map((_, i) => (
              <motion.div
                key={i}
                className="w-6 h-6 border border-gray-400 bg-gray-100"
                animate={{
                  backgroundColor: ['#f3f4f6', '#3b82f6', '#f3f4f6']
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  delay: i * 0.1
                }}
              />
            ))}
          </div>
        )
      
      case "binary":
        return (
          <div className="flex justify-center space-x-2">
            <motion.div
              className="w-8 h-8 bg-black rounded-sm"
              animate={{
                scale: [1, 1.1, 1]
              }}
              transition={{
                duration: 1,
                repeat: Infinity
              }}
            />
            <motion.div
              className="w-8 h-8 bg-white border-2 border-gray-400 rounded-sm"
              animate={{
                scale: [1, 1.1, 1]
              }}
              transition={{
                duration: 1,
                repeat: Infinity,
                delay: 0.5
              }}
            />
          </div>
        )
      
      case "digits":
        return (
          <div className="grid grid-cols-2 gap-2 w-fit mx-auto">
            {[3, 7].map((digit, i) => (
              <motion.div
                key={digit}
                className="text-center"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.3 }}
              >
                <div className="text-2xl font-bold text-blue-600 mb-1">数字 {digit}</div>
                <div className="grid grid-cols-3 gap-0.5 w-12 mx-auto">
                  {[...Array(9)].map((_, j) => (
                    <div
                      key={j}
                      className={`w-3 h-3 ${
                        (digit === 3 && [1,2,3,4,5,6,7].includes(j)) ||
                        (digit === 7 && [0,1,2,3,4,5,6,7].includes(j))
                          ? 'bg-black' : 'bg-white border border-gray-300'
                      }`}
                    />
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        )
      
      case "ai":
        return (
          <div className="flex justify-center items-center space-x-4">
            <div className="text-2xl">🔍</div>
            <motion.div
              className="text-4xl"
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              🤖
            </motion.div>
            <div className="text-2xl">✅</div>
          </div>
        )
      
      default:
        return null
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="bg-white rounded-2xl shadow-xl p-6 border-4 border-green-200"
    >
      <div className="text-center mb-6">
        <h3 className="text-3xl font-bold text-green-600 mb-2">
          🎓 像素和数字识别原理
        </h3>
        <p className="text-gray-600">
          让我们来学习像素是如何组成图片的，以及AI是如何识别数字的！
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
        
        <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-6">
          {steps[currentStep].content}
        </p>

        {/* 可视化演示 */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3 }}
          className="bg-gray-50 rounded-xl p-6"
        >
          {renderVisual(steps[currentStep].visual)}
        </motion.div>
      </motion.div>

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
            太棒了！你现在知道像素和数字识别的原理了！
          </p>
        </motion.div>
      )}
    </motion.div>
  )
}
