'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'

export default function Home() {
  return (
    <main className="min-h-screen relative">
      <div className="relative z-10 container mx-auto px-3 py-4">
        {/* 标题 */}
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-4">
          <h1 className="text-3xl font-extrabold">互动学习乐园</h1>
          <p className="text-sm text-gray-600">四类交互，帮助同学们边玩边学</p>
        </motion.div>

        {/* 基础交互 */}
        <section className="mb-6">
          <h2 className="text-lg font-bold text-pink-600 mb-2">📚 基础交互</h2>
          <p className="text-xs text-gray-600 mb-2">选择题 / 填空题 / 快速对错判断 / 即时反馈结果</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            <Card title="选择题" href="/basic/choice" color="border-orange-200" emoji="📝" desc="选择后立即反馈" />
            <Card title="填空题" href="/basic/fill" color="border-red-200" emoji="✏️" desc="选词填空，验证答案" />
            <Card title="快速对错判断" href="/basic/judge" color="border-green-200" emoji="✅" desc="对/错即时反馈" />
          </div>
        </section>

        {/* 拖拽交互（带细分） */}
        <section className="mb-6">
          <h2 className="text-lg font-bold text-orange-600 mb-2">🧲 拖拽交互</h2>
          <ul className="text-xs text-gray-600 mb-2 list-disc list-inside">
            <li>拖拽调整（参数/对象位置）</li>
            <li>拖拽消除（匹配/合并/消除）</li>
            <li>拖拽拼装（组合/构建）</li>
            <li>拖拽排序（序列/层级）</li>
            <li>拖拽分类（归类/匹配）</li>
          </ul>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
            <NonLinkCard title="拖拽调整" color="border-orange-200" emoji="🎛️" desc="拖动滑块/物体，实时调整参数或位置" />
            <NonLinkCard title="拖拽消除" color="border-indigo-200" emoji="🧩" desc="三消/配对，拖动以匹配并消除" />
            <NonLinkCard title="拖拽拼装" color="border-blue-200" emoji="🧱" desc="把零散元素拼成整体（几何/编程/生物）" />
            <NonLinkCard title="拖拽排序" color="border-green-200" emoji="🗂️" desc="按序列或层级进行排序" />
            <NonLinkCard title="拖拽分类" color="border-purple-200" emoji="🏷️" desc="把对象拖入分类桶，完成归类" />
          </div>
        </section>

        {/* 动态演示（带细分） */}
        <section className="mb-6">
          <h2 className="text-lg font-bold text-indigo-600 mb-2">🎞️ 动态演示</h2>
          <ul className="text-xs text-gray-600 mb-2 list-disc list-inside">
            <li>过程演示（逐步展开）</li>
            <li>参数变化演示（函数/模型动态变化）</li>
            <li>对比演示（并行可视化）</li>
            <li>模拟演示（现象再现）</li>
            <li>隐喻演示（拟人化动画）</li>
          </ul>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
            <NonLinkCard title="过程演示" color="border-gray-200" emoji="⏯️" desc="点击下一步，逐步展开过程与推导" />
            <NonLinkCard title="参数变化演示" color="border-indigo-200" emoji="📈" desc="自动播放参数变化对结果的影响" />
            <NonLinkCard title="对比演示" color="border-blue-200" emoji="⚖️" desc="并行展示不同情况，直观看差异" />
            <NonLinkCard title="模拟演示" color="border-green-200" emoji="🔬" desc="再现自然或工程现象的动态过程" />
            <NonLinkCard title="隐喻演示" color="border-purple-200" emoji="💡" desc="用拟人化动画降低理解门槛" />
          </div>
        </section>

        {/* 探索式 / 沙盒交互 */}
        <section className="mb-6">
          <h2 className="text-lg font-bold text-green-600 mb-2">🧪 探索式 / 沙盒交互</h2>
          <p className="text-xs text-gray-600 mb-2">自由探索，不是题目驱动，而是实验驱动</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            <Card title="大模型文字接龙" href="/sandbox/text-chain" color="border-green-200" emoji="🤖" desc="输入任意开头自由续写" />
            <Card title="不同语料接龙" href="/sandbox/corpus-chain" color="border-purple-200" emoji="🤖" desc="选择古文/数学/童话模型续写" />
          </div>
        </section>
      </div>
    </main>
  )
}

function Card({ title, desc, href, emoji, color }: { title: string; desc: string; href: string; emoji: string; color: string }) {
  return (
    <Link href={href}>
      <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className={`bg-white rounded-xl shadow-lg p-2 border-2 ${color} cursor-pointer h-44 flex flex-col`}>
        <div className="text-2xl mb-1 text-center">{emoji}</div>
        <h3 className="text-base font-bold mb-1 text-center">{title}</h3>
        <p className="text-gray-600 mb-1 text-xs flex-grow text-center">{desc}</p>
        <div className="text-sm text-gray-500 text-center">点击开始体验 →</div>
      </motion.div>
    </Link>
  )
}

function NonLinkCard({ title, desc, emoji, color }: { title: string; desc: string; emoji: string; color: string }) {
  return (
    <div className={`bg-white rounded-xl shadow-lg p-2 border-2 ${color} h-44 flex flex-col`}>
      <div className="text-2xl mb-1 text-center">{emoji}</div>
      <h3 className="text-base font-bold mb-1 text-center">{title}</h3>
      <p className="text-gray-600 mb-1 text-xs flex-grow text-center">{desc}</p>
      <div className="text-sm text-gray-400 text-center">即将上线</div>
    </div>
  )
}


