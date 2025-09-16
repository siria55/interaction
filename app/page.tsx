'use client'

import { motion } from 'framer-motion'
import { useState } from 'react'
import InteractiveButton from '@/components/InteractiveButton'
import ColorfulBackground from '@/components/ColorfulBackground'
import DrawingCanvas from '@/components/DrawingCanvas'
import RecognitionResult from '@/components/RecognitionResult'
import AccuracyAnalysis from '@/components/AccuracyAnalysis'
import ImageTheoryExplanation from '@/components/ImageTheoryExplanation'
import PixelGrid from '@/components/PixelGrid'
import DigitComparison from '@/components/DigitComparison'
import PixelTheoryExplanation from '@/components/PixelTheoryExplanation'
import { recognizeDigit, RecognitionResult as RecognitionResultType } from '@/services/digitRecognition'
import { recognizePixelDigit, calculateTargetSimilarity, getDigit3Template } from '@/services/pixelRecognition'

export default function Home() {
  const [clickCount, setClickCount] = useState(0)
  const [currentMode, setCurrentMode] = useState<'welcome' | 'drawing' | 'result' | 'explanation' | 'pixel' | 'pixel-explanation'>('welcome')
  const [recognitionResult, setRecognitionResult] = useState<RecognitionResultType | null>(null)
  const [isRecognizing, setIsRecognizing] = useState(false)
  const [imageData, setImageData] = useState<ImageData | null>(null)
  
  // 像素网格相关状态
  const [pixelGrid, setPixelGrid] = useState<number[][]>(getDigit3Template())
  const [currentDigit, setCurrentDigit] = useState(3)
  const [targetDigit] = useState(7)
  const [similarity, setSimilarity] = useState(0)

  const handleButtonClick = () => {
    setClickCount(prev => prev + 1)
    if (currentMode === 'welcome') {
      setCurrentMode('drawing')
    }
  }

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

  const handleImageData = async (data: ImageData) => {
    setImageData(data)
    setIsRecognizing(true)
    // 保持在同一个页面，不切换模式
    
    try {
      const result = await recognizeDigit(data)
      setRecognitionResult(result)
      
      // 如果识别成功且置信度高，自动进入原理讲解
      if (result.confidence > 0.8) {
        setTimeout(() => {
          setCurrentMode('explanation')
        }, 3000) // 延迟3秒让用户看到识别结果
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
                🎮 互动学习乐园 🎮
              </h1>
              <p className="text-xl text-gray-700 max-w-3xl mx-auto">
                这里有多种有趣的AI学习方式！选择你喜欢的交互方式开始探索吧！
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="text-center mb-12"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                {/* 交互1：手写数字识别 */}
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-white rounded-2xl shadow-xl p-6 border-4 border-purple-200 cursor-pointer"
                  onClick={handleButtonClick}
                >
                  <div className="text-6xl mb-4">✏️</div>
                  <h3 className="text-2xl font-bold text-purple-600 mb-3">
                    交互1：手写数字识别
                  </h3>
                  <p className="text-gray-600 mb-4">
                    手写数字让AI识别，学习AI的工作原理！
                  </p>
                  <div className="text-sm text-gray-500">
                    点击开始体验 →
                  </div>
                </motion.div>

                {/* 交互2：像素数字编辑 */}
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-white rounded-2xl shadow-xl p-6 border-4 border-blue-200 cursor-pointer"
                  onClick={() => setCurrentMode('pixel')}
                >
                  <div className="text-6xl mb-4">🎨</div>
                  <h3 className="text-2xl font-bold text-blue-600 mb-3">
                    交互2：像素数字编辑
                  </h3>
                  <p className="text-gray-600 mb-4">
                    点击像素切换黑白，将数字3变成数字7！
                  </p>
                  <div className="text-sm text-gray-500">
                    点击开始体验 →
                  </div>
                </motion.div>
              </div>
              
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
                
                <motion.button
                  onClick={() => setCurrentMode('welcome')}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="btn-secondary text-lg px-8 py-3"
                >
                  🏠 返回主页
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
            className="max-w-4xl mx-auto"
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
                onClick={() => setCurrentMode('welcome')}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="btn-primary text-lg px-8 py-3"
              >
                🏠 返回主页
              </motion.button>
            </motion.div>
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
            {currentMode === 'welcome' && '选择你喜欢的交互方式开始学习！ ✨'}
            {(currentMode === 'drawing' || currentMode === 'result') && '在左侧写数字，右侧实时显示识别结果！ ✏️🤖'}
            {currentMode === 'pixel' && '点击像素切换黑白，将数字3变成数字7！ 🎨🎯'}
            {currentMode === 'pixel-explanation' && '学习像素和数字识别的原理！ 🎓'}
            {currentMode === 'explanation' && '现在你知道AI是怎么工作的了！ 🎓'}
          </p>
        </motion.div>
      </div>
    </main>
  )
}
