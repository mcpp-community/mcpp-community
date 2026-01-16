<template>
  <!-- Full-link card (showcase style) -->
  <a
    v-if="fullLink && url"
    class="project-card"
    :class="[typeClass, { highlight }]"
    :href="url"
    target="_blank"
    rel="noopener noreferrer"
  >
    <div class="card-glow" aria-hidden="true"></div>
    <div class="card-surface">
      <div class="card-head">
        <div class="name-row">
          <span class="project-name">{{ title }}</span>
          <span v-if="status" class="status-chip" :class="status">
            {{ statusText(status) }}
          </span>
        </div>
        <p class="project-desc">{{ description }}</p>
      </div>

      <div v-if="tags && tags.length" class="tag-list">
        <span v-for="(tag, i) in tags" :key="i" class="tag">{{ tag }}</span>
      </div>

      <div class="card-footer" v-if="ctaMode === 'arrow'">
        <span class="cta-text">查看项目</span>
        <span class="cta-arrow">→</span>
      </div>
    </div>
  </a>

  <!-- Inner CTA card (page style) -->
  <div v-else class="project-card" :class="[typeClass, { highlight }]">
    <div class="card-glow" aria-hidden="true"></div>
    <div class="card-surface">
      <div class="name-row">
        <span class="project-name">{{ title }}</span>
        <span v-if="status" class="status-chip" :class="status">
          {{ statusText(status) }}
        </span>
      </div>
      <p class="project-desc">{{ description }}</p>

      <div v-if="tags && tags.length" class="tag-list">
        <span v-for="(tag, i) in tags" :key="i" class="tag">{{ tag }}</span>
      </div>

      <div class="card-footer" v-if="ctaMode === 'buttons'">
        <a v-if="url" :href="url" target="_blank" rel="noreferrer" class="cta-btn primary">项目地址</a>
        <a v-if="contribute" :href="contribute" target="_blank" rel="noreferrer" class="cta-btn">贡献指南</a>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = withDefaults(defineProps<{
  title: string
  description: string
  url?: string
  tags?: string[]
  status?: 'active' | 'incubating' | 'wip'
  highlight?: boolean
  typeClass?: string
  fullLink?: boolean
  ctaMode?: 'arrow' | 'buttons'
  contribute?: string
}>(), {
  fullLink: false,
  ctaMode: 'buttons',
  typeClass: 'type-default'
})

const { title, description, url, tags, status, highlight, typeClass, fullLink, ctaMode, contribute } = props

const statusText = (s?: 'active' | 'incubating' | 'wip') => {
  if (s === 'active') return '活跃'
  if (s === 'incubating') return '孵化中'
  if (s === 'wip') return '进行中'
  return ''
}
</script>

<style scoped>
.project-card {
  position: relative;
  display: block;
  text-decoration: none;
  color: inherit;
  overflow: hidden;
  border-radius: 16px;
  border: 1px solid var(--vp-c-divider);
  background: var(--vp-c-bg);
  transition: transform 0.25s ease, box-shadow 0.25s ease, border-color 0.25s ease;
}

.project-card:hover {
  transform: translateY(-6px);
  box-shadow: 0 16px 40px rgba(0, 0, 0, 0.14);
  border-color: rgba(var(--vp-c-brand-1-rgb, 66, 184, 131), 0.5);
}

.card-glow {
  position: absolute;
  inset: -1px;
  background: radial-gradient(circle at 10% 20%, rgba(82, 196, 166, 0.18), transparent 45%),
    radial-gradient(circle at 90% 0%, rgba(92, 107, 192, 0.18), transparent 40%),
    linear-gradient(135deg, rgba(66, 184, 131, 0.2), rgba(52, 168, 250, 0.15));
  opacity: 0;
  transition: opacity 0.3s ease;
  pointer-events: none;
}

.project-card.highlight .card-glow,
.project-card:hover .card-glow {
  opacity: 1;
}

.card-surface {
  position: relative;
  z-index: 1;
  padding: 20px;
  height: 100%;
  background: linear-gradient(180deg, rgba(255, 255, 255, 0.04), rgba(255, 255, 255, 0)), var(--vp-c-bg);
  border-radius: 16px;
  display: flex;
  flex-direction: column;
  gap: 14px;
}

.name-row {
  display: flex;
  align-items: center;
  gap: 10px;
  justify-content: space-between;
}

.project-name {
  font-size: 1.2rem;
  font-weight: 700;
  color: var(--vp-c-text-1);
}

.status-chip {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 6px 10px;
  border-radius: 999px;
  font-size: 0.85rem;
  font-weight: 700;
  border: 1px solid transparent;
  background: rgba(255, 255, 255, 0.05);
  color: var(--vp-c-text-2);
}

.status-chip.active {
  background: rgba(var(--vp-c-brand-1-rgb, 66, 184, 131), 0.18);
  color: var(--vp-c-brand-1);
  border-color: rgba(var(--vp-c-brand-1-rgb, 66, 184, 131), 0.3);
}

.status-chip.incubating {
  background: rgba(255, 193, 7, 0.18);
  color: #d08700;
  border-color: rgba(255, 193, 7, 0.35);
}

.status-chip.wip {
  background: rgba(52, 168, 250, 0.16);
  color: #1b8dd9;
  border-color: rgba(52, 168, 250, 0.35);
}

.project-desc {
  margin: 0;
  color: var(--vp-c-text-2);
  line-height: 1.6;
  font-size: 0.98rem;
}

.tag-list {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.tag {
  padding: 6px 10px;
  border-radius: 10px;
  background: var(--vp-c-bg-soft);
  border: 1px solid var(--vp-c-divider);
  font-size: 0.65rem;
  color: var(--vp-c-text-2);
  transition: all 0.3s ease;
}

.card-footer {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-top: auto;
}

.cta-text {
  color: var(--vp-c-brand-1);
  font-weight: 700;
  font-size: 0.95rem;
}

.cta-arrow {
  font-size: 1.1rem;
}

.cta-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 8px 12px;
  border-radius: 10px;
  border: 1px solid var(--vp-c-divider);
  text-decoration: none;
  color: var(--vp-c-text-2);
  font-weight: 700;
  font-size: 0.9rem;
  transition: all 0.2s ease;
}

.cta-btn.primary {
  border-color: rgba(var(--vp-c-brand-1-rgb, 66, 184, 131), 0.4);
  color: var(--vp-c-brand-1);
}

.cta-btn:hover {
  border-color: var(--vp-c-brand-1);
  color: var(--vp-c-brand-1);
}
</style>
