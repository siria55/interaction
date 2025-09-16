'use client'

import { motion } from 'framer-motion'
import { useState, useEffect, useRef, useCallback } from 'react'

interface PlaneDivisionCanvasProps {
  onClassificationChange: (accuracy: number, totalPoints: number, correctPoints: number) => void
}

interface Point {
  x: number
  y: number
  label: number // 1 or -1
  predicted: number // 1 or -1
}

export default function PlaneDivisionCanvas({ onClassificationChange }: PlaneDivisionCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [points, setPoints] = useState<Point[]>([])
  const [lineParams, setLineParams] = useState({
    angle: 45, // 角度 (0-180度)
    offset: 0 // 偏移量 (-100到100)
  })
  const [isDragging, setIsDragging] = useState<string | null>(null)
  const [accuracy, setAccuracy] = useState(0)

  // 生成按颜色聚集的数据点
  const generateRandomPoints = () => {
    const newPoints: Point[] = []
    
    // 生成绿色点（标签+1）- 聚集在左上角
    for (let i = 0; i < 10; i++) {
      const x = (Math.random() - 0.5) * 150 - 50 // -125 到 25
      const y = (Math.random() - 0.5) * 150 + 50 // -25 到 125
      newPoints.push({ x, y, label: 1, predicted: 0 })
    }
    
    // 生成红色点（标签-1）- 聚集在右下角
    for (let i = 0; i < 10; i++) {
      const x = (Math.random() - 0.5) * 150 + 50 // 25 到 125
      const y = (Math.random() - 0.5) * 150 - 50 // -125 到 25
      newPoints.push({ x, y, label: -1, predicted: 0 })
    }
    
    setPoints(newPoints)
  }

  // 计算直线方程
  const calculateLineEquation = useCallback(() => {
    const angleRad = (lineParams.angle * Math.PI) / 180
    const slope = Math.tan(angleRad)
    const intercept = lineParams.offset
    return { slope, intercept }
  }, [lineParams.angle, lineParams.offset])

  // 判断点在直线的哪一侧
  const classifyPoint = useCallback((x: number, y: number) => {
    const { slope, intercept } = calculateLineEquation()
    const lineY = slope * x + intercept
    return y > lineY ? 1 : -1
  }, [calculateLineEquation])

  // 更新点的预测标签
  const updatePredictions = useCallback(() => {
    const newPoints = points.map(point => ({
      ...point,
      predicted: classifyPoint(point.x, point.y)
    }))
    setPoints(newPoints)
    
    // 计算准确率
    const correct = newPoints.filter(p => p.label === p.predicted).length
    const total = newPoints.length
    const acc = total > 0 ? correct / total : 0
    setAccuracy(acc)
    onClassificationChange(acc, total, correct)
  }, [points, onClassificationChange])

  // 绘制画布
  const drawCanvas = useCallback(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    // 清空画布
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    // 设置画布中心
    const centerX = canvas.width / 2
    const centerY = canvas.height / 2

    // 绘制坐标轴
    ctx.strokeStyle = '#e5e7eb'
    ctx.lineWidth = 1
    ctx.beginPath()
    ctx.moveTo(0, centerY)
    ctx.lineTo(canvas.width, centerY)
    ctx.moveTo(centerX, 0)
    ctx.lineTo(centerX, canvas.height)
    ctx.stroke()

    // 绘制网格
    ctx.strokeStyle = '#f3f4f6'
    ctx.lineWidth = 0.5
    for (let i = 0; i <= 10; i++) {
      const x = (canvas.width / 10) * i
      const y = (canvas.height / 10) * i
      ctx.beginPath()
      ctx.moveTo(x, 0)
      ctx.lineTo(x, canvas.height)
      ctx.moveTo(0, y)
      ctx.lineTo(canvas.width, y)
      ctx.stroke()
    }

    // 绘制分割直线
    const { slope, intercept } = calculateLineEquation()
    ctx.strokeStyle = '#3b82f6'
    ctx.lineWidth = 3
    ctx.beginPath()
    
    // 计算直线在画布上的两个端点
    const x1 = -200
    const y1 = slope * x1 + intercept
    const x2 = 200
    const y2 = slope * x2 + intercept
    
    // 转换到画布坐标
    const canvasX1 = centerX + x1
    const canvasY1 = centerY - y1
    const canvasX2 = centerX + x2
    const canvasY2 = centerY - y2
    
    ctx.moveTo(canvasX1, canvasY1)
    ctx.lineTo(canvasX2, canvasY2)
    ctx.stroke()

    // 绘制数据点
    points.forEach((point, index) => {
      const canvasX = centerX + point.x
      const canvasY = centerY - point.y
      
      // 根据真实标签选择颜色
      ctx.fillStyle = point.label === 1 ? '#10b981' : '#ef4444'
      ctx.beginPath()
      ctx.arc(canvasX, canvasY, 8, 0, 2 * Math.PI)
      ctx.fill()
      
      // 根据预测结果绘制边框
      ctx.strokeStyle = point.label === point.predicted ? '#000000' : '#ff6b6b'
      ctx.lineWidth = 2
      ctx.stroke()
      
      // 绘制点编号
      ctx.fillStyle = '#ffffff'
      ctx.font = '12px Arial'
      ctx.textAlign = 'center'
      ctx.fillText((index + 1).toString(), canvasX, canvasY + 4)
    })
  }, [points, lineParams])

  // 处理参数拖拽
  const handleParameterChange = (param: string, value: number) => {
    setLineParams(prev => ({
      ...prev,
      [param]: value
    }))
  }

  // 处理鼠标拖拽
  const handleMouseDown = (param: string) => {
    setIsDragging(param)
  }

  const handleMouseUp = () => {
    setIsDragging(null)
  }

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return

    const rect = e.currentTarget.getBoundingClientRect()
    const x = e.clientX - rect.left
    const value = ((x / rect.width) * 200) - 100 // -100 到 100

    if (isDragging === 'angle') {
      handleParameterChange('angle', Math.max(0, Math.min(180, value + 90)))
    } else if (isDragging === 'offset') {
      handleParameterChange('offset', Math.max(-100, Math.min(100, value)))
    }
  }

  useEffect(() => {
    generateRandomPoints()
  }, [])

  useEffect(() => {
    updatePredictions()
  }, [lineParams, points.length, updatePredictions])

  useEffect(() => {
    drawCanvas()
  }, [drawCanvas])

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className="bg-white rounded-2xl shadow-xl p-6 border-4 border-purple-200"
    >
      <div className="text-center mb-6">
        <h3 className="text-2xl font-bold text-purple-600 mb-2">
          🎯 机器学习分类演示
        </h3>
        <p className="text-gray-600 mb-2">
          拖拽角度和偏移参数调整分割直线，尽可能把两种颜色的点分开！
        </p>
        <div className="bg-gradient-to-r from-yellow-50 to-orange-50 rounded-lg p-3 max-w-2xl mx-auto">
          <p className="text-sm font-semibold text-orange-700">
            🎯 目标：让绿色点和红色点分别位于直线的两侧，提高分类准确率！
          </p>
        </div>
      </div>

      {/* 参数控制面板 */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        {/* 角度控制 */}
        <div className="bg-gray-50 rounded-lg p-4">
          <h4 className="text-sm font-semibold text-gray-700 mb-2">角度</h4>
          <div className="relative">
            <input
              type="range"
              min="0"
              max="180"
              value={lineParams.angle}
              onChange={(e) => handleParameterChange('angle', Number(e.target.value))}
              onMouseDown={() => handleMouseDown('angle')}
              onMouseUp={handleMouseUp}
              onMouseMove={handleMouseMove}
              className="w-full h-2 bg-gradient-to-r from-blue-400 to-purple-500 rounded-lg appearance-none cursor-pointer"
            />
            <div className="text-center mt-2">
              <span className="text-lg font-bold text-purple-600">
                {Math.round(lineParams.angle)}°
              </span>
            </div>
          </div>
        </div>

        {/* 偏移控制 */}
        <div className="bg-gray-50 rounded-lg p-4">
          <h4 className="text-sm font-semibold text-gray-700 mb-2">偏移</h4>
          <div className="relative">
            <input
              type="range"
              min="-100"
              max="100"
              value={lineParams.offset}
              onChange={(e) => handleParameterChange('offset', Number(e.target.value))}
              onMouseDown={() => handleMouseDown('offset')}
              onMouseUp={handleMouseUp}
              onMouseMove={handleMouseMove}
              className="w-full h-2 bg-gradient-to-r from-red-400 to-green-500 rounded-lg appearance-none cursor-pointer"
            />
            <div className="text-center mt-2">
              <span className="text-lg font-bold text-purple-600">
                {Math.round(lineParams.offset)}
              </span>
            </div>
          </div>
        </div>

      </div>

      {/* 画布 */}
      <div className="flex justify-center mb-6">
        <motion.div
          className="border-4 border-gray-300 rounded-xl overflow-hidden"
          whileHover={{ scale: 1.02 }}
        >
          <canvas
            ref={canvasRef}
            width={400}
            height={400}
            className="bg-white"
          />
        </motion.div>
      </div>

      {/* 分类结果 */}
      <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-4 mb-4">
        <div className="text-center">
          <h4 className="text-lg font-semibold text-gray-700 mb-2">分类结果</h4>
          <div className="grid grid-cols-3 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">
                {Math.round(accuracy * 100)}%
              </div>
              <div className="text-sm text-gray-600">准确率</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">
                {points.filter(p => p.label === p.predicted).length}/{points.length}
              </div>
              <div className="text-sm text-gray-600">正确分类</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-orange-600">
                {points.filter(p => p.label === 1).length} vs {points.filter(p => p.label === -1).length}
              </div>
              <div className="text-sm text-gray-600">绿点 vs 红点</div>
            </div>
          </div>
          
          {/* 目标提示 */}
          <div className="mt-3 p-2 bg-yellow-100 rounded-lg">
            <p className="text-sm text-orange-700">
              {accuracy > 0.8 ? 
                '🎉 太棒了！你已经成功把大部分点分开了！' :
                accuracy > 0.6 ?
                '😊 不错！继续调整直线，让更多点正确分类！' :
                '💪 加油！尝试调整角度和偏移参数！'
              }
            </p>
          </div>
        </div>
      </div>

      {/* 控制按钮 */}
      <div className="flex justify-center space-x-4">
        <motion.button
          onClick={() => setLineParams({ angle: 45, offset: 0 })}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="btn-secondary text-sm px-6 py-2"
        >
          🔄 重置参数
        </motion.button>
      </div>

      {/* 图例 */}
      <div className="mt-4 text-center">
        <div className="bg-gray-50 rounded-lg p-3">
          <h5 className="text-sm font-semibold text-gray-700 mb-2">🎯 分类目标</h5>
          <div className="flex justify-center space-x-6 text-sm">
            <div className="flex items-center space-x-2">
              <div className="w-4 h-4 bg-green-500 rounded-full"></div>
              <span>绿色点 (标签+1)</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-4 h-4 bg-red-500 rounded-full"></div>
              <span>红色点 (标签-1)</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-4 h-4 border-2 border-black rounded-full"></div>
              <span>正确分类</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-4 h-4 border-2 border-red-400 rounded-full"></div>
              <span>错误分类</span>
            </div>
          </div>
          <p className="text-xs text-gray-600 mt-2">
            💡 目标：让绿色点和红色点分别位于直线的两侧！
          </p>
        </div>
      </div>
    </motion.div>
  )
}
