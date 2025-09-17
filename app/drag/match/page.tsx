'use client'

import { useMemo, useState } from 'react'

type Tile = { id: string; label: string; emoji: string; uid: string }

export default function DragMatchPage() {
  const poolInit = useMemo<Tile[]>(
    () => [
      { id: '苹果', label: '苹果', emoji: '🍎', uid: 'a1' },
      { id: '足球', label: '足球', emoji: '⚽️', uid: 'b1' },
      { id: '书本', label: '书本', emoji: '📘', uid: 'c1' },
      { id: '苹果', label: '苹果', emoji: '🍎', uid: 'a2' },
      { id: '足球', label: '足球', emoji: '⚽️', uid: 'b2' },
      { id: '书本', label: '书本', emoji: '📘', uid: 'c2' },
      { id: '苹果', label: '苹果', emoji: '🍎', uid: 'a3' },
      { id: '足球', label: '足球', emoji: '⚽️', uid: 'b3' },
      { id: '书本', label: '书本', emoji: '📘', uid: 'c3' },
    ],
    []
  )

  const [pool, setPool] = useState<Tile[]>(poolInit)
  const [slot, setSlot] = useState<Tile[]>([])
  const [score, setScore] = useState(0)

  const onDragStart = (e: React.DragEvent<HTMLButtonElement>, t: Tile) => {
    e.dataTransfer.setData('text/plain', t.uid)
  }

  const onDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    const uid = e.dataTransfer.getData('text/plain')
    const t = pool.find((x) => x.uid === uid)
    if (!t) return
    // move from pool to slot
    setPool((prev) => prev.filter((x) => x.uid !== uid))
    setSlot((prev) => {
      const next = [...prev, t]
      // check 3-match
      const count = next.filter((x) => x.id === t.id).length
      if (count >= 3) {
        setScore((s) => s + 1)
        // remove earliest 3 of that id
        let need = 3
        for (let i = 0; i < next.length && need > 0; i++) {
          if (next[i].id === t.id) {
            next.splice(i, 1)
            i--
            need--
          }
        }
      }
      return [...next]
    })
  }

  const onDragOver = (e: React.DragEvent) => e.preventDefault()

  const reset = () => {
    setPool(poolInit)
    setSlot([])
    setScore(0)
  }

  return (
    <main className="min-h-screen p-4">
      <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow p-4 border-2 border-indigo-200">
        <h1 className="text-xl font-bold text-indigo-600 mb-2">🧲 拖拽消除</h1>
        <p className="text-sm text-gray-600 mb-4">把相同的词拖到下方槽位，出现 3 个相同会自动消除，得分 +1（最多 7 个槽位）。</p>

        {/* 词卡池 */}
        <div className="grid grid-cols-3 gap-2 mb-4">
          {pool.map((t) => (
            <button
              key={t.uid}
              draggable
              onDragStart={(e) => onDragStart(e, t)}
              className="px-3 py-2 rounded-lg border-2 border-indigo-300 bg-white hover:bg-indigo-50 flex items-center gap-2 justify-center"
            >
              <span>{t.emoji}</span>
              <span className="text-sm text-gray-700">{t.label}</span>
            </button>
          ))}
        </div>

        {/* 槽位 */}
        <div onDrop={onDrop} onDragOver={onDragOver} className="min-h-[76px] rounded-xl border-2 border-dashed border-indigo-300 bg-indigo-50 p-2 flex flex-wrap gap-2">
          {slot.map((s) => (
            <div key={s.uid} className="px-3 py-2 rounded-lg border-2 bg-white border-indigo-300 flex items-center gap-2">
              <span>{s.emoji}</span>
              <span className="text-sm text-gray-700">{s.label}</span>
            </div>
          ))}
          {slot.length === 0 && <span className="text-xs text-indigo-400">把词卡拖到这里</span>}
        </div>

        {/* 状态 */}
        <div className="mt-3 flex items-center justify-between text-sm text-gray-700">
          <div>槽位：{slot.length}/7</div>
          <div>得分：<b className="text-indigo-600">{score}</b></div>
          <button onClick={reset} className="px-3 py-1 rounded-full bg-indigo-500 text-white hover:bg-indigo-600">重新开始</button>
        </div>
      </div>
    </main>
  )
}



