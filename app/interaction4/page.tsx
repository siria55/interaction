'use client'

import { motion } from 'framer-motion'
import { useState } from 'react'
import ColorfulBackground from '@/components/ColorfulBackground'
import TextChainGame from '@/components/TextChainGame'
import LLMTheoryExplanation from '@/components/LLMTheoryExplanation'
import Link from 'next/link'

export default function Interaction4Page() {
  const [currentMode, setCurrentMode] = useState<'game' | 'explanation'>('game')
  const [gameAccuracy, setGameAccuracy] = useState(0)

  const handleGameComplete = (accuracy: number) => {
    setGameAccuracy(accuracy)
    
    // 如果准确率很高，自动进入原理讲解
    if (accuracy > 0.8) {
      setTimeout(() => {
        setCurrentMode('explanation')
      }, 2000) // 延迟2秒让用户看到游戏结果
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
          <h1 className="text-4xl font-bold text-green-600 mb-2">
            🤖 交互4：大语言模型文字接龙
          </h1>
          <p className="text-lg text-gray-700">
            输入一个字，AI会接下一个字，体验自回归模型！
          </p>
        </motion.div>

        {/* 游戏页面 */}
        {currentMode === 'game' && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto"
          >
            <TextChainGame 
              onGameComplete={handleGameComplete}
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
                  🎓 学习大语言模型原理
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
            className="max-w-4xl mx-auto"
          >
            <LLMTheoryExplanation 
              showExplanation={true}
            />
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="mt-6 text-center"
            >
              <motion.button
                onClick={() => setCurrentMode('game')}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="btn-primary text-lg px-8 py-3"
              >
                🤖 再玩一次
              </motion.button>
            </motion.div>
          </motion.div>
        )}

        {/* 游戏结果提示 */}
        {gameAccuracy > 0 && currentMode === 'game' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1 }}
            className="mt-6 text-center"
          >
            <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-xl p-4 max-w-md mx-auto">
              <p className="text-lg font-semibold text-green-600">
                🎉 游戏完成！准确率：{Math.round(gameAccuracy * 100)}%
              </p>
              {gameAccuracy > 0.8 && (
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
          className="text-center mt-16"
        >
          <p className="text-lg text-gray-600">
            {currentMode === 'game' && '输入一个字，AI会接下一个字，体验自回归模型！ 🤖📝'}
            {currentMode === 'explanation' && '学习大语言模型的工作原理！ 🎓🤖'}
          </p>
        </motion.div>
      </div>
    </main>
  )
}
