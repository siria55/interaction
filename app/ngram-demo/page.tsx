'use client'

import { motion } from 'framer-motion'
import { useState } from 'react'
import ColorfulBackground from '@/components/ColorfulBackground'
import NGramDemo from '@/components/NGramDemo'
import NGramTheoryExplanation from '@/components/NGramTheoryExplanation'
import Link from 'next/link'

export default function Interaction8Page() {
  const [currentMode, setCurrentMode] = useState<'demo' | 'explanation'>('demo')
  const [demoComplete, setDemoComplete] = useState(false)

  const handleDemoComplete = (isComplete: boolean) => {
    setDemoComplete(isComplete)
    // 不再自动进入原理讲解，等待用户回答问题
  }

  const handleAnswerComplete = () => {
    // 用户回答问题后，进入原理讲解
    setTimeout(() => {
      setCurrentMode('explanation')
    }, 1000)
  }

  return (
    <main className="min-h-screen relative">
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
          <h1 className="text-2xl font-bold text-indigo-600 mb-1">
            📊 N-gram算法演示
          </h1>
          <p className="text-sm text-gray-700">
            学习N-gram算法如何统计词频和预测下一个词！
          </p>
        </motion.div>

        {/* 演示页面 */}
        {currentMode === 'demo' && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="flex-1 flex items-center justify-center px-4"
          >
            <NGramDemo 
              onDemoComplete={handleDemoComplete}
              onAnswerComplete={handleAnswerComplete}
            />
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
            <NGramTheoryExplanation 
              showExplanation={true}
            />
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="absolute bottom-4 left-1/2 transform -translate-x-1/2"
            >
              <motion.button
                onClick={() => setCurrentMode('demo')}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="btn-primary text-sm px-6 py-2"
              >
                📊 再试一次
              </motion.button>
            </motion.div>
          </motion.div>
        )}

        {/* 演示完成提示 */}
        {demoComplete && currentMode === 'demo' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1 }}
            className="absolute bottom-4 left-1/2 transform -translate-x-1/2"
          >
            <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-xl p-4 max-w-md mx-auto">
              <p className="text-lg font-semibold text-green-600">
                🎉 统计完成！请回答下面的问题
              </p>
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
            {currentMode === 'demo' && '学习N-gram算法如何统计词频和预测下一个词！ 📊🤖'}
            {currentMode === 'explanation' && '现在你知道N-gram算法的工作原理了！ 🎓📚'}
          </p>
        </motion.div>
      </div>
    </main>
  )
}
