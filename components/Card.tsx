'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'

interface CardProps {
  title: string
  desc: string
  href: string
  emoji: string
  color: string
}

export function Card({ title, desc, href, emoji, color }: CardProps) {
  return (
    <Link href={href}>
      <motion.div
        whileHover={{
          scale: 1.03,
          y: -8,
          boxShadow: "0 20px 40px rgba(0,0,0,0.1)"
        }}
        whileTap={{ scale: 0.98 }}
        transition={{ type: "spring", stiffness: 300, damping: 25 }}
        className={`group bg-white rounded-2xl shadow-lg hover:shadow-2xl p-6 border-2 ${color} cursor-pointer h-52 flex flex-col relative overflow-hidden transition-all duration-300`}
      >
        <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-br from-white/20 to-transparent rounded-bl-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

        <div className="text-4xl mb-3 text-center transform group-hover:scale-110 transition-transform duration-300">
          {emoji}
        </div>

        <h3 className="text-lg font-bold mb-3 text-center text-gray-800 leading-tight">
          {title}
        </h3>

        <p className="text-gray-600 text-sm flex-grow text-center leading-relaxed mb-4">
          {desc}
        </p>

        <div className="flex items-center justify-center text-sm font-medium text-gray-500 group-hover:text-blue-600 transition-colors duration-300">
          <span>点击开始体验</span>
          <motion.span
            className="ml-2"
            animate={{ x: [0, 4, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            →
          </motion.span>
        </div>
      </motion.div>
    </Link>
  )
}

interface NonLinkCardProps {
  title: string
  desc: string
  emoji: string
  color: string
}

export function NonLinkCard({ title, desc, emoji, color }: NonLinkCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0.7 }}
      whileHover={{ opacity: 1 }}
      className={`bg-white rounded-2xl shadow-lg p-6 border-2 ${color} h-52 flex flex-col relative overflow-hidden`}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-gray-50/50 to-gray-100/30"></div>

      <div className="relative z-10">
        <div className="text-4xl mb-3 text-center opacity-60">
          {emoji}
        </div>

        <h3 className="text-lg font-bold mb-3 text-center text-gray-600 leading-tight">
          {title}
        </h3>

        <p className="text-gray-500 text-sm flex-grow text-center leading-relaxed mb-4">
          {desc}
        </p>

        <div className="flex items-center justify-center text-sm font-medium text-gray-400">
          <span>即将上线</span>
          <span className="ml-2">🚧</span>
        </div>
      </div>
    </motion.div>
  )
}