'use client'

import { motion } from 'framer-motion'

export default function ColorfulBackground() {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none">
      {/* 主背景渐变 */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100" />
      
      {/* 浮动圆形装饰 */}
      {[...Array(8)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full opacity-20"
          style={{
            width: Math.random() * 200 + 100,
            height: Math.random() * 200 + 100,
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            background: `linear-gradient(45deg, ${
              ['#ff6b6b', '#4ecdc4', '#45b7d1', '#96ceb4', '#feca57', '#ff9ff3', '#54a0ff', '#5f27cd'][i]
            }, ${
              ['#4ecdc4', '#45b7d1', '#96ceb4', '#feca57', '#ff9ff3', '#54a0ff', '#5f27cd', '#ff6b6b'][i]
            })`
          }}
          animate={{
            x: [0, Math.random() * 100 - 50, 0],
            y: [0, Math.random() * 100 - 50, 0],
            rotate: [0, 360],
            scale: [1, 1.2, 1]
          }}
          transition={{
            duration: Math.random() * 10 + 10,
            repeat: Infinity,
            ease: "linear"
          }}
        />
      ))}

      {/* 星星装饰 */}
      {[...Array(20)].map((_, i) => (
        <motion.div
          key={`star-${i}`}
          className="absolute text-yellow-400 text-2xl"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            opacity: [0.3, 1, 0.3],
            scale: [0.8, 1.2, 0.8],
            rotate: [0, 180, 360]
          }}
          transition={{
            duration: Math.random() * 3 + 2,
            repeat: Infinity,
            delay: Math.random() * 2
          }}
        >
          ⭐
        </motion.div>
      ))}

      {/* 云朵装饰 */}
      {[...Array(5)].map((_, i) => (
        <motion.div
          key={`cloud-${i}`}
          className="absolute text-blue-200 text-4xl"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 30}%`,
          }}
          animate={{
            x: [0, 50, 0],
            opacity: [0.3, 0.7, 0.3]
          }}
          transition={{
            duration: Math.random() * 8 + 6,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          ☁️
        </motion.div>
      ))}

      {/* 彩虹装饰 */}
      <motion.div
        className="absolute top-10 right-10 text-6xl"
        animate={{
          rotate: [0, 5, -5, 0],
          scale: [1, 1.1, 1]
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      >
        🌈
      </motion.div>

      {/* 太阳装饰 */}
      <motion.div
        className="absolute top-10 left-10 text-5xl"
        animate={{
          rotate: 360
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "linear"
        }}
      >
        ☀️
      </motion.div>
    </div>
  )
}
