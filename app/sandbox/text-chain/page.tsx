'use client'

import Link from 'next/link'
import { useState } from 'react'

export default function SandboxTextChainPage() {
  const [inputText, setInputText] = useState('')
  const [nextChar, setNextChar] = useState('')
  const [loading, setLoading] = useState(false)

  const rules: Record<string, string> = {
    '今': '天', '天': '气', '气': '好', '很': '棒', '好': '呀', '我': '们', '去': '玩', '学': '习', '数': '学', '自': '然', '语': '文',
  }

  const generate = () => {
    if (!inputText) return
    setLoading(true)
    setNextChar('')
    setTimeout(() => {
      const last = inputText[inputText.length - 1]
      const ch = rules[last] ?? '。'
      setNextChar(ch)
      setLoading(false)
    }, 500)
  }

  const append = () => {
    if (!nextChar) return
    setInputText((s) => s + nextChar)
    setNextChar('')
  }

  const reset = () => {
    setInputText('')
    setNextChar('')
    setLoading(false)
  }

  return (
    <main className="min-h-screen p-4">
      <div className="max-w-xl mx-auto bg-white rounded-2xl shadow p-4 border-2 border-green-200">
        <Link href="/" className="text-sm text-blue-600 hover:underline">← 返回主页</Link>
        <h1 className="text-xl font-bold text-green-600 mt-2 mb-2">✍️ 文字接龙</h1>
        <p className="text-sm text-gray-700 mb-3">输入一个字，系统猜测下一个字；你可以把它接上继续玩。</p>

        <div className="bg-gray-900 rounded-xl p-4 mb-3">
          <div className="bg-black text-white rounded p-3 min-h-[72px] flex items-center text-lg">
            <span className="text-green-400 font-semibold">{inputText}</span>
            {loading && <span className="text-gray-400 ml-2 animate-pulse">...</span>}
            {nextChar && <span className="ml-2">{nextChar}</span>}
          </div>
          <div className="mt-3 flex gap-2">
            <input value={inputText} onChange={(e)=>{ setInputText(e.target.value); setNextChar('') }} placeholder="输入起始字..." className="flex-1 p-2 rounded bg-gray-800 text-white border border-gray-700" />
            <button onClick={generate} disabled={loading || !inputText} className={`px-4 py-2 rounded ${loading||!inputText? 'bg-gray-600 text-gray-300' : 'bg-green-500 text-white hover:bg-green-600'}`}>生成</button>
          </div>
          {nextChar && (
            <button onClick={append} className="mt-2 w-full px-4 py-2 rounded bg-blue-500 text-white hover:bg-blue-600">接上</button>
          )}
        </div>

        <button onClick={reset} className="px-4 py-2 rounded bg-indigo-500 text-white hover:bg-indigo-600">重新开始</button>
      </div>
    </main>
  )
}


