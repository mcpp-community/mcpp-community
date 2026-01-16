<template>
  <section class="contributors-wall">
    <div class="section-header">
      <p class="eyebrow">感谢贡献</p>
      <h2 class="section-title">社区贡献者</h2>
      <p class="section-desc">感谢所有为社区做出贡献的开发者、捐赠者、以及运营和维护人员</p>
    </div>

    <div 
      ref="cardRef"
      class="contributors-card"
      :style="cardTransformStyle"
      @mouseenter="onMouseEnter"
      @mouseleave="onMouseLeave"
      @mousemove="onMouseMove"
    >
      <div class="card-glow"></div>
      <div class="card-border"></div>
      <img 
        :src="imageUrl" 
        alt="Community Contributors"
        class="contributors-image"
        loading="lazy"
      />
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'

const props = defineProps<{
  imageUrl: string
}>()

const cardRef = ref<HTMLElement | null>(null)
const isHovered = ref(false)
const mouseX = ref(0)
const mouseY = ref(0)

// 3D 重力卡片变换效果
const cardTransformStyle = computed(() => {
  if (!isHovered.value) {
    return {
      transform: 'perspective(1200px) rotateX(0deg) rotateY(0deg) translateZ(0px)',
      transition: 'transform 0.5s cubic-bezier(0.23, 1, 0.32, 1)'
    }
  }
  
  const rotateX = mouseY.value * -10
  const rotateY = mouseX.value * 10
  const translateZ = 20
  
  return {
    transform: `perspective(1200px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(${translateZ}px)`,
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
  mouseX.value = (event.clientX - rect.left - rect.width / 2) / (rect.width / 2)
  mouseY.value = (event.clientY - rect.top - rect.height / 2) / (rect.height / 2)
}
</script>

<style scoped>
.contributors-wall {
  max-width: 1200px;
  margin: 60px auto;
  padding: 0 24px;
}

.section-header {
  text-align: center;
  margin-bottom: 40px;
}

.eyebrow {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 6px 12px;
  border-radius: 999px;
  background: rgba(var(--vp-c-brand-1-rgb, 66, 184, 131), 0.12);
  color: var(--vp-c-brand-1);
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  font-size: 0.85rem;
}

.section-title {
  margin: 12px 0 8px;
  font-size: clamp(1.8rem, 3vw, 2.2rem);
  font-weight: 800;
  color: var(--vp-c-text-1);
  border: none;
  padding-top: 0;
}

.section-desc {
  margin: 0;
  color: var(--vp-c-text-2);
  font-size: 1rem;
}

.contributors-card {
  position: relative;
  max-width: 900px;
  width: fit-content;
  margin: 0 auto;
  border-radius: 20px;
  overflow: hidden;
  transform-style: preserve-3d;
  cursor: pointer;
  background: var(--vp-c-bg-soft);
  box-shadow: 
    0 10px 40px rgba(0, 0, 0, 0.12),
    0 2px 8px rgba(0, 0, 0, 0.08);
  transition: box-shadow 0.3s ease;
}

.contributors-card:hover {
  box-shadow: 
    0 20px 60px rgba(0, 0, 0, 0.18),
    0 4px 16px rgba(0, 0, 0, 0.12);
}

.card-glow {
  position: absolute;
  inset: -2px;
  background: radial-gradient(
      circle at 20% 30%, 
      rgba(66, 184, 131, 0.3), 
      transparent 50%
    ),
    radial-gradient(
      circle at 80% 70%, 
      rgba(52, 168, 250, 0.3), 
      transparent 50%
    ),
    linear-gradient(
      135deg, 
      rgba(66, 184, 131, 0.25), 
      rgba(159, 122, 234, 0.25)
    );
  opacity: 0;
  transition: opacity 0.4s ease;
  pointer-events: none;
  border-radius: 20px;
  z-index: -1;
}

.contributors-card:hover .card-glow {
  opacity: 1;
}

.card-border {
  position: absolute;
  inset: 0;
  border-radius: 20px;
  border: 2px solid transparent;
  background: linear-gradient(
      135deg, 
      rgba(66, 184, 131, 0.4), 
      rgba(52, 168, 250, 0.4)
    ) border-box;
  -webkit-mask: 
    linear-gradient(#fff 0 0) padding-box, 
    linear-gradient(#fff 0 0);
  -webkit-mask-composite: xor;
  mask-composite: exclude;
  opacity: 0;
  transition: opacity 0.4s ease;
  pointer-events: none;
}

.contributors-card:hover .card-border {
  opacity: 1;
}

.contributors-image {
  display: block;
  max-width: 100%;
  width: auto;
  height: auto;
  border-radius: 18px;
  position: relative;
  z-index: 1;
  transform: translateZ(0);
}

/* 添加光泽效果 */
.contributors-card::before {
  content: '';
  position: absolute;
  inset: 0;
  background: linear-gradient(
    115deg,
    transparent 20%,
    rgba(255, 255, 255, 0.08) 50%,
    transparent 80%
  );
  opacity: 0;
  transition: opacity 0.3s ease;
  pointer-events: none;
  z-index: 2;
  border-radius: 20px;
}

.contributors-card:hover::before {
  opacity: 1;
}

@media (max-width: 768px) {
  .contributors-wall {
    padding: 0 16px;
    margin: 40px auto;
  }

  .section-header {
    margin-bottom: 28px;
  }

  .contributors-card {
    border-radius: 16px;
    width: 100%;
  }

  .card-border,
  .card-glow,
  .contributors-card::before {
    border-radius: 16px;
  }

  .contributors-image {
    border-radius: 14px;
    width: 100%;
  }
}
</style>
