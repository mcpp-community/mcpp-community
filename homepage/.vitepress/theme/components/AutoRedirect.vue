<template>
  <div class="redirect-overlay" v-if="showOverlay">
    <div class="redirect-card">
      <h2>{{ message }}</h2>
      <div class="countdown">{{ countdown }}s</div>
      <button @click="cancel" class="btn-cancel">取消</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'

const props = withDefaults(defineProps<{
  url: string
  message?: string
  delay?: number
}>(), {
  message: '正在跳转...',
  delay: 5
})

const showOverlay = ref(false)
const countdown = ref(props.delay)
let timer: number | null = null

const startCountdown = () => {
  showOverlay.value = true
  countdown.value = props.delay
  
  timer = window.setInterval(() => {
    countdown.value--
    if (countdown.value <= 0) {
      if (timer) clearInterval(timer)
      window.location.href = props.url
    }
  }, 1000)
}

const cancel = () => {
  if (timer) clearInterval(timer)
  showOverlay.value = false
}

onMounted(() => {
  startCountdown()
})
</script>

<style scoped>
.redirect-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.8);
  backdrop-filter: blur(4px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
}

.redirect-card {
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  border-radius: 12px;
  padding: 32px;
  text-align: center;
}

h2 {
  margin: 0 0 16px 0;
  font-size: 1.25rem;
  color: var(--vp-c-text-1);
}

.countdown {
  font-size: 3rem;
  font-weight: 700;
  color: var(--vp-c-brand-1);
  margin-bottom: 24px;
}

.btn-cancel {
  padding: 8px 16px;
  border: 1px solid var(--vp-c-divider);
  border-radius: 6px;
  background: transparent;
  color: var(--vp-c-text-2);
  cursor: pointer;
  font-size: 0.9rem;
}

.btn-cancel:hover {
  border-color: var(--vp-c-brand-1);
  color: var(--vp-c-brand-1);
}
</style>
