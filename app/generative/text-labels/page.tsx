'use client'

import Link from 'next/link'
import { useMemo, useState } from 'react'

function analyzeSentiment(text: string): { label: '积极' | '中性' | '消极'; score: number } {
  const posWords = ['开心','快乐','喜欢','棒','美好','赞','不错','可爱','幸福','晴朗','顺利','成功']
  const negWords = ['难过','伤心','讨厌','生气','糟糕','不好','失败','生病','阴沉','沮丧','焦虑']
  let pos = 0, neg = 0
  for (const w of posWords) if (text.includes(w)) pos++
  for (const w of negWords) if (text.includes(w)) neg++
  const score = pos - neg
  if (score > 0) return { label: '积极', score }
  if (score < 0) return { label: '消极', score }
  return { label: '中性', score }
}

function extractKeywords(text: string): string[] {
  const stop = new Set(['的','了','和','也','很','我','你','他','她','它','在','是','有','与','就','都','而','及','或','被','给','对','吗','啊','呢','吧'])
  const tokens = text.split(/\s+|，|。|！|？|、|；|：|\.|,|!|\?/).filter(Boolean)
  const counts: Record<string, number> = {}
  for (const t of tokens) {
    if (t.length < 1 || stop.has(t)) continue
    counts[t] = (counts[t] || 0) + 1
  }
  return Object.entries(counts).sort((a,b)=>b[1]-a[1]).slice(0,5).map(([w])=>w)
}

export default function TextLabelsPage() {
  const [text, setText] = useState('今天天气晴朗，我和同学一起完成了一个很棒的小实验！')
  const sentiment = useMemo(() => analyzeSentiment(text), [text])
  const keywords = useMemo(() => extractKeywords(text), [text])

  return (
    <main className="min-h-screen p-4">
      <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow p-4 border-2 border-pink-200">
        <Link href="/" className="text-sm text-blue-600 hover:underline">← 返回主页</Link>
        <h1 className="text-xl font-bold text-pink-600 mt-2 mb-2">🧠 文本情绪与关键词</h1>
        <p className="text-sm text-gray-700 mb-3">输入一句话，系统根据词语线索给出“情绪标签”，并提取“关键词”。</p>

        <textarea value={text} onChange={(e)=>setText(e.target.value)} rows={4} className="w-full p-3 rounded border-2 border-pink-300 bg-pink-50 focus:outline-none" />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
          <div className="rounded-xl border-2 border-gray-200 p-3">
            <div className="text-sm text-gray-600 mb-2">情绪分析</div>
            <div className="text-2xl font-bold">{sentiment.label}</div>
            <div className="text-xs text-gray-600 mt-1">分数（正&gt;0，负&lt;0）：{sentiment.score}</div>
          </div>
          <div className="rounded-xl border-2 border-gray-200 p-3">
            <div className="text-sm text-gray-600 mb-2">关键词</div>
            <div className="flex flex-wrap gap-2">
              {keywords.length === 0 ? (<span className="text-xs text-gray-500">（未提取到关键词）</span>) : (
                keywords.map(k => <span key={k} className="px-2 py-1 rounded-full bg-pink-100 border border-pink-300 text-sm">{k}</span>)
              )}
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}


