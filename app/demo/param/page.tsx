'use client'

import { useEffect, useState } from 'react'

export default function DemoParamPage() {
  const [a, setA] = useState(1.0)
  const [phase, setPhase] = useState(0)
  const [playing, setPlaying] = useState(true)

  useEffect(() => {
    if (!playing) return
    const t = setInterval(() => {
      setA((v) => (v >= 3 ? 1 : parseFloat((v + 0.1).toFixed(1))))
      setPhase((p) => (p + 0.15) % (Math.PI * 2))
    }, 300)
    return () => clearInterval(t)
  }, [playing])

  // 生成 y = a * sin(x + phase)
  const points = Array.from({ length: 60 }, (_, i) => {
    const x = (i / 59) * 10
    const y = a * Math.sin(x + phase)
    return { x, y }
  })

  // 映射到画布
  const width = 500, height = 200
  const toX = (x: number) => (x / 10) * (width - 20) + 10
  const toY = (y: number) => height / 2 - y * 30
  const path = points.map((p, i) => `${i === 0 ? 'M' : 'L'} ${toX(p.x)} ${toY(p.y)}`).join(' ')

  return (
    <main className="min-h-screen p-4">
      <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow p-4 border-2 border-indigo-200">
        <h1 className="text-xl font-bold text-indigo-600 mb-2">🎞️ 参数变化演示</h1>
        <p className="text-sm text-gray-600 mb-4">自动播放 y = a·sin(x+φ) 的曲线随参数变化的动态效果。</p>

        <div className="mb-3 text-sm text-gray-700">当前参数：a = <b>{a.toFixed(1)}</b>，φ = <b>{phase.toFixed(2)}</b></div>

        <svg width={width} height={height} className="rounded-xl border-2 border-indigo-300 bg-indigo-50">
          <path d={path} stroke="#4f46e5" strokeWidth={2} fill="none" />
          <line x1={10} y1={height/2} x2={width-10} y2={height/2} stroke="#a5b4fc" />
        </svg>

        <div className="mt-3 flex items-center gap-2">
          <button onClick={() => setPlaying((p) => !p)} className="px-3 py-1 rounded-lg bg-indigo-600 text-white hover:bg-indigo-700">{playing ? '暂停' : '播放'}</button>
          <button onClick={() => { setA(1); setPhase(0) }} className="px-3 py-1 rounded-lg bg-gray-200 hover:bg-gray-300 text-gray-700">重置</button>
        </div>
      </div>
    </main>
  )
}



