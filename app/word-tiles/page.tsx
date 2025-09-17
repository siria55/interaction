'use client'

import { motion } from 'framer-motion'
import ColorfulBackground from '@/components/ColorfulBackground'
import Link from 'next/link'
import WordTileGame from '@/components/WordTileGame'

export default function WordTilesPage() {
  return (
    <main className="min-h-screen relative">
      <ColorfulBackground />
      <div className="relative z-10 h-full flex flex-col">
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: 'easeOut' }}
          className="text-center py-1"
        >
          <Link href="/" className="inline-block mb-2 text-blue-600 hover:text-blue-800 transition-colors text-sm">
            ← 返回主页
          </Link>
          <h1 className="text-2xl font-bold text-indigo-600 mb-1">🧩 词了个词</h1>
          <p className="text-sm text-gray-700">规则：点击未被覆盖的词卡，三个相同就会消除；底部槽位最多7个。</p>
        </motion.div>

        <div className="flex-1 flex items-center justify-center px-4">
          <WordTileGame />
        </div>
      </div>
    </main>
  )
}


