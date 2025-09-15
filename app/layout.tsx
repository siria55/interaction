import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: '互动演示 - 小学生学习乐园',
  description: '一个充满动画和互动的学习演示平台，专为小学生和初中生设计',
  keywords: ['教育', '互动', '动画', '学习', '小学生', '初中生'],
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="zh-CN">
      <body className={inter.className}>
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
          {children}
        </div>
      </body>
    </html>
  )
}
