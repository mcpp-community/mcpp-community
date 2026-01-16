<template>
  <section class="projects-section">
    <div class="section-header">
      <h2 class="section-title">社区项目</h2>
      <p class="section-desc">欢迎大家来 参与 & 使用 & 反馈 & 贡献 PR</p>
    </div>

    <div class="projects-grid">
      <ProjectCard
        v-for="(project, index) in projects"
        :key="index"
        :title="project.name"
        :description="project.description"
        :url="project.link"
        :tags="project.tags"
        :status="project.status"
        :highlight="project.highlight"
        :typeClass="projectType(project.tags)"
        fullLink
        ctaMode="arrow"
      />
    </div>
  </section>
</template>

<script setup lang="ts">
import ProjectCard from './ProjectCard.vue'

interface Project {
  name: string
  description: string
  link: string
  tags?: string[]
  status?: 'active' | 'incubating' | 'wip'
  highlight?: boolean
}

const props = defineProps<{ projects: Project[] }>()

const statusText = (status?: Project['status']) => {
  if (status === 'active') return '活跃'
  if (status === 'incubating') return '孵化中'
  if (status === 'wip') return '进行中'
  return ''
}

const projectType = (tags?: string[]) => {
  if (!tags) return 'type-default'
  if (tags.some(tag => tag === 'mcpplibs')) return 'type-mcpplibs'
  if (tags.some(tag => tag === 'd2x' || tag === 'D2X' || tag === '教程')) return 'type-d2x'
  return 'type-default'
}

const projects = props.projects
</script>

<style scoped>
.projects-section {
  max-width: 1200px;
  margin: 40px auto 20px;
  padding: 0 24px;
}

.section-header {
  text-align: center;
  margin-bottom: 28px;
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

.projects-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
  gap: 18px;
}

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
  background: linear-gradient(180deg, rgba(255, 255, 255, 0.04), rgba(255, 255, 255, 0)),
    var(--vp-c-bg);
  border-radius: 16px;
  display: flex;
  flex-direction: column;
  gap: 14px;
}

.card-head {
  display: flex;
  flex-direction: column;
  gap: 8px;
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

/* mcpplibs 项目 - 绿色主题 */
.project-card.type-mcpplibs {
  border-color: rgba(66, 184, 131, 0.5);
  background: linear-gradient(180deg, rgba(66, 184, 131, 0.08), rgba(66, 184, 131, 0.03));
}

.project-card.type-mcpplibs .card-surface {
  background: linear-gradient(180deg, rgba(66, 184, 131, 0.1), rgba(66, 184, 131, 0.05)),
    var(--vp-c-bg);
}

.project-card.type-mcpplibs:hover {
  border-color: rgba(66, 184, 131, 0.8);
  box-shadow: 0 16px 40px rgba(66, 184, 131, 0.2);
}

.project-card.type-mcpplibs .card-glow {
  background: radial-gradient(circle at 10% 20%, rgba(66, 184, 131, 0.35), transparent 45%),
    radial-gradient(circle at 90% 0%, rgba(66, 184, 131, 0.3), transparent 40%),
    linear-gradient(135deg, rgba(66, 184, 131, 0.3), rgba(82, 196, 166, 0.25));
}

/* d2x / 教程项目 - 紫色主题 */
.project-card.type-d2x {
  border-color: rgba(159, 122, 234, 0.4);
  background: linear-gradient(180deg, rgba(159, 122, 234, 0.06), rgba(159, 122, 234, 0.02));
}

.project-card.type-d2x .card-surface {
  background: linear-gradient(180deg, rgba(159, 122, 234, 0.08), rgba(159, 122, 234, 0.03)),
    var(--vp-c-bg);
}

.project-card.type-d2x:hover {
  border-color: rgba(159, 122, 234, 0.7);
  box-shadow: 0 16px 40px rgba(159, 122, 234, 0.18);
}

.project-card.type-d2x .card-glow {
  background: radial-gradient(circle at 10% 20%, rgba(159, 122, 234, 0.3), transparent 45%),
    radial-gradient(circle at 90% 0%, rgba(179, 142, 244, 0.25), transparent 40%),
    linear-gradient(135deg, rgba(159, 122, 234, 0.25), rgba(179, 142, 244, 0.2));
}

/* 默认项目 - 保持无色 */
.project-card.type-default {
  /* 使用基础样式，无特殊颜色 */
}

.card-footer {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-top: auto;
  color: var(--vp-c-brand-1);
  font-weight: 700;
  font-size: 0.95rem;
  transition: gap 0.2s ease;
}

.project-card:hover .card-footer {
  gap: 12px;
}

.cta-arrow {
  font-size: 1.1rem;
}

@media (max-width: 720px) {
  .projects-section {
    padding: 0 16px;
  }

  .projects-grid {
    gap: 14px;
  }

  .project-card {
    border-radius: 14px;
  }

  .card-surface {
    padding: 18px;
  }
}
</style>
