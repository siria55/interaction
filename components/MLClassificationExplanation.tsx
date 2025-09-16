'use client'

import { motion } from 'framer-motion'
import { useState } from 'react'

interface MLClassificationExplanationProps {
  showExplanation: boolean
}

export default function MLClassificationExplanation({ showExplanation }: MLClassificationExplanationProps) {
  const [currentStep, setCurrentStep] = useState(0)

  if (!showExplanation) return null

  const steps = [
    {
      title: "🎯 什么是分类？",
      content: "分类就是把不同的东西分成不同的组，就像把苹果和橙子分开一样！",
      emoji: "🎯",
      visual: "classification"
    },
    {
      title: "📊 数据点",
      content: "每个点都有位置信息(x,y)和标签(绿色或红色)，就像给每个东西贴上标签！",
      emoji: "📊",
      visual: "datapoints"
    },
    {
      title: "📏 分割直线",
      content: "我们用一条直线来分割平面，直线的一边是一类，另一边是另一类！",
      emoji: "📏",
      visual: "line"
    },
    {
      title: "🔧 调整参数",
      content: "通过改变直线的角度、位置和偏移，我们可以找到最好的分割方式！",
      emoji: "🔧",
      visual: "parameters"
    },
    {
      title: "✅ 计算准确率",
      content: "准确率 = 正确分类的点数 ÷ 总点数，越高说明分类越好！",
      emoji: "✅",
      visual: "accuracy"
    },
    {
      title: "🤖 机器学习",
      content: "AI会自动调整参数，找到准确率最高的分割直线！",
      emoji: "🤖",
      visual: "ml"
    }
  ]

  const renderVisual = (type: string) => {
    switch (type) {
      case "classification":
        return (
          <div className="flex justify-center space-x-8">
            <motion.div
              className="text-center"
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <div className="text-4xl mb-2">🍎</div>
              <div className="text-sm font-semibold text-red-600">苹果类</div>
            </motion.div>
            <motion.div
              className="text-center"
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 2, repeat: Infinity, delay: 1 }}
            >
              <div className="text-4xl mb-2">🍊</div>
              <div className="text-sm font-semibold text-orange-600">橙子类</div>
            </motion.div>
          </div>
        )
      
      case "datapoints":
        return (
          <div className="grid grid-cols-4 gap-2 w-fit mx-auto">
            {[...Array(8)].map((_, i) => (
              <motion.div
                key={i}
                className={`w-6 h-6 rounded-full ${
                  i % 2 === 0 ? 'bg-green-500' : 'bg-red-500'
                }`}
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
      
      case "line":
        return (
          <div className="relative w-32 h-32 mx-auto">
            <div className="absolute inset-0 border border-gray-300 rounded-lg bg-gray-50">
              <motion.div
                className="absolute w-full h-0.5 bg-blue-500"
                style={{
                  top: '50%',
                  transformOrigin: 'center',
                  transform: 'rotate(45deg)'
                }}
                animate={{
                  scaleX: [0, 1, 0],
                  opacity: [0, 1, 0]
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity
                }}
              />
            </div>
          </div>
        )
      
      case "parameters":
        return (
          <div className="space-y-2">
            <motion.div
              className="flex items-center space-x-2"
              animate={{ x: [0, 20, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <div className="w-4 h-4 bg-blue-500 rounded"></div>
              <span className="text-sm">角度</span>
            </motion.div>
            <motion.div
              className="flex items-center space-x-2"
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
            >
              <div className="w-4 h-4 bg-green-500 rounded"></div>
              <span className="text-sm">偏移</span>
            </motion.div>
            <motion.div
              className="flex items-center space-x-2"
              animate={{ x: [0, -20, 0] }}
              transition={{ duration: 2, repeat: Infinity, delay: 1 }}
            >
              <div className="w-4 h-4 bg-purple-500 rounded"></div>
              <span className="text-sm">位置</span>
            </motion.div>
          </div>
        )
      
      case "accuracy":
        return (
          <div className="text-center">
            <motion.div
              className="text-4xl font-bold text-green-600 mb-2"
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 1, repeat: Infinity }}
            >
              85%
            </motion.div>
            <div className="text-sm text-gray-600">
              17个正确 / 20个总数
            </div>
            <div className="w-32 h-2 bg-gray-200 rounded-full mx-auto mt-2">
              <motion.div
                className="h-full bg-gradient-to-r from-red-500 to-green-500 rounded-full"
                initial={{ width: 0 }}
                animate={{ width: '85%' }}
                transition={{ duration: 2 }}
              />
            </div>
          </div>
        )
      
      case "ml":
        return (
          <div className="flex justify-center items-center space-x-4">
            <motion.div
              className="text-2xl"
              animate={{ rotate: 360 }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              🔄
            </motion.div>
            <motion.div
              className="text-4xl"
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              🤖
            </motion.div>
            <motion.div
              className="text-2xl"
              animate={{ opacity: [0, 1, 0] }}
              transition={{ duration: 1, repeat: Infinity }}
            >
              ✅
            </motion.div>
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
      className="bg-white rounded-2xl shadow-xl p-6 border-4 border-orange-200"
    >
      <div className="text-center mb-6">
        <h3 className="text-3xl font-bold text-orange-600 mb-2">
          🎓 机器学习分类原理
        </h3>
        <p className="text-gray-600">
          让我们来学习机器学习是如何进行分类的！
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
              : 'bg-orange-500 text-white hover:bg-orange-600'
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
          <p className="text-lg font-semibold text-orange-600">
            太棒了！你现在知道机器学习分类的原理了！
          </p>
        </motion.div>
      )}
    </motion.div>
  )
}
