'use client'

import { useMemo, useState } from 'react'

type Piece = { id: string; color: string; w: number; h: number }

export default function DragAssemblePage() {
  const pieces = useMemo<Piece[]>(
    () => [
      { id: 'p1', color: '#60a5fa', w: 100, h: 100 }, // 正方形块
      { id: 'p2', color: '#34d399', w: 100, h: 50 },  // 矩形块
      { id: 'p3', color: '#f59e0b', w: 100, h: 50 },  // 矩形块
    ],
    []
  )

  const [pool, setPool] = useState(pieces.map((p) => p.id))
  const [slots, setSlots] = useState<Record<string, string | null>>({ s1: null, s2: null, s3: null })

  const onDragStart = (e: React.DragEvent<HTMLDivElement>, id: string) => {
    e.dataTransfer.setData('text/plain', id)
  }

  const onDrop = (slot: 's1' | 's2' | 's3') => (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    const id = e.dataTransfer.getData('text/plain')
    if (!id || !pool.includes(id)) return
    setPool((prev) => prev.filter((x) => x !== id))
    setSlots((prev) => ({ ...prev, [slot]: id }))
  }

  const onDragOver = (e: React.DragEvent) => e.preventDefault()

  const reset = () => {
    setPool(pieces.map((p) => p.id))
    setSlots({ s1: null, s2: null, s3: null })
  }

  const getPiece = (id: string | null) => pieces.find((p) => p.id === id)
  const complete = pool.length === 0

  return (
    <main className="min-h-screen p-4">
      <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow p-4 border-2 border-blue-200">
        <h1 className="text-xl font-bold text-blue-600 mb-2">🧲 拖拽拼装</h1>
        <p className="text-sm text-gray-600 mb-4">把左侧零件拖到右侧轮廓中，拼成一个 200×200 的大正方形。</p>

        <div className="grid grid-cols-2 gap-4">
          {/* 组件池 */}
          <div className="border-2 border-dashed border-blue-300 rounded-xl p-3 min-h-[220px]">
            <div className="text-xs text-blue-400 mb-2">零件池</div>
            <div className="flex flex-wrap gap-2">
              {pool.map((id) => {
                const p = getPiece(id)!
                return (
                  <div
                    key={id}
                    draggable
                    onDragStart={(e) => onDragStart(e, id)}
                    className="rounded-lg cursor-grab active:cursor-grabbing border-2 border-blue-200"
                    style={{ width: p.w, height: p.h, background: p.color }}
                    title={`拖拽到右侧轮廓中（${p.w}×${p.h})`}
                  />
                )
              })}
            </div>
          </div>

          {/* 目标轮廓 */}
          <div className="border-4 border-blue-400 rounded-xl p-3 bg-blue-50">
            <div className="text-xs text-blue-500 mb-2">目标：200×200</div>
            <div className="grid grid-rows-2 grid-cols-2 gap-2" style={{ width: 200, height: 200 }}>
              {/* s1 放 100×100 */}
              <div onDrop={onDrop('s1')} onDragOver={onDragOver} className="bg-white/70 border-2 border-dashed border-blue-300 rounded flex items-center justify-center">
                {slots.s1 && (
                  <div style={{ width: 100, height: 100, background: getPiece(slots.s1)!.color }} className="rounded" />
                )}
              </div>
              {/* s2 放 100×50（上） */}
              <div onDrop={onDrop('s2')} onDragOver={onDragOver} className="bg-white/70 border-2 border-dashed border-blue-300 rounded flex items-center justify-center">
                {slots.s2 && (
                  <div style={{ width: 100, height: 50, background: getPiece(slots.s2)!.color }} className="rounded" />
                )}
              </div>
              {/* s3 放 100×50（下） */}
              <div onDrop={onDrop('s3')} onDragOver={onDragOver} className="bg-white/70 border-2 border-dashed border-blue-300 rounded flex items-center justify-center">
                {slots.s3 && (
                  <div style={{ width: 100, height: 50, background: getPiece(slots.s3)!.color }} className="rounded" />
                )}
              </div>
              {/* 占位空白，用于凑 2×2 网格 */}
              <div className="bg-transparent" />
            </div>
            <div className="mt-3 text-sm">
              {complete ? <span className="text-green-600 font-semibold">🎉 拼装完成！</span> : <span className="text-gray-500">提示：需要一个 100×100 和两个 100×50</span>}
            </div>
          </div>
        </div>

        <div className="text-right mt-3">
          <button onClick={reset} className="px-3 py-1 rounded-full bg-blue-500 text-white hover:bg-blue-600">重新开始</button>
        </div>
      </div>
    </main>
  )
}



