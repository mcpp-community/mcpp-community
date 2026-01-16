<template>
  <div class="core-team-section">
    <!-- 切换按钮 -->
    <div class="team-selector">
      <button 
        class="team-button" 
        :class="{ active: activeTeam === 'core' }"
        @click="switchTeam('core')"
      >
        CoreTeam
      </button>
      <button 
        class="team-button" 
        :class="{ active: activeTeam === 'v' }"
        @click="switchTeam('v')"
      >
        VTeam
      </button>
    </div>

    <div class="team-layout">
      <!-- 左侧：详细信息卡片 -->
      <div 
        class="member-details-container"
        @mouseenter="onCardEnter"
        @mouseleave="onCardLeave"
      >
        <Transition name="fade" mode="out-in">
          <HoverCard 
            v-if="selectedMember" 
            :key="selectedIndex" 
            class="member-card"
          >
            <a
              v-if="selectedMember.sponsor"
              :href="selectedMember.sponsor"
              target="_blank"
              rel="noopener noreferrer"
              class="sponsor-button"
            >
              <svg viewBox="0 0 24 24" fill="currentColor" class="sponsor-icon">
                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
              </svg>
              赞助
            </a>
            <div class="card-header">
              <img :src="selectedMember.avatar" :alt="selectedMember.name" class="card-avatar" />
              <div class="card-header-info">
                <h3 class="member-name">{{ selectedMember.name }}</h3>
                <p class="member-bio">{{ selectedMember.bio }}</p>
              </div>
            </div>

            <div class="card-body">
              <div v-if="selectedMember.projects && selectedMember.projects.length" class="projects-section">
                <h4 class="section-title">参与的社区项目</h4>
                <ul class="projects-list">
                  <li v-for="(project, idx) in selectedMember.projects" :key="idx">
                    <a 
                      v-if="typeof project === 'object' && project.link"
                      :href="project.link"
                      target="_blank"
                      rel="noopener noreferrer"
                      class="project-link"
                    >
                      <span class="project-arrow">▸</span>
                      {{ typeof project === 'object' ? project.name : project }}
                    </a>
                    <span v-else>
                      <span class="project-arrow">▸</span>
                      {{ typeof project === 'object' ? project.name : project }}
                    </span>
                  </li>
                </ul>
              </div>
            </div>

            <!-- 社交链接（底部） -->
            <div class="card-footer">
              <div class="social-links">
              <a
                  v-if="selectedMember.homepage"
                  :href="selectedMember.homepage"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="social-link"
                  title="个人网站"
                >
                  <svg viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/>
                  </svg>
                </a>
                <a
                  v-if="selectedMember.github"
                  :href="selectedMember.github"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="social-link"
                  title="GitHub"
                >
                  <svg viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2A10 10 0 0 0 2 12c0 4.42 2.87 8.17 6.84 9.5.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34-.46-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.87 1.52 2.34 1.07 2.91.83.09-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.92 0-1.11.38-2 1.03-2.71-.1-.25-.45-1.29.1-2.64 0 0 .84-.27 2.75 1.02.79-.22 1.65-.33 2.5-.33.85 0 1.71.11 2.5.33 1.91-1.29 2.75-1.02 2.75-1.02.55 1.35.2 2.39.1 2.64.65.71 1.03 1.6 1.03 2.71 0 3.82-2.34 4.66-4.57 4.91.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0 0 12 2z"/>
                  </svg>
                </a>
                <a
                  v-if="selectedMember.bilibili"
                  :href="selectedMember.bilibili"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="social-link"
                  title="Bilibili"
                >
                  <svg viewBox="0 0 24 24" fill="currentColor">
                    <path d="M17.813 4.653h.854c1.51.054 2.769.578 3.773 1.574 1.004.995 1.524 2.249 1.56 3.76v7.36c-.036 1.51-.556 2.769-1.56 3.773s-2.262 1.524-3.773 1.56H5.333c-1.51-.036-2.769-.556-3.773-1.56S.036 18.858 0 17.347v-7.36c.036-1.511.556-2.765 1.56-3.76 1.004-.996 2.262-1.52 3.773-1.574h.774l-1.174-1.12a1.234 1.234 0 0 1-.373-.906c0-.356.124-.658.373-.907l.027-.027c.267-.249.573-.373.92-.373.347 0 .653.124.92.373L9.653 4.44c.071.071.134.142.187.213h4.267a.836.836 0 0 1 .16-.213l2.853-2.747c.267-.249.573-.373.92-.373.347 0 .662.151.929.4.267.249.391.551.391.907 0 .355-.124.657-.373.906zM5.333 7.24c-.746.018-1.373.276-1.88.773-.506.498-.769 1.13-.786 1.894v7.52c.017.764.28 1.395.786 1.893.507.498 1.134.756 1.88.773h13.334c.746-.017 1.373-.275 1.88-.773.506-.498.769-1.129.786-1.893v-7.52c-.017-.765-.28-1.396-.786-1.894-.507-.497-1.134-.755-1.88-.773zM8 11.107c.373 0 .684.124.933.373.25.249.383.569.4.96v1.173c-.017.391-.15.711-.4.96-.249.25-.56.374-.933.374s-.684-.125-.933-.374c-.25-.249-.383-.569-.4-.96V12.44c0-.373.129-.689.386-.947.258-.257.574-.386.947-.386zm8 0c.373 0 .684.124.933.373.25.249.383.569.4.96v1.173c-.017.391-.15.711-.4.96-.249.25-.56.374-.933.374s-.684-.125-.933-.374c-.25-.249-.383-.569-.4-.96V12.44c.017-.391.15-.711.4-.96.249-.249.56-.373.933-.373Z"/>
                  </svg>
                </a>
                                <a
                  v-if="selectedMember.youtube"
                  :href="selectedMember.youtube"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="social-link"
                  title="YouTube"
                >
                  <svg viewBox="0 0 24 24" fill="currentColor">
                    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                  </svg>
                </a>
                <a
                  v-if="selectedMember.x"
                  :href="selectedMember.x"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="social-link"
                  title="X (Twitter)"
                >
                  <svg viewBox="0 0 24 24" fill="currentColor">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                  </svg>
                </a>
                <a
                  v-if="selectedMember.zhihu"
                  :href="selectedMember.zhihu"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="social-link"
                  title="知乎"
                >
                  <svg fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <title>Zhihu</title>
                    <path d="M5.721 0C2.251 0 0 2.25 0 5.719V18.28C0 21.751 2.252 24 5.721 24h12.56C21.751 24 24 21.75 24 18.281V5.72C24 2.249 21.75 0 18.281 0zm1.964 4.078c-.271.73-.5 1.434-.68 2.11h4.587c.545-.006.445 1.168.445 1.171H9.384a58.104 58.104 0 01-.112 3.797h2.712c.388.023.393 1.251.393 1.266H9.183a9.223 9.223 0 01-.408 2.102l.757-.604c.452.456 1.512 1.712 1.906 2.177.473.681.063 2.081.063 2.081l-2.794-3.382c-.653 2.518-1.845 3.607-1.845 3.607-.523.468-1.58.82-2.64.516 2.218-1.73 3.44-3.917 3.667-6.497H4.491c0-.015.197-1.243.806-1.266h2.71c.024-.32.086-3.254.086-3.797H6.598c-.136.406-.158.447-.268.753-.594 1.095-1.603 1.122-1.907 1.155.906-1.821 1.416-3.6 1.591-4.064.425-1.124 1.671-1.125 1.671-1.125zM13.078 6h6.377v11.33h-2.573l-2.184 1.373-.401-1.373h-1.219zm1.313 1.219v8.86h.623l.263.937 1.455-.938h1.456v-8.86z"/>
                  </svg>
                </a>
              </div>
            </div>
          </HoverCard>
        </Transition>
      </div>

      <!-- 右侧：头像网格 -->
      <div class="team-grid-container">
        <div class="team-grid">
          <div
            v-for="(member, index) in members"
            :key="index"
            class="team-member"
            :class="{ active: selectedIndex === index }"
            @mouseenter="selectMember(index)"
            @mouseleave="onMouseLeave"
          >
            <img :src="member.avatar" :alt="member.name" />
          </div>
          <!-- X轴分隔线（垂直线） -->
          <div
            v-for="i in gridSize - 1"
            :key="`v-${i}`"
            class="divider vertical"
            :class="{ active: isVerticalDividerActive(i) }"
            :style="{ left: `${(i * 100) / gridSize}%` }"
          ></div>
          <!-- Y轴分隔线（水平线） -->
          <div
            v-for="i in gridSize - 1"
            :key="`h-${i}`"
            class="divider horizontal"
            :class="{ active: isHorizontalDividerActive(i) }"
            :style="{ top: `${(i * 100) / gridSize}%` }"
          ></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'
import HoverCard from './HoverCard.vue'

interface TeamMember {
  name: string
  avatar: string
  bio?: string
  projects?: Array<string | { name: string; link?: string }>
  github?: string
  bilibili?: string
  x?: string
  zhihu?: string
  youtube?: string
  homepage?: string
  sponsor?: string
}

const props = defineProps<{
  coreTeam: TeamMember[]
  vTeam: TeamMember[]
}>()

const selectedIndex = ref(0)
const isUserInteracting = ref(false)
const activeTeam = ref<'core' | 'v'>('core')
let autoSwitchTimer: number | null = null
let hoverDelayTimer: number | null = null

const members = computed(() => activeTeam.value === 'core' ? props.coreTeam || [] : props.vTeam || [])
const gridSize = computed(() => Math.ceil(Math.sqrt(members.value.length)))
const selectedMember = computed(() => members.value[selectedIndex.value])

const switchTeam = (team: 'core' | 'v') => {
  if (activeTeam.value !== team) {
    activeTeam.value = team
    selectedIndex.value = 0
    resetAutoSwitch()
  }
}

// 计算选中头像的行列位置
const selectedPosition = computed(() => {
  const row = Math.floor(selectedIndex.value / gridSize.value)
  const col = selectedIndex.value % gridSize.value
  return { row, col }
})

// 判断垂直分割线是否应该高亮（选中头像的左右边）
const isVerticalDividerActive = (dividerIndex: number) => {
  const { col } = selectedPosition.value
  // dividerIndex 从 1 到 gridSize-1（v-for="i in gridSize - 1"）
  // dividerIndex=1 表示第0列和第1列之间的垂直线，位置在列索引1的左边
  // dividerIndex=n 表示第n-1列和第n列之间的垂直线
  // 选中头像在col列，它的：
  //   左边界：dividerIndex = col（当 col > 0 时存在）
  //   右边界：dividerIndex = col + 1（当 col < gridSize - 1 时存在）
  return dividerIndex === col + 1 || (col > 0 && dividerIndex === col)
}

// 判断水平分割线是否应该高亮（选中头像的上下边）
const isHorizontalDividerActive = (dividerIndex: number) => {
  const { row } = selectedPosition.value
  // dividerIndex 从 1 到 gridSize-1（v-for="i in gridSize - 1"）
  // dividerIndex=1 表示第0行和第1行之间的水平线，位置在行索引1的上边
  // dividerIndex=n 表示第n-1行和第n行之间的水平线
  // 选中头像在row行，它的：
  //   上边界：dividerIndex = row（当 row > 0 时存在）
  //   下边界：dividerIndex = row + 1（当 row < gridSize - 1 时存在）
  return dividerIndex === row + 1 || (row > 0 && dividerIndex === row)
}

const selectMember = (index: number) => {
  // 清除之前的延时定时器
  if (hoverDelayTimer) clearTimeout(hoverDelayTimer)
  
  // 设置0.2秒延时
  hoverDelayTimer = window.setTimeout(() => {
    selectedIndex.value = index
    isUserInteracting.value = true
    resetAutoSwitch()
  }, 200)
}

const onMouseLeave = () => {
  // 清除延时定时器
  if (hoverDelayTimer) clearTimeout(hoverDelayTimer)
  isUserInteracting.value = false
  startAutoSwitch()
}

const onCardEnter = () => {
  // 鼠标进入卡片区域，停止自动切换
  isUserInteracting.value = true
  resetAutoSwitch()
}

const onCardLeave = () => {
  // 鼠标离开卡片区域，恢复自动切换
  isUserInteracting.value = false
  startAutoSwitch()
}

const randomSwitch = () => {
  if (!isUserInteracting.value && members.value.length > 0) {
    const newIndex = Math.floor(Math.random() * members.value.length)
    selectedIndex.value = newIndex
  }
}

const startAutoSwitch = () => {
  if (autoSwitchTimer) clearInterval(autoSwitchTimer)
  autoSwitchTimer = window.setInterval(randomSwitch, 5000)
}

const resetAutoSwitch = () => {
  if (autoSwitchTimer) clearInterval(autoSwitchTimer)
  autoSwitchTimer = window.setInterval(randomSwitch, 5000)
}

onMounted(() => {
  startAutoSwitch()
})

onUnmounted(() => {
  if (autoSwitchTimer) clearInterval(autoSwitchTimer)
  if (hoverDelayTimer) clearTimeout(hoverDelayTimer)
})
</script>

<style scoped>
.core-team-section {
  max-width: 1400px;
  margin: 60px auto;
  padding: 0 24px;
}

.team-selector {
  display: flex;
  justify-content: center;
  gap: 0;
  margin-bottom: 40px;
}

.team-button {
  padding: 8px 24px;
  font-size: 0.875rem;
  font-weight: 600;
  border: 2px solid var(--vp-c-divider);
  background: var(--vp-c-bg);
  color: var(--vp-c-text-2);
  cursor: pointer;
  transition: all 0.3s ease;
  flex: 0 0 auto;
  width: 100px;
}

.team-button:first-child {
  border-radius: 8px 0 0 8px;
  border-right: 1px solid var(--vp-c-divider);
}

.team-button:last-child {
  border-radius: 0 8px 8px 0;
  border-left: 1px solid var(--vp-c-divider);
}

.team-button:hover {
  border-color: var(--vp-c-brand-1);
  color: var(--vp-c-brand-1);
  z-index: 1;
}

.team-button.active {
  border-color: var(--vp-c-brand-1);
  background: var(--vp-c-brand-1);
  color: white;
  z-index: 2;
}

.team-title {
  text-align: center;
  font-size: 2.5rem;
  font-weight: 700;
  margin-bottom: 50px;
  background: linear-gradient(120deg, var(--vp-c-brand-1), var(--vp-c-brand-2));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.team-layout {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 60px;
  align-items: center;
}

.team-grid-container {
  display: flex;
  justify-content: center;
  align-items: center;
}

.team-grid {
  position: relative;
  width: 100%;
  max-width: 320px;
  aspect-ratio: 1;
  display: grid;
  grid-template-columns: repeat(v-bind(gridSize), 1fr);
  grid-template-rows: repeat(v-bind(gridSize), 1fr);
  gap: 0;
  background: var(--vp-c-bg-soft);
  border-radius: 16px;
  overflow: visible;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
}

.team-member {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 8px;
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;
}

.team-member::after {
  content: '';
  position: absolute;
  inset: 0;
  background: var(--vp-c-brand-1);
  opacity: 0;
  transition: opacity 0.3s ease;
}

.team-member:hover::after {
  opacity: 0.1;
}

.team-member.active {
  z-index: 10;
}

.team-member img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 8px;
  transition: opacity 0.3s ease;
  position: relative;
  z-index: 1;
  opacity: 0.5;
}

.team-member.active img {
  opacity: 1;
}

.divider {
  position: absolute;
  z-index: 5;
  pointer-events: none;
  transition: all 0.3s ease;
}

.divider.vertical {
  width: 2px;
  height: calc(100% + 20px);
  top: -10px;
  background: linear-gradient(
    to bottom,
    rgba(66, 184, 131, 0.3),
    rgba(52, 168, 250, 0.3)
  );
}

.divider.vertical.active {
  width: 3px;
  background: linear-gradient(
    to bottom,
    rgba(66, 184, 131, 0.9),
    rgba(52, 168, 250, 0.9)
  );
  box-shadow: 0 0 8px rgba(66, 184, 131, 0.5);
}

.divider.horizontal {
  width: calc(100% + 20px);
  height: 2px;
  left: -10px;
  background: linear-gradient(
    to right,
    rgba(52, 168, 250, 0.4),
    rgba(159, 122, 234, 0.4)
  );
}

.divider.horizontal.active {
  height: 3px;
  background: linear-gradient(
    to right,
    rgba(52, 168, 250, 0.9),
    rgba(159, 122, 234, 0.9)
  );
  box-shadow: 0 0 8px rgba(159, 122, 234, 0.5);
}

/* 详细信息卡片 */
.member-details-container {
  position: sticky;
  top: 100px;
  height: 450px;
  display: flex;
  align-items: center;
}

.member-card {
  background: var(--vp-c-bg-soft);
  border-radius: 16px;
  padding: 28px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
  border: 2px solid transparent;
  width: 100%;
  height: 450px;
  display: flex;
  flex-direction: column;
  position: relative;
  overflow: visible;
}

.member-card.card-hover {
  border-color: rgba(var(--vp-c-brand-1-rgb, 66, 184, 131), 0.4);
  box-shadow: 0 12px 48px rgba(0, 0, 0, 0.15);
}

.card-header {
  display: flex;
  gap: 20px;
  margin-bottom: 20px;
  align-items: start;
}

.card-avatar {
  width: 80px;
  height: 80px;
  border-radius: 12px;
  object-fit: cover;
  flex-shrink: 0;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

.card-header-info {
  flex: 1;
  min-width: 0;
}

.member-name {
  font-size: 1.75rem;
  font-weight: 700;
  margin: 0 0 8px 0;
  color: var(--vp-c-text-1);
}

.sponsor-button {
  position: absolute;
  top: 30px;
  right: 0;
  display: inline-flex;
  align-items: center;
  gap: 4px;
  padding: 8px 14px;
  background: rgba(239, 68, 68, 0.9);
  color: white;
  border-radius: 8px 8px 8px 0;
  font-weight: 600;
  font-size: 0.8rem;
  text-decoration: none;
  transition: all 0.3s ease;
  box-shadow: -2px 2px 8px rgba(0, 0, 0, 0.15);
  z-index: 10;
  transform: translateX(50%);
}

.sponsor-button:hover {
  background: rgba(239, 68, 68, 1);
  transform: translateX(50%) translateY(-2px);
  box-shadow: -3px 3px 12px rgba(239, 68, 68, 0.4);
}

.sponsor-icon {
  width: 14px;
  height: 14px;
}

.member-bio {
  font-size: 0.95rem;
  color: var(--vp-c-text-2);
  margin: 0;
  line-height: 1.6;
}

.card-body {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 20px;
  overflow-y: auto;
  margin-bottom: 16px;
}

.card-footer {
  margin-top: auto;
  padding-top: 16px;
  border-top: 1px solid var(--vp-c-divider);
}

.section-title {
  font-size: 1rem;
  font-weight: 700;
  color: var(--vp-c-brand-1);
  margin: 0 0 12px 0;
}

.projects-list {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.projects-list li {
  padding: 0;
  margin: 0;
  list-style: none;
}

.projects-list li::before {
  display: none;
}

.project-arrow {
  color: var(--vp-c-brand-1);
  font-weight: bold;
  margin-right: 8px;
}

.project-link {
  color: var(--vp-c-text-2);
  text-decoration: none;
  transition: color 0.3s ease;
  display: block;
  padding: 4px 0;
  font-size: 0.95rem;
  line-height: 1.5;
  cursor: pointer;
}

.project-link:hover {
  color: var(--vp-c-brand-1);
}

.projects-list li > span {
  display: block;
  padding: 4px 0;
  color: var(--vp-c-text-2);
  font-size: 0.95rem;
  line-height: 1.5;
}

.social-links {
  display: flex;
  gap: 16px;
}

.social-link {
  width: 40px;
  height: 40px;
  border-radius: 8px;
  background: var(--vp-c-bg);
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--vp-c-text-2);
  transition: all 0.3s ease;
  border: 1px solid var(--vp-c-divider);
}

.social-link:hover {
  color: var(--vp-c-brand-1);
  background: var(--vp-c-bg-alt);
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.social-link svg {
  width: 20px;
  height: 20px;
}

/* 过渡动画 */
.fade-enter-active,
.fade-leave-active {
  transition: all 0.3s ease;
}

.fade-enter-from {
  opacity: 0;
  transform: translateX(20px);
}

.fade-leave-to {
  opacity: 0;
  transform: translateX(-20px);
}

/* 响应式设计 */
@media (max-width: 1200px) {
  .team-layout {
    grid-template-columns: 1fr 1fr;
    gap: 40px;
  }

  .team-grid {
    max-width: 280px;
  }
}

@media (max-width: 968px) {
  .team-layout {
    grid-template-columns: 1fr;
    gap: 40px;
  }

  .team-grid-container {
    justify-content: center;
    order: -1;
  }

  .team-grid {
    max-width: 320px;
  }

  .member-details-container {
    position: static;
    height: auto;
  }

  .member-card {
    height: auto;
    min-height: 400px;
  }
}

@media (max-width: 640px) {
  .team-title {
    font-size: 2rem;
  }

  .team-grid {
    max-width: 50%;
  }

  .team-member {
    padding: 4px;
  }

  .member-card {
    padding: 20px;
    height: 450px;
    box-sizing: border-box;
  }

  .card-header {
    flex-direction: column;
    align-items: center;
    text-align: center;
  }

  .card-avatar {
    width: 100px;
    height: 100px;
  }

  .member-name {
    font-size: 1.5rem;
  }

  .social-links {
    flex-wrap: wrap;
    justify-content: center;
  }
}
</style>
