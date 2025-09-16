'use client'

import { motion } from 'framer-motion'
import { useState } from 'react'
import ColorfulBackground from '@/components/ColorfulBackground'
import DrawingCanvas from '@/components/DrawingCanvas'
import RecognitionResult from '@/components/RecognitionResult'
import AccuracyAnalysis from '@/components/AccuracyAnalysis'
import ImageTheoryExplanation from '@/components/ImageTheoryExplanation'
import ImageRecognitionSteps from '@/components/ImageRecognitionSteps'
import { recognizeDigit, RecognitionResult as RecognitionResultType } from '@/services/digitRecognition'
import Link from 'next/link'

export default function Interaction1Page() {
  const [currentMode, setCurrentMode] = useState<'drawing' | 'result' | 'steps' | 'explanation'>('drawing')
  const [recognitionResult, setRecognitionResult] = useState<RecognitionResultType | null>(null)
  const [isRecognizing, setIsRecognizing] = useState(false)
  const [imageData, setImageData] = useState<ImageData | null>(null)

  const handleImageData = async (data: ImageData) => {
    setImageData(data)
    setIsRecognizing(true)
    
    try {
      const result = await recognizeDigit(data)
      setRecognitionResult(result)
      setCurrentMode('result')
      
      // 如果识别置信度高，自动进入分步讲解
      if (result.confidence > 0.8) {
        setTimeout(() => {
          setCurrentMode('steps')
        }, 2000)
      }
    } catch (error) {
      console.error('识别失败:', error)
    } finally {
      setIsRecognizing(false)
    }
  }

  const handleClear = () => {
    setRecognitionResult(null)
    setImageData(null)
    setCurrentMode('drawing')
  }

  const showExplanation = () => {
    setCurrentMode('explanation')
  }

  const showSteps = () => {
    setCurrentMode('steps')
  }

  const handleStepsComplete = () => {
    setCurrentMode('explanation')
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
          <h1 className="text-2xl font-bold text-purple-600 mb-1">
            ✏️ 交互1：手写数字识别
          </h1>
          <p className="text-sm text-gray-700">
            手写数字让AI识别，学习AI的工作原理！
          </p>
        </motion.div>

        {/* 手写和识别页面 */}
        {currentMode === 'drawing' && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="flex-1 flex items-center justify-center px-4"
          >
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 w-full max-w-6xl">
              {/* 左侧：手写画布 */}
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                <DrawingCanvas 
                  onImageData={handleImageData}
                  onClear={handleClear}
                />
              </motion.div>

              {/* 右侧：识别结果和准确度 */}
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="space-y-4"
              >
                {/* 识别结果 */}
                <RecognitionResult 
                  result={recognitionResult}
                  isRecognizing={isRecognizing}
                />
                
                {/* 准确度分析 */}
                <AccuracyAnalysis 
                  result={recognitionResult}
                  isRecognizing={isRecognizing}
                />
              </motion.div>
            </div>
          </motion.div>
        )}

        {/* 结果页面 */}
        {currentMode === 'result' && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="flex-1 flex items-center justify-center px-4"
          >
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 w-full max-w-6xl">
              {/* 左侧：手写画布 */}
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                <DrawingCanvas 
                  onImageData={handleImageData}
                  onClear={handleClear}
                />
              </motion.div>

              {/* 右侧：识别结果和准确度 */}
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="space-y-4"
              >
                {/* 识别结果 */}
                <RecognitionResult 
                  result={recognitionResult}
                  isRecognizing={isRecognizing}
                />
                
                {/* 准确度分析 */}
                <AccuracyAnalysis 
                  result={recognitionResult}
                  isRecognizing={isRecognizing}
                />
              </motion.div>
            </div>
            
            {recognitionResult && !isRecognizing && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
                className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-4"
              >
                <motion.button
                  onClick={showSteps}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="btn-primary text-sm px-6 py-2"
                >
                  🎓 分步学习识别原理
                </motion.button>
                
                <motion.button
                  onClick={showExplanation}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="btn-secondary text-sm px-6 py-2"
                >
                  📚 详细原理讲解
                </motion.button>
                
                <motion.button
                  onClick={handleClear}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="btn-secondary text-sm px-6 py-2"
                >
                  ✏️ 清除重写
                </motion.button>
              </motion.div>
            )}
          </motion.div>
        )}

        {/* 分步式讲解页面 */}
        {currentMode === 'steps' && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="flex-1 flex items-center justify-center px-4"
          >
            <ImageRecognitionSteps 
              onComplete={handleStepsComplete}
            />
          </motion.div>
        )}

        {/* 原理讲解页面 */}
        {currentMode === 'explanation' && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="flex-1 flex items-center justify-center px-4"
          >
            <ImageTheoryExplanation 
              showExplanation={true}
            />
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="absolute bottom-4 left-1/2 transform -translate-x-1/2"
            >
              <motion.button
                onClick={handleClear}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="btn-primary text-sm px-6 py-2"
              >
                ✏️ 再试一次
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
            {currentMode === 'drawing' && '在左侧写数字，右侧实时显示识别结果！ ✏️🤖'}
            {currentMode === 'result' && '在左侧写数字，右侧实时显示识别结果！ ✏️🤖'}
            {currentMode === 'steps' && '分步学习AI识别数字的原理！ 🎓📚'}
            {currentMode === 'explanation' && '现在你知道AI是怎么工作的了！ 🎓'}
          </p>
        </motion.div>
      </div>
    </main>
  )
}