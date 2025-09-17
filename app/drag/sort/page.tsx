'use client'

import { useState } from 'react'

export default function DragSortPage() {
  const [items, setItems] = useState([
    { id: 'i1', label: '步骤 1：准备数据' },
    { id: 'i2', label: '步骤 2：训练模型' },
    { id: 'i3', label: '步骤 3：评估与部署' },
  ])

  const onDragStart = (e: React.DragEvent<HTMLDivElement>, id: string) => {
    e.dataTransfer.setData('text/plain', id)
  }
  const onDrop = (e: React.DragEvent<HTMLDivElement>, targetId: string) => {
    e.preventDefault()
    const sourceId = e.dataTransfer.getData('text/plain')
    if (!sourceId) return
    const srcIdx = items.findIndex((x) => x.id === sourceId)
    const tgtIdx = items.findIndex((x) => x.id === targetId)
    if (srcIdx === -1 || tgtIdx === -1 || srcIdx === tgtIdx) return
    const next = [...items]
    const [moved] = next.splice(srcIdx, 1)
    next.splice(tgtIdx, 0, moved)
    setItems(next)
  }
  const onDragOver = (e: React.DragEvent) => e.preventDefault()

  return (
    <main className="min-h-screen p-4">
      <div className="max-w-xl mx-auto bg-white rounded-2xl shadow p-4 border-2 border-green-200">
        <h1 className="text-xl font-bold text-green-600 mb-2">🧲 拖拽排序</h1>
        <p className="text-sm text-gray-600 mb-4">把条目拖到合适的位置，调整顺序。</p>

        <div className="space-y-2">
          {items.map((it) => (
            <div
              key={it.id}
              draggable
              onDragStart={(e) => onDragStart(e, it.id)}
              onDrop={(e) => onDrop(e, it.id)}
              onDragOver={onDragOver}
              className="px-3 py-2 rounded-lg border-2 border-green-200 bg-white hover:bg-green-50 cursor-grab active:cursor-grabbing"
            >
              {it.label}
            </div>
          ))}
        </div>
      </div>
    </main>
  )
}



