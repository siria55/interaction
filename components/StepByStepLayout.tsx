'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useState } from 'react'

interface Step {
  id: string
  title: string
  content: React.ReactNode
  isCompleted?: boolean
}

interface StepByStepLayoutProps {
  steps: Step[]
  onComplete?: () => void
  showProgress?: boolean
  showScore?: boolean
  score?: number
}

export default function StepByStepLayout({ 
  steps, 
  onComplete, 
  showProgress = true, 
  showScore = false,
  score = 0 
}: StepByStepLayoutProps) {
  const [currentStep, setCurrentStep] = useState(0)
  const [completedSteps, setCompletedSteps] = useState<Set<number>>(new Set())

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCompletedSteps(prev => new Set([...prev, currentStep]))
      setCurrentStep(currentStep + 1)
    } else {
      setCompletedSteps(prev => new Set([...prev, currentStep]))
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

        {showProgress && (
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
        )}

        {showScore && (
          <div className="flex items-center space-x-2 text-gray-600">
            <span className="text-lg">{score}</span>
            <span className="text-yellow-500">⚡</span>
          </div>
        )}
      </div>

      {/* 主内容区域 */}
      <div className="min-h-[400px]">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
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
        </AnimatePresence>
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
