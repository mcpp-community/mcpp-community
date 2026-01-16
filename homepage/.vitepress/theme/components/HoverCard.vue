<template>
  <div 
    ref="cardRef"
    class="hover-card"
    :class="{ 'card-hover': isHovered }"
    :style="cardTransformStyle"
    @mouseenter="onMouseEnter"
    @mouseleave="onMouseLeave"
    @mousemove="onMouseMove"
  >
    <slot></slot>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'

const isHovered = ref(false)
const mouseX = ref(0)
const mouseY = ref(0)
const cardRef = ref<HTMLElement | null>(null)

// 卡片受力变换样式
const cardTransformStyle = computed(() => {
  if (!isHovered.value) return {}
  
  // 计算鼠标相对于卡片中心的偏移量（-1 到 1）
  const rotateX = mouseY.value * -8  // 上下旋转
  const rotateY = mouseX.value * 8   // 左右旋转
  const translateZ = 8 // 向上抬起
  
  return {
    transform: `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(${translateZ}px)`,
    transition: 'transform 0.1s ease-out'
  }
})

const onMouseEnter = () => {
  isHovered.value = true
}

const onMouseLeave = () => {
  isHovered.value = false
  mouseX.value = 0
  mouseY.value = 0
}

const onMouseMove = (event: MouseEvent) => {
  if (!cardRef.value) return
  
  const rect = cardRef.value.getBoundingClientRect()
  
  // 计算鼠标相对于卡片中心的位置（-1 到 1）
  mouseX.value = (event.clientX - rect.left - rect.width / 2) / (rect.width / 2)
  mouseY.value = (event.clientY - rect.top - rect.height / 2) / (rect.height / 2)
}
</script>

<style scoped>
.hover-card {
  transform-style: preserve-3d;
  transition: border-color 0.3s ease, box-shadow 0.3s ease;
}
</style>
