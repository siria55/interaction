'use client'

import { motion } from 'framer-motion'
import ColorfulBackground from '@/components/ColorfulBackground'
import Link from 'next/link'

export default function Home() {

  return (
    <main className="min-h-screen relative overflow-hidden">
      <ColorfulBackground />
      
      <div className="relative z-10 container mx-auto px-2 py-3">
        {/* 欢迎页面 */}
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="text-center mb-4"
        >
          <h1 className="title-primary text-3xl mb-1 animate-float">
            🎮 互动学习乐园 🎮
          </h1>
          <p className="text-sm text-gray-700 max-w-3xl mx-auto">
            这里有多种有趣的AI学习方式！选择你喜欢的交互方式开始探索吧！
          </p>
        </motion.div>

        {/* 基础类：6,7 - 置顶 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-4"
        >
          <div className="max-w-7xl mx-auto text-left mb-2">
            <h2 className="text-lg font-extrabold text-pink-600">📚 基础类</h2>
            <p className="text-xs text-gray-600">选择题与填空题的小练习</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 max-w-5xl mx-auto">
            {/* 选择题 */}
            <Link href="/quiz-choice">
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="bg-white rounded-xl shadow-lg p-2 border-2 border-orange-200 cursor-pointer h-44 flex flex-col">
                <div className="text-2xl mb-1 text-center">📝</div>
                <h3 className="text-base font-bold text-orange-600 mb-1 text-center">选择题</h3>
                <p className="text-gray-600 mb-1 text-xs flex-grow text-center">学生可以选择，然后验证答案！</p>
                <div className="text-sm text-gray-500 text-center">点击开始体验 →</div>
              </motion.div>
            </Link>

            {/* 填空题 */}
            <Link href="/quiz-fill">
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="bg-white rounded-xl shadow-lg p-2 border-2 border-red-200 cursor-pointer h-44 flex flex-col">
                <div className="text-2xl mb-1 text-center">✏️</div>
                <h3 className="text-base font-bold text-red-600 mb-1 text-center">填空题</h3>
                <p className="text-gray-600 mb-1 text-xs flex-grow text-center">学生选词填空，然后可以验证答案！</p>
                <div className="text-sm text-gray-500 text-center">点击开始体验 →</div>
              </motion.div>
            </Link>
          </div>
        </motion.div>

        {/* 神经网络基础类：1,2,3 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mb-4"
        >
          <div className="max-w-7xl mx-auto text-left mb-2">
            <h2 className="text-lg font-extrabold text-orange-600">🍀 神经网络基础类</h2>
            <p className="text-xs text-gray-600">从图像与分类直观入门机器学习</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 max-w-5xl mx-auto">
            {/* 手写数字识别 */}
            <Link href="/digits-handwriting">
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="bg-white rounded-xl shadow-lg p-2 border-2 border-purple-200 cursor-pointer h-44 flex flex-col">
                <div className="text-2xl mb-1 text-center">✏️</div>
                <h3 className="text-base font-bold text-purple-600 mb-1 text-center">手写数字识别</h3>
                <p className="text-gray-600 mb-1 text-xs flex-grow text-center">手写数字让AI识别，学习AI的工作原理！</p>
                <div className="text-sm text-gray-500 text-center">点击开始体验 →</div>
              </motion.div>
            </Link>

            {/* 像素数字编辑 */}
            <Link href="/pixels-editor">
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="bg-white rounded-xl shadow-lg p-2 border-2 border-blue-200 cursor-pointer h-44 flex flex-col">
                <div className="text-2xl mb-1 text-center">🎨</div>
                <h3 className="text-base font-bold text-blue-600 mb-1 text-center">像素数字编辑</h3>
                <p className="text-gray-600 mb-1 text-xs flex-grow text-center">点击像素切换黑白，将数字3变成数字7！</p>
                <div className="text-sm text-gray-500 text-center">点击开始体验 →</div>
              </motion.div>
            </Link>

            {/* 机器学习分类 */}
            <Link href="/plane-classification">
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="bg-white rounded-xl shadow-lg p-2 border-2 border-orange-200 cursor-pointer h-44 flex flex-col">
                <div className="text-2xl mb-1 text-center">🎯</div>
                <h3 className="text-base font-bold text-orange-600 mb-1 text-center">机器学习分类</h3>
                <p className="text-gray-600 mb-1 text-xs flex-grow text-center">拖拽角度和偏移参数调整分割直线，尽可能把两种颜色的点分开！</p>
                <div className="text-sm text-gray-500 text-center">点击开始体验 →</div>
              </motion.div>
            </Link>
          </div>
        </motion.div>

        {/* 其他游戏学习 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="mb-4"
        >
          <div className="max-w-7xl mx-auto text-left mb-2">
            <h2 className="text-lg font-extrabold text-indigo-600">🎲 其他游戏学习</h2>
            <p className="text-xs text-gray-600">通过小游戏巩固所学知识</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 max-w-5xl mx-auto">
            {/* 词了个词 */}
            <Link href="/word-tiles">
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="bg-white rounded-xl shadow-lg p-2 border-2 border-indigo-200 cursor-pointer h-44 flex flex-col">
                <div className="text-2xl mb-1 text-center">🧩</div>
                <h3 className="text-base font-bold text-indigo-600 mb-1 text-center">词了个词</h3>
                <p className="text-gray-600 mb-1 text-xs flex-grow text-center">三消规则：3个相同自动消除，槽位最多7个。</p>
                <div className="text-sm text-gray-500 text-center">点击开始体验 →</div>
              </motion.div>
            </Link>
          </div>
        </motion.div>

        {/* LLM 类：4,5,8 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-4"
        >
          <div className="max-w-7xl mx-auto text-left mb-2">
            <h2 className="text-lg font-extrabold text-indigo-600">🧠 LLM 类</h2>
            <p className="text-xs text-gray-600">体验自回归与不同语料风格的文本生成</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 max-w-5xl mx-auto">
            {/* 大语言模型文字接龙 */}
            <Link href="/text-chain">
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="bg-white rounded-xl shadow-lg p-2 border-2 border-green-200 cursor-pointer h-44 flex flex-col">
                <div className="text-2xl mb-1 text-center">🤖</div>
                <h3 className="text-base font-bold text-green-600 mb-1 text-center">大语言模型文字接龙</h3>
                <p className="text-gray-600 mb-1 text-xs flex-grow text-center">用户输入一个字，猜后面的字！</p>
                <div className="text-sm text-gray-500 text-center">点击开始体验 →</div>
              </motion.div>
            </Link>

            {/* 不同预料训练的模型的文字接龙 */}
            <Link href="/corpus-text-chain">
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="bg-white rounded-xl shadow-lg p-2 border-2 border-purple-200 cursor-pointer h-44 flex flex-col">
                <div className="text-2xl mb-1 text-center">🤖</div>
                <h3 className="text-base font-bold text-purple-600 mb-1 text-center">不同预料训练的模型的文字接龙</h3>
                <p className="text-gray-600 mb-1 text-xs flex-grow text-center">选择古文、数学或童话模型，体验不同语料库训练的文字接龙！</p>
                <div className="text-sm text-gray-500 text-center">点击开始体验 →</div>
              </motion.div>
            </Link>

            {/* N-gram算法演示 */}
            <Link href="/ngram-demo">
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="bg-white rounded-xl shadow-lg p-2 border-2 border-indigo-200 cursor-pointer h-44 flex flex-col">
                <div className="text-2xl mb-1 text-center">📊</div>
                <h3 className="text-base font-bold text-indigo-600 mb-1 text-center">N-gram算法演示</h3>
                <p className="text-gray-600 mb-1 text-xs flex-grow text-center">学习N-gram算法如何统计词频和预测下一个词！</p>
                <div className="text-sm text-gray-500 text-center">点击开始体验 →</div>
              </motion.div>
            </Link>
          </div>
        </motion.div>

        {/* 底部提示 */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.5 }}
          className="text-center mt-8"
        >
          <p className="text-sm text-gray-600">
            选择你喜欢的交互方式开始学习！ ✨
          </p>
        </motion.div>
      </div>
    </main>
  )
}
