'use client'

import { useRef, useState } from 'react'

export default function DragAdjustPage() {
  const [radius, setRadius] = useState(50)
  const [x, setX] = useState(150)
  const trackRef = useRef<HTMLDivElement | null>(null)
  const [dragging, setDragging] = useState(false)

  const onPointerDown = (e: React.PointerEvent) => {
    setDragging(true)
    ;(e.target as Element).setPointerCapture(e.pointerId)
  }
  const onPointerMove = (e: React.PointerEvent) => {
    if (!dragging || !trackRef.current) return
    const rect = trackRef.current.getBoundingClientRect()
    const nx = Math.max(rect.left, Math.min(rect.right, e.clientX)) - rect.left
    setX(Math.round(nx))
  }
  const onPointerUp = (e: React.PointerEvent) => {
    setDragging(false)
    ;(e.target as Element).releasePointerCapture(e.pointerId)
  }

  return (
    <main className="min-h-screen p-4">
      <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow p-4 border-2 border-orange-200">
        <h1 className="text-xl font-bold text-orange-600 mb-2">🧲 拖拽调整</h1>
        <p className="text-sm text-gray-600 mb-4">拖动下方滑块改变圆的半径；拖动圆心（水平方向）观察覆盖面积与参数的关系。</p>

        {/* 参数滑块 */}
        <div className="mb-4">
          <label className="text-sm text-gray-700">半径：<b>{radius}</b> px</label>
          <input
            type="range"
            min={20}
            max={120}
            value={radius}
            onChange={(e) => setRadius(Number(e.target.value))}
            className="w-full accent-orange-500"
          />
        </div>

        {/* 拖拽轨道与圆 */}
        <div
          ref={trackRef}
          onPointerMove={onPointerMove}
          onPointerUp={onPointerUp}
          className="relative h-56 rounded-xl border-2 border-dashed border-orange-300 bg-orange-50 overflow-hidden"
        >
          {/* 圆 */}
          <div
            style={{ left: x - radius, top: 110 - radius, width: radius * 2, height: radius * 2 }}
            className="absolute rounded-full bg-gradient-to-br from-orange-400/70 to-amber-300/70 border-2 border-orange-500"
          />

          {/* 可拖拽圆心 */}
          <div
            style={{ left: x - 10, top: 110 - 10 }}
            onPointerDown={onPointerDown}
            className="absolute w-5 h-5 rounded-full bg-orange-600 cursor-grab active:cursor-grabbing shadow"
            title="拖动我改变圆心位置（仅水平）"
          />

          {/* 参考线 */}
          <div className="absolute left-0 right-0 top-[110px] h-px bg-orange-300" />
        </div>

        {/* 实时数值 */}
        <div className="mt-4 grid grid-cols-3 gap-2 text-sm text-gray-700">
          <div className="p-2 border rounded-lg">圆心X：<b>{x}</b> px</div>
          <div className="p-2 border rounded-lg">半径：<b>{radius}</b> px</div>
          <div className="p-2 border rounded-lg">近似面积：<b>{Math.round(Math.PI * radius * radius)}</b> px²</div>
        </div>
      </div>
    </main>
  )
}



