<template>
  <div class="animated-background">
    <canvas ref="canvasRef" class="particles-canvas"></canvas>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

const canvasRef = ref<HTMLCanvasElement | null>(null)

interface Particle {
  x: number
  y: number
  vx: number
  vy: number
  radius: number
  color: { r: number; g: number; b: number }
}

let particles: Particle[] = []
let animationId: number | null = null

const colorPalette = [
  { r: 66, g: 184, b: 131 },   // 绿色
  { r: 52, g: 168, b: 250 },   // 蓝色
  { r: 159, g: 122, b: 234 },  // 紫色
  { r: 255, g: 153, b: 51 },   // 橙色
  { r: 82, g: 196, b: 166 },   // 青色
]

const getRandomColor = () => {
  return colorPalette[Math.floor(Math.random() * colorPalette.length)]
}

const initParticles = (canvas: HTMLCanvasElement) => {
  const particleCount = 100
  particles = []
  
  for (let i = 0; i < particleCount; i++) {
    particles.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.5,
      vy: (Math.random() - 0.5) * 0.5,
      radius: Math.random() * 2 + 1,
      color: getRandomColor()
    })
  }
}

const drawParticles = (ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement) => {
  ctx.clearRect(0, 0, canvas.width, canvas.height)
  
  // 绘制粒子
  particles.forEach(particle => {
    ctx.beginPath()
    ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2)
    const c = particle.color
    ctx.fillStyle = `rgba(${c.r}, ${c.g}, ${c.b}, 0.6)`
    ctx.fill()
    
    // 更新位置
    particle.x += particle.vx
    particle.y += particle.vy
    
    // 边界检测
    if (particle.x < 0 || particle.x > canvas.width) particle.vx *= -1
    if (particle.y < 0 || particle.y > canvas.height) particle.vy *= -1
  })
  
  // 绘制连线（颜色混合）
  particles.forEach((p1, i) => {
    particles.slice(i + 1).forEach(p2 => {
      const dx = p1.x - p2.x
      const dy = p1.y - p2.y
      const distance = Math.sqrt(dx * dx + dy * dy)
      
      if (distance < 150) {
        // 混合两个粒子的颜色
        const mixedColor = {
          r: Math.floor((p1.color.r + p2.color.r) / 2),
          g: Math.floor((p1.color.g + p2.color.g) / 2),
          b: Math.floor((p1.color.b + p2.color.b) / 2)
        }
        
        ctx.beginPath()
        ctx.moveTo(p1.x, p1.y)
        ctx.lineTo(p2.x, p2.y)
        const opacity = 0.3 * (1 - distance / 150)
        ctx.strokeStyle = `rgba(${mixedColor.r}, ${mixedColor.g}, ${mixedColor.b}, ${opacity})`
        ctx.lineWidth = 1
        ctx.stroke()
      }
    })
  })
}

const animate = (ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement) => {
  drawParticles(ctx, canvas)
  animationId = requestAnimationFrame(() => animate(ctx, canvas))
}

const handleResize = () => {
  if (!canvasRef.value) return
  
  canvasRef.value.width = window.innerWidth
  canvasRef.value.height = window.innerHeight
  
  initParticles(canvasRef.value)
}

onMounted(() => {
  if (!canvasRef.value) return
  
  const canvas = canvasRef.value
  const ctx = canvas.getContext('2d')
  if (!ctx) return
  
  handleResize()
  animate(ctx, canvas)
  
  window.addEventListener('resize', handleResize)
})

onUnmounted(() => {
  if (animationId) {
    cancelAnimationFrame(animationId)
  }
  window.removeEventListener('resize', handleResize)
})
</script>

<style scoped>
.animated-background {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: -1;
  pointer-events: none;
}

.particles-canvas {
  width: 100%;
  height: 100%;
  display: block;
}
</style>
