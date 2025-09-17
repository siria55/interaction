'use client'

import { useState } from 'react'

export default function FillFreePage() {
  const [value, setValue] = useState('')
  const [show, setShow] = useState(false)

  const sentence = '圆的面积公式是 S = ____。'
  const correct = 'πr²'

  const check = () => setShow(true)

  return (
    <main className="min-h-screen p-4">
      <div className="max-w-xl mx-auto bg-white rounded-2xl shadow p-4 border-2 border-pink-200">
        <h1 className="text-xl font-bold text-pink-600 mb-2">📚 无选项填空</h1>
        <p className="text-sm text-gray-600 mb-4">自己输入答案并验证。</p>

        <div className="bg-gray-50 border rounded-lg p-3 mb-3 text-gray-800">
          {sentence.replace('____', value || '____')}
        </div>

        <div className="flex gap-2 mb-3">
          <input
            value={value}
            onChange={(e) => { setValue(e.target.value); setShow(false) }}
            placeholder="请输入答案，如 πr²"
            className="flex-1 px-3 py-2 border-2 rounded-lg focus:outline-none focus:border-pink-400"
          />
          <button onClick={check} className="px-4 py-2 rounded-lg bg-pink-500 text-white font-semibold hover:bg-pink-600">验证</button>
        </div>

        {show && (
          <div className={`text-sm font-semibold ${value.trim() === correct ? 'text-green-700' : 'text-red-700'}`}>
            {value.trim() === correct ? '✓ 回答正确！' : `✗ 回答不对，正确答案：${correct}`}
          </div>
        )}
      </div>
    </main>
  )
}


