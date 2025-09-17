'use client'

import { useEffect, useRef } from 'react'

export default function DemoSimulatePage() {
  const ref = useRef<HTMLCanvasElement | null>(null)

  useEffect(() => {
    const canvas = ref.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')!
    let raf = 0
    const W = canvas.width
    const H = canvas.height

    type Ball = { x: number; y: number; vx: number; vy: number; r: number }
    const balls: Ball[] = Array.from({ length: 12 }, () => ({
      x: Math.random() * W,
      y: Math.random() * H,
      vx: (Math.random() - 0.5) * 2,
      vy: (Math.random() - 0.5) * 2,
      r: 4 + Math.random() * 3,
    }))

    const step = () => {
      ctx.clearRect(0, 0, W, H)
      // 简单双向碰壁运动，重力向下
      for (const b of balls) {
        b.vy += 0.03
        b.x += b.vx
        b.y += b.vy
        if (b.x < b.r || b.x > W - b.r) b.vx *= -1
        if (b.y > H - b.r) { b.y = H - b.r; b.vy *= -0.8 }
        ctx.beginPath()
        ctx.arc(b.x, b.y, b.r, 0, Math.PI * 2)
        ctx.fillStyle = '#10b981'
        ctx.fill()
      }
      raf = requestAnimationFrame(step)
    }
    raf = requestAnimationFrame(step)
    return () => cancelAnimationFrame(raf)
  }, [])

  return (
    <main className="min-h-screen p-4">
      <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow p-4 border-2 border-green-200">
        <h1 className="text-xl font-bold text-green-600 mb-2">🎞️ 模拟演示</h1>
        <p className="text-sm text-gray-600 mb-3">小球受重力下落并与地面弹性碰撞，简单演示“现象再现”。</p>
        <canvas ref={ref} width={500} height={220} className="rounded-xl border-2 border-green-300 bg-green-50" />
      </div>
    </main>
  )
}



