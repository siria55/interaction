'use client'

import { motion } from 'framer-motion'

interface ModelDecorationsProps {
  modelId: string
}

export function ModelDecorations({ modelId }: ModelDecorationsProps) {
  switch (modelId) {
    case 'classical':
      return <ClassicalDecorations />
    case 'math':
      return <MathDecorations />
    case 'fairy':
      return <FairyDecorations />
    default:
      return null
  }
}

function ClassicalDecorations() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* 水墨风格装饰 */}
      <motion.div
        className="absolute top-10 left-10 w-32 h-32 opacity-10"
        initial={{ rotate: 0 }}
        animate={{ rotate: 360 }}
        transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
      >
        <div className="w-full h-full rounded-full border-4 border-amber-400 border-dashed"></div>
      </motion.div>

      <motion.div
        className="absolute top-1/3 right-16 w-24 h-24 opacity-20"
        initial={{ y: 0 }}
        animate={{ y: [-10, 10, -10] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      >
        <div className="w-full h-full bg-gradient-to-br from-amber-300 to-orange-300 rounded-full blur-sm"></div>
      </motion.div>

      {/* 古典文字装饰 */}
      <div className="absolute bottom-20 left-20 text-6xl text-amber-200 opacity-30 font-serif">
        詩
      </div>
      <div className="absolute top-40 right-32 text-4xl text-orange-200 opacity-20 font-serif">
        書
      </div>

      {/* 飘动的书签 */}
      {[...Array(3)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-2 h-16 bg-amber-400 opacity-30"
          style={{
            left: `${20 + i * 30}%`,
            top: `${60 + i * 10}%`,
          }}
          initial={{ rotate: 0 }}
          animate={{ rotate: [0, 5, -5, 0] }}
          transition={{
            duration: 3 + i,
            repeat: Infinity,
            ease: "easeInOut",
            delay: i * 0.5
          }}
        />
      ))}
    </div>
  )
}

function MathDecorations() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* 几何图形装饰 */}
      <motion.div
        className="absolute top-16 left-16 w-20 h-20 border-2 border-blue-300 opacity-30"
        initial={{ rotate: 0 }}
        animate={{ rotate: 360 }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
      />

      <motion.div
        className="absolute top-1/4 right-20 w-16 h-16 border-2 border-indigo-300 opacity-40"
        style={{ clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)' }}
        initial={{ scale: 1 }}
        animate={{ scale: [1, 1.1, 1] }}
        transition={{ duration: 2, repeat: Infinity }}
      />

      <motion.div
        className="absolute bottom-1/3 left-1/4 w-12 h-12 bg-blue-300 opacity-20 rounded-full"
        initial={{ x: 0 }}
        animate={{ x: [0, 20, -20, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* 数学符号装饰 */}
      <div className="absolute top-32 right-1/4 text-5xl text-blue-200 opacity-40 font-mono">
        π
      </div>
      <div className="absolute bottom-40 left-32 text-4xl text-indigo-200 opacity-30 font-mono">
        ∑
      </div>
      <div className="absolute top-1/2 left-1/3 text-3xl text-blue-300 opacity-25 font-mono">
        ∞
      </div>

      {/* 公式装饰 */}
      <motion.div
        className="absolute bottom-20 right-20 text-2xl text-blue-200 opacity-30 font-mono"
        initial={{ opacity: 0.3 }}
        animate={{ opacity: [0.3, 0.6, 0.3] }}
        transition={{ duration: 3, repeat: Infinity }}
      >
        E=mc²
      </motion.div>

      {/* 网格线 */}
      <div className="absolute inset-0 opacity-10">
        <div className="w-full h-full" style={{
          backgroundImage: `
            linear-gradient(rgba(59, 130, 246, 0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(59, 130, 246, 0.1) 1px, transparent 1px)
          `,
          backgroundSize: '40px 40px'
        }}></div>
      </div>
    </div>
  )
}

function FairyDecorations() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* 星星装饰 */}
      {[...Array(6)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute text-2xl text-pink-300 opacity-60"
          style={{
            left: `${Math.random() * 80 + 10}%`,
            top: `${Math.random() * 60 + 20}%`,
          }}
          initial={{ scale: 0, rotate: 0 }}
          animate={{
            scale: [0, 1, 0],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 4 + Math.random() * 2,
            repeat: Infinity,
            delay: Math.random() * 2,
          }}
        >
          ✨
        </motion.div>
      ))}

      {/* 城堡装饰 */}
      <div className="absolute bottom-10 left-10 text-6xl text-pink-200 opacity-30">
        🏰
      </div>
      <div className="absolute top-20 right-20 text-4xl text-purple-200 opacity-40">
        🌙
      </div>

      {/* 飘动的花瓣 */}
      {[...Array(4)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute text-3xl text-pink-300 opacity-50"
          style={{
            left: `${20 + i * 20}%`,
            top: `${10 + i * 15}%`,
          }}
          initial={{ y: 0, rotate: 0 }}
          animate={{
            y: [0, -20, 0],
            rotate: [0, 10, -10, 0],
          }}
          transition={{
            duration: 3 + i * 0.5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          🌸
        </motion.div>
      ))}

      {/* 魔法粒子 */}
      {[...Array(8)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 bg-pink-400 rounded-full opacity-60"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          initial={{ scale: 0 }}
          animate={{
            scale: [0, 1, 0],
            x: [0, Math.random() * 40 - 20],
            y: [0, Math.random() * 40 - 20],
          }}
          transition={{
            duration: 2 + Math.random(),
            repeat: Infinity,
            delay: Math.random() * 3,
          }}
        />
      ))}

      {/* 彩虹装饰 */}
      <motion.div
        className="absolute top-1/3 left-1/2 transform -translate-x-1/2 w-32 h-16 opacity-20"
        initial={{ scale: 0 }}
        animate={{ scale: [0, 1, 0] }}
        transition={{ duration: 6, repeat: Infinity }}
        style={{
          background: 'linear-gradient(90deg, #ff6b6b, #ffa726, #ffeb3b, #66bb6a, #42a5f5, #ab47bc)',
          borderRadius: '100px 100px 0 0',
        }}
      />
    </div>
  )
}