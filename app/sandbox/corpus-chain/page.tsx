'use client'

import Link from 'next/link'
import { useState } from 'react'

type Model = 'classical' | 'math' | 'fairy'

const responses: Record<Model, string[]> = {
  classical: [
    '学而时习之，不亦说乎？',
    '海内存知己，天涯若比邻。',
    '会当凌绝顶，一览众山小。',
  ],
  math: [
    '圆的面积 S=πr²，周长 C=2πr。',
    '分数加法需先通分，再把分子相加。',
    '三角形内角和为 180°。',
  ],
  fairy: [
    '从前有座小城堡，住着一位勇敢的小骑士。',
    '小狐狸捡到一颗会发光的果实。',
    '森林里传来叮叮当当的精灵笑声。',
  ],
}

export default function CorpusChainPage() {
  const [model, setModel] = useState<Model>('math')
  const [inputText, setInputText] = useState('从前')
  const [gen, setGen] = useState('')
  const [loading, setLoading] = useState(false)

  const generate = () => {
    setLoading(true)
    setGen('')
    setTimeout(() => {
      const list = responses[model]
      const pick = list[Math.floor(Math.random() * list.length)]
      setGen(pick)
      setLoading(false)
    }, 700)
  }

  const append = () => {
    if (!gen) return
    setInputText((s) => s + gen)
    setGen('')
  }

  const reset = () => {
    setInputText('从前')
    setGen('')
    setLoading(false)
  }

  return (
    <main className="min-h-screen p-4">
      <div className="max-w-xl mx-auto bg-white rounded-2xl shadow p-4 border-2 border-purple-200">
        <Link href="/" className="text-sm text-blue-600 hover:underline">← 返回主页</Link>
        <h1 className="text-xl font-bold text-purple-600 mt-2 mb-2">📚 语料接龙</h1>
        <p className="text-sm text-gray-700 mb-3">选择不同语料风格进行文字续写：古文 / 数学 / 童话。</p>

        <div className="flex gap-2 mb-3">
          <button onClick={()=>setModel('classical')} className={`px-3 py-1 rounded ${model==='classical'?'bg-gray-900 text-white':'bg-gray-200'}`}>古文</button>
          <button onClick={()=>setModel('math')} className={`px-3 py-1 rounded ${model==='math'?'bg-gray-900 text-white':'bg-gray-200'}`}>数学</button>
          <button onClick={()=>setModel('fairy')} className={`px-3 py-1 rounded ${model==='fairy'?'bg-gray-900 text-white':'bg-gray-200'}`}>童话</button>
        </div>

        <div className="bg-gray-900 rounded-xl p-4 mb-3">
          <div className="bg-black text-white rounded p-3 min-h-[72px] flex items-center text-lg">
            <span className="text-green-400 font-semibold">{inputText}</span>
            {loading && <span className="text-gray-400 ml-2 animate-pulse">...</span>}
            {gen && <span className="ml-2">{gen}</span>}
          </div>
          <div className="mt-3 flex gap-2">
            <input value={inputText} onChange={(e)=>{ setInputText(e.target.value); setGen('') }} placeholder="输入开头..." className="flex-1 p-2 rounded bg-gray-800 text-white border border-gray-700" />
            <button onClick={generate} disabled={loading || !inputText} className={`px-4 py-2 rounded ${loading||!inputText? 'bg-gray-600 text-gray-300' : 'bg-purple-500 text-white hover:bg-purple-600'}`}>生成</button>
          </div>
          {gen && (
            <button onClick={append} className="mt-2 w-full px-4 py-2 rounded bg-blue-500 text-white hover:bg-blue-600">接上</button>
          )}
        </div>

        <button onClick={reset} className="px-4 py-2 rounded bg-indigo-500 text-white hover:bg-indigo-600">重新开始</button>
      </div>
    </main>
  )
}


