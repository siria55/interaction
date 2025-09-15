'use client'

import { motion } from 'framer-motion'
import { useRef, useEffect, useState } from 'react'

interface DrawingCanvasProps {
  onImageData: (imageData: ImageData) => void
  onClear: () => void
}

export default function DrawingCanvas({ onImageData, onClear }: DrawingCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [isDrawing, setIsDrawing] = useState(false)
  const [hasDrawing, setHasDrawing] = useState(false)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    // 设置画布样式
    ctx.fillStyle = '#ffffff'
    ctx.fillRect(0, 0, canvas.width, canvas.height)
    ctx.strokeStyle = '#000000'
    ctx.lineWidth = 8
    ctx.lineCap = 'round'
    ctx.lineJoin = 'round'
  }, [])

  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement>) => {
    setIsDrawing(true)
    setHasDrawing(true)
    const canvas = canvasRef.current
    if (!canvas) return

    const rect = canvas.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    ctx.beginPath()
    ctx.moveTo(x, y)
  }

  const draw = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return

    const canvas = canvasRef.current
    if (!canvas) return

    const rect = canvas.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    ctx.lineTo(x, y)
    ctx.stroke()
  }

  const stopDrawing = () => {
    if (!isDrawing) return
    setIsDrawing(false)

    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    // 获取图像数据
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height)
    onImageData(imageData)
  }

  const clearCanvas = () => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    ctx.fillStyle = '#ffffff'
    ctx.fillRect(0, 0, canvas.width, canvas.height)
    setHasDrawing(false)
    onClear()
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className="bg-white rounded-2xl shadow-xl p-6 border-4 border-purple-200"
    >
      <div className="text-center mb-4">
        <h3 className="text-2xl font-bold text-purple-600 mb-2">
          ✏️ 在这里写一个数字 (0-9)
        </h3>
        <p className="text-gray-600">
          用鼠标在下面的画布上写一个数字，AI会识别它！
        </p>
      </div>

      <div className="flex justify-center mb-4">
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="relative"
        >
          <canvas
            ref={canvasRef}
            width={280}
            height={280}
            className="border-4 border-gray-300 rounded-xl cursor-crosshair bg-white shadow-lg"
            onMouseDown={startDrawing}
            onMouseMove={draw}
            onMouseUp={stopDrawing}
            onMouseLeave={stopDrawing}
          />
          
          {/* 画布装饰 */}
          <motion.div
            className="absolute -top-2 -right-2 text-3xl"
            animate={{ rotate: [0, 10, -10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            ✨
          </motion.div>
        </motion.div>
      </div>

      <div className="flex justify-center space-x-4">
        <motion.button
          onClick={clearCanvas}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="btn-secondary text-lg px-6 py-2"
        >
          🗑️ 清除
        </motion.button>
        
        {hasDrawing && (
          <motion.button
            onClick={() => {
              const canvas = canvasRef.current
              if (!canvas) return
              const ctx = canvas.getContext('2d')
              if (!ctx) return
              const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height)
              onImageData(imageData)
            }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="btn-success text-lg px-6 py-2"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}
          >
            🤖 识别数字
          </motion.button>
        )}
      </div>

      {/* 提示文字 */}
      <motion.div
        className="text-center mt-4"
        animate={{ opacity: hasDrawing ? 0.7 : 1 }}
      >
        <p className="text-sm text-gray-500">
          💡 提示：写大一点，清晰一点，AI更容易识别哦！
        </p>
      </motion.div>
    </motion.div>
  )
}
