'use client'

import { useEffect, useRef, useState } from 'react'

export default function DemoMetaphorPage() {
  const ref = useRef<HTMLDivElement | null>(null)
  const [signals, setSignals] = useState<Array<{x:number;y:number;id:number}>>([])

  useEffect(() => {
    // 在“节点”间生成小球，模拟“信号小球”沿边移动（隐喻神经元传递）
    const timer = setInterval(() => {
      setSignals((prev) => (prev.length > 20 ? [] : [...prev, { x: 30, y: 60, id: Date.now() }]))
    }, 500)
    return () => clearInterval(timer)
  }, [])

  return (
    <main className="min-h-screen p-4">
      <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow p-4 border-2 border-purple-200">
        <h1 className="text-xl font-bold text-purple-600 mb-2">🎞️ 隐喻演示</h1>
        <p className="text-sm text-gray-600 mb-3">“信号小球”从输入节点流向输出节点，隐喻神经网络中的信息传递。</p>
        <div ref={ref} className="relative rounded-xl border-2 border-purple-300 bg-purple-50" style={{ width: 520, height: 180 }}>
          {/* 三个“节点” */}
          <Node x={30} y={60} label="输入" color="#8b5cf6" />
          <Node x={220} y={40} label="隐层" color="#a78bfa" />
          <Node x={420} y={60} label="输出" color="#c4b5fd" />
          {/* 边 */}
          <Edge x1={60} y1={90} x2={250} y2={70} />
          <Edge x1={250} y1={70} x2={450} y2={90} />
          {/* 流动的小球 */}
          {signals.map((s) => (
            <Flow key={s.id} start={{x:60,y:90}} mid={{x:250,y:70}} end={{x:450,y:90}} />
          ))}
        </div>
      </div>
    </main>
  )
}

function Node({ x, y, label, color }: { x: number; y: number; label: string; color: string }) {
  return (
    <div className="absolute text-xs" style={{ left: x, top: y }}>
      <div className="w-14 h-14 rounded-full flex items-center justify-center text-white shadow" style={{ background: color }}>{label}</div>
    </div>
  )
}

function Edge({ x1, y1, x2, y2 }: { x1: number; y1: number; x2: number; y2: number }) {
  const w = Math.hypot(x2 - x1, y2 - y1)
  const a = Math.atan2(y2 - y1, x2 - x1) * 180 / Math.PI
  return (
    <div className="absolute h-1 bg-purple-300 origin-left" style={{ left: x1, top: y1, width: w, transform: `rotate(${a}deg)` }} />
  )
}

function Flow({ start, mid, end }: { start: {x:number;y:number}; mid:{x:number;y:number}; end:{x:number;y:number} }) {
  const ref = useRef<HTMLDivElement | null>(null)
  useEffect(() => {
    const el = ref.current!
    el.animate([
      { transform: `translate(${start.x}px, ${start.y}px)` },
      { transform: `translate(${mid.x}px, ${mid.y}px)` },
      { transform: `translate(${end.x}px, ${end.y}px)` },
    ], { duration: 1500, easing: 'ease-in-out' })
  }, [])
  return <div ref={ref} className="absolute w-3 h-3 rounded-full bg-purple-600 shadow" />
}



