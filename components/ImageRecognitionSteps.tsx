'use client'

import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'

interface ImageRecognitionStepsProps {
  onComplete?: () => void
}

export default function ImageRecognitionSteps({ onComplete }: ImageRecognitionStepsProps) {
  const [currentStep, setCurrentStep] = useState(0)
  const [showAnimation, setShowAnimation] = useState(false)

  useEffect(() => {
    setShowAnimation(true)
  }, [currentStep])

  const steps = [
    {
      id: 'pixels',
      title: '像素组成',
      content: (
        <div className="space-y-4">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            图像由像素组成
          </h2>
          <div className="bg-gray-800 text-white p-4 rounded-lg">
            <div className="grid grid-cols-8 gap-1">
              {Array.from({ length: 64 }, (_, i) => (
                <div
                  key={i}
                  className={`w-4 h-4 ${
                    Math.random() > 0.5 ? 'bg-white' : 'bg-gray-600'
                  }`}
                />
              ))}
            </div>
          </div>
          <p className="text-gray-600">
            每个像素都有颜色值，黑色像素值为0，白色像素值为255
          </p>
        </div>
      )
    },
    {
      id: 'features',
      title: '特征提取',
      content: (
        <div className="space-y-4">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            AI提取图像特征
          </h2>
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-blue-50 p-4 rounded-lg">
              <h3 className="font-semibold text-blue-800 mb-2">中心质量</h3>
              <p className="text-sm text-blue-600">计算图像的重心位置</p>
            </div>
            <div className="bg-green-50 p-4 rounded-lg">
              <h3 className="font-semibold text-green-800 mb-2">长宽比</h3>
              <p className="text-sm text-green-600">分析图像的形状特征</p>
            </div>
            <div className="bg-purple-50 p-4 rounded-lg">
              <h3 className="font-semibold text-purple-800 mb-2">密度</h3>
              <p className="text-sm text-purple-600">计算黑色像素的比例</p>
            </div>
            <div className="bg-orange-50 p-4 rounded-lg">
              <h3 className="font-semibold text-orange-800 mb-2">对称性</h3>
              <p className="text-sm text-orange-600">分析图像的对称程度</p>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 'classification',
      title: '数字分类',
      content: (
        <div className="space-y-4">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            根据特征分类数字
          </h2>
          <div className="grid grid-cols-5 gap-4">
            {[0, 1, 2, 3, 4].map(num => (
              <div key={num} className="text-center">
                <div className="bg-gray-100 p-4 rounded-lg mb-2">
                  <div className="text-2xl font-bold">{num}</div>
                </div>
                <p className="text-sm text-gray-600">
                  {num === 0 && '圆形，中心密度高'}
                  {num === 1 && '细长，垂直特征'}
                  {num === 2 && '弯曲，有开口'}
                  {num === 3 && '两个弯曲'}
                  {num === 4 && '有交叉线'}
                </p>
              </div>
            ))}
          </div>
        </div>
      )
    },
    {
      id: 'result',
      title: '识别结果',
      content: (
        <div className="space-y-4">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            输出识别结果
          </h2>
          <div className="bg-gradient-to-r from-green-50 to-blue-50 p-6 rounded-lg">
            <div className="text-center">
              <div className="text-4xl font-bold text-green-600 mb-2">识别结果：3</div>
              <div className="text-lg text-gray-600 mb-4">置信度：85%</div>
              <div className="text-sm text-gray-500">
                AI通过分析图像特征，判断这是数字"3"
              </div>
            </div>
          </div>
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
