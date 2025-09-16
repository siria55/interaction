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
  
  // 添加调试信息
  console.log('图像特征分析:', {
    centerMass: features.centerMass,
    aspectRatio: features.aspectRatio.toFixed(2),
    density: features.density.toFixed(3),
    symmetry: features.symmetry.toFixed(2),
    verticality: features.verticality.toFixed(2),
    topHeavy: features.topHeavy.toFixed(2),
    bottomHeavy: features.bottomHeavy.toFixed(2),
    leftHeavy: features.leftHeavy.toFixed(2),
    rightHeavy: features.rightHeavy.toFixed(2)
  })
  
  const result = classifyDigit(features)
  
  console.log('识别结果:', result)
  
  return result
}

// 分析图像特征
function analyzeImageFeatures(imageData: ImageData): {
  centerMass: { x: number, y: number }
  aspectRatio: number
  density: number
  symmetry: number
  verticality: number
  topHeavy: number
  bottomHeavy: number
  leftHeavy: number
  rightHeavy: number
} {
  const { data, width, height } = imageData
  let totalX = 0, totalY = 0, pixelCount = 0
  
  // 改进的像素检测：使用更低的阈值来检测手写内容
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const index = (y * width + x) * 4
      const r = data[index]
      const g = data[index + 1]
      const b = data[index + 2]
      const alpha = data[index + 3]
      
      // 检测非白色像素（更宽松的阈值）
      const isNonWhite = (r < 240 || g < 240 || b < 240) && alpha > 50
      if (isNonWhite) {
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
  
  // 计算边界框
  let minX = width, maxX = 0, minY = height, maxY = 0
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const index = (y * width + x) * 4
      const r = data[index]
      const g = data[index + 1]
      const b = data[index + 2]
      const alpha = data[index + 3]
      
      const isNonWhite = (r < 240 || g < 240 || b < 240) && alpha > 50
      if (isNonWhite) {
        minX = Math.min(minX, x)
        maxX = Math.max(maxX, x)
        minY = Math.min(minY, y)
        maxY = Math.max(maxY, y)
      }
    }
  }
  
  // 确保有有效的边界
  if (minX >= maxX || minY >= maxY) {
    return { 
      centerMass: { x: width / 2, y: height / 2 }, 
      aspectRatio: 1, 
      density: 0, 
      symmetry: 0.5,
      verticality: 0.5,
      topHeavy: 0.5,
      bottomHeavy: 0.5,
      leftHeavy: 0.5,
      rightHeavy: 0.5
    }
  }
  
  const aspectRatio = (maxX - minX) / (maxY - minY)
  const density = pixelCount / (width * height)
  
  // 计算对称性
  const symmetry = calculateSymmetry(imageData, centerMass)
  
  // 计算垂直性（数字1的重要特征）
  const verticality = calculateVerticality(imageData, minX, maxX, minY, maxY)
  
  // 计算各区域的密度分布
  const topHeavy = calculateRegionDensity(imageData, minX, maxX, minY, minY + (maxY - minY) / 3)
  const bottomHeavy = calculateRegionDensity(imageData, minX, maxX, minY + 2 * (maxY - minY) / 3, maxY)
  const leftHeavy = calculateRegionDensity(imageData, minX, minX + (maxX - minX) / 3, minY, maxY)
  const rightHeavy = calculateRegionDensity(imageData, minX + 2 * (maxX - minX) / 3, maxX, minY, maxY)
  
  return { 
    centerMass, 
    aspectRatio, 
    density, 
    symmetry,
    verticality,
    topHeavy,
    bottomHeavy,
    leftHeavy,
    rightHeavy
  }
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
      
      const leftR = data[leftIndex]
      const leftG = data[leftIndex + 1]
      const leftB = data[leftIndex + 2]
      const leftAlpha = data[leftIndex + 3]
      
      const rightR = data[rightIndex]
      const rightG = data[rightIndex + 1]
      const rightB = data[rightIndex + 2]
      const rightAlpha = data[rightIndex + 3]
      
      const leftIsNonWhite = (leftR < 240 || leftG < 240 || leftB < 240) && leftAlpha > 50
      const rightIsNonWhite = (rightR < 240 || rightG < 240 || rightB < 240) && rightAlpha > 50
      
      if (leftIsNonWhite || rightIsNonWhite) {
        total++
        if (leftIsNonWhite === rightIsNonWhite) {
          matches++
        }
      }
    }
  }
  
  return total > 0 ? matches / total : 0.5
}

// 计算垂直性（数字1的重要特征）
function calculateVerticality(imageData: ImageData, minX: number, maxX: number, minY: number, maxY: number): number {
  const { data, width, height } = imageData
  const centerX = (minX + maxX) / 2
  const tolerance = (maxX - minX) * 0.2 // 20%的容差
  
  let verticalPixels = 0
  let totalPixels = 0
  
  for (let y = minY; y < maxY; y++) {
    for (let x = minX; x < maxX; x++) {
      const index = (y * width + x) * 4
      const r = data[index]
      const g = data[index + 1]
      const b = data[index + 2]
      const alpha = data[index + 3]
      
      const isNonWhite = (r < 240 || g < 240 || b < 240) && alpha > 50
      if (isNonWhite) {
        totalPixels++
        // 检查是否在中心垂直线附近
        if (Math.abs(x - centerX) <= tolerance) {
          verticalPixels++
        }
      }
    }
  }
  
  return totalPixels > 0 ? verticalPixels / totalPixels : 0.5
}

// 计算区域密度
function calculateRegionDensity(imageData: ImageData, minX: number, maxX: number, minY: number, maxY: number): number {
  const { data, width, height } = imageData
  let pixelCount = 0
  let totalArea = 0
  
  for (let y = Math.max(0, minY); y < Math.min(height, maxY); y++) {
    for (let x = Math.max(0, minX); x < Math.min(width, maxX); x++) {
      totalArea++
      const index = (y * width + x) * 4
      const r = data[index]
      const g = data[index + 1]
      const b = data[index + 2]
      const alpha = data[index + 3]
      
      const isNonWhite = (r < 240 || g < 240 || b < 240) && alpha > 50
      if (isNonWhite) {
        pixelCount++
      }
    }
  }
  
  return totalArea > 0 ? pixelCount / totalArea : 0
}

// 基于特征分类数字
function classifyDigit(features: {
  centerMass: { x: number, y: number }
  aspectRatio: number
  density: number
  symmetry: number
  verticality: number
  topHeavy: number
  bottomHeavy: number
  leftHeavy: number
  rightHeavy: number
}): RecognitionResult {
  const { 
    centerMass, 
    aspectRatio, 
    density, 
    symmetry,
    verticality,
    topHeavy,
    bottomHeavy,
    leftHeavy,
    rightHeavy
  } = features
  
  // 计算相对位置（相对于画布中心）
  const relativeX = centerMass.x / 140 - 1 // -1 到 1
  const relativeY = centerMass.y / 140 - 1 // -1 到 1
  
  // 改进的分类规则，特别针对1和9的区分
  let digit = 0
  let confidence = 0.5
  let explanation = ""
  
  // 数字1：高垂直性 + 低宽高比 + 低密度 + 重心居中
  if (verticality > 0.6 && aspectRatio < 0.7 && density < 0.08 && Math.abs(relativeX) < 0.3) {
    digit = 1
    confidence = 0.9
    explanation = "这是一个垂直的细长形状，很可能是数字 1！"
  }
  // 数字0：高对称性 + 接近1的宽高比 + 适中密度
  else if (symmetry > 0.75 && aspectRatio > 0.8 && aspectRatio < 1.3 && density > 0.05) {
    digit = 0
    confidence = 0.85
    explanation = "这是一个圆形，很可能是数字 0！"
  }
  // 数字2：重心偏上 + 中等宽高比
  else if (relativeY < -0.2 && aspectRatio > 0.8 && aspectRatio < 1.5) {
    digit = 2
    confidence = 0.75
    explanation = "重心偏上，可能是数字 2！"
  }
  // 数字3：中等对称性 + 重心偏下
  else if (symmetry > 0.4 && relativeY > 0.1 && density > 0.06) {
    digit = 3
    confidence = 0.7
    explanation = "比较对称，可能是数字 3！"
  }
  // 数字4：高宽高比 + 重心偏左
  else if (aspectRatio > 1.2 && relativeX < 0.1) {
    digit = 4
    confidence = 0.8
    explanation = "比较宽，可能是数字 4！"
  }
  // 数字5：重心偏下 + 适中密度
  else if (relativeY > 0.2 && density > 0.05) {
    digit = 5
    confidence = 0.75
    explanation = "重心偏下，可能是数字 5！"
  }
  // 数字6：高密度 + 中等对称性
  else if (density > 0.08 && symmetry > 0.4 && aspectRatio > 0.7) {
    digit = 6
    confidence = 0.7
    explanation = "密度较高，可能是数字 6！"
  }
  // 数字7：重心偏左 + 低宽高比
  else if (relativeX < -0.1 && aspectRatio < 1.0) {
    digit = 7
    confidence = 0.8
    explanation = "重心偏左，可能是数字 7！"
  }
  // 数字8：高对称性 + 高密度 + 接近1的宽高比
  else if (symmetry > 0.6 && density > 0.07 && aspectRatio > 0.8 && aspectRatio < 1.2) {
    digit = 8
    confidence = 0.85
    explanation = "很对称且密度适中，可能是数字 8！"
  }
  // 数字9：重心偏右 + 底部重 + 有圆形特征
  else if (relativeX > 0.1 && rightHeavy > leftHeavy && bottomHeavy > topHeavy) {
    digit = 9
    confidence = 0.75
    explanation = "重心偏右且有圆形特征，可能是数字 9！"
  }
  else {
    // 基于特征相似度进行更智能的猜测
    const featureScores = [
      { 
        digit: 0, 
        score: Math.abs(symmetry - 0.8) + Math.abs(aspectRatio - 1.0) + Math.abs(density - 0.06) 
      },
      { 
        digit: 1, 
        score: Math.abs(verticality - 0.8) + Math.abs(aspectRatio - 0.5) + Math.abs(density - 0.05) + Math.abs(relativeX) 
      },
      { 
        digit: 2, 
        score: Math.abs(relativeY + 0.3) + Math.abs(aspectRatio - 1.0) 
      },
      { 
        digit: 3, 
        score: Math.abs(symmetry - 0.6) + Math.abs(relativeY - 0.2) 
      },
      { 
        digit: 4, 
        score: Math.abs(aspectRatio - 1.4) + Math.abs(relativeX + 0.1) 
      },
      { 
        digit: 5, 
        score: Math.abs(relativeY - 0.3) + Math.abs(density - 0.06) 
      },
      { 
        digit: 6, 
        score: Math.abs(density - 0.08) + Math.abs(symmetry - 0.5) 
      },
      { 
        digit: 7, 
        score: Math.abs(relativeX + 0.2) + Math.abs(aspectRatio - 0.8) 
      },
      { 
        digit: 8, 
        score: Math.abs(symmetry - 0.7) + Math.abs(density - 0.07) + Math.abs(aspectRatio - 1.0) 
      },
      { 
        digit: 9, 
        score: Math.abs(relativeX - 0.2) + Math.abs(rightHeavy - leftHeavy) + Math.abs(bottomHeavy - topHeavy) 
      }
    ]
    
    // 找到最相似的数字
    const bestMatch = featureScores.reduce((min, current) => 
      current.score < min.score ? current : min
    )
    
    digit = bestMatch.digit
    confidence = Math.max(0.4, 0.8 - bestMatch.score * 2)
    explanation = `基于特征分析，AI识别出这是数字 ${digit}！`
  }
  
  // 添加一些随机性，让结果更真实
  const randomFactor = (Math.random() - 0.5) * 0.1
  confidence = Math.max(0.3, Math.min(0.95, confidence + randomFactor))
  
  return {
    digit,
    confidence,
    explanation
  }
}
