'use client'

import { motion } from 'framer-motion'
import { useState } from 'react'
import InteractiveButton from '@/components/InteractiveButton'
import ColorfulBackground from '@/components/ColorfulBackground'

export default function Home() {
  const [clickCount, setClickCount] = useState(0)

  const handleButtonClick = () => {
    setClickCount(prev => prev + 1)
  }

  return (
    <main className="min-h-screen relative overflow-hidden">
      <ColorfulBackground />
      
      <div className="relative z-10 container mx-auto px-4 py-8">
        {/* 主标题 */}
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="text-center mb-12"
        >
          <h1 className="title-primary text-6xl mb-4 animate-float">
            🎉 欢迎来到互动乐园！ 🎉
          </h1>
          <p className="text-xl text-gray-700 max-w-2xl mx-auto">
            这里有很多有趣的动画和互动效果，点击按钮开始探索吧！
          </p>
        </motion.div>

        {/* 互动按钮区域 */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="text-center mb-12"
        >
          <InteractiveButton 
            onClick={handleButtonClick}
            clickCount={clickCount}
          />
          
          {clickCount > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="mt-6"
            >
              <p className="text-2xl font-bold text-purple-600">
                你已经点击了 {clickCount} 次！太棒了！ 🎊
              </p>
            </motion.div>
          )}
        </motion.div>


        {/* 底部提示 */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.5 }}
          className="text-center mt-16"
        >
          <p className="text-lg text-gray-600">
            继续点击按钮，发现更多惊喜！ ✨
          </p>
        </motion.div>
      </div>
    </main>
  )
}
