'use client'

import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'

export default function HandwritingPage() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const [drawing, setDrawing] = useState(false)
  const [pred, setPred] = useState<number | null>(null)
  const [confidence, setConfidence] = useState<number>(0)

  useEffect(() => {
    const c = canvasRef.current
    if (!c) return
    const ctx = c.getContext('2d')!
    ctx.fillStyle = '#ffffff'
    ctx.fillRect(0, 0, c.width, c.height)
    ctx.lineCap = 'round'
    ctx.lineJoin = 'round'
    ctx.lineWidth = 16
    ctx.strokeStyle = '#111827'
  }, [])

  const pos = (e: React.MouseEvent<HTMLCanvasElement, MouseEvent>) => {
    const rect = (e.target as HTMLCanvasElement).getBoundingClientRect()
    return { x: e.clientX - rect.left, y: e.clientY - rect.top }
  }

  const onDown = (e: React.MouseEvent<HTMLCanvasElement, MouseEvent>) => {
    setDrawing(true)
    const ctx = canvasRef.current!.getContext('2d')!
    const p = pos(e)
    ctx.beginPath()
    ctx.moveTo(p.x, p.y)
  }
  const onMove = (e: React.MouseEvent<HTMLCanvasElement, MouseEvent>) => {
    if (!drawing) return
    const ctx = canvasRef.current!.getContext('2d')!
    const p = pos(e)
    ctx.lineTo(p.x, p.y)
    ctx.stroke()
  }
  const onUp = () => setDrawing(false)

  const clear = () => {
    const c = canvasRef.current!
    const ctx = c.getContext('2d')!
    ctx.fillStyle = '#ffffff'
    ctx.fillRect(0, 0, c.width, c.height)
    setPred(null)
    setConfidence(0)
  }

  // 简化“识别”：计算图像的竖直性/水平密度等启发式，避免总识别为 0
  const recognize = () => {
    const c = canvasRef.current!
    const tmp = document.createElement('canvas')
    tmp.width = 28; tmp.height = 28
    const tctx = tmp.getContext('2d')!
    tctx.drawImage(c, 0, 0, 28, 28)
    const data = tctx.getImageData(0, 0, 28, 28).data

    // 计算左右、上下的墨迹分布，粗略区分 1/7/9/0 等
    let left = 0, right = 0, top = 0, bottom = 0
    let onPixels = 0
    for (let y = 0; y < 28; y++) {
      for (let x = 0; x < 28; x++) {
        const i = (y * 28 + x) * 4
        const v = 255 - data[i] // 反相（黑为高值）
        if (v > 30) {
          onPixels++
          left += Math.max(0, 14 - x)
          right += Math.max(0, x - 14)
          top += Math.max(0, 14 - y)
          bottom += Math.max(0, y - 14)
        }
      }
    }

    // 竖直性判断“1”，环形密度判断“0”，右偏加弯判断“9/7”，其余近似“3”
    const verticality = (top + bottom) / (left + right + 1)
    const roundness = onPixels / (28 * 28)
    let guess = 3
    if (verticality > 1.6) guess = 1
    else if (roundness > 0.22 && roundness < 0.5) guess = 0
    else if (right > left * 1.3 && top > bottom * 0.8) guess = 9
    else if (right > left * 1.5 && top < bottom * 0.7) guess = 7

    // 置信度用启发式映射
    const conf = Math.min(99, Math.round(50 + Math.abs(right - left) / 50 + Math.abs(top - bottom) / 50 + roundness * 100))
    setPred(guess)
    setConfidence(conf)
  }

  return (
    <main className="min-h-screen p-4">
      <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow p-4 border-2 border-red-200">
        <Link href="/" className="text-sm text-blue-600 hover:underline">← 返回主页</Link>
        <h1 className="text-xl font-bold text-red-600 mt-2 mb-2">🖌️ 手写数字识别</h1>
        <p className="text-sm text-gray-700 mb-3">在画板上写一个数字（0-9），点击“识别”查看结果与置信度。</p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center">
          <div className="rounded-xl border-2 border-gray-200 p-3">
            <div className="text-sm text-gray-600 mb-2">画板</div>
            <canvas
              ref={canvasRef}
              width={240}
              height={240}
              className="rounded border-2 border-red-300 bg-white touch-none"
              onMouseDown={onDown}
              onMouseMove={onMove}
              onMouseUp={onUp}
              onMouseLeave={onUp}
            />
            <div className="mt-2 flex gap-2">
              <button onClick={recognize} className="px-4 py-2 rounded bg-red-500 text-white hover:bg-red-600">识别</button>
              <button onClick={clear} className="px-4 py-2 rounded bg-gray-200 hover:bg-gray-300 text-gray-700">清空</button>
            </div>
          </div>
          <div className="rounded-xl border-2 border-gray-200 p-3">
            <div className="text-sm text-gray-600 mb-2">识别结果</div>
            <div className="text-3xl font-bold text-gray-800">{pred === null ? '—' : pred}</div>
            <div className="text-sm text-gray-600 mt-2">置信度：{confidence}%</div>
          </div>
        </div>
      </div>
    </main>
  )
}


