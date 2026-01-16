<template>
  <div class="scroll-guide-wrapper" ref="guideRef" v-show="showGuide">
    <div class="guide-content">
      <span 
        class="guide-label" 
        :class="{ clickable: canClick }"
        @click="handleClick"
      >
        {{ label }}
      </span>
      <div class="guide-line-container">
        <div class="guide-line-bg"></div>
        <div 
          class="guide-line-fill" 
          :style="{ height: `${fillPercent}%` }"
        ></div>
        <svg class="guide-arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M12 5v14M19 12l-7 7-7-7"/>
        </svg>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, computed } from 'vue'
import { useRouter } from 'vitepress'

const props = defineProps<{
  targetUrl: string
  label: string
}>()

const guideRef = ref<HTMLElement | null>(null)
const rawProgress = ref(0)
const extraOvershoot = ref(0)
const showGuide = ref(false)
const fillPercent = computed(() => {
  // 仅显示触发进度：到底后才开始填充，100% 对应 overshootThreshold
  const triggerProgress = Math.max(rawProgress.value - 100, 0)
  return Math.min((triggerProgress / overshootSlack) * 100, 100)
})
const canClick = computed(() => rawProgress.value >= 99.5)
const router = useRouter()
const hasTriggered = ref(false)
let lastScrollTop = 0
const overshootThreshold = 105 // 超过 100% 的 5% 之后才跳转
const overshootSlack = overshootThreshold - 100

const updateProgress = (scrollTop: number, scrollableHeight: number) => {
  const baseProgress = scrollableHeight > 0
    ? Math.min((scrollTop / scrollableHeight) * 100, 100)
    : 100
  const nearBottom = scrollableHeight <= 0 || scrollTop >= scrollableHeight - 2
  if (!nearBottom) {
    extraOvershoot.value = 0
  }
  rawProgress.value = Math.min(baseProgress + extraOvershoot.value, overshootThreshold + 5)
  showGuide.value = nearBottom
  return { nearBottom }
}

const tryNavigate = (shouldNavigate: boolean) => {
  if (shouldNavigate && !hasTriggered.value) {
    hasTriggered.value = true
    setTimeout(() => {
      router.go(props.targetUrl)
    }, 180)
  }
}

const handleScroll = () => {
  if (!guideRef.value) return
  
  const windowHeight = window.innerHeight
  const documentHeight = document.documentElement.scrollHeight
  const scrollTop = window.scrollY
  const scrollingDown = scrollTop >= lastScrollTop
  lastScrollTop = scrollTop
  
  // 计算可滚动的总高度
  const scrollableHeight = documentHeight - windowHeight
  const { nearBottom } = updateProgress(scrollTop, scrollableHeight)

  // 需要超过阈值且继续向下滚动时才触发（带“弹簧”感）
  tryNavigate(rawProgress.value >= overshootThreshold && scrollingDown)

  // 若用户上滑回去，重置触发条件
  if (hasTriggered.value && rawProgress.value < 80) {
    hasTriggered.value = false
    if (!nearBottom) {
      extraOvershoot.value = 0
    }
  }
}

const handleWheel = (event: WheelEvent) => {
  if (!guideRef.value) return
  const windowHeight = window.innerHeight
  const documentHeight = document.documentElement.scrollHeight
  const scrollTop = window.scrollY
  const scrollableHeight = documentHeight - windowHeight
  const nearBottom = scrollableHeight <= 0 || scrollTop >= scrollableHeight - 2

  if (nearBottom && event.deltaY > 0) {
    const gain = Math.max(event.deltaY * 0.015, 0) // 降低增益，让触发慢 3 倍左右
    extraOvershoot.value = Math.min(extraOvershoot.value + gain, overshootSlack)
  } else if (event.deltaY < 0) {
    const decay = Math.abs(event.deltaY) * 0.03
    extraOvershoot.value = Math.max(extraOvershoot.value - decay, 0)
  }

  updateProgress(scrollTop, scrollableHeight)
  tryNavigate(rawProgress.value >= overshootThreshold && event.deltaY > 0)
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll)
  window.addEventListener('wheel', handleWheel, { passive: true })
  handleScroll() // 初始化
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
  window.removeEventListener('wheel', handleWheel)
})

const handleClick = () => {
  if (canClick.value) {
    hasTriggered.value = true
    router.go(props.targetUrl)
  }
}
</script>

<style scoped>
.scroll-guide-wrapper {
  position: fixed;
  bottom: 60px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 50;
}

.guide-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
}

.guide-label {
  font-size: 0.95rem;
  font-weight: 600;
  color: var(--vp-c-text-2);
  white-space: nowrap;
  transition: color 0.3s ease;
}

.guide-label.clickable {
  color: var(--vp-c-brand-1);
  cursor: pointer;
}

.guide-line-container {
  position: relative;
  width: 3px;
  height: 80px;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.guide-line-bg {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: var(--vp-c-divider);
  border-radius: 2px;
}

.guide-line-fill {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  background: linear-gradient(to top, var(--vp-c-brand-1), var(--vp-c-brand-2));
  border-radius: 2px;
  transition: height 0.1s ease-out;
  box-shadow: 0 0 8px rgba(66, 184, 131, 0.4);
}

.guide-arrow {
  position: absolute;
  bottom: -8px;
  width: 20px;
  height: 20px;
  color: var(--vp-c-brand-1);
  animation: bounce 2s infinite;
  filter: drop-shadow(0 2px 4px rgba(66, 184, 131, 0.3));
}

@keyframes bounce {
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-6px);
  }
}

.scroll-guide-wrapper:hover .guide-label {
  color: var(--vp-c-brand-1);
}

@media (max-width: 640px) {
  .scroll-guide-wrapper {
    bottom: 40px;
  }
  
  .guide-label {
    font-size: 0.85rem;
  }
  
  .guide-line-container {
    height: 60px;
  }
}
</style>
