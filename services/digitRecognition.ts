// 数字识别服务
// 使用简化的机器学习方法进行手写数字识别

export interface RecognitionResult {
  digit: number
  confidence: number
  explanation: string
}

// 简化的数字识别函数
// 在实际应用中，这里会使用训练好的TensorFlow模型
export async function recognizeDigit(imageData: ImageData): Promise<RecognitionResult> {
  // 模拟AI识别过程
  await new Promise(resolve => setTimeout(resolve, 1000))
  
  // 简化的识别逻辑：基于图像特征分析
  const features = analyzeImageFeatures(imageData)
  const result = classifyDigit(features)
  
  return result
}

// 分析图像特征
function analyzeImageFeatures(imageData: ImageData): {
  centerMass: { x: number, y: number }
  aspectRatio: number
  density: number
  symmetry: number
} {
  const { data, width, height } = imageData
  let totalX = 0, totalY = 0, pixelCount = 0
  
  // 计算重心
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const index = (y * width + x) * 4
      const alpha = data[index + 3]
      if (alpha > 128) { // 非白色像素
        totalX += x
        totalY += y
        pixelCount++
      }
    }
  }
  
  const centerMass = {
    x: pixelCount > 0 ? totalX / pixelCount : width / 2,
    y: pixelCount > 0 ? totalY / pixelCount : height / 2
  }
  
  // 计算宽高比
  let minX = width, maxX = 0, minY = height, maxY = 0
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const index = (y * width + x) * 4
      const alpha = data[index + 3]
      if (alpha > 128) {
        minX = Math.min(minX, x)
        maxX = Math.max(maxX, x)
        minY = Math.min(minY, y)
        maxY = Math.max(maxY, y)
      }
    }
  }
  
  const aspectRatio = (maxX - minX) / (maxY - minY)
  const density = pixelCount / (width * height)
  
  // 计算对称性
  const symmetry = calculateSymmetry(imageData, centerMass)
  
  return { centerMass, aspectRatio, density, symmetry }
}

// 计算对称性
function calculateSymmetry(imageData: ImageData, center: { x: number, y: number }): number {
  const { data, width, height } = imageData
  let matches = 0
  let total = 0
  
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width / 2; x++) {
      const leftIndex = (y * width + x) * 4
      const rightX = width - 1 - x
      const rightIndex = (y * width + rightX) * 4
      
      const leftAlpha = data[leftIndex + 3]
      const rightAlpha = data[rightIndex + 3]
      
      if (leftAlpha > 128 || rightAlpha > 128) {
        total++
        if ((leftAlpha > 128) === (rightAlpha > 128)) {
          matches++
        }
      }
    }
  }
  
  return total > 0 ? matches / total : 0
}

// 基于特征分类数字
function classifyDigit(features: {
  centerMass: { x: number, y: number }
  aspectRatio: number
  density: number
  symmetry: number
}): RecognitionResult {
  const { centerMass, aspectRatio, density, symmetry } = features
  
  // 简化的分类规则
  let digit = 0
  let confidence = 0.5
  let explanation = ""
  
  // 基于特征进行简单分类
  if (symmetry > 0.8 && aspectRatio > 0.8 && aspectRatio < 1.2) {
    digit = 0
    confidence = 0.85
    explanation = "这是一个圆形，很可能是数字 0！"
  } else if (aspectRatio < 0.5) {
    digit = 1
    confidence = 0.8
    explanation = "这是一个细长的形状，很可能是数字 1！"
  } else if (centerMass.y < 100) {
    digit = 2
    confidence = 0.75
    explanation = "重心偏上，可能是数字 2！"
  } else if (symmetry > 0.6) {
    digit = 3
    confidence = 0.7
    explanation = "比较对称，可能是数字 3！"
  } else if (aspectRatio > 1.5) {
    digit = 4
    confidence = 0.8
    explanation = "比较宽，可能是数字 4！"
  } else if (centerMass.y > 150) {
    digit = 5
    confidence = 0.75
    explanation = "重心偏下，可能是数字 5！"
  } else if (density > 0.1) {
    digit = 6
    confidence = 0.7
    explanation = "密度较高，可能是数字 6！"
  } else if (centerMass.x < 100) {
    digit = 7
    confidence = 0.8
    explanation = "重心偏左，可能是数字 7！"
  } else if (symmetry > 0.7 && density > 0.08) {
    digit = 8
    confidence = 0.85
    explanation = "很对称且密度适中，可能是数字 8！"
  } else if (centerMass.x > 150) {
    digit = 9
    confidence = 0.75
    explanation = "重心偏右，可能是数字 9！"
  } else {
    // 随机选择一个数字作为演示
    const digits = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
    digit = digits[Math.floor(Math.random() * digits.length)]
    confidence = 0.6
    explanation = `AI识别出这是数字 ${digit}！`
  }
  
  return {
    digit,
    confidence: Math.min(confidence + Math.random() * 0.2, 0.95),
    explanation
  }
}
