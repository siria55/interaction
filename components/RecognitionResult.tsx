'use client'

import { motion } from 'framer-motion'
import { RecognitionResult } from '@/services/digitRecognition'

interface RecognitionResultProps {
  result: RecognitionResult | null
  isRecognizing: boolean
}

export default function RecognitionResult({ result, isRecognizing }: RecognitionResultProps) {
  if (isRecognizing) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-2xl shadow-xl p-6 border-4 border-blue-200"
      >
        <div className="text-center">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            className="text-6xl mb-4"
          >
            🤖
          </motion.div>
          <h3 className="text-2xl font-bold text-blue-600 mb-2">
            AI正在识别中...
          </h3>
          <p className="text-gray-600">
            让我仔细看看你写的数字！
          </p>
          
          {/* 加载动画 */}
          <div className="flex justify-center mt-4 space-x-2">
            {[...Array(3)].map((_, i) => (
              <motion.div
                key={i}
                className="w-3 h-3 bg-blue-500 rounded-full"
                animate={{
                  scale: [1, 1.5, 1],
                  opacity: [0.5, 1, 0.5]
                }}
                transition={{
                  duration: 1,
                  repeat: Infinity,
                  delay: i * 0.2
                }}
              />
            ))}
          </div>
        </div>
      </motion.div>
    )
  }

  if (!result) return null

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className="bg-white rounded-2xl shadow-xl p-6 border-4 border-green-200"
    >
      <div className="text-center">
        {/* 识别结果 */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ 
            type: "spring", 
            stiffness: 200, 
            damping: 10,
            delay: 0.2 
          }}
          className="text-8xl font-bold text-green-600 mb-4"
        >
          {result.digit}
        </motion.div>

        {/* 置信度 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mb-4"
        >
          <div className="flex items-center justify-center space-x-2 mb-2">
            <span className="text-lg font-semibold text-gray-700">AI的自信度：</span>
            <span className="text-xl font-bold text-green-600">
              {Math.round(result.confidence * 100)}%
            </span>
          </div>
          
          {/* 置信度条 */}
          <div className="w-full bg-gray-200 rounded-full h-4 overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${result.confidence * 100}%` }}
              transition={{ duration: 1, delay: 0.6 }}
              className="h-full bg-gradient-to-r from-green-400 to-green-600 rounded-full"
            />
          </div>
        </motion.div>

        {/* 解释 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-4 mb-4"
        >
          <p className="text-lg text-gray-700">
            {result.explanation}
          </p>
        </motion.div>

        {/* 表情反馈 */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="text-4xl"
        >
          {result.confidence > 0.8 ? '🎉' : result.confidence > 0.6 ? '😊' : '🤔'}
        </motion.div>

        {/* 鼓励文字 */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="text-sm text-gray-500 mt-2"
        >
          {result.confidence > 0.8 
            ? '太棒了！AI很确定这就是这个数字！' 
            : result.confidence > 0.6 
            ? '不错！AI觉得这很可能是这个数字！'
            : 'AI有点不确定，但这是它的最佳猜测！'
          }
        </motion.p>
      </div>
    </motion.div>
  )
}
