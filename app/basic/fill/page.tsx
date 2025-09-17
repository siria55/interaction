'use client'

import { useState } from 'react'

export default function FillPage() {
  const [selected, setSelected] = useState<number | null>(null)
  const [show, setShow] = useState(false)

  // 句子与备选词
  const sentence = '用于训练AI模型的文本集合被称为 ____。'
  const options = ['词典', '语料库', '字典树']
  const correct = 1

  return (
    <main className="min-h-screen p-4">
      <div className="max-w-xl mx-auto bg-white rounded-2xl shadow p-4 border-2 border-red-200">
        <h1 className="text-xl font-bold text-red-600 mb-2">📚 填空题</h1>
        <p className="text-sm text-gray-600 mb-4">选择合适的词填入空格，系统会立即反馈结果。</p>

        <div className="bg-gray-50 border rounded-lg p-3 mb-3 text-gray-800">
          {sentence.replace('____', selected !== null && show ? options[selected] : '____')}
        </div>

        <div className="flex flex-wrap gap-2">
          {options.map((op, i) => (
            <button
              key={i}
              onClick={() => { setSelected(i); setShow(true) }}
              className={`px-4 py-2 rounded-lg border-2 transition text-sm ${
                show ? (i === correct ? 'border-green-500 bg-green-50' : i === selected ? 'border-red-500 bg-red-50' : 'border-gray-200')
                : 'border-gray-200 hover:border-red-300 hover:bg-red-50'
              }`}
            >{op}</button>
          ))}
        </div>

        {show && (
          <div className={`mt-3 text-sm font-semibold ${selected === correct ? 'text-green-700' : 'text-red-700'}`}>
            {selected === correct ? '✓ 回答正确！' : `✗ 回答不对，正确答案：${options[correct]}`}
          </div>
        )}
      </div>
    </main>
  )
}


