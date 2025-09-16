'use client'

import { motion } from 'framer-motion'

interface DigitComparisonProps {
  currentPixels: number[][]
  targetDigit: number
  currentDigit: number
  similarity: number
}

// 数字模板定义 (9x9像素)
const DIGIT_TEMPLATES = {
  3: [
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 255, 255, 255, 255, 255, 255, 255, 0],
    [0, 255, 255, 255, 255, 255, 255, 255, 0],
    [0, 0, 0, 0, 0, 0, 0, 255, 0],
    [0, 0, 0, 0, 0, 0, 0, 255, 0],
    [0, 255, 255, 255, 255, 255, 255, 255, 0],
    [0, 255, 255, 255, 255, 255, 255, 255, 0],
    [0, 0, 0, 0, 0, 0, 0, 255, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0]
  ],
  7: [
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 255, 255, 255, 255, 255, 255, 255, 0],
    [0, 255, 255, 255, 255, 255, 255, 255, 0],
    [0, 0, 0, 0, 0, 0, 0, 255, 0],
    [0, 0, 0, 0, 0, 0, 255, 255, 0],
    [0, 0, 0, 0, 0, 255, 255, 0, 0],
    [0, 0, 0, 0, 255, 255, 0, 0, 0],
    [0, 0, 0, 255, 255, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0]
  ]
}

export default function DigitComparison({ 
  currentPixels, 
  targetDigit, 
  currentDigit, 
  similarity 
}: DigitComparisonProps) {
  const targetTemplate = DIGIT_TEMPLATES[targetDigit as keyof typeof DIGIT_TEMPLATES] || DIGIT_TEMPLATES[7]

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-white rounded-2xl shadow-xl p-6 border-4 border-green-200"
    >
      <div className="text-center mb-6">
        <h3 className="text-2xl font-bold text-green-600 mb-2">
          🎯 数字对比分析
        </h3>
        <p className="text-gray-600">
          看看你的像素图与目标数字的相似度！
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* 当前像素图 */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="text-center"
        >
          <h4 className="text-lg font-semibold text-gray-700 mb-3">
            你的作品
          </h4>
          <div className="grid grid-cols-9 gap-1 mx-auto w-fit p-3 bg-gray-100 rounded-lg">
            {currentPixels.map((row, rowIndex) =>
              row.map((pixel, colIndex) => (
                <motion.div
                  key={`current-${rowIndex}-${colIndex}`}
                  className="w-6 h-6 border border-gray-300 rounded-sm"
                  style={{
                    backgroundColor: `rgb(${pixel}, ${pixel}, ${pixel})`
                  }}
                  animate={{
                    scale: [1, 1.05, 1],
                    boxShadow: [
                      '0 0 0px rgba(34, 197, 94, 0)',
                      '0 0 10px rgba(34, 197, 94, 0.3)',
                      '0 0 0px rgba(34, 197, 94, 0)'
                    ]
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    delay: (rowIndex * 9 + colIndex) * 0.02
                  }}
                />
              ))
            )}
          </div>
          <p className="text-sm text-gray-600 mt-2">
            识别为: <span className="font-bold text-blue-600">{currentDigit}</span>
          </p>
        </motion.div>

        {/* 目标数字模板 */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
          className="text-center"
        >
          <h4 className="text-lg font-semibold text-gray-700 mb-3">
            目标数字 {targetDigit}
          </h4>
          <div className="grid grid-cols-9 gap-1 mx-auto w-fit p-3 bg-gray-100 rounded-lg">
            {targetTemplate.map((row, rowIndex) =>
              row.map((pixel, colIndex) => (
                <motion.div
                  key={`target-${rowIndex}-${colIndex}`}
                  className="w-6 h-6 border border-gray-300 rounded-sm"
                  style={{
                    backgroundColor: `rgb(${pixel}, ${pixel}, ${pixel})`
                  }}
                  animate={{
                    scale: [1, 1.05, 1],
                    boxShadow: [
                      '0 0 0px rgba(239, 68, 68, 0)',
                      '0 0 10px rgba(239, 68, 68, 0.3)',
                      '0 0 0px rgba(239, 68, 68, 0)'
                    ]
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    delay: (rowIndex * 9 + colIndex) * 0.02 + 0.5
                  }}
                />
              ))
            )}
          </div>
          <p className="text-sm text-gray-600 mt-2">
            目标: <span className="font-bold text-red-600">{targetDigit}</span>
          </p>
        </motion.div>
      </div>

      {/* 相似度分析 */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="mt-6"
      >
        <div className="text-center mb-4">
          <h4 className="text-lg font-semibold text-gray-700 mb-2">
            相似度分析
          </h4>
          
          {/* 相似度条 */}
          <div className="w-full bg-gray-200 rounded-full h-6 overflow-hidden mb-2">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${similarity * 100}%` }}
              transition={{ duration: 1, delay: 0.8 }}
              className={`h-full rounded-full ${
                similarity > 0.8 
                  ? 'bg-gradient-to-r from-green-400 to-green-600'
                  : similarity > 0.6
                  ? 'bg-gradient-to-r from-yellow-400 to-yellow-600'
                  : 'bg-gradient-to-r from-red-400 to-red-600'
              }`}
            />
          </div>
          
          <div className="flex justify-between text-sm text-gray-600">
            <span>0%</span>
            <span className="font-bold text-lg">
              {Math.round(similarity * 100)}%
            </span>
            <span>100%</span>
          </div>
        </div>

        {/* 进度反馈 */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="text-center"
        >
          {similarity > 0.9 ? (
            <div className="text-green-600 font-bold text-lg">
              🎉 太棒了！你已经成功将3变成7了！
            </div>
          ) : similarity > 0.7 ? (
            <div className="text-yellow-600 font-bold text-lg">
              😊 很接近了！继续调整像素吧！
            </div>
          ) : similarity > 0.5 ? (
            <div className="text-orange-600 font-bold text-lg">
              🤔 有进步！还需要更多调整！
            </div>
          ) : (
            <div className="text-red-600 font-bold text-lg">
              💪 加油！继续努力调整像素！
            </div>
          )}
        </motion.div>
      </motion.div>
    </motion.div>
  )
}
