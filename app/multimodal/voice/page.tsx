'use client'

import Link from 'next/link'
import { useEffect, useMemo, useRef, useState } from 'react'

type Command = '更大' | '更小' | '暂停' | '继续'

export default function VoiceControlPage() {
  const [supported, setSupported] = useState(false)
  const [listening, setListening] = useState(false)
  const [lastText, setLastText] = useState('')
  const [size, setSize] = useState(60)
  const [paused, setPaused] = useState(false)
  const [x, setX] = useState(0)
  const rafRef = useRef(0)

  // 简单左右来回运动
  useEffect(() => {
    const step = () => {
      if (!paused) {
        setX((v) => (v + 2) % 400)
      }
      rafRef.current = requestAnimationFrame(step)
    }
    rafRef.current = requestAnimationFrame(step)
    return () => cancelAnimationFrame(rafRef.current)
  }, [paused])

  useEffect(() => {
    const SpeechRecognition: any = (window as any).webkitSpeechRecognition || (window as any).SpeechRecognition
    setSupported(!!SpeechRecognition)
  }, [])

  const startListen = () => {
    const SpeechRecognition: any = (window as any).webkitSpeechRecognition || (window as any).SpeechRecognition
    if (!SpeechRecognition) return
    const recog = new SpeechRecognition()
    recog.lang = 'zh-CN'
    recog.continuous = false
    recog.interimResults = false
    setListening(true)
    recog.onresult = (e: any) => {
      const text = Array.from(e.results).map((r: any) => r[0].transcript).join('')
      handleCommand(text)
      setLastText(text)
    }
    recog.onend = () => setListening(false)
    recog.start()
  }

  const handleCommand = (txt: string) => {
    const t = txt.trim()
    if (t.includes('暂停')) setPaused(true)
    if (t.includes('继续')) setPaused(false)
    if (t.includes('更大')) setSize((s) => Math.min(120, s + 10))
    if (t.includes('更小')) setSize((s) => Math.max(20, s - 10))
  }

  return (
    <main className="min-h-screen p-4">
      <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow p-4 border-2 border-rose-200">
        <Link href="/" className="text-sm text-blue-600 hover:underline">← 返回主页</Link>
        <h1 className="text-xl font-bold text-rose-600 mt-2 mb-2">🎤 语音控制演示</h1>
        <p className="text-sm text-gray-700 mb-3">说“更大/更小/暂停/继续”来控制右侧小球动画与大小。</p>

        {!supported && (
          <div className="p-3 mb-3 rounded bg-rose-50 border border-rose-200 text-sm text-rose-700">
            当前浏览器不支持语音识别（SpeechRecognition）。请使用最新版 Chrome。
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center">
          <div className="rounded-xl border-2 border-gray-200 p-3">
            <div className="text-sm text-gray-600 mb-2">语音控制</div>
            <button onClick={startListen} disabled={!supported || listening} className={`px-4 py-2 rounded ${!supported||listening?'bg-gray-300 text-gray-500':'bg-rose-500 text-white hover:bg-rose-600'}`}>{listening?'正在聆听...':'开始聆听'}</button>
            <div className="mt-2 text-xs text-gray-500">最后识别：{lastText || '（无）'}</div>
          </div>
          <div className="rounded-xl border-2 border-gray-200 p-3">
            <div className="text-sm text-gray-600 mb-2">动画区域</div>
            <div className="relative h-40 rounded bg-rose-50 border border-rose-200 overflow-hidden">
              <div className="absolute top-1/2 -translate-y-1/2" style={{ left: x }}>
                <div className="rounded-full bg-rose-500" style={{ width: size, height: size }} />
              </div>
            </div>
            <div className="mt-2 flex gap-2 text-xs text-gray-600">
              <span>大小：{size}px</span>
              <span>状态：{paused ? '已暂停' : '播放中'}</span>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}


