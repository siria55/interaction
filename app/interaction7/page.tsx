'use client'

import { motion } from 'framer-motion'
import { useState } from 'react'
import ColorfulBackground from '@/components/ColorfulBackground'
import FillInTheBlankGame from '@/components/FillInTheBlankGame'
import FillInTheBlankTheoryExplanation from '@/components/FillInTheBlankTheoryExplanation'
import Link from 'next/link'

export default function Interaction6Page() {
  const [currentMode, setCurrentMode] = useState<'quiz' | 'explanation'>('quiz')
  const [quizAccuracy, setQuizAccuracy] = useState(0)

  const handleQuizComplete = (accuracy: number) => {
    setQuizAccuracy(accuracy)
    
    // 如果准确率很高，自动进入原理讲解
    if (accuracy > 0.8) {
      setTimeout(() => {
        setCurrentMode('explanation')
      }, 2000) // 延迟2秒让用户看到测验结果
    }
  }

  return (
    <main className="h-screen relative overflow-hidden">
      <ColorfulBackground />
      
      <div className="relative z-10 h-full flex flex-col">
        {/* 页面标题 */}
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="text-center py-2"
        >
          <Link 
            href="/"
            className="inline-block mb-2 text-blue-600 hover:text-blue-800 transition-colors text-sm"
          >
            ← 返回主页
          </Link>
          <h1 className="text-2xl font-bold text-red-600 mb-1">
            ✏️ 交互7：填空题
          </h1>
          <p className="text-sm text-gray-700">
            学生选词填空，然后可以验证答案！
          </p>
        </motion.div>

        {/* 测验页面 */}
        {currentMode === 'quiz' && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="flex-1 flex items-center justify-center px-4"
          >
            <FillInTheBlankGame 
              onQuizComplete={handleQuizComplete}
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
                  onClick={() => setCurrentMode('explanation')}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="btn-primary text-lg px-8 py-3"
                >
                  🎓 学习填空题原理
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}

        {/* 原理讲解页面 */}
        {currentMode === 'explanation' && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="flex-1 flex items-center justify-center px-4"
          >
            <FillInTheBlankTheoryExplanation 
              showExplanation={true}
            />
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="mt-6 text-center"
            >
              <motion.button
                onClick={() => setCurrentMode('quiz')}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="btn-primary text-lg px-8 py-3"
              >
                ✏️ 再试一次
              </motion.button>
            </motion.div>
          </motion.div>
        )}

        {/* 测验结果提示 */}
        {quizAccuracy > 0 && currentMode === 'quiz' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1 }}
            className="mt-6 text-center"
          >
            <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-xl p-4 max-w-md mx-auto">
              <p className="text-lg font-semibold text-green-600">
                🎉 测验完成！准确率：{Math.round(quizAccuracy * 100)}%
              </p>
              {quizAccuracy > 0.8 && (
                <p className="text-sm text-gray-600 mt-2">
                  太棒了！正在为你准备原理讲解...
                </p>
              )}
            </div>
          </motion.div>
        )}

        {/* 底部提示 */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.5 }}
          className="text-center py-2"
        >
          <p className="text-sm text-gray-600">
            {currentMode === 'quiz' && '学生选词填空，然后可以验证答案！ ✏️📝'}
            {currentMode === 'explanation' && '学习填空题学习的原理！ 🎓📚'}
          </p>
        </motion.div>
      </div>
    </main>
  )
}