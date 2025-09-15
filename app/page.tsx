'use client'

import { motion } from 'framer-motion'
import { useState } from 'react'
import InteractiveButton from '@/components/InteractiveButton'
import ColorfulBackground from '@/components/ColorfulBackground'
import DrawingCanvas from '@/components/DrawingCanvas'
import RecognitionResult from '@/components/RecognitionResult'
import AccuracyAnalysis from '@/components/AccuracyAnalysis'
import ImageTheoryExplanation from '@/components/ImageTheoryExplanation'
import { recognizeDigit, RecognitionResult as RecognitionResultType } from '@/services/digitRecognition'

export default function Home() {
  const [clickCount, setClickCount] = useState(0)
  const [currentMode, setCurrentMode] = useState<'welcome' | 'drawing' | 'result' | 'explanation'>('welcome')
  const [recognitionResult, setRecognitionResult] = useState<RecognitionResultType | null>(null)
  const [isRecognizing, setIsRecognizing] = useState(false)
  const [imageData, setImageData] = useState<ImageData | null>(null)

  const handleButtonClick = () => {
    setClickCount(prev => prev + 1)
    if (currentMode === 'welcome') {
      setCurrentMode('drawing')
    }
  }

  const handleImageData = async (data: ImageData) => {
    setImageData(data)
    setIsRecognizing(true)
    // 保持在同一个页面，不切换模式
    
    try {
      const result = await recognizeDigit(data)
      setRecognitionResult(result)
    } catch (error) {
      console.error('识别失败:', error)
    } finally {
      setIsRecognizing(false)
    }
  }

  const handleClear = () => {
    setRecognitionResult(null)
    setImageData(null)
    // 保持在同一个页面
  }

  const showExplanation = () => {
    setCurrentMode('explanation')
  }

  return (
    <main className="min-h-screen relative overflow-hidden">
      <ColorfulBackground />
      
      <div className="relative z-10 container mx-auto px-4 py-8">
        {/* 欢迎页面 */}
        {currentMode === 'welcome' && (
          <>
            <motion.div
              initial={{ opacity: 0, y: -50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: "easeOut" }}
              className="text-center mb-12"
            >
              <h1 className="title-primary text-6xl mb-4 animate-float">
                🤖 AI数字识别演示 🤖
              </h1>
              <p className="text-xl text-gray-700 max-w-2xl mx-auto">
                在这里你可以手写数字，让AI来识别！我们还会告诉你AI是怎么"看懂"数字的！
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="text-center mb-12"
            >
              <InteractiveButton 
                onClick={handleButtonClick}
                clickCount={clickCount}
              />
              
              {clickCount > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  className="mt-6"
                >
                  <p className="text-2xl font-bold text-purple-600">
                    准备开始AI数字识别！ 🎊
                  </p>
                </motion.div>
              )}
            </motion.div>
          </>
        )}

        {/* 手写和识别页面 */}
        {(currentMode === 'drawing' || currentMode === 'result') && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-6xl mx-auto"
          >
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
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
                className="space-y-6"
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
                className="mt-8 text-center space-y-4"
              >
                <motion.button
                  onClick={showExplanation}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="btn-primary text-lg px-8 py-3"
                >
                  🎓 了解AI识别原理
                </motion.button>
                
                <motion.button
                  onClick={handleClear}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="btn-secondary text-lg px-8 py-3 ml-4"
                >
                  ✏️ 清除重写
                </motion.button>
              </motion.div>
            )}
          </motion.div>
        )}

        {/* 原理讲解页面 */}
        {currentMode === 'explanation' && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto"
          >
            <ImageTheoryExplanation 
              imageData={imageData}
              showExplanation={true}
            />
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="mt-6 text-center"
            >
              <motion.button
                onClick={handleClear}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="btn-primary text-lg px-8 py-3"
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
          className="text-center mt-16"
        >
          <p className="text-lg text-gray-600">
            {currentMode === 'welcome' && '点击按钮开始AI数字识别之旅！ ✨'}
            {(currentMode === 'drawing' || currentMode === 'result') && '在左侧写数字，右侧实时显示识别结果！ ✏️🤖'}
            {currentMode === 'explanation' && '现在你知道AI是怎么工作的了！ 🎓'}
          </p>
        </motion.div>
      </div>
    </main>
  )
}
