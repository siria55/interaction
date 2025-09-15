'use client'

import { motion } from 'framer-motion'
import { useState } from 'react'

interface ImageTheoryExplanationProps {
  imageData: ImageData | null
  showExplanation: boolean
}

export default function ImageTheoryExplanation({ imageData, showExplanation }: ImageTheoryExplanationProps) {
  const [currentStep, setCurrentStep] = useState(0)

  if (!showExplanation || !imageData) return null

  const steps = [
    {
      title: "🖼️ 什么是图片？",
      content: "图片是由很多很多小点组成的，就像马赛克一样！每个小点叫做'像素'。",
      emoji: "🖼️"
    },
    {
      title: "🔍 像素的秘密",
      content: "每个像素都有颜色信息：红色、绿色、蓝色，还有透明度。就像调色板一样！",
      emoji: "🎨"
    },
    {
      title: "🧠 AI怎么看图片？",
      content: "AI把图片变成数字，然后分析这些数字的模式，就像解谜一样！",
      emoji: "🧠"
    },
    {
      title: "📊 特征提取",
      content: "AI会找图片的特点：形状、大小、位置、对称性等等，就像侦探找线索！",
      emoji: "🔍"
    },
    {
      title: "🎯 最终判断",
      content: "根据找到的特征，AI做出最可能的判断，就像考试时选择最可能的答案！",
      emoji: "🎯"
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
          🎓 AI识别数字的原理
        </h3>
        <p className="text-gray-600">
          让我们来看看AI是怎么"看懂"你写的数字的！
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

      {/* 像素可视化 */}
      {currentStep === 1 && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3 }}
          className="bg-gray-100 rounded-xl p-4 mb-6"
        >
          <h5 className="text-lg font-semibold text-gray-700 mb-3">像素示例：</h5>
          <div className="grid grid-cols-8 gap-1 max-w-xs mx-auto">
            {[...Array(64)].map((_, i) => (
              <motion.div
                key={i}
                className="w-6 h-6 border border-gray-300"
                style={{
                  backgroundColor: `rgb(${Math.random() * 255}, ${Math.random() * 255}, ${Math.random() * 255})`
                }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: i * 0.01 }}
              />
            ))}
          </div>
          <p className="text-sm text-gray-500 mt-2">
            每个小方块就是一个像素，有自己的颜色！
          </p>
        </motion.div>
      )}

      {/* 特征分析可视化 */}
      {currentStep === 3 && imageData && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3 }}
          className="bg-gray-100 rounded-xl p-4 mb-6"
        >
          <h5 className="text-lg font-semibold text-gray-700 mb-3">你的图片特征：</h5>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div className="bg-white rounded-lg p-3">
              <div className="font-semibold text-blue-600">📏 尺寸</div>
              <div>{imageData.width} × {imageData.height} 像素</div>
            </div>
            <div className="bg-white rounded-lg p-3">
              <div className="font-semibold text-green-600">🎨 颜色</div>
              <div>RGB + 透明度</div>
            </div>
            <div className="bg-white rounded-lg p-3">
              <div className="font-semibold text-purple-600">📊 数据量</div>
              <div>{imageData.data.length} 个数值</div>
            </div>
            <div className="bg-white rounded-lg p-3">
              <div className="font-semibold text-orange-600">🔍 分析中</div>
              <div>AI正在处理...</div>
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
            太棒了！你现在知道AI是怎么工作的了！
          </p>
        </motion.div>
      )}
    </motion.div>
  )
}
