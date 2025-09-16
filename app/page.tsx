'use client'

import { motion } from 'framer-motion'
import ColorfulBackground from '@/components/ColorfulBackground'
import Link from 'next/link'

export default function Home() {

  return (
    <main className="min-h-screen relative overflow-hidden">
      <ColorfulBackground />
      
      <div className="relative z-10 container mx-auto px-4 py-8">
        {/* 欢迎页面 */}
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
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
            {/* 交互1：手写数字识别 */}
            <Link href="/interaction1">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-white rounded-2xl shadow-xl p-6 border-4 border-purple-200 cursor-pointer"
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
            </Link>

            {/* 交互2：像素数字编辑 */}
            <Link href="/interaction2">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-white rounded-2xl shadow-xl p-6 border-4 border-blue-200 cursor-pointer"
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
            </Link>

            {/* 交互3：机器学习分类 */}
            <Link href="/interaction3">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-white rounded-2xl shadow-xl p-6 border-4 border-orange-200 cursor-pointer"
              >
                <div className="text-6xl mb-4">🎯</div>
                <h3 className="text-2xl font-bold text-orange-600 mb-3">
                  交互3：机器学习分类
                </h3>
                <p className="text-gray-600 mb-4">
                  拖拽角度和偏移参数调整分割直线，尽可能把两种颜色的点分开！
                </p>
                <div className="text-sm text-gray-500">
                  点击开始体验 →
                </div>
              </motion.div>
            </Link>

            {/* 交互4：大语言模型文字接龙 */}
            <Link href="/interaction4">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-white rounded-2xl shadow-xl p-6 border-4 border-green-200 cursor-pointer"
              >
                <div className="text-6xl mb-4">🤖</div>
                <h3 className="text-2xl font-bold text-green-600 mb-3">
                  交互4：大语言模型文字接龙
                </h3>
                <p className="text-gray-600 mb-4">
                  输入一个字，AI会接下一个字，体验自回归模型！
                </p>
                <div className="text-sm text-gray-500">
                  点击开始体验 →
                </div>
              </motion.div>
            </Link>
          </div>
        </motion.div>

        {/* 底部提示 */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.5 }}
          className="text-center mt-16"
        >
          <p className="text-lg text-gray-600">
            选择你喜欢的交互方式开始学习！ ✨
          </p>
        </motion.div>
      </div>
    </main>
  )
}
