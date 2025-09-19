export interface CardData {
  title: string
  desc: string
  href: string
  emoji: string
  color: string
}

export interface Section {
  id: string
  title: string
  titleColor: string
  description?: string
  details?: string[]
  cards: CardData[]
  gridCols: string
}

export const sections: Section[] = [
  {
    id: 'basic',
    title: '📚 基础交互',
    titleColor: 'text-pink-600',
    description: '选择题 / 填空题 / 快速对错判断 / 即时反馈结果',
    gridCols: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-4',
    cards: [
      {
        title: '选择题',
        href: '/basic/choice',
        color: 'border-orange-300 hover:border-orange-400',
        emoji: '📝',
        desc: '选择后立即反馈'
      },
      {
        title: '有选项填空',
        href: '/basic/fill',
        color: 'border-red-300 hover:border-red-400',
        emoji: '✏️',
        desc: '从选项中选择填空'
      },
      {
        title: '无选项填空',
        href: '/basic/fill-free',
        color: 'border-pink-300 hover:border-pink-400',
        emoji: '🖊️',
        desc: '自主输入答案并验证'
      },
      {
        title: '快速对错判断',
        href: '/basic/judge',
        color: 'border-green-300 hover:border-green-400',
        emoji: '✅',
        desc: '对/错即时反馈'
      }
    ]
  },
  {
    id: 'drag',
    title: '🧲 拖拽交互',
    titleColor: 'text-orange-600',
    details: [
      '拖拽调整（参数/对象位置）',
      '拖拽消除（匹配/合并/消除）',
      '拖拽拼装（组合/构建）',
      '拖拽排序（序列/层级）',
      '拖拽分类（归类/匹配）'
    ],
    gridCols: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-5',
    cards: [
      {
        title: '拖拽调整',
        href: '/drag/adjust',
        color: 'border-orange-300 hover:border-orange-400',
        emoji: '🎛️',
        desc: '拖动滑块/物体，实时调整参数或位置'
      },
      {
        title: '拖拽消除',
        href: '/drag/match',
        color: 'border-indigo-300 hover:border-indigo-400',
        emoji: '🧩',
        desc: '三消/配对，拖动以匹配并消除'
      },
      {
        title: '拖拽拼装',
        href: '/drag/assemble',
        color: 'border-blue-300 hover:border-blue-400',
        emoji: '🧱',
        desc: '把零散元素拼成整体（几何/编程/生物）'
      },
      {
        title: '拖拽排序',
        href: '/drag/sort',
        color: 'border-green-300 hover:border-green-400',
        emoji: '🗂️',
        desc: '按序列或层级进行排序'
      },
      {
        title: '拖拽分类',
        href: '/drag/classify',
        color: 'border-purple-300 hover:border-purple-400',
        emoji: '🏷️',
        desc: '把对象拖入分类桶完成归类'
      }
    ]
  },
  {
    id: 'demo',
    title: '🎞️ 动态演示',
    titleColor: 'text-indigo-600',
    details: [
      '过程演示（逐步展开）',
      '参数变化演示（函数/模型动态变化）',
      '对比演示（并行可视化）',
      '模拟演示（现象再现）',
      '隐喻演示（拟人化动画）'
    ],
    gridCols: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-5',
    cards: [
      {
        title: '过程演示',
        href: '/demo/process',
        color: 'border-gray-300 hover:border-gray-400',
        emoji: '⏯️',
        desc: '点击下一步，逐步展开过程与推导'
      },
      {
        title: '参数变化演示',
        href: '/demo/param',
        color: 'border-indigo-300 hover:border-indigo-400',
        emoji: '📈',
        desc: '自动播放参数变化对结果的影响'
      },
      {
        title: '对比演示',
        href: '/demo/compare',
        color: 'border-blue-300 hover:border-blue-400',
        emoji: '⚖️',
        desc: '并行展示不同情况，直观看差异'
      },
      {
        title: '模拟演示',
        href: '/demo/simulate',
        color: 'border-green-300 hover:border-green-400',
        emoji: '🔬',
        desc: '再现自然或工程现象的动态过程'
      },
      {
        title: '隐喻演示',
        href: '/demo/metaphor',
        color: 'border-purple-300 hover:border-purple-400',
        emoji: '💡',
        desc: '用拟人化动画降低理解门槛'
      }
    ]
  },
  {
    id: 'multimodal',
    title: '🎙️ 多模态交互',
    titleColor: 'text-rose-600',
    details: [
      '语音：说出"更大/更小/暂停/继续"，控制演示',
      '摄像头：简单手势/运动检测，触发交互'
    ],
    gridCols: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-4',
    cards: [
      {
        title: '语音控制演示',
        href: '/multimodal/voice',
        color: 'border-rose-300 hover:border-rose-400',
        emoji: '🎤',
        desc: '用语音指令控制动画'
      },
      {
        title: '摄像头手势演示',
        href: '/multimodal/camera',
        color: 'border-cyan-300 hover:border-cyan-400',
        emoji: '📷',
        desc: '检测运动/手势触发事件'
      }
    ]
  },
  {
    id: 'generative',
    title: '✨ 生成式交互',
    titleColor: 'text-red-600',
    details: [
      '手写输入识别：画一个数字 → 系统猜可能是几',
      '输入文本：给出"情绪标签"和"关键词"'
    ],
    gridCols: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-4',
    cards: [
      {
        title: '手写数字识别',
        href: '/generative/handwriting',
        color: 'border-red-300 hover:border-red-400',
        emoji: '🖌️',
        desc: '在画板上写数字，查看识别结果'
      },
      {
        title: '文本情绪与关键词',
        href: '/generative/text-labels',
        color: 'border-pink-300 hover:border-pink-400',
        emoji: '🧠',
        desc: '分析句子情绪并提取关键词'
      }
    ]
  },
  {
    id: 'sandbox',
    title: '🧪 探索式 / 沙盒交互',
    titleColor: 'text-green-600',
    description: '自由探索，不是题目驱动，而是实验驱动',
    gridCols: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3',
    cards: [
      {
        title: 'AI 小镇·神经网络乐园',
        href: '/sandbox/ai-town',
        color: 'border-emerald-300 hover:border-emerald-400',
        emoji: '🏘️',
        desc: 'Neuronville神经元镇 - 通过小镇居民学习神经网络'
      },
      {
        title: '大模型文字接龙',
        href: '/sandbox/text-chain',
        color: 'border-green-300 hover:border-green-400',
        emoji: '🤖',
        desc: '输入任意开头自由续写'
      },
      {
        title: '不同语料接龙',
        href: '/sandbox/corpus-chain',
        color: 'border-purple-300 hover:border-purple-400',
        emoji: '🤖',
        desc: '选择古文/数学/童话模型续写'
      }
    ]
  }
]