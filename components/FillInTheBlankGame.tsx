'use client'

import { motion } from 'framer-motion'
import { useState, useRef, useEffect } from 'react'

interface FillInTheBlankGameProps {
  onGameComplete: (accuracy: number) => void
}

interface Question {
  id: number
  sentence: string
  blankIndex: number
  options: string[]
  correct: number
  explanation: string
}

export default function FillInTheBlankGame({ onGameComplete }: FillInTheBlankGameProps) {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [selectedOption, setSelectedOption] = useState<number | null>(null)
  const [showAnswer, setShowAnswer] = useState(false)
  const [showExplanation, setShowExplanation] = useState(false)
  const [score, setScore] = useState(0)
  const [totalAnswered, setTotalAnswered] = useState(0)
  const [gameHistory, setGameHistory] = useState<Array<{question: string, selected: number, correct: number, isCorrect: boolean}>>([])

  // 预定义的问题
  const questions: Question[] = [
    {
      id: 1,
      sentence: "用于训练AI模型的文本集合被称为",
      blankIndex: 0,
      options: ["library", "corpus", "dictionary", "brain"],
      correct: 1,
      explanation: "在机器学习中，用于训练模型的文本集合被称为'corpus'（语料库）。这是自然语言处理中的重要概念。"
    },
    {
      id: 2,
      sentence: "机器学习中的**过拟合**是指模型在训练数据上表现很好，但在新数据上表现",
      blankIndex: 0,
      options: ["很好", "较差", "相同", "随机"],
      correct: 1,
      explanation: "过拟合的典型表现是模型在训练数据上准确率很高，但在测试数据（新数据）上准确率较低。"
    },
    {
      id: 3,
      sentence: "**梯度下降**算法通过计算损失函数的梯度来",
      blankIndex: 0,
      options: ["增加参数", "更新参数", "删除参数", "固定参数"],
      correct: 1,
      explanation: "梯度下降的目标是通过计算损失函数的梯度来更新模型参数，使模型在训练数据上表现更好。"
    },
    {
      id: 4,
      sentence: "**注意力机制**让模型能够关注输入序列中的",
      blankIndex: 0,
      options: ["所有部分", "重要部分", "随机部分", "最后部分"],
      correct: 1,
      explanation: "注意力机制的主要作用是让模型能够动态地关注输入序列中的重要部分，这对理解长文本和复杂关系非常重要。"
    },
    {
      id: 5,
      sentence: "**正则化**技术通过在损失函数中添加惩罚项来防止",
      blankIndex: 0,
      options: ["欠拟合", "过拟合", "收敛", "发散"],
      correct: 1,
      explanation: "正则化通过在损失函数中添加参数大小的惩罚项来防止过拟合，提高模型的泛化能力。"
    }
  ]

  // 处理选项选择
  const handleOptionSelect = (optionIndex: number) => {
    if (showAnswer) return
    
    setSelectedOption(optionIndex)
    setShowAnswer(true)
    
    const isCorrect = optionIndex === questions[currentQuestion].correct
    if (isCorrect) {
      setScore(score + 1)
    }
    
    setTotalAnswered(totalAnswered + 1)
    
    // 记录答题历史
    const newHistory = [...gameHistory, {
      question: questions[currentQuestion].sentence,
      selected: optionIndex,
      correct: questions[currentQuestion].correct,
      isCorrect: isCorrect
    }]
    setGameHistory(newHistory)
  }

  // 下一题
  const nextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
      setSelectedOption(null)
      setShowAnswer(false)
      setShowExplanation(false)
    } else {
      // 完成所有题目
      const accuracy = score / questions.length
      onGameComplete(accuracy)
    }
  }

  // 显示解释
  const showExplanationHandler = () => {
    setShowExplanation(true)
  }

  // 跳过解释
  const skipExplanation = () => {
    nextQuestion()
  }

  // 重新开始
  const restartGame = () => {
    setCurrentQuestion(0)
    setSelectedOption(null)
    setShowAnswer(false)
    setShowExplanation(false)
    setScore(0)
    setTotalAnswered(0)
    setGameHistory([])
  }

  const currentQ = questions[currentQuestion]

  // 分割句子，在空白处插入占位符
  const sentenceParts = currentQ.sentence.split('')
  const beforeBlank = sentenceParts.slice(0, currentQ.blankIndex).join('')
  const afterBlank = sentenceParts.slice(currentQ.blankIndex).join('')

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className="bg-white rounded-2xl shadow-xl p-6 border-4 border-orange-200"
    >
      <div className="text-center mb-6">
        <h3 className="text-2xl font-bold text-orange-600 mb-2">
          ✏️ AI知识填空题
        </h3>
        <p className="text-gray-600 mb-2">
          选择正确的词来补全句子！
        </p>
        <div className="bg-gradient-to-r from-orange-50 to-yellow-50 rounded-lg p-3 max-w-2xl mx-auto">
          <p className="text-sm font-semibold text-orange-700">
            🎯 目标：通过填空学习AI的核心概念！
          </p>
        </div>
      </div>

      {/* 进度指示器 */}
      <div className="mb-6">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm text-gray-600">第 {currentQuestion + 1} 题，共 {questions.length} 题</span>
          <span className="text-sm text-gray-600">得分：{score}/{totalAnswered}</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div 
            className="bg-orange-500 h-2 rounded-full transition-all duration-300"
            style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
          ></div>
        </div>
      </div>

      {/* 题目标题 */}
      <div className="text-center mb-6">
        <h4 className="text-xl font-bold text-gray-800">Complete the sentence.</h4>
      </div>

      {/* 句子显示区域 */}
      <div className="bg-gray-100 rounded-xl p-6 mb-6 border border-gray-200">
        <div className="text-center">
          <div className="text-lg text-gray-800 leading-relaxed">
            {beforeBlank}
            {!showAnswer ? (
              <span className="inline-block w-24 h-8 border-2 border-dashed border-gray-400 rounded mx-2 align-middle"></span>
            ) : (
              <span className={`inline-block px-3 py-1 mx-2 rounded border-2 ${
                selectedOption === currentQ.correct
                  ? 'bg-blue-100 border-blue-500 text-blue-700'
                  : 'bg-red-100 border-red-500 text-red-700'
              }`}>
                {currentQ.options[selectedOption!]}
              </span>
            )}
            {afterBlank}
          </div>
        </div>
      </div>

      {/* 选项区域 */}
      {!showAnswer && (
        <div className="mb-6">
          <div className="flex flex-wrap justify-center gap-3">
            {currentQ.options.map((option, index) => (
              <motion.button
                key={index}
                onClick={() => handleOptionSelect(index)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-6 py-3 border-2 border-gray-300 rounded-lg bg-white hover:border-orange-400 hover:bg-orange-50 transition-all text-blue-600 font-medium"
              >
                {option}
              </motion.button>
            ))}
          </div>
        </div>
      )}

      {/* 答案显示区域 */}
      {showAnswer && !showExplanation && (
        <div className="mb-6">
          <div className="flex flex-wrap justify-center gap-3">
            {currentQ.options.map((option, index) => (
              <div
                key={index}
                className={`px-6 py-3 border-2 rounded-lg ${
                  index === currentQ.correct
                    ? 'border-green-500 bg-green-100 text-green-700'
                    : index === selectedOption
                    ? 'border-red-500 bg-red-100 text-red-700'
                    : 'border-gray-300 bg-white text-gray-500'
                }`}
              >
                {option}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 解释区域 */}
      {showExplanation && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6 bg-blue-50 rounded-xl p-4 border border-blue-200"
        >
          <h4 className="text-lg font-semibold text-blue-800 mb-2">💡 解释：</h4>
          <p className="text-blue-700">{currentQ.explanation}</p>
        </motion.div>
      )}

      {/* 底部控制区域 */}
      <div className="flex items-center justify-center">
        <div className="flex space-x-3">
          {showAnswer && !showExplanation && (
            <>
              <motion.button
                onClick={showExplanationHandler}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-gray-800 text-white px-6 py-3 rounded-lg font-semibold"
              >
                为什么？
              </motion.button>
              <motion.button
                onClick={skipExplanation}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-gray-200 text-gray-700 px-6 py-3 rounded-lg font-semibold"
              >
                跳过讲解
              </motion.button>
            </>
          )}
          
          {showExplanation && (
            <motion.button
              onClick={nextQuestion}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-orange-500 text-white px-8 py-3 rounded-lg font-semibold"
            >
              {currentQuestion < questions.length - 1 ? '下一题 →' : '完成'}
            </motion.button>
          )}
        </div>
      </div>

      {/* 游戏统计 */}
      <div className="mt-6 bg-gradient-to-r from-orange-50 to-yellow-50 rounded-xl p-4">
        <div className="grid grid-cols-3 gap-4 text-center">
          <div>
            <div className="text-2xl font-bold text-orange-600">{score}</div>
            <div className="text-sm text-gray-600">得分</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-blue-600">{totalAnswered}</div>
            <div className="text-sm text-gray-600">已答</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-green-600">
              {totalAnswered > 0 ? Math.round((score / totalAnswered) * 100) : 0}%
            </div>
            <div className="text-sm text-gray-600">准确率</div>
          </div>
        </div>
      </div>

      {/* 控制按钮 */}
      <div className="mt-6 text-center">
        <motion.button
          onClick={restartGame}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="bg-orange-200 text-orange-700 px-6 py-2 rounded-lg font-semibold hover:bg-orange-300"
        >
          🔄 重新开始
        </motion.button>
      </div>
    </motion.div>
  )
}
