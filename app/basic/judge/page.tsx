'use client'

import { useMemo, useState } from 'react'

type Item = { statement: string; answer: boolean; tip?: string }

export default function JudgePage() {
  const items = useMemo<Item[]>(
    () => [
      { statement: '圆的面积公式是 S = πr²。', answer: true },
      { statement: '2 的 10 次方等于 100。', answer: false, tip: '2^10 = 1024' },
      { statement: '注意力机制能让模型关注序列中的重要部分。', answer: true },
    ],
    []
  )

  const [idx, setIdx] = useState(0)
  const [result, setResult] = useState<null | boolean>(null)

  const current = items[idx]

  const judge = (v: boolean) => {
    setResult(v === current.answer)
  }

  const next = () => {
    setIdx((i) => (i + 1) % items.length)
    setResult(null)
  }

  return (
    <main className="min-h-screen p-4">
      <div className="max-w-xl mx-auto bg-white rounded-2xl shadow p-4 border-2 border-green-200">
        <h1 className="text-xl font-bold text-green-600 mb-2">📚 快速对错判断</h1>
        <p className="text-sm text-gray-600 mb-4">看到陈述，立即判断对或错，系统即时反馈。</p>

        <div className="bg-gray-50 border rounded-xl p-4 mb-4 text-lg text-gray-800 text-center">
          {current.statement}
        </div>

        <div className="flex justify-center gap-3 mb-3">
          <button onClick={() => judge(true)} className="px-5 py-2 rounded-lg border-2 border-green-500 text-green-700 bg-green-50 hover:bg-green-100">对</button>
          <button onClick={() => judge(false)} className="px-5 py-2 rounded-lg border-2 border-red-500 text-red-700 bg-red-50 hover:bg-red-100">错</button>
        </div>

        {result !== null && (
          <div className={`text-sm font-semibold text-center ${result ? 'text-green-700' : 'text-red-700'}`}>
            {result ? '✓ 回答正确！' : `✗ 回答不对${current.tip ? `，提示：${current.tip}` : ''}`}
          </div>
        )}

        <div className="text-center mt-4">
          <button onClick={next} className="px-4 py-2 rounded-full bg-green-500 text-white font-semibold hover:bg-green-600">下一题 →</button>
        </div>
      </div>
    </main>
  )
}


