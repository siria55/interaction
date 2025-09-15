'use client'

import { motion } from 'framer-motion'
import { useState } from 'react'

interface InteractiveButtonProps {
  onClick: () => void
  clickCount: number
}

export default function InteractiveButton({ onClick, clickCount }: InteractiveButtonProps) {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <motion.button
      onClick={onClick}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      animate={{
        rotate: isHovered ? [0, -5, 5, -5, 0] : 0,
        scale: isHovered ? 1.1 : 1,
      }}
      transition={{
        rotate: { duration: 0.5, repeat: isHovered ? Infinity : 0 },
        scale: { duration: 0.2 }
      }}
      className="relative group"
    >
      {/* 按钮主体 */}
      <motion.div
        className="btn-primary text-2xl px-12 py-6 relative overflow-hidden"
        animate={{
          background: isHovered 
            ? "linear-gradient(45deg, #ff6b6b, #4ecdc4, #45b7d1, #96ceb4, #feca57)"
            : "linear-gradient(45deg, #ff6b6b, #4ecdc4)"
        }}
        transition={{ duration: 0.3 }}
      >
        <span className="relative z-10">
          🎯 点击我开始冒险！ 🎯
        </span>
        
        {/* 背景动画效果 */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-yellow-400 via-pink-500 to-purple-600 opacity-0"
          animate={{ opacity: isHovered ? 0.3 : 0 }}
          transition={{ duration: 0.3 }}
        />
      </motion.div>

      {/* 点击特效 */}
      {clickCount > 0 && (
        <motion.div
          initial={{ scale: 0, opacity: 1 }}
          animate={{ scale: 2, opacity: 0 }}
          transition={{ duration: 0.6 }}
          className="absolute inset-0 pointer-events-none"
        >
          <div className="w-full h-full bg-gradient-to-r from-yellow-400 to-pink-500 rounded-full blur-sm" />
        </motion.div>
      )}

      {/* 悬浮粒子效果 */}
      {isHovered && (
        <>
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              initial={{ 
                x: 0, 
                y: 0, 
                opacity: 1,
                scale: 0
              }}
              animate={{ 
                x: Math.random() * 200 - 100,
                y: Math.random() * 200 - 100,
                opacity: 0,
                scale: 1
              }}
              transition={{ 
                duration: 1,
                delay: i * 0.1,
                repeat: Infinity,
                repeatDelay: 2
              }}
              className="absolute w-2 h-2 bg-yellow-400 rounded-full"
            />
          ))}
        </>
      )}
    </motion.button>
  )
}
