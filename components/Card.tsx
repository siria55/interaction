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
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className={`bg-white rounded-xl shadow-lg p-2 border-2 ${color} cursor-pointer h-44 flex flex-col`}
      >
        <div className="text-2xl mb-1 text-center">{emoji}</div>
        <h3 className="text-base font-bold mb-1 text-center">{title}</h3>
        <p className="text-gray-600 mb-1 text-xs flex-grow text-center">{desc}</p>
        <div className="text-sm text-gray-500 text-center">点击开始体验 →</div>
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
    <div className={`bg-white rounded-xl shadow-lg p-2 border-2 ${color} h-44 flex flex-col`}>
      <div className="text-2xl mb-1 text-center">{emoji}</div>
      <h3 className="text-base font-bold mb-1 text-center">{title}</h3>
      <p className="text-gray-600 mb-1 text-xs flex-grow text-center">{desc}</p>
      <div className="text-sm text-gray-400 text-center">即将上线</div>
    </div>
  )
}