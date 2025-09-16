'use client'

import { motion } from 'framer-motion'
import { useState } from 'react'
import ColorfulBackground from '@/components/ColorfulBackground'
import PixelGrid from '@/components/PixelGrid'
import DigitComparison from '@/components/DigitComparison'
import PixelTheoryExplanation from '@/components/PixelTheoryExplanation'
import { recognizePixelDigit, calculateTargetSimilarity, getDigit3Template } from '@/services/pixelRecognition'
import Link from 'next/link'

export default function Interaction2Page() {
  const [currentMode, setCurrentMode] = useState<'pixel' | 'pixel-explanation'>('pixel')
  const [pixelGrid, setPixelGrid] = useState<number[][]>(getDigit3Template())
  const [currentDigit, setCurrentDigit] = useState(3)
  const [targetDigit] = useState(7)
  const [similarity, setSimilarity] = useState(0)

  const handlePixelChange = (pixels: number[][]) => {
    setPixelGrid(pixels)
    
    // 识别当前数字
    const result = recognizePixelDigit(pixels)
    setCurrentDigit(result.digit)
    
    // 计算与目标数字的相似度
    const sim = calculateTargetSimilarity(pixels, targetDigit)
    setSimilarity(sim)
    
    // 如果成功将3变成7，自动进入原理讲解
    if (result.digit === targetDigit && sim > 0.9) {
      setTimeout(() => {
        setCurrentMode('pixel-explanation')
      }, 2000) // 延迟2秒让用户看到成功结果
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
          <h1 className="text-2xl font-bold text-blue-600 mb-1">
            🎨 交互2：像素数字编辑
          </h1>
          <p className="text-sm text-gray-700">
            点击像素切换黑白，将数字3变成数字7！
          </p>
        </motion.div>

        {/* 像素编辑页面 */}
        {currentMode === 'pixel' && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-6xl mx-auto"
          >
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* 左侧：像素网格编辑器 */}
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                <PixelGrid 
                  onPixelChange={handlePixelChange}
                  initialPixels={getDigit3Template()}
                />
              </motion.div>

              {/* 右侧：数字对比分析 */}
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
              >
                <DigitComparison 
                  currentPixels={pixelGrid}
                  targetDigit={targetDigit}
                  currentDigit={currentDigit}
                  similarity={similarity}
                />
              </motion.div>
            </div>
            
            {/* 控制按钮 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              className="mt-8 text-center space-y-4"
            >
              <div className="flex justify-center space-x-4">
                <motion.button
                  onClick={() => setCurrentMode('pixel-explanation')}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="btn-primary text-lg px-8 py-3"
                >
                  🎓 学习像素原理
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}

        {/* 像素原理讲解页面 */}
        {currentMode === 'pixel-explanation' && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="flex-1 flex items-center justify-center px-4"
          >
            <PixelTheoryExplanation 
              showExplanation={true}
            />
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="mt-6 text-center"
            >
              <motion.button
                onClick={() => setCurrentMode('pixel')}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="btn-primary text-lg px-8 py-3"
              >
                🎨 再试一次
              </motion.button>
            </motion.div>
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
            {currentMode === 'pixel' && '点击像素切换黑白，将数字3变成数字7！ 🎨🎯'}
            {currentMode === 'pixel-explanation' && '学习像素和数字识别的原理！ 🎓'}
          </p>
        </motion.div>
      </div>
    </main>
  )
}
