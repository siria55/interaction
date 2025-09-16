'use client'

import { motion } from 'framer-motion'
import { useState, useRef, useEffect } from 'react'

interface QuizGameProps {
  onQuizComplete: (accuracy: number) => void
}

interface Question {
  id: number
  question: string
  description?: string
  options: string[]
  correct: number
  explanation: string
}

export default function QuizGame({ onQuizComplete }: QuizGameProps) {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [selectedOption, setSelectedOption] = useState<number | null>(null)
  const [showAnswer, setShowAnswer] = useState(false)
  const [showExplanation, setShowExplanation] = useState(false)
  const [score, setScore] = useState(0)
  const [totalAnswered, setTotalAnswered] = useState(0)
  const [quizHistory, setQuizHistory] = useState<Array<{question: string, selected: number, correct: number, isCorrect: boolean}>>([])

  // 预定义的问题
  const questions: Question[] = [
    {
      id: 1,
      question: "这个语言模型，我们称之为\"T&C\"，是在一个文本集合上训练的，这个集合被称为**语料库**。",
      description: "你能说出语料库&ldquo;T&C&rdquo;是什么吗？",
      options: [
        "旅行和文化书籍",
        "城镇和国家杂志", 
        "条款和条件协议"
      ],
      correct: 2,
      explanation: "T&C通常指\"Terms and Conditions\"（条款和条件），这是法律文档的常见缩写。语言模型经常在包含大量法律文本的语料库上训练。"
    },
    {
      id: 2,
      question: "在机器学习中，**过拟合**是指模型在训练数据上表现很好，但在新数据上表现较差的现象。",
      description: "以下哪个是过拟合的典型表现？",
      options: [
        "训练准确率低，测试准确率高",
        "训练准确率高，测试准确率低", 
        "训练和测试准确率都很高"
      ],
      correct: 1,
      explanation: "过拟合的典型表现是模型在训练数据上准确率很高，但在测试数据（新数据）上准确率较低，说明模型记住了训练数据而不是学会了泛化。"
    },
    {
      id: 3,
      question: "**注意力机制**是Transformer架构的核心组件，它允许模型在处理序列时关注不同位置的信息。",
      description: "注意力机制的主要作用是什么？",
      options: [
        "提高计算速度",
        "让模型关注序列中的重要部分",
        "减少模型参数数量"
      ],
      correct: 1,
      explanation: "注意力机制的主要作用是让模型能够动态地关注输入序列中的不同部分，这对于理解长文本和复杂关系非常重要。"
    },
    {
      id: 4,
      question: "**梯度下降**是深度学习中最常用的优化算法，它通过计算损失函数的梯度来更新模型参数。",
      description: "梯度下降的目标是什么？",
      options: [
        "增加损失函数的值",
        "找到损失函数的最小值",
        "随机改变参数值"
      ],
      correct: 1,
      explanation: "梯度下降的目标是通过迭代优化找到损失函数的最小值，从而使模型在训练数据上表现更好。"
    },
    {
      id: 5,
      question: "**正则化**是防止机器学习模型过拟合的重要技术，它通过在损失函数中添加惩罚项来约束模型复杂度。",
      description: "以下哪个是正则化技术？",
      options: [
        "增加训练数据",
        "L1和L2正则化",
        "提高学习率"
      ],
      correct: 1,
      explanation: "L1和L2正则化是常用的正则化技术，它们通过在损失函数中添加参数大小的惩罚项来防止过拟合。"
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
    const newHistory = [...quizHistory, {
      question: questions[currentQuestion].question,
      selected: optionIndex,
      correct: questions[currentQuestion].correct,
      isCorrect: isCorrect
    }]
    setQuizHistory(newHistory)
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
      onQuizComplete(accuracy)
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
  const restartQuiz = () => {
    setCurrentQuestion(0)
    setSelectedOption(null)
    setShowAnswer(false)
    setShowExplanation(false)
    setScore(0)
    setTotalAnswered(0)
    setQuizHistory([])
  }

  const currentQ = questions[currentQuestion]

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className="bg-white rounded-2xl shadow-xl p-6 border-4 border-purple-200"
    >
      <div className="text-center mb-6">
        <h3 className="text-2xl font-bold text-purple-600 mb-2">
          📝 交互5：AI知识选择题
        </h3>
        <p className="text-gray-600 mb-2">
          测试你对AI和机器学习的理解！
        </p>
        <div className="bg-gradient-to-r from-purple-50 to-blue-50 rounded-lg p-3 max-w-2xl mx-auto">
          <p className="text-sm font-semibold text-purple-700">
            🎯 目标：通过选择题学习AI的核心概念！
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
            className="bg-purple-500 h-2 rounded-full transition-all duration-300"
            style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
          ></div>
        </div>
      </div>

      {/* 问题显示区域 */}
      <div className="bg-gray-50 rounded-xl p-6 mb-6 border border-gray-200">
        <div className="mb-4">
          <div className="text-lg text-gray-800 leading-relaxed mb-3">
            {currentQ.question}
          </div>
          {currentQ.description && (
            <div className="text-xl font-semibold text-gray-900">
              {currentQ.description}
            </div>
          )}
        </div>
      </div>

      {/* 选项区域 */}
      {!showAnswer && (
        <div className="mb-6">
          <div className="space-y-3">
            {currentQ.options.map((option, index) => (
              <motion.button
                key={index}
                onClick={() => handleOptionSelect(index)}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full p-4 text-left border-2 border-gray-300 rounded-lg bg-white hover:border-purple-400 hover:bg-purple-50 transition-all"
              >
                <div className="flex items-center justify-between">
                  <span className="text-gray-700">{option}</span>
                  <div className="w-5 h-5 border-2 border-gray-300 rounded"></div>
                </div>
              </motion.button>
            ))}
          </div>
        </div>
      )}

      {/* 答案显示区域 */}
      {showAnswer && !showExplanation && (
        <div className="mb-6">
          <div className="space-y-3">
            {currentQ.options.map((option, index) => (
              <div
                key={index}
                className={`w-full p-4 border-2 rounded-lg ${
                  index === currentQ.correct
                    ? 'border-green-500 bg-green-50'
                    : index === selectedOption
                    ? 'border-red-500 bg-red-50'
                    : 'border-gray-300 bg-white'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className={`${
                    index === currentQ.correct
                      ? 'text-green-700 font-semibold'
                      : index === selectedOption
                      ? 'text-red-700'
                      : 'text-gray-500'
                  }`}>
                    {option}
                  </span>
                  <div className={`w-5 h-5 border-2 rounded flex items-center justify-center ${
                    index === currentQ.correct
                      ? 'border-green-500 bg-green-500'
                      : index === selectedOption
                      ? 'border-red-500 bg-red-500'
                      : 'border-gray-300'
                  }`}>
                    {index === currentQ.correct && (
                      <span className="text-white text-xs">✓</span>
                    )}
                    {index === selectedOption && index !== currentQ.correct && (
                      <span className="text-white text-xs">✗</span>
                    )}
                  </div>
                </div>
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
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2 text-gray-600">
          <span>🔍</span>
          <span className="text-sm">Here&apos;s the answer</span>
        </div>
        
        <div className="flex space-x-3">
          {showAnswer && !showExplanation && (
            <>
              <motion.button
                onClick={showExplanationHandler}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-gray-800 text-white px-4 py-2 rounded-lg font-semibold"
              >
                Why?
              </motion.button>
              <motion.button
                onClick={skipExplanation}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-gray-200 text-gray-700 px-4 py-2 rounded-lg font-semibold"
              >
                Skip explanation
              </motion.button>
            </>
          )}
          
          {showExplanation && (
            <motion.button
              onClick={nextQuestion}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="btn-primary px-6 py-2 rounded-lg font-semibold"
            >
              {currentQuestion < questions.length - 1 ? '下一题 →' : '完成测验'}
            </motion.button>
          )}
        </div>
        
        <div className="text-gray-600">
          <span>🚩</span>
        </div>
      </div>

      {/* 游戏统计 */}
      <div className="mt-6 bg-gradient-to-r from-purple-50 to-blue-50 rounded-xl p-4">
        <div className="grid grid-cols-3 gap-4 text-center">
          <div>
            <div className="text-2xl font-bold text-purple-600">{score}</div>
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
          onClick={restartQuiz}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="btn-secondary px-6 py-2 rounded-lg font-semibold"
        >
          🔄 重新开始
        </motion.button>
      </div>
    </motion.div>
  )
}
