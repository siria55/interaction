'use client'

import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'

interface PixelGridProps {
  onPixelChange: (pixels: number[][]) => void
  initialPixels?: number[][]
}

export default function PixelGrid({ onPixelChange, initialPixels }: PixelGridProps) {
  const [pixels, setPixels] = useState<number[][]>(() => {
    if (initialPixels) return initialPixels
    // 默认创建9x9的白色网格
    return Array(9).fill(null).map(() => Array(9).fill(255))
  })

  useEffect(() => {
    onPixelChange(pixels)
  }, [pixels, onPixelChange])

  const handlePixelClick = (row: number, col: number) => {
    const newPixels = [...pixels]
    // 切换黑白：255变0，0变255
    newPixels[row][col] = newPixels[row][col] === 255 ? 0 : 255
    setPixels(newPixels)
  }

  const resetToInitial = () => {
    if (initialPixels) {
      setPixels(initialPixels.map(row => [...row]))
    }
  }

  const clearGrid = () => {
    const newPixels = Array(9).fill(null).map(() => Array(9).fill(255))
    setPixels(newPixels)
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className="bg-white rounded-2xl shadow-xl p-6 border-4 border-blue-200"
    >
      <div className="text-center mb-6">
        <h3 className="text-2xl font-bold text-blue-600 mb-2">
          🎨 9×9 像素数字编辑器
        </h3>
        <p className="text-gray-600">
          点击像素切换黑白，将数字3变成数字7！
        </p>
      </div>

      {/* 9x9像素网格 */}
      <div className="flex justify-center mb-6">
        <div className="grid grid-cols-9 gap-1 p-4 bg-gray-100 rounded-xl">
          {pixels.map((row, rowIndex) =>
            row.map((pixel, colIndex) => (
              <motion.div
                key={`${rowIndex}-${colIndex}`}
                className="w-8 h-8 border border-gray-300 cursor-pointer rounded-sm"
                style={{
                  backgroundColor: `rgb(${pixel}, ${pixel}, ${pixel})`
                }}
                onClick={() => handlePixelClick(rowIndex, colIndex)}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                animate={{
                  boxShadow: pixel === 0
                    ? '0 0 10px rgba(0, 0, 0, 0.3)'
                    : '0 0 0px rgba(0, 0, 0, 0)'
                }}
              />
            ))
          )}
        </div>
      </div>

      {/* 控制按钮 */}
      <div className="flex justify-center space-x-4">
        <motion.button
          onClick={resetToInitial}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="btn-secondary text-sm px-4 py-2"
        >
          🔄 重置为3
        </motion.button>
        
        <motion.button
          onClick={clearGrid}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="btn-primary text-sm px-4 py-2"
        >
          🗑️ 清空
        </motion.button>
      </div>

      {/* 提示文字 */}
      <div className="text-center mt-4">
        <p className="text-sm text-gray-500">
          💡 点击像素切换黑白！
        </p>
      </div>
    </motion.div>
  )
}
