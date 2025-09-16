'use client'

import { motion } from 'framer-motion'
import { useState } from 'react'
import ColorfulBackground from '@/components/ColorfulBackground'
import PlaneDivisionCanvas from '@/components/PlaneDivisionCanvas'
import MLClassificationExplanation from '@/components/MLClassificationExplanation'
import Link from 'next/link'

export default function Interaction3Page() {
  const [currentMode, setCurrentMode] = useState<'classification' | 'classification-explanation'>('classification')
  const [classificationAccuracy, setClassificationAccuracy] = useState(0)
  const [totalPoints, setTotalPoints] = useState(0)
  const [correctPoints, setCorrectPoints] = useState(0)

  const handleClassificationChange = (accuracy: number, total: number, correct: number) => {
    setClassificationAccuracy(accuracy)
    setTotalPoints(total)
    setCorrectPoints(correct)
    
    // 如果准确率很高，自动进入原理讲解
    if (accuracy > 0.9) {
      setTimeout(() => {
        setCurrentMode('classification-explanation')
      }, 2000) // 延迟2秒让用户看到高准确率
    }
  }

  return (
    <main className="min-h-screen relative overflow-hidden">
      <ColorfulBackground />
      
      <div className="relative z-10 container mx-auto px-4 py-8">
        {/* 页面标题 */}
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="text-center mb-8"
        >
          <Link 
            href="/"
            className="inline-block mb-4 text-blue-600 hover:text-blue-800 transition-colors"
          >
            ← 返回主页
          </Link>
          <h1 className="text-4xl font-bold text-orange-600 mb-2">
            🎯 交互3：机器学习分类
          </h1>
          <p className="text-lg text-gray-700">
            拖拽角度和偏移参数调整分割直线，尽可能把两种颜色的点分开！
          </p>
        </motion.div>

        {/* 分类页面 */}
        {currentMode === 'classification' && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-6xl mx-auto"
          >
            <PlaneDivisionCanvas 
              onClassificationChange={handleClassificationChange}
            />
            
            {/* 控制按钮 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              className="mt-8 text-center space-y-4"
            >
              <div className="flex justify-center space-x-4">
                <motion.button
                  onClick={() => setCurrentMode('classification-explanation')}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="btn-primary text-lg px-8 py-3"
                >
                  🎓 学习分类原理
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}

        {/* 分类原理讲解页面 */}
        {currentMode === 'classification-explanation' && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto"
          >
            <MLClassificationExplanation 
              showExplanation={true}
            />
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="mt-6 text-center"
            >
              <motion.button
                onClick={() => setCurrentMode('classification')}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="btn-primary text-lg px-8 py-3"
              >
                🎯 再试一次
              </motion.button>
            </motion.div>
          </motion.div>
        )}

        {/* 底部提示 */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.5 }}
          className="text-center mt-16"
        >
          <p className="text-lg text-gray-600">
            {currentMode === 'classification' && '拖拽角度和偏移参数调整分割直线，尽可能把两种颜色的点分开！ 🎯📊'}
            {currentMode === 'classification-explanation' && '学习机器学习分类的原理！ 🎓🤖'}
          </p>
        </motion.div>
      </div>
    </main>
  )
}
