'use client'

import { motion } from 'framer-motion'
import { Section } from '@/components/Section'
import { sections } from '@/config/sections'

export default function Home() {
  return (
    <main className="min-h-screen relative">
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50"></div>
      <div className="absolute inset-0 opacity-30">
        <div className="w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
      </div>

      <div className="relative z-10 container mx-auto px-6 py-12 max-w-7xl">
        <motion.header
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center mb-16"
        >
          <motion.h1
            className="text-5xl md:text-6xl font-extrabold bg-gradient-to-r from-pink-600 via-purple-600 to-blue-600 bg-clip-text text-transparent mb-6"
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            互动学习乐园
          </motion.h1>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="relative"
          >
            <p className="text-xl text-gray-700 font-medium leading-relaxed mb-8">
              四类交互，帮助同学们边玩边学
            </p>
            <div className="w-24 h-1 bg-gradient-to-r from-pink-500 to-purple-500 mx-auto rounded-full"></div>
          </motion.div>
        </motion.header>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7, duration: 0.5 }}
        >
          {sections.map((section, index) => (
            <motion.div
              key={section.id}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 + index * 0.1, duration: 0.6 }}
            >
              <Section section={section} />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </main>
  )
}
