'use client'

import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { CorpusItem } from '@/config/corpus-data'

interface PracticeModeProps {
  items: CorpusItem[]
  onClose: () => void
  modelType: string
}

interface Question {
  id: string
  type: 'fill-blank' | 'multiple-choice' | 'match-keywords'
  question: string
  options?: string[]
  answer: string | string[]
  explanation: string
  item: CorpusItem
}

export function PracticeMode({ items, onClose, modelType }: PracticeModeProps) {
  const [questions, setQuestions] = useState<Question[]>([])
  const [currentIndex, setCurrentIndex] = useState(0)
  const [userAnswer, setUserAnswer] = useState<string | string[]>('')
  const [showResult, setShowResult] = useState(false)
  const [score, setScore] = useState({ correct: 0, total: 0 })
  const [completed, setCompleted] = useState(false)

  useEffect(() => {
    const generateFillBlankQuestion = (item: CorpusItem, id: string): Question => {
      const keywords = item.keywords || []
      const keyword = keywords[Math.floor(Math.random() * keywords.length)]
      const text = item.text
      const blankText = text.replace(keyword, '____')

      return {
        id,
        type: 'fill-blank',
        question: `请填入空白处的内容：${blankText}`,
        answer: keyword,
        explanation: item.explanation || '无解释',
        item
      }
    }

    const generateMultipleChoiceQuestion = (item: CorpusItem, id: string): Question => {
      const keywords = item.keywords || []
      const correctAnswer = keywords[0]

      // 生成错误选项
      const allKeywords = items.flatMap(i => i.keywords || [])
      const wrongOptions = allKeywords
        .filter(k => k !== correctAnswer)
        .sort(() => Math.random() - 0.5)
        .slice(0, 3)

      const options = [correctAnswer, ...wrongOptions].sort(() => Math.random() - 0.5)

      return {
        id,
        type: 'multiple-choice',
        question: `"${item.text}" 的主要关键词是？`,
        options,
        answer: correctAnswer,
        explanation: item.explanation || '无解释',
        item
      }
    }

    const generateMatchKeywordsQuestion = (item: CorpusItem, id: string): Question => {
      const keywords = item.keywords || []
      const shuffledKeywords = [...keywords].sort(() => Math.random() - 0.5)

      return {
        id,
        type: 'match-keywords',
        question: `请选择与 "${item.text}" 相关的所有关键词：`,
        options: [...shuffledKeywords, '无关词汇', '其他内容'].sort(() => Math.random() - 0.5),
        answer: keywords,
        explanation: item.explanation || '无解释',
        item
      }
    }

    const generateQuestionForItem = (item: CorpusItem, id: string): Question | null => {
      if (!item.keywords || item.keywords.length === 0) return null

      const questionTypes = ['fill-blank', 'multiple-choice', 'match-keywords']
      const type = questionTypes[Math.floor(Math.random() * questionTypes.length)] as Question['type']

      switch (type) {
        case 'fill-blank':
          return generateFillBlankQuestion(item, id)
        case 'multiple-choice':
          return generateMultipleChoiceQuestion(item, id)
        case 'match-keywords':
          return generateMatchKeywordsQuestion(item, id)
        default:
          return null
      }
    }

    const practiceItems = items.slice(0, 10) // 取前10个练习
    const generatedQuestions = practiceItems.map((item, index) => {
      return generateQuestionForItem(item, index.toString())
    }).filter(Boolean) as Question[]

    setQuestions(generatedQuestions)
  }, [items])

  const generateQuestions = () => {
    const practiceItems = items.slice(0, 10) // 取前10个练习
    const generatedQuestions = practiceItems.map((item, index) => {
      return generateQuestionForItem(item, index.toString())
    }).filter(Boolean) as Question[]

    setQuestions(generatedQuestions)
  }

  const generateQuestionForItem = (item: CorpusItem, id: string): Question | null => {
    if (!item.keywords || item.keywords.length === 0) return null

    const questionTypes = ['fill-blank', 'multiple-choice', 'match-keywords']
    const type = questionTypes[Math.floor(Math.random() * questionTypes.length)] as Question['type']

    switch (type) {
      case 'fill-blank':
        return generateFillBlankQuestion(item, id)
      case 'multiple-choice':
        return generateMultipleChoiceQuestion(item, id)
      case 'match-keywords':
        return generateMatchKeywordsQuestion(item, id)
      default:
        return null
    }
  }

  const generateFillBlankQuestion = (item: CorpusItem, id: string): Question => {
    const keywords = item.keywords || []
    const keyword = keywords[Math.floor(Math.random() * keywords.length)]
    const text = item.text
    const blankText = text.replace(keyword, '____')

    return {
      id,
      type: 'fill-blank',
      question: `请填入空白处的内容：${blankText}`,
      answer: keyword,
      explanation: item.explanation || '无解释',
      item
    }
  }

  const generateMultipleChoiceQuestion = (item: CorpusItem, id: string): Question => {
    const keywords = item.keywords || []
    const correctAnswer = keywords[0]

    // 生成错误选项
    const allKeywords = items.flatMap(i => i.keywords || [])
    const wrongOptions = allKeywords
      .filter(k => k !== correctAnswer)
      .sort(() => Math.random() - 0.5)
      .slice(0, 3)

    const options = [correctAnswer, ...wrongOptions].sort(() => Math.random() - 0.5)

    return {
      id,
      type: 'multiple-choice',
      question: `"${item.text}" 的主要关键词是？`,
      options,
      answer: correctAnswer,
      explanation: item.explanation || '无解释',
      item
    }
  }

  const generateMatchKeywordsQuestion = (item: CorpusItem, id: string): Question => {
    const keywords = item.keywords || []
    const shuffledKeywords = [...keywords].sort(() => Math.random() - 0.5)

    return {
      id,
      type: 'match-keywords',
      question: `请选择与 "${item.text}" 相关的所有关键词：`,
      options: [...shuffledKeywords, '无关词汇', '其他内容'].sort(() => Math.random() - 0.5),
      answer: keywords,
      explanation: item.explanation || '无解释',
      item
    }
  }

  const handleAnswer = (answer: string | string[]) => {
    setUserAnswer(answer)
  }

  const submitAnswer = () => {
    const currentQuestion = questions[currentIndex]
    let isCorrect = false

    if (currentQuestion.type === 'match-keywords') {
      const userSet = new Set(userAnswer as string[])
      const correctSet = new Set(currentQuestion.answer as string[])
      isCorrect = userSet.size === correctSet.size &&
                 Array.from(userSet).every(x => correctSet.has(x))
    } else {
      isCorrect = userAnswer === currentQuestion.answer
    }

    if (isCorrect) {
      setScore(prev => ({ ...prev, correct: prev.correct + 1 }))
    }
    setScore(prev => ({ ...prev, total: prev.total + 1 }))
    setShowResult(true)
  }

  const nextQuestion = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(prev => prev + 1)
      setUserAnswer('')
      setShowResult(false)
    } else {
      setCompleted(true)
    }
  }

  const resetPractice = () => {
    setCurrentIndex(0)
    setUserAnswer('')
    setShowResult(false)
    setScore({ correct: 0, total: 0 })
    setCompleted(false)
    generateQuestions()
  }

  if (questions.length === 0) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
        <div className="bg-white rounded-2xl p-6 max-w-md w-full">
          <h2 className="text-xl font-bold mb-4">练习模式</h2>
          <p className="text-gray-600 mb-4">当前语料库中没有足够的内容来生成练习题。</p>
          <button
            onClick={onClose}
            className="w-full px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600"
          >
            关闭
          </button>
        </div>
      </div>
    )
  }

  const currentQuestion = questions[currentIndex]
  const progress = ((currentIndex + 1) / questions.length) * 100

  if (completed) {
    const percentage = Math.round((score.correct / score.total) * 100)
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white rounded-2xl p-8 max-w-md w-full text-center"
        >
          <div className="text-6xl mb-4">
            {percentage >= 80 ? '🎉' : percentage >= 60 ? '👍' : '💪'}
          </div>
          <h2 className="text-2xl font-bold mb-4">练习完成！</h2>
          <div className="text-lg mb-6">
            <div className="text-3xl font-bold text-blue-600 mb-2">{percentage}%</div>
            <div className="text-gray-600">
              答对 {score.correct} / {score.total} 题
            </div>
          </div>

          <div className="space-y-3">
            <button
              onClick={resetPractice}
              className="w-full px-4 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 font-medium"
            >
              再练一遍
            </button>
            <button
              onClick={onClose}
              className="w-full px-4 py-3 bg-gray-500 text-white rounded-lg hover:bg-gray-600"
            >
              返回
            </button>
          </div>
        </motion.div>
      </div>
    )
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-2xl p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto"
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold">📝 练习模式</h2>
            <p className="text-gray-600">题目 {currentIndex + 1} / {questions.length}</p>
          </div>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            ✕
          </button>
        </div>

        {/* Progress */}
        <div className="mb-6">
          <div className="bg-gray-200 rounded-full h-2">
            <motion.div
              className="bg-blue-500 rounded-full h-2"
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.3 }}
            />
          </div>
        </div>

        {/* Question */}
        <div className="mb-6">
          <h3 className="text-lg font-medium mb-4">{currentQuestion.question}</h3>

          {/* Answer Input */}
          {currentQuestion.type === 'fill-blank' && (
            <input
              type="text"
              value={userAnswer as string}
              onChange={(e) => handleAnswer(e.target.value)}
              placeholder="请输入答案"
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              disabled={showResult}
            />
          )}

          {currentQuestion.type === 'multiple-choice' && (
            <div className="space-y-2">
              {currentQuestion.options?.map((option, index) => (
                <label
                  key={index}
                  className={`flex items-center p-3 border rounded-lg cursor-pointer transition-colors ${
                    userAnswer === option
                      ? 'border-blue-500 bg-blue-50'
                      : 'border-gray-300 hover:border-gray-400'
                  } ${showResult ? 'cursor-not-allowed' : ''}`}
                >
                  <input
                    type="radio"
                    name="answer"
                    value={option}
                    checked={userAnswer === option}
                    onChange={(e) => handleAnswer(e.target.value)}
                    disabled={showResult}
                    className="mr-3"
                  />
                  {option}
                </label>
              ))}
            </div>
          )}

          {currentQuestion.type === 'match-keywords' && (
            <div className="space-y-2">
              {currentQuestion.options?.map((option, index) => (
                <label
                  key={index}
                  className={`flex items-center p-3 border rounded-lg cursor-pointer transition-colors ${
                    (userAnswer as string[]).includes(option)
                      ? 'border-blue-500 bg-blue-50'
                      : 'border-gray-300 hover:border-gray-400'
                  } ${showResult ? 'cursor-not-allowed' : ''}`}
                >
                  <input
                    type="checkbox"
                    value={option}
                    checked={(userAnswer as string[]).includes(option)}
                    onChange={(e) => {
                      const current = userAnswer as string[]
                      if (e.target.checked) {
                        handleAnswer([...current, option])
                      } else {
                        handleAnswer(current.filter(item => item !== option))
                      }
                    }}
                    disabled={showResult}
                    className="mr-3"
                  />
                  {option}
                </label>
              ))}
            </div>
          )}
        </div>

        {/* Result */}
        <AnimatePresence>
          {showResult && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className={`p-4 rounded-lg mb-6 ${
                (currentQuestion.type === 'match-keywords'
                  ? (userAnswer as string[]).length > 0 &&
                    new Set(userAnswer as string[]).size === new Set(currentQuestion.answer as string[]).size &&
                    (userAnswer as string[]).every(x => (currentQuestion.answer as string[]).includes(x))
                  : userAnswer === currentQuestion.answer)
                  ? 'bg-green-100 border border-green-300'
                  : 'bg-red-100 border border-red-300'
              }`}
            >
              <div className="flex items-center mb-2">
                <span className="text-lg mr-2">
                  {(currentQuestion.type === 'match-keywords'
                    ? (userAnswer as string[]).length > 0 &&
                      new Set(userAnswer as string[]).size === new Set(currentQuestion.answer as string[]).size &&
                      (userAnswer as string[]).every(x => (currentQuestion.answer as string[]).includes(x))
                    : userAnswer === currentQuestion.answer) ? '✅' : '❌'}
                </span>
                <span className="font-medium">
                  {(currentQuestion.type === 'match-keywords'
                    ? (userAnswer as string[]).length > 0 &&
                      new Set(userAnswer as string[]).size === new Set(currentQuestion.answer as string[]).size &&
                      (userAnswer as string[]).every(x => (currentQuestion.answer as string[]).includes(x))
                    : userAnswer === currentQuestion.answer) ? '回答正确！' : '回答错误'}
                </span>
              </div>
              <div className="text-sm text-gray-700 mb-2">
                <strong>正确答案：</strong>
                {Array.isArray(currentQuestion.answer)
                  ? (currentQuestion.answer as string[]).join(', ')
                  : currentQuestion.answer}
              </div>
              <div className="text-sm text-gray-600">
                <strong>解释：</strong>{currentQuestion.explanation}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Actions */}
        <div className="flex gap-3">
          {!showResult ? (
            <button
              onClick={submitAnswer}
              disabled={!userAnswer || (Array.isArray(userAnswer) && userAnswer.length === 0)}
              className="flex-1 px-4 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:bg-gray-300 disabled:cursor-not-allowed font-medium"
            >
              提交答案
            </button>
          ) : (
            <button
              onClick={nextQuestion}
              className="flex-1 px-4 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 font-medium"
            >
              {currentIndex < questions.length - 1 ? '下一题' : '查看结果'}
            </button>
          )}
        </div>
      </motion.div>
    </div>
  )
}