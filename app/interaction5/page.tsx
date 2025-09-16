'use client'

import { motion } from 'framer-motion'
import { useState } from 'react'
import ColorfulBackground from '@/components/ColorfulBackground'
import QuizGame from '@/components/QuizGame'
import NGramExplanation from '@/components/NGramExplanation'
import QuizTheoryExplanation from '@/components/QuizTheoryExplanation'
import Link from 'next/link'

export default function Interaction5Page() {
  const [currentMode, setCurrentMode] = useState<'quiz' | 'ngram' | 'explanation'>('quiz')
  const [quizAccuracy, setQuizAccuracy] = useState(0)

  const handleQuizComplete = (accuracy: number) => {
    setQuizAccuracy(accuracy)
    
    // 如果准确率很高，自动进入N-gram讲解
    if (accuracy > 0.8) {
      setTimeout(() => {
        setCurrentMode('ngram')
      }, 2000) // 延迟2秒让用户看到测验结果
    }
  }

  const handleNGramComplete = () => {
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
            🤖 交互5：不同预料训练的模型的文字接龙
          </h1>
          <p className="text-sm text-gray-700">
            选择古文、数学或童话模型，体验不同语料库训练的文字接龙！
          </p>
        </motion.div>

        {/* 测验页面 */}
        {currentMode === 'quiz' && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="flex-1 flex items-center justify-center px-4"
          >
            <QuizGame 
              onQuizComplete={handleQuizComplete}
            />
            
            {/* 控制按钮 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              className="mt-8 text-center space-y-4"
            >
              <div className="flex justify-center space-x-4">
                <motion.button
                  onClick={() => setCurrentMode('ngram')}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="btn-primary text-lg px-8 py-3"
                >
                  🎓 学习N-gram模型原理
                </motion.button>
                <motion.button
                  onClick={() => setCurrentMode('explanation')}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="btn-secondary text-lg px-8 py-3"
                >
                  📚 学习大语言模型原理
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}

        {/* N-gram讲解页面 */}
        {currentMode === 'ngram' && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="flex-1 flex items-center justify-center px-4"
          >
            <NGramExplanation 
              onComplete={handleNGramComplete}
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
            <QuizTheoryExplanation 
              showExplanation={true}
            />
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="mt-6 text-center"
            >
              <motion.button
                onClick={() => setCurrentMode('quiz')}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="btn-primary text-lg px-8 py-3"
              >
                📝 再试一次
              </motion.button>
            </motion.div>
          </motion.div>
        )}

        {/* 测验结果提示 */}
        {quizAccuracy > 0 && currentMode === 'quiz' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1 }}
            className="mt-6 text-center"
          >
            <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-xl p-4 max-w-md mx-auto">
              <p className="text-lg font-semibold text-green-600">
                🎉 测验完成！准确率：{Math.round(quizAccuracy * 100)}%
              </p>
              {quizAccuracy > 0.8 && (
                <p className="text-sm text-gray-600 mt-2">
                  太棒了！正在为你准备原理讲解...
                </p>
              )}
            </div>
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
            {currentMode === 'quiz' && '选择古文、数学或童话模型，体验不同语料库训练的文字接龙！ 🤖📝'}
            {currentMode === 'ngram' && '学习N-gram模型的工作原理！ 🎓📚'}
            {currentMode === 'explanation' && '学习大语言模型的原理！ 🎓📚'}
          </p>
        </motion.div>
      </div>
    </main>
  )
}
