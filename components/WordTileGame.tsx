'use client'

import { motion } from 'framer-motion'
import { useMemo, useState } from 'react'

type Tile = {
  id: string // 语义标识，用于三消
  label: string // 展示的词
  emoji: string // 简单的图标代替图片
  x: number
  y: number
  z: number
  w: number
  h: number
}

type Slot = { id: string; label: string; emoji: string; uid: string }

function rectsOverlap(a: Tile, b: Tile): boolean {
  return !(
    a.x + a.w <= b.x ||
    b.x + b.w <= a.x ||
    a.y + a.h <= b.y ||
    b.y + b.h <= a.y
  )
}

export default function WordTileGame() {
  const initialTiles: Tile[] = useMemo(
    () => [
      // 分层堆叠，z越大越上层
      { id: '苹果', label: '苹果', emoji: '🍎', x: 10, y: 10, z: 1, w: 90, h: 60 },
      { id: '苹果', label: '苹果', emoji: '🍎', x: 70, y: 40, z: 2, w: 90, h: 60 },
      { id: '苹果', label: '苹果', emoji: '🍎', x: 130, y: 15, z: 3, w: 90, h: 60 },
      { id: '足球', label: '足球', emoji: '⚽️', x: 190, y: 50, z: 1, w: 90, h: 60 },
      { id: '足球', label: '足球', emoji: '⚽️', x: 250, y: 20, z: 2, w: 90, h: 60 },
      { id: '足球', label: '足球', emoji: '⚽️', x: 220, y: 80, z: 3, w: 90, h: 60 },
      { id: '书本', label: '书本', emoji: '📘', x: 40, y: 110, z: 1, w: 90, h: 60 },
      { id: '书本', label: '书本', emoji: '📘', x: 100, y: 130, z: 2, w: 90, h: 60 },
      { id: '书本', label: '书本', emoji: '📘', x: 160, y: 120, z: 3, w: 90, h: 60 },
      { id: '香蕉', label: '香蕉', emoji: '🍌', x: 280, y: 120, z: 1, w: 90, h: 60 },
      { id: '香蕉', label: '香蕉', emoji: '🍌', x: 320, y: 70, z: 2, w: 90, h: 60 },
      { id: '香蕉', label: '香蕉', emoji: '🍌', x: 350, y: 20, z: 3, w: 90, h: 60 },
    ],
    []
  )

  const [tiles, setTiles] = useState(initialTiles)
  const [slots, setSlots] = useState<Slot[]>([])
  const [status, setStatus] = useState<'playing' | 'win' | 'lose'>('playing')

  const isCovered = (tile: Tile): boolean => {
    // 有更高z并重叠则被覆盖
    return tiles.some((t) => t.z > tile.z && rectsOverlap(tile, t))
  }

  const handlePick = (tile: Tile) => {
    if (status !== 'playing') return
    if (isCovered(tile)) return

    // 从池中移除该tile
    setTiles((prev) => prev.filter((t) => !(t.x === tile.x && t.y === tile.y && t.z === tile.z)))

    const newSlot: Slot = { id: tile.id, label: tile.label, emoji: tile.emoji, uid: `${tile.id}-${Math.random()}` }
    setSlots((prev) => {
      const next = [...prev, newSlot]
      // 三消检测
      const map = new Map<string, number>()
      next.forEach((s) => map.set(s.id, (map.get(s.id) || 0) + 1))
      let cleared = false
      map.forEach((cnt, key) => {
        if (cnt >= 3) {
          // 清除最先出现的3个
          let need = 3
          for (let i = 0; i < next.length && need > 0; i++) {
            if (next[i].id === key) {
              next.splice(i, 1)
              i--
              need--
            }
          }
          cleared = true
        }
      })

      // 判定输赢
      if (!cleared && next.length > 7) {
        setStatus('lose')
      } else if (tiles.length - 1 === 0 && next.length === 0) {
        setStatus('win')
      }

      return [...next]
    })
  }

  const reset = () => {
    setTiles(initialTiles)
    setSlots([])
    setStatus('playing')
  }

  return (
    <div className="bg-white rounded-2xl shadow-xl p-4 border-4 border-indigo-200 w-full max-w-5xl mx-auto">
      {/* 顶部说明 */}
      <div className="text-center mb-3">
        <h3 className="text-xl font-bold text-indigo-600 mb-1">词了个词（简化版）</h3>
        <p className="text-sm text-gray-600">点击未被覆盖的卡片，底部槽位最多容纳7个；相同词语出现3次会自动消除。</p>
      </div>

      {/* 游戏区域 */}
      <div className="relative mx-auto bg-indigo-50 border border-indigo-200 rounded-xl" style={{ width: 460, height: 200 }}>
        {tiles
          .slice()
          .sort((a, b) => a.z - b.z)
          .map((tile) => {
            const covered = isCovered(tile)
            return (
              <motion.button
                key={`${tile.x}-${tile.y}-${tile.z}`}
                onClick={() => handlePick(tile)}
                whileHover={{ scale: covered ? 1 : 1.04 }}
                whileTap={{ scale: covered ? 1 : 0.98 }}
                className={`absolute rounded-xl border-2 px-3 py-2 bg-white shadow ${
                  covered ? 'opacity-40 cursor-not-allowed border-gray-300' : 'cursor-pointer border-indigo-300'
                }`}
                style={{ left: tile.x, top: tile.y, zIndex: tile.z, width: tile.w, height: tile.h }}
              >
                <div className="text-center">
                  <div className="text-2xl leading-none">{tile.emoji}</div>
                  <div className="text-sm text-gray-700">{tile.label}</div>
                </div>
              </motion.button>
            )
          })}
      </div>

      {/* 槽位 */}
      <div className="mt-4 bg-gray-50 border-2 border-gray-200 rounded-xl p-3">
        <div className="text-sm text-gray-500 mb-2">方块池（{slots.length}/7）</div>
        <div className="flex flex-wrap gap-2">
          {slots.map((s) => (
            <div key={s.uid} className="px-3 py-2 rounded-lg border-2 bg-white border-indigo-300 flex items-center gap-1">
              <span>{s.emoji}</span>
              <span className="text-gray-700 text-sm">{s.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* 结果与控制 */}
      <div className="mt-4 flex items-center justify-between">
        <div className={`text-sm ${status === 'win' ? 'text-green-600' : status === 'lose' ? 'text-red-600' : 'text-gray-500'}`}>
          {status === 'playing' && '目标：消除所有方块'}
          {status === 'win' && '🎉 恭喜过关！'}
          {status === 'lose' && '😢 槽位已满，游戏失败'}
        </div>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={reset}
          className="btn-secondary px-4 py-2"
        >
          🔄 重新开始
        </motion.button>
      </div>
    </div>
  )
}


