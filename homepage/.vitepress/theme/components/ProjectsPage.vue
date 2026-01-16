<template>
  <div class="projects-container">
    <!-- 左侧过滤栏 -->
    <aside class="filter-sidebar">
      <div class="filter-group">
        <h3 class="filter-title">状态</h3>
        <div class="filter-options">
          <label class="filter-item">
            <input type="checkbox" v-model="selectedStatuses" value="active" />
            <span>活跃</span>
          </label>
          <label class="filter-item">
            <input type="checkbox" v-model="selectedStatuses" value="wip" />
            <span>进行中</span>
          </label>
          <label class="filter-item">
            <input type="checkbox" v-model="selectedStatuses" value="incubating" />
            <span>孵化中</span>
          </label>
        </div>
      </div>

      <div class="filter-group">
        <h3 class="filter-title">类型</h3>
        <div class="filter-options">
          <label class="filter-item">
            <input type="checkbox" v-model="selectedCategories" value="library" />
            <span>库</span>
          </label>
          <label class="filter-item">
            <input type="checkbox" v-model="selectedCategories" value="tutorial" />
            <span>教程</span>
          </label>
          <label class="filter-item">
            <input type="checkbox" v-model="selectedCategories" value="application" />
            <span>应用</span>
          </label>
          <label class="filter-item">
            <input type="checkbox" v-model="selectedCategories" value="documentation" />
            <span>文档</span>
          </label>
          <label class="filter-item">
            <input type="checkbox" v-model="selectedCategories" value="other" />
            <span>其他</span>
          </label>
        </div>
      </div>

      <div class="filter-actions">
        <button class="reset-btn" @click="resetFilters">重置筛选</button>
      </div>
    </aside>

    <!-- 主要内容 -->
    <main class="projects-main">
      <div class="projects-header">
        <div class="search-box">
          <input
            v-model="searchQuery"
            type="text"
            placeholder="搜索项目 (标题/内容/标签)..."
            class="search-input"
          />
          <svg class="search-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <circle cx="11" cy="11" r="8"></circle>
            <path d="m21 21-4.35-4.35"></path>
          </svg>
        </div>
      </div>

      <div class="projects-grid">
        <ProjectCard
          v-for="project in filteredProjects"
          :key="project.id"
          :title="project.title"
          :description="project.description"
          :url="project.url"
          :tags="project.tags"
          :status="project.status as any"
          :highlight="false"
          :typeClass="projectType(project.tags)"
          :contribute="project.contribute"
          ctaMode="buttons"
        />
      </div>

      <div v-if="filteredProjects.length === 0" class="no-results">
        <p>未找到匹配的项目</p>
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import ProjectCard from './ProjectCard.vue'

interface Project {
  id: string
  title: string
  description: string
  tags?: string[]
  url?: string
  status?: 'active' | 'wip' | 'incubating'
  category?: 'library' | 'tutorial' | 'application' | 'documentation' | 'other'
  contribute?: string
}

const props = withDefaults(
  defineProps<{
    projects?: Project[]
  }>(),
  {
    projects: () => []
  }
)

const searchQuery = ref('')
const selectedStatuses = ref<string[]>([])
const selectedCategories = ref<string[]>([])

const statusText = {
  active: '活跃',
  wip: '进行中',
  incubating: '孵化中'
}

const projectType = (tags?: string[]) => {
  if (!tags) return 'type-default'
  if (tags.some(tag => tag === 'mcpplibs')) return 'type-mcpplibs'
  if (tags.some(tag => tag === 'd2x' || tag === 'D2X' || tag === '教程')) return 'type-d2x'
  return 'type-default'
}

const filteredProjects = computed(() => {
  return props.projects.filter(project => {
    // 状态过滤
    const statusMatch = selectedStatuses.value.length === 0 || (project.status ? selectedStatuses.value.includes(project.status) : true)
    
    // 类型过滤
    const categoryMatch = selectedCategories.value.length === 0 || (project.category ? selectedCategories.value.includes(project.category) : true)
    
    // 搜索过滤
    let searchMatch = true
    if (searchQuery.value.trim()) {
      const query = searchQuery.value.toLowerCase().trim()
      const titleMatch = project.title.toLowerCase().includes(query)
      const descriptionMatch = project.description.toLowerCase().includes(query)
      const tagsMatch = project.tags?.some(tag => tag.toLowerCase().includes(query)) || false
      searchMatch = titleMatch || descriptionMatch || tagsMatch
    }

    return statusMatch && categoryMatch && searchMatch
  })
})

const resetFilters = () => {
  selectedStatuses.value = []
  selectedCategories.value = []
  searchQuery.value = ''
}
</script>

<style scoped>
.projects-container {
  display: flex;
  width: 100%;
  gap: 24px;
  justify-content: center;
}

.filter-sidebar {
  position: fixed;
  left: 24px;
  top: 50%;
  transform: translateY(-50%);
  width: 200px;
  background: var(--vp-c-bg-soft);
  border: 1px solid var(--vp-c-divider);
  border-radius: 12px;
  padding: 20px;
  max-height: calc(100vh - 120px);
  overflow-y: auto;
  z-index: 10;
}

.filter-actions {
  margin-top: 8px;
  display: flex;
  justify-content: flex-end;
}

.reset-btn {
  padding: 8px 12px;
  border-radius: 8px;
  border: 1px solid var(--vp-c-divider);
  background: var(--vp-c-bg);
  color: var(--vp-c-text-2);
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
}

.reset-btn:hover {
  border-color: var(--vp-c-brand-1);
  color: var(--vp-c-brand-1);
}

.filter-group {
  margin-bottom: 28px;
}

.filter-group:last-child {
  margin-bottom: 0;
}

.filter-title {
  font-size: 0.95rem;
  font-weight: 700;
  color: var(--vp-c-text-1);
  margin: 0 0 12px 0;
  padding-bottom: 8px;
  border-bottom: 2px solid var(--vp-c-divider);
}

.filter-options {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.filter-item {
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
  user-select: none;
  font-size: 0.9rem;
  color: var(--vp-c-text-2);
}

.filter-item input[type="checkbox"] {
  cursor: pointer;
  width: 16px;
  height: 16px;
  accent-color: var(--vp-c-brand-1);
}

.filter-item:hover {
  color: var(--vp-c-text-1);
}

.projects-main {
  flex: 1;
  margin-left: 240px;
  width: 100%;
  max-width: 1200px;
  margin-right: auto;
}

.projects-wrapper {
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 40px 24px;
}

.projects-header {
  text-align: center;
  margin-top: 48px;
  margin-bottom: 48px;
}

.projects-header h1 {
  font-size: clamp(2rem, 5vw, 3rem);
  font-weight: 700;
  color: var(--vp-c-text-1);
  margin: 0 0 32px 0;
}

.search-box {
  position: relative;
  max-width: 500px;
  margin: 0 auto;
}

.search-input {
  width: 100%;
  padding: 12px 40px 12px 16px;
  border: 2px solid var(--vp-c-divider);
  border-radius: 8px;
  background: var(--vp-c-bg-soft);
  color: var(--vp-c-text-1);
  font-size: 1rem;
  transition: border-color 0.2s ease;
}

.search-input:focus {
  outline: none;
  border-color: var(--vp-c-brand-1);
}

.search-input::placeholder {
  color: var(--vp-c-text-3);
}

.search-icon {
  position: absolute;
  right: 12px;
  top: 50%;
  transform: translateY(-50%);
  width: 20px;
  height: 20px;
  color: var(--vp-c-text-3);
  pointer-events: none;
}

.projects-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 24px;
  margin-bottom: 40px;
  padding: 0 24px;
}

.project-card {
  position: relative;
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  border-radius: 16px;
  overflow: hidden;
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

.card-header {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 12px;
  margin-bottom: 12px;
}

.title-section {
  display: flex;
  flex-direction: column;
  gap: 8px;
  flex: 1;
}

.project-title {
  font-size: 1.25rem;
  font-weight: 700;
  color: var(--vp-c-text-1);
  margin: 0;
}

.status-badge {
  display: inline-block;
  width: fit-content;
  padding: 4px 10px;
  border-radius: 4px;
  font-size: 0.75rem;
  font-weight: 600;
  text-transform: uppercase;
}

.status-active {
  background: rgba(76, 175, 80, 0.1);
  color: #4caf50;
}

.status-wip {
  background: rgba(255, 193, 7, 0.1);
  color: #ffc107;
}

.status-incubating {
  background: rgba(33, 150, 243, 0.1);
  color: #2196f3;
}

.project-link {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 28px;
  height: 28px;
  color: var(--vp-c-brand-1);
  text-decoration: none;
  border-radius: 6px;
  transition: all 0.2s ease;
  flex-shrink: 0;
}

.project-link:hover {
  background: rgba(66, 184, 131, 0.1);
}

.project-link svg {
  width: 18px;
  height: 18px;
}

.project-description {
  font-size: 0.95rem;
  color: var(--vp-c-text-2);
  margin: 0 0 16px 0;
  line-height: 1.6;
  flex: 1;
}

.project-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-top: auto;
}

.tag {
  display: inline-block;
  padding: 6px 12px;
  background: rgba(66, 184, 131, 0.1);
  color: var(--vp-c-brand-1);
  border-radius: 999px;
  font-size: 0.85rem;
  font-weight: 500;
}

.no-results {
  text-align: center;
  padding: 60px 20px;
  color: var(--vp-c-text-3);
}

.no-results p {
  font-size: 1.1rem;
  margin: 0;
}

.card-footer {
  display: flex;
  gap: 10px;
  margin-top: auto;
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

@media (max-width: 1024px) {
  .filter-sidebar {
    position: static;
    top: auto;
    transform: none;
    width: 100%;
    max-height: none;
    margin-bottom: 24px;
    display: flex;
    gap: 16px;
  }

  .filter-group {
    flex: 1;
    margin-bottom: 0;
  }

  .projects-main {
    margin-left: 0;
  }

  .projects-container {
    flex-direction: column;
  }
}

@media (max-width: 768px) {
  .filter-sidebar {
    flex-direction: column;
  }

  .filter-group {
    flex: none;
  }

  .projects-grid {
    grid-template-columns: 1fr;
    gap: 16px;
    padding: 0 16px;
  }

  .projects-header {
    margin-bottom: 32px;
  }
}
</style>
