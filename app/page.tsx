'use client'

import { motion } from 'framer-motion'
import { Section } from '@/components/Section'
import { sections } from '@/config/sections'

export default function Home() {
  return (
    <main className="min-h-screen relative">
      <div className="relative z-10 container mx-auto px-3 py-4">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-4"
        >
          <h1 className="text-3xl font-extrabold">互动学习乐园</h1>
          <p className="text-sm text-gray-600">四类交互，帮助同学们边玩边学</p>
        </motion.div>

        {sections.map((section) => (
          <Section key={section.id} section={section} />
        ))}
      </div>
    </main>
  )
}
