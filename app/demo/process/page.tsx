'use client'

import { useState } from 'react'

const steps = [
  { title: '第 1 步：收集数据', desc: '准备包含输入与标签的数据集。' },
  { title: '第 2 步：划分数据', desc: '拆分为训练集 / 验证集 / 测试集。' },
  { title: '第 3 步：选择模型', desc: '选用合适的模型与超参数。' },
  { title: '第 4 步：训练模型', desc: '最小化损失函数，参数不断更新。' },
  { title: '第 5 步：评估与部署', desc: '在测试集评估，通过后上线部署。' },
]

export default function DemoProcessPage() {
  const [idx, setIdx] = useState(0)
  const next = () => setIdx((i) => Math.min(i + 1, steps.length - 1))
  const prev = () => setIdx((i) => Math.max(i - 1, 0))

  return (
    <main className="min-h-screen p-4">
      <div className="max-w-xl mx-auto bg-white rounded-2xl shadow p-4 border-2 border-gray-200">
        <h1 className="text-xl font-bold text-gray-700 mb-2">🎞️ 过程演示</h1>
        <p className="text-sm text-gray-600 mb-4">点击“下一步”，一步一步动态呈现机器学习的基本流程。</p>

        {/* 进度条 */}
        <div className="w-full bg-gray-200 rounded-full h-2 mb-4">
          <div className="bg-gray-600 h-2 rounded-full transition-all" style={{ width: `${((idx + 1) / steps.length) * 100}%` }} />
        </div>

        {/* 当前步骤 */}
        <div className="rounded-xl border p-4 bg-gray-50 mb-4">
          <div className="text-lg font-semibold text-gray-800 mb-1">{steps[idx].title}</div>
          <div className="text-sm text-gray-700">{steps[idx].desc}</div>
        </div>

        {/* 步骤导航 */}
        <div className="flex items-center justify-between">
          <button onClick={prev} disabled={idx === 0} className={`px-4 py-2 rounded-lg ${idx === 0 ? 'bg-gray-200 text-gray-400' : 'bg-gray-700 text-white hover:bg-gray-800'}`}>上一步</button>
          <div className="text-xs text-gray-500">{idx + 1} / {steps.length}</div>
          <button onClick={next} disabled={idx === steps.length - 1} className={`px-4 py-2 rounded-lg ${idx === steps.length - 1 ? 'bg-gray-200 text-gray-400' : 'bg-gray-700 text-white hover:bg-gray-800'}`}>下一步</button>
        </div>
      </div>
    </main>
  )
}



