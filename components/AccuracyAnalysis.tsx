'use client'

import { motion } from 'framer-motion'
import { RecognitionResult } from '@/services/digitRecognition'

interface AccuracyAnalysisProps {
  result: RecognitionResult | null
  isRecognizing: boolean
}

export default function AccuracyAnalysis({ result, isRecognizing }: AccuracyAnalysisProps) {
  if (isRecognizing) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-2xl shadow-xl p-6 border-4 border-orange-200"
      >
        <div className="text-center">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            className="text-6xl mb-4"
          >
            📊
          </motion.div>
          <h3 className="text-2xl font-bold text-orange-600 mb-2">
            分析准确度中...
          </h3>
          <p className="text-gray-600">
            正在计算AI的识别准确度！
          </p>
          
          {/* 加载动画 */}
          <div className="flex justify-center mt-4 space-x-2">
            {[...Array(4)].map((_, i) => (
              <motion.div
                key={i}
                className="w-2 h-2 bg-orange-500 rounded-full"
                animate={{
                  scale: [1, 1.5, 1],
                  opacity: [0.5, 1, 0.5]
                }}
                transition={{
                  duration: 1,
                  repeat: Infinity,
                  delay: i * 0.15
                }}
              />
            ))}
          </div>
        </div>
      </motion.div>
    )
  }

  if (!result) return null

  // 计算准确度等级
  const getAccuracyLevel = (confidence: number) => {
    if (confidence >= 0.9) return { level: '优秀', color: 'green', emoji: '🏆' }
    if (confidence >= 0.8) return { level: '良好', color: 'blue', emoji: '👍' }
    if (confidence >= 0.7) return { level: '一般', color: 'yellow', emoji: '😊' }
    if (confidence >= 0.6) return { level: '较低', color: 'orange', emoji: '🤔' }
    return { level: '很低', color: 'red', emoji: '😅' }
  }

  const accuracyInfo = getAccuracyLevel(result.confidence)

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className="bg-white rounded-2xl shadow-xl p-6 border-4 border-orange-200"
    >
      <div className="text-center mb-6">
        <h3 className="text-3xl font-bold text-orange-600 mb-2">
          📊 准确度分析
        </h3>
        <p className="text-gray-600">
          AI识别这个数字的准确度如何？
        </p>
      </div>

      {/* 准确度等级 */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="text-center mb-6"
      >
        <motion.div
          className="text-6xl mb-3"
          animate={{ 
            scale: [1, 1.1, 1],
            rotate: [0, 5, -5, 0]
          }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          {accuracyInfo.emoji}
        </motion.div>
        
        <h4 className={`text-2xl font-bold mb-2 text-${accuracyInfo.color}-600`}>
          {accuracyInfo.level}
        </h4>
        
        <div className="text-4xl font-bold text-gray-800 mb-2">
          {Math.round(result.confidence * 100)}%
        </div>
        
        <p className="text-sm text-gray-500">
          AI对这个识别结果的信心程度
        </p>
      </motion.div>

      {/* 准确度条 */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="mb-6"
      >
        <div className="w-full bg-gray-200 rounded-full h-6 overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${result.confidence * 100}%` }}
            transition={{ duration: 1.5, delay: 0.6 }}
            className={`h-full bg-gradient-to-r from-${accuracyInfo.color}-400 to-${accuracyInfo.color}-600 rounded-full relative`}
          >
            <motion.div
              className="absolute right-2 top-1/2 transform -translate-y-1/2 text-white text-xs font-bold"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.2 }}
            >
              {Math.round(result.confidence * 100)}%
            </motion.div>
          </motion.div>
        </div>
      </motion.div>

      {/* 详细分析 */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="space-y-4"
      >
        <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-4">
          <h5 className="font-semibold text-gray-700 mb-2">🎯 识别分析：</h5>
          <p className="text-sm text-gray-600">
            {result.explanation}
          </p>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div className="bg-green-50 rounded-lg p-3 text-center">
            <div className="text-2xl mb-1">✅</div>
            <div className="text-sm font-semibold text-green-700">识别成功</div>
            <div className="text-xs text-green-600">AI找到了数字</div>
          </div>
          
          <div className="bg-blue-50 rounded-lg p-3 text-center">
            <div className="text-2xl mb-1">📈</div>
            <div className="text-sm font-semibold text-blue-700">置信度</div>
            <div className="text-xs text-blue-600">{Math.round(result.confidence * 100)}%</div>
          </div>
        </div>

        {/* 准确度说明 */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="bg-yellow-50 rounded-lg p-3"
        >
          <div className="text-sm text-gray-700">
            <span className="font-semibold">💡 准确度说明：</span>
            {result.confidence > 0.8 
              ? ' AI非常确定这个识别结果！'
              : result.confidence > 0.6 
              ? ' AI比较确定，但可能有一些不确定性。'
              : ' AI有点不确定，这是它的最佳猜测。'
            }
          </div>
        </motion.div>
      </motion.div>

      {/* 鼓励文字 */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="text-center mt-4"
      >
        <p className="text-sm text-gray-500">
          {result.confidence > 0.8 
            ? '🎉 太棒了！AI识别得很准确！' 
            : result.confidence > 0.6 
            ? '😊 不错！AI识别得还可以！'
            : '🤔 AI需要更多练习，但它在努力！'
          }
        </p>
      </motion.div>
    </motion.div>
  )
}
