'use client'

import { useEffect, useState } from 'react'

function genPoints(kind: '低频' | '高频') {
  const n = kind === '低频' ? 20 : 60
  return Array.from({ length: n }, () => ({
    x: Math.random(),
    y: Math.random(),
  }))
}

export default function DemoComparePage() {
  const [left] = useState(genPoints('低频'))
  const [right] = useState(genPoints('高频'))

  const w = 240, h = 160
  const dot = (p: {x:number;y:number}, c: string, k: number) => (
    <circle key={`${k}`} cx={10 + p.x*(w-20)} cy={10 + p.y*(h-20)} r={3} fill={c} />
  )

  return (
    <main className="min-h-screen p-4">
      <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow p-4 border-2 border-blue-200">
        <h1 className="text-xl font-bold text-blue-600 mb-2">🎞️ 对比演示</h1>
        <p className="text-sm text-gray-600 mb-4">并排对比两种点分布（左：点少，右：点多），方便直观看差异。</p>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <div className="text-xs text-blue-500 mb-1">点较少</div>
            <svg width={w} height={h} className="rounded-xl border-2 border-blue-300 bg-blue-50">
              {left.map((p,i)=>dot(p,'#2563eb',i))}
            </svg>
          </div>
          <div>
            <div className="text-xs text-blue-500 mb-1">点较多</div>
            <svg width={w} height={h} className="rounded-xl border-2 border-blue-300 bg-blue-50">
              {right.map((p,i)=>dot(p,'#1e40af',i))}
            </svg>
          </div>
        </div>
      </div>
    </main>
  )
}



