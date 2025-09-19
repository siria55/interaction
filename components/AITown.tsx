'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { NeuronNPC, NeuronLayer, type NeuronNPCData } from './NeuronNPC'

export function AITown() {
  const [currentDay, setCurrentDay] = useState(1)
  const [gameTime, setGameTime] = useState('morning') // morning, afternoon, evening, night
  const [exhibitionProgress, setExhibitionProgress] = useState(0)
  const [selectedNeuron, setSelectedNeuron] = useState<NeuronNPCData | null>(null)

  // Initialize neurons with different personalities and roles
  const [neurons] = useState<NeuronNPCData[]>([
    // Input Layer Neurons
    {
      id: 'input-1',
      name: '小红',
      layer: 'input',
      x: 0,
      y: 0,
      personality: 'energetic',
      currentActivity: '接收像素数据',
      mood: 'happy',
      memory: ['今天看到了很多猫咪图片', '像素值变化很大'],
      connections: ['hidden-1', 'hidden-2'],
      weight: 0.8,
      signal: 0.6
    },
    {
      id: 'input-2',
      name: '小蓝',
      layer: 'input',
      x: 0,
      y: 1,
      personality: 'curious',
      currentActivity: '分析图像边缘',
      mood: 'focused',
      memory: ['边缘检测很重要', '对角线特征明显'],
      connections: ['hidden-1', 'hidden-3'],
      weight: 0.7,
      signal: 0.4
    },
    {
      id: 'input-3',
      name: '小绿',
      layer: 'input',
      x: 0,
      y: 2,
      personality: 'thoughtful',
      currentActivity: '观察颜色模式',
      mood: 'happy',
      memory: ['颜色对分类很关键', '今天学到新模式'],
      connections: ['hidden-2', 'hidden-3'],
      weight: 0.6,
      signal: 0.7
    },
    {
      id: 'input-4',
      name: '小紫',
      layer: 'input',
      x: 0,
      y: 3,
      personality: 'precise',
      currentActivity: '检测纹理特征',
      mood: 'focused',
      memory: ['纹理细节很复杂', '需要更精确的分析'],
      connections: ['hidden-1', 'hidden-2', 'hidden-3'],
      weight: 0.9,
      signal: 0.5
    },

    // Hidden Layer Neurons
    {
      id: 'hidden-1',
      name: '智慧',
      layer: 'hidden',
      x: 1,
      y: 0,
      personality: 'thoughtful',
      currentActivity: '整合特征信息',
      mood: 'focused',
      memory: ['特征组合很重要', '权重调整见效了'],
      connections: ['output-1', 'output-2'],
      weight: 0.85,
      signal: 0.8
    },
    {
      id: 'hidden-2',
      name: '灵感',
      layer: 'hidden',
      x: 1,
      y: 1,
      personality: 'curious',
      currentActivity: '发现新模式',
      mood: 'excited',
      memory: ['找到了猫咪的共同特征', '狗狗的耳朵形状不同'],
      connections: ['output-1', 'output-3'],
      weight: 0.75,
      signal: 0.6
    },
    {
      id: 'hidden-3',
      name: '直觉',
      layer: 'hidden',
      x: 1,
      y: 2,
      personality: 'energetic',
      currentActivity: '快速分析',
      mood: 'happy',
      memory: ['反应速度很重要', '直觉判断准确率提升'],
      connections: ['output-2', 'output-3'],
      weight: 0.7,
      signal: 0.9
    },

    // Output Layer Neurons
    {
      id: 'output-1',
      name: '猫咪专家',
      layer: 'output',
      x: 2,
      y: 0,
      personality: 'precise',
      currentActivity: '判断是否为猫',
      mood: 'focused',
      memory: ['猫咪识别率45%', '需要更多训练'],
      connections: [],
      weight: 0.6,
      signal: 0.45
    },
    {
      id: 'output-2',
      name: '汪汪侦探',
      layer: 'output',
      x: 2,
      y: 1,
      personality: 'energetic',
      currentActivity: '识别狗狗特征',
      mood: 'happy',
      memory: ['狗狗识别率52%', '耳朵是关键特征'],
      connections: [],
      weight: 0.7,
      signal: 0.52
    },
    {
      id: 'output-3',
      name: '水族馆长',
      layer: 'output',
      x: 2,
      y: 2,
      personality: 'thoughtful',
      currentActivity: '分析鱼类特征',
      mood: 'confused',
      memory: ['鱼类识别率38%', '水下特征难以识别'],
      connections: [],
      weight: 0.5,
      signal: 0.38
    },
    {
      id: 'output-4',
      name: '飞行观察员',
      layer: 'output',
      x: 2,
      y: 3,
      personality: 'curious',
      currentActivity: '识别鸟类形态',
      mood: 'focused',
      memory: ['鸟类识别率41%', '翅膀轮廓是重点'],
      connections: [],
      weight: 0.6,
      signal: 0.41
    }
  ])

  const inputNeurons = neurons.filter(n => n.layer === 'input')
  const hiddenNeurons = neurons.filter(n => n.layer === 'hidden')
  const outputNeurons = neurons.filter(n => n.layer === 'output')

  const handleNeuronClick = (neuron: NeuronNPCData) => {
    setSelectedNeuron(neuron)
  }

  // Auto-advance time for demonstration
  useEffect(() => {
    const timer = setInterval(() => {
      setGameTime(prev => {
        const times = ['morning', 'afternoon', 'evening', 'night']
        const currentIndex = times.indexOf(prev)
        const nextIndex = (currentIndex + 1) % times.length

        // When transitioning to morning, advance day
        if (nextIndex === 0) {
          setCurrentDay(d => d + 1)
        }

        return times[nextIndex]
      })
    }, 5000) // Change time every 5 seconds for demo

    return () => clearInterval(timer)
  }, [])

  const getTimeIcon = () => {
    switch (gameTime) {
      case 'morning': return '🌅'
      case 'afternoon': return '☀️'
      case 'evening': return '🌇'
      case 'night': return '🌙'
      default: return '☀️'
    }
  }

  const getTimeColor = () => {
    switch (gameTime) {
      case 'morning': return 'from-orange-200 to-yellow-200'
      case 'afternoon': return 'from-blue-200 to-cyan-200'
      case 'evening': return 'from-purple-200 to-pink-200'
      case 'night': return 'from-indigo-300 to-purple-300'
      default: return 'from-blue-200 to-cyan-200'
    }
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-green-100 via-blue-100 to-purple-100 p-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-3xl shadow-xl p-6 mb-6 border-4 border-green-300"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="text-4xl">🏘️</div>
              <div>
                <h1 className="text-3xl font-bold text-green-700">Neuronville 神经元镇</h1>
                <p className="text-gray-600">AI 小镇·神经网络乐园</p>
              </div>
            </div>

            <div className="flex items-center gap-6">
              {/* Time Display */}
              <motion.div
                key={gameTime}
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className={`px-4 py-2 rounded-full bg-gradient-to-r ${getTimeColor()} border-2 border-white shadow-lg`}
              >
                <div className="flex items-center gap-2">
                  <span className="text-2xl">{getTimeIcon()}</span>
                  <span className="font-medium capitalize">{gameTime}</span>
                </div>
              </motion.div>

              {/* Day Counter */}
              <div className="bg-yellow-200 px-4 py-2 rounded-full border-2 border-yellow-400 shadow-lg">
                <span className="font-bold text-yellow-800">第 {currentDay} 天</span>
              </div>
            </div>
          </div>

          {/* Exhibition Countdown */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="mt-4 bg-gradient-to-r from-pink-100 to-purple-100 rounded-2xl p-4 border-2 border-pink-300"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="text-3xl">🎨</span>
                <div>
                  <h3 className="text-lg font-bold text-purple-700">图像分类小博览会</h3>
                  <p className="text-purple-600">还有 {Math.max(0, 3 - currentDay)} 天开幕！</p>
                </div>
              </div>

              <div className="text-right">
                <div className="text-sm text-purple-600 mb-1">准确率目标: 90%</div>
                <div className="bg-white rounded-full p-1 border-2 border-purple-300">
                  <div className="bg-purple-200 rounded-full h-4 relative overflow-hidden">
                    <motion.div
                      className="bg-gradient-to-r from-purple-500 to-pink-500 h-full rounded-full"
                      initial={{ width: 0 }}
                      animate={{ width: `${exhibitionProgress}%` }}
                      transition={{ duration: 1 }}
                    />
                    <div className="absolute inset-0 flex items-center justify-center text-xs font-bold text-purple-700">
                      {exhibitionProgress}%
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* Town Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Input District */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
          >
            <NeuronLayer
              neurons={inputNeurons}
              onNeuronClick={handleNeuronClick}
              title="🌱 输入区 - 数据接收站"
              color="from-green-200 to-green-300 border-green-400"
            />
          </motion.div>

          {/* Hidden District */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <NeuronLayer
              neurons={hiddenNeurons}
              onNeuronClick={handleNeuronClick}
              title="🧠 隐藏区 - 思考与学习中心"
              color="from-blue-200 to-blue-300 border-blue-400"
            />
          </motion.div>

          {/* Output District */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.7 }}
          >
            <NeuronLayer
              neurons={outputNeurons}
              onNeuronClick={handleNeuronClick}
              title="🎯 输出区 - 分类决策中心"
              color="from-purple-200 to-purple-300 border-purple-400"
            />
          </motion.div>
        </div>

        {/* Control Panel */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9 }}
          className="mt-6 bg-white rounded-3xl shadow-xl p-6 border-4 border-orange-300"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <span className="text-3xl">🎮</span>
              <div>
                <h3 className="text-xl font-bold text-orange-700">训练师控制台</h3>
                <p className="text-gray-600">帮助神经元们学习图像分类</p>
              </div>
            </div>

            <div className="flex gap-3">
              <button className="px-6 py-3 bg-gradient-to-r from-green-400 to-green-500 text-white rounded-xl font-bold shadow-lg hover:shadow-xl transition-all border-2 border-green-600">
                🚀 开始训练
              </button>
              <button className="px-6 py-3 bg-gradient-to-r from-blue-400 to-blue-500 text-white rounded-xl font-bold shadow-lg hover:shadow-xl transition-all border-2 border-blue-600">
                👁️ 观察学习
              </button>
              <button className="px-6 py-3 bg-gradient-to-r from-purple-400 to-purple-500 text-white rounded-xl font-bold shadow-lg hover:shadow-xl transition-all border-2 border-purple-600">
                📊 查看统计
              </button>
            </div>
          </div>
        </motion.div>

        {/* Quick Stats */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.1 }}
          className="mt-6 grid grid-cols-1 md:grid-cols-4 gap-4"
        >
          <div className="bg-gradient-to-r from-red-200 to-red-300 rounded-2xl p-4 border-2 border-red-400 shadow-lg">
            <div className="text-center">
              <div className="text-2xl mb-1">🐱</div>
              <div className="text-sm text-red-800 font-medium">猫咪识别率</div>
              <div className="text-xl font-bold text-red-900">{Math.round((outputNeurons.find(n => n.name === '猫咪专家')?.signal || 0) * 100)}%</div>
            </div>
          </div>

          <div className="bg-gradient-to-r from-amber-200 to-amber-300 rounded-2xl p-4 border-2 border-amber-400 shadow-lg">
            <div className="text-center">
              <div className="text-2xl mb-1">🐕</div>
              <div className="text-sm text-amber-800 font-medium">狗狗识别率</div>
              <div className="text-xl font-bold text-amber-900">{Math.round((outputNeurons.find(n => n.name === '汪汪侦探')?.signal || 0) * 100)}%</div>
            </div>
          </div>

          <div className="bg-gradient-to-r from-cyan-200 to-cyan-300 rounded-2xl p-4 border-2 border-cyan-400 shadow-lg">
            <div className="text-center">
              <div className="text-2xl mb-1">🐠</div>
              <div className="text-sm text-cyan-800 font-medium">鱼儿识别率</div>
              <div className="text-xl font-bold text-cyan-900">{Math.round((outputNeurons.find(n => n.name === '水族馆长')?.signal || 0) * 100)}%</div>
            </div>
          </div>

          <div className="bg-gradient-to-r from-emerald-200 to-emerald-300 rounded-2xl p-4 border-2 border-emerald-400 shadow-lg">
            <div className="text-center">
              <div className="text-2xl mb-1">🐦</div>
              <div className="text-sm text-emerald-800 font-medium">鸟儿识别率</div>
              <div className="text-xl font-bold text-emerald-900">{Math.round((outputNeurons.find(n => n.name === '飞行观察员')?.signal || 0) * 100)}%</div>
            </div>
          </div>
        </motion.div>

        {/* Neuron Detail Modal */}
        {selectedNeuron && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
            onClick={() => setSelectedNeuron(null)}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="bg-white rounded-3xl p-6 max-w-md w-full border-4 border-blue-300 shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="text-center mb-4">
                <div className="text-4xl mb-2">{selectedNeuron.personality === 'energetic' ? '⚡' : selectedNeuron.personality === 'thoughtful' ? '🤔' : selectedNeuron.personality === 'precise' ? '🎯' : '🔍'}</div>
                <h2 className="text-2xl font-bold text-gray-800">{selectedNeuron.name}</h2>
                <p className="text-gray-600">{selectedNeuron.layer === 'input' ? '输入层神经元' : selectedNeuron.layer === 'hidden' ? '隐藏层神经元' : '输出层神经元'}</p>
              </div>

              <div className="space-y-4">
                <div className="bg-gray-100 rounded-2xl p-4">
                  <h3 className="font-bold text-gray-800 mb-2">📋 当前活动</h3>
                  <p className="text-gray-700">{selectedNeuron.currentActivity}</p>
                </div>

                <div className="bg-blue-100 rounded-2xl p-4">
                  <h3 className="font-bold text-blue-800 mb-2">💭 记忆片段</h3>
                  <div className="space-y-1">
                    {selectedNeuron.memory.map((memory, index) => (
                      <p key={index} className="text-sm text-blue-700">• {memory}</p>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-green-100 rounded-xl p-3 text-center">
                    <div className="text-sm text-green-800 font-medium">权重强度</div>
                    <div className="text-xl font-bold text-green-900">{Math.round(selectedNeuron.weight * 100)}%</div>
                  </div>
                  <div className="bg-purple-100 rounded-xl p-3 text-center">
                    <div className="text-sm text-purple-800 font-medium">信号强度</div>
                    <div className="text-xl font-bold text-purple-900">{Math.round(selectedNeuron.signal * 100)}%</div>
                  </div>
                </div>

                <button
                  onClick={() => setSelectedNeuron(null)}
                  className="w-full px-4 py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-xl font-bold shadow-lg hover:shadow-xl transition-all"
                >
                  关闭
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </div>
    </main>
  )
}