'use client'

import { useMemo, useState } from 'react'

type Item = { id: string; label: string; emoji: string; type: '水果' | '运动' }

export default function DragClassifyPage() {
  const items = useMemo<Item[]>(
    () => [
      { id: 'a1', label: '苹果', emoji: '🍎', type: '水果' },
      { id: 'a2', label: '香蕉', emoji: '🍌', type: '水果' },
      { id: 'b1', label: '足球', emoji: '⚽️', type: '运动' },
      { id: 'b2', label: '篮球', emoji: '🏀', type: '运动' },
    ],
    []
  )

  const [pool, setPool] = useState(items)
  const [left, setLeft] = useState<Item[]>([])
  const [right, setRight] = useState<Item[]>([])

  const onDragStart = (e: React.DragEvent<HTMLDivElement>, id: string) => {
    e.dataTransfer.setData('text/plain', id)
  }
  const onDrop = (bucket: 'left' | 'right') => (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    const id = e.dataTransfer.getData('text/plain')
    const it = pool.find((x) => x.id === id)
    if (!it) return
    setPool((prev) => prev.filter((x) => x.id !== id))
    if (bucket === 'left') setLeft((prev) => [...prev, it])
    else setRight((prev) => [...prev, it])
  }
  const onDragOver = (e: React.DragEvent) => e.preventDefault()

  const reset = () => {
    setPool(items)
    setLeft([])
    setRight([])
  }

  const score = left.filter((x) => x.type === '水果').length + right.filter((x) => x.type === '运动').length

  return (
    <main className="min-h-screen p-4">
      <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow p-4 border-2 border-purple-200">
        <h1 className="text-xl font-bold text-purple-600 mb-2">🧲 拖拽分类</h1>
        <p className="text-sm text-gray-600 mb-4">把“水果”拖到左边，“运动”拖到右边，看看能得几分！</p>

        {/* 词卡池 */}
        <div className="grid grid-cols-4 gap-2 mb-4">
          {pool.map((it) => (
            <div
              key={it.id}
              draggable
              onDragStart={(e) => onDragStart(e, it.id)}
              className="px-3 py-2 rounded-lg border-2 border-purple-200 bg-white hover:bg-purple-50 cursor-grab active:cursor-grabbing text-center"
            >
              <div>{it.emoji}</div>
              <div className="text-sm text-gray-700">{it.label}</div>
            </div>
          ))}
        </div>

        {/* 桶区 */}
        <div className="grid grid-cols-2 gap-3">
          <div onDrop={onDrop('left')} onDragOver={onDragOver} className="min-h-[120px] rounded-xl border-2 border-dashed border-purple-300 bg-purple-50 p-3">
            <div className="text-xs text-purple-500 mb-2">左边：水果</div>
            <div className="flex flex-wrap gap-2">
              {left.map((it) => (
                <div key={it.id} className="px-3 py-2 rounded-lg border-2 border-purple-200 bg-white flex items-center gap-2">
                  <span>{it.emoji}</span>
                  <span className="text-sm text-gray-700">{it.label}</span>
                </div>
              ))}
            </div>
          </div>
          <div onDrop={onDrop('right')} onDragOver={onDragOver} className="min-h-[120px] rounded-xl border-2 border-dashed border-purple-300 bg-purple-50 p-3">
            <div className="text-xs text-purple-500 mb-2">右边：运动</div>
            <div className="flex flex-wrap gap-2">
              {right.map((it) => (
                <div key={it.id} className="px-3 py-2 rounded-lg border-2 border-purple-200 bg-white flex items-center gap-2">
                  <span>{it.emoji}</span>
                  <span className="text-sm text-gray-700">{it.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* 成绩与操作 */}
        <div className="mt-3 flex items-center justify-between text-sm text-gray-700">
          <div>正确数：<b className="text-purple-600">{score}</b></div>
          <button onClick={reset} className="px-3 py-1 rounded-full bg-purple-500 text-white hover:bg-purple-600">重新开始</button>
        </div>
      </div>
    </main>
  )
}



