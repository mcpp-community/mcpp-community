<template>
  <div
    ref="cardRef"
    :class="{ 'card-hover': isHovered }"
    :style="{
      transformStyle: 'preserve-3d',
      ...cardTransformStyle,
    }"
    @mouseenter="onMouseEnter"
    @mouseleave="onMouseLeave"
    @mousemove="onMouseMove"
  >
    <slot/>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'

const props = withDefaults(
  defineProps<{
    rotate?: number,
    translateZ?: number,
    perspective?: string,
    transition?: string,
  }>(),
  {
    rotate: 10,
    translateZ: 20,
    perspective: '1200px'
  }
)

const isHovered = ref(false)
const mouseX = ref(0)
const mouseY = ref(0)
const cardRef = ref<HTMLElement | null>(null)

// 3D 重力卡片变换效果
const cardTransformStyle = computed(() => {
  const transition = props.transition ? ', ' + props.transition : ''
  const perspective = props.perspective

  if (!isHovered.value) {
    return {
      transform: `perspective(${perspective}) rotateX(0deg) rotateY(0deg) translateZ(0px)`,
      transition: 'transform 0.5s cubic-bezier(0.23, 1, 0.32, 1)' + transition,
    }
  }

  const rotate = props.rotate
  const rotateX = mouseY.value * -rotate
  const rotateY = mouseX.value * rotate

  const translateZ = props.translateZ

  return {
    transform: `perspective(${perspective}) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(${translateZ}px)`,
    transition: 'transform 0.1s ease-out' + transition,
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
