'use client'

import { useState } from 'react'

export default function ChoicePage() {
  const [selected, setSelected] = useState<number | null>(null)
  const [show, setShow] = useState(false)

  const question = '注意力机制的主要作用是什么？'
  const options = ['提高计算速度', '关注序列中的重要部分', '减少参数数量']
  const correct = 1

  return (
    <main className="min-h-screen p-4">
      <div className="max-w-xl mx-auto bg-white rounded-2xl shadow p-4 border-2 border-pink-200">
        <h1 className="text-xl font-bold text-pink-600 mb-2">📚 选择题</h1>
        <p className="text-sm text-gray-600 mb-4">选择一个答案，系统会立即反馈结果。</p>
        <div className="mb-3 text-gray-800">{question}</div>
        <div className="space-y-2 mb-3">
          {options.map((op, i) => (
            <button
              key={i}
              onClick={() => { setSelected(i); setShow(true) }}
              className={`w-full text-left px-3 py-2 rounded-lg border-2 transition ${
                show ? (i === correct ? 'border-green-500 bg-green-50' : i === selected ? 'border-red-500 bg-red-50' : 'border-gray-200')
                : 'border-gray-200 hover:border-pink-300 hover:bg-pink-50'
              }`}
            >{op}</button>
          ))}
        </div>
        {show && (
          <div className={`text-sm font-semibold ${selected === correct ? 'text-green-700' : 'text-red-700'}`}>
            {selected === correct ? '✓ 回答正确！' : `✗ 回答不对，正确答案：${options[correct]}`}
          </div>
        )}
      </div>
    </main>
  )
}


