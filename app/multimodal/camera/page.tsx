'use client'

import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'

export default function CameraGesturePage() {
  const videoRef = useRef<HTMLVideoElement | null>(null)
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const [supported, setSupported] = useState(true)
  const [motionLevel, setMotionLevel] = useState(0)
  const [running, setRunning] = useState(false)

  useEffect(() => {
    if (!('mediaDevices' in navigator)) {
      setSupported(false)
      return
    }
  }, [])

  const start = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: false })
      if (videoRef.current) {
        videoRef.current.srcObject = stream
        await videoRef.current.play()
      }
      setRunning(true)
      loop()
    } catch (e) {
      setSupported(false)
    }
  }

  const stop = () => {
    if (videoRef.current && videoRef.current.srcObject) {
      const tracks = (videoRef.current.srcObject as MediaStream).getTracks()
      tracks.forEach(t => t.stop())
      videoRef.current.srcObject = null
    }
    setRunning(false)
  }

  // 简单运动检测：当前帧与上一帧差分
  let prev: ImageData | null = null
  const loop = () => {
    if (!running) return
    const v = videoRef.current
    const c = canvasRef.current
    if (!v || !c) return
    const w = 320, h = 180
    c.width = w; c.height = h
    const ctx = c.getContext('2d')!
    ctx.drawImage(v, 0, 0, w, h)
    const curr = ctx.getImageData(0, 0, w, h)
    if (prev) {
      let diff = 0
      for (let i = 0; i < curr.data.length; i += 4) {
        diff += Math.abs(curr.data[i] - prev.data[i])
        diff += Math.abs(curr.data[i+1] - prev.data[i+1])
        diff += Math.abs(curr.data[i+2] - prev.data[i+2])
      }
      const level = Math.min(100, Math.round(diff / (w*h*3) * 100 / 10))
      setMotionLevel(level)
    }
    prev = curr
    requestAnimationFrame(loop)
  }

  return (
    <main className="min-h-screen p-4">
      <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow p-4 border-2 border-cyan-200">
        <Link href="/" className="text-sm text-blue-600 hover:underline">← 返回主页</Link>
        <h1 className="text-xl font-bold text-cyan-600 mt-2 mb-2">📷 摄像头手势/运动演示</h1>
        <p className="text-sm text-gray-700 mb-3">基于帧差的简单“运动量”检测：挥手或移动时进度条会上升，保持静止会下降。</p>

        {!supported && (
          <div className="p-3 mb-3 rounded bg-cyan-50 border border-cyan-200 text-sm text-cyan-700">无法访问摄像头，或浏览器不支持。</div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center">
          <div className="rounded-xl border-2 border-gray-200 p-3 flex flex-col gap-2">
            <video ref={videoRef} className="w-full rounded bg-black" playsInline muted />
            <div className="flex gap-2">
              <button onClick={start} disabled={!supported || running} className={`px-4 py-2 rounded ${!supported||running?'bg-gray-300 text-gray-500':'bg-cyan-500 text-white hover:bg-cyan-600'}`}>启动摄像头</button>
              <button onClick={stop} disabled={!running} className={`px-4 py-2 rounded ${!running?'bg-gray-300 text-gray-500':'bg-gray-700 text-white hover:bg-gray-800'}`}>停止</button>
            </div>
          </div>
          <div className="rounded-xl border-2 border-gray-200 p-3">
            <div className="text-sm text-gray-600 mb-2">运动量</div>
            <div className="w-full h-3 bg-gray-200 rounded">
              <div className="h-3 rounded bg-cyan-500 transition-all" style={{ width: `${motionLevel}%` }} />
            </div>
            <div className="text-xs text-gray-600 mt-2">{motionLevel}%</div>
            <canvas ref={canvasRef} className="mt-3 w-full rounded border border-cyan-200" />
          </div>
        </div>
      </div>
    </main>
  )
}


