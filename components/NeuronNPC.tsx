'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export interface NeuronNPCData {
  id: string
  name: string
  layer: 'input' | 'hidden' | 'output'
  x: number
  y: number
  personality: 'energetic' | 'thoughtful' | 'precise' | 'curious'
  currentActivity: string
  mood: 'happy' | 'focused' | 'confused' | 'excited'
  memory: string[]
  connections: string[] // IDs of connected neurons
  weight: number // 0-1, affects visual size and prominence
  signal: number // Current signal strength 0-1
}

interface NeuronNPCProps {
  neuron: NeuronNPCData
  onClick?: (neuron: NeuronNPCData) => void
  showActivity?: boolean
  animate?: boolean
}

export function NeuronNPC({ neuron, onClick, showActivity = true, animate = true }: NeuronNPCProps) {
  const [isActive, setIsActive] = useState(false)
  const [showSpeech, setShowSpeech] = useState(false)

  // Auto-animate signal flow
  useEffect(() => {
    if (!animate) return

    const interval = setInterval(() => {
      setIsActive(true)
      setTimeout(() => setIsActive(false), 1000)
    }, 3000 + Math.random() * 2000) // Random intervals

    return () => clearInterval(interval)
  }, [animate])

  // Occasionally show speech bubbles
  useEffect(() => {
    if (!animate) return

    const speechInterval = setInterval(() => {
      if (Math.random() < 0.3) { // 30% chance
        setShowSpeech(true)
        setTimeout(() => setShowSpeech(false), 2000)
      }
    }, 5000 + Math.random() * 5000)

    return () => clearInterval(speechInterval)
  }, [animate])

  const getPersonalityIcon = () => {
    switch (neuron.personality) {
      case 'energetic': return '⚡'
      case 'thoughtful': return '🤔'
      case 'precise': return '🎯'
      case 'curious': return '🔍'
      default: return '🤖'
    }
  }

  const getMoodColor = () => {
    switch (neuron.mood) {
      case 'happy': return 'border-green-400 bg-green-100'
      case 'focused': return 'border-blue-400 bg-blue-100'
      case 'confused': return 'border-yellow-400 bg-yellow-100'
      case 'excited': return 'border-pink-400 bg-pink-100'
      default: return 'border-gray-400 bg-gray-100'
    }
  }

  const getLayerColor = () => {
    switch (neuron.layer) {
      case 'input': return 'border-green-500 shadow-green-200'
      case 'hidden': return 'border-blue-500 shadow-blue-200'
      case 'output': return 'border-purple-500 shadow-purple-200'
      default: return 'border-gray-500 shadow-gray-200'
    }
  }

  const getSpeechBubbleText = () => {
    const activities = {
      input: [
        "我看到了新图片！",
        "这个像素很有趣...",
        "准备传递信号！",
        "数据质量不错呢"
      ],
      hidden: [
        "我在分析特征...",
        "这里有个模式！",
        "权重需要调整吗？",
        "学习到新东西了！"
      ],
      output: [
        "这是猫吗？",
        "我觉得是狗狗！",
        "分类结果准备好了",
        "置信度提升中..."
      ]
    }

    const layerActivities = activities[neuron.layer]
    return layerActivities[Math.floor(Math.random() * layerActivities.length)]
  }

  const size = 60 + neuron.weight * 20 // Base size + weight influence
  const glowIntensity = neuron.signal * 100

  return (
    <div className="relative">
      {/* Speech Bubble */}
      <AnimatePresence>
        {showSpeech && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 10 }}
            className="absolute -top-12 left-1/2 transform -translate-x-1/2 z-20"
          >
            <div className="bg-white rounded-lg px-3 py-2 shadow-lg border-2 border-gray-300 text-xs font-medium text-gray-700 whitespace-nowrap">
              {getSpeechBubbleText()}
              <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-white"></div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Neuron */}
      <motion.div
        className={`relative cursor-pointer ${getLayerColor()} rounded-full border-4 transition-all duration-300 ${getMoodColor()}`}
        style={{
          width: size,
          height: size,
          boxShadow: isActive ? `0 0 ${glowIntensity}px rgba(59, 130, 246, 0.6)` : undefined
        }}
        animate={isActive ? {
          scale: [1, 1.1, 1],
          boxShadow: [
            '0 0 0px rgba(59, 130, 246, 0.6)',
            `0 0 ${glowIntensity}px rgba(59, 130, 246, 0.8)`,
            '0 0 0px rgba(59, 130, 246, 0.6)'
          ]
        } : {}}
        transition={{ duration: 1 }}
        onClick={() => onClick?.(neuron)}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        {/* Neuron Face/Icon */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <div className="text-xl">{getPersonalityIcon()}</div>
            <div className="text-xs font-bold text-gray-700">{neuron.name}</div>
          </div>
        </div>

        {/* Signal Pulse Animation */}
        <AnimatePresence>
          {isActive && (
            <motion.div
              className="absolute inset-0 rounded-full border-2 border-blue-400"
              initial={{ scale: 1, opacity: 0.8 }}
              animate={{ scale: 1.5, opacity: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1 }}
            />
          )}
        </AnimatePresence>

        {/* Weight Indicator */}
        <div className="absolute -top-2 -right-2 bg-white rounded-full border-2 border-gray-300 w-6 h-6 flex items-center justify-center text-xs font-bold">
          {Math.round(neuron.weight * 100)}
        </div>

        {/* Signal Strength Bar */}
        <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-8 h-2 bg-gray-200 rounded-full border border-gray-300">
          <motion.div
            className="h-full bg-gradient-to-r from-blue-400 to-purple-500 rounded-full"
            animate={{ width: `${neuron.signal * 100}%` }}
            transition={{ duration: 0.5 }}
          />
        </div>
      </motion.div>

      {/* Activity Status */}
      {showActivity && (
        <motion.div
          initial={{ opacity: 0, y: 5 }}
          animate={{ opacity: 1, y: 0 }}
          className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 text-xs text-center text-gray-600 bg-white rounded px-2 py-1 shadow border whitespace-nowrap"
        >
          {neuron.currentActivity}
        </motion.div>
      )}
    </div>
  )
}

// Component for managing a group of neurons in a layer
interface NeuronLayerProps {
  neurons: NeuronNPCData[]
  onNeuronClick?: (neuron: NeuronNPCData) => void
  title: string
  color: string
}

export function NeuronLayer({ neurons, onNeuronClick, title, color }: NeuronLayerProps) {
  return (
    <div className={`bg-gradient-to-br ${color} rounded-2xl p-4 border-2 shadow-lg`}>
      <h3 className="text-lg font-bold text-center mb-4 text-gray-800">{title}</h3>

      <div className="grid grid-cols-2 gap-4 place-items-center">
        {neurons.map((neuron) => (
          <NeuronNPC
            key={neuron.id}
            neuron={neuron}
            onClick={onNeuronClick}
            showActivity={true}
            animate={true}
          />
        ))}
      </div>
    </div>
  )
}