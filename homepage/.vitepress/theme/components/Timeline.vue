<template>
  <div class="timeline">
    <div 
      v-for="(event, index) in processedEvents" 
      :key="index" 
      class="timeline-item"
      :class="[
        `timeline-${event.type}`,
        { 'timeline-clickable': event.link },
        { 'timeline-current': event.isCurrent }
      ]"
    >
      <div class="timeline-left">
        <span class="timeline-time">{{ event.time }}</span>
      </div>
      <div class="timeline-center">
        <div class="timeline-dot"></div>
        <div v-if="index < processedEvents.length - 1" class="timeline-line"></div>
      </div>
      <div class="timeline-right">
        <a 
          v-if="event.link" 
          :href="event.link" 
          class="timeline-content timeline-link"
          target="_blank"
          rel="noopener noreferrer"
        >
          {{ event.description }}
        </a>
        <div v-else class="timeline-content">
          {{ event.description }}
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

interface InputEvent {
  time: string // 格式: 'xxxx' 或 'xxxx-xx' 或 'xxxx-xx-xx'
  description: string
  link?: string
}

interface TimelineEvent {
  type: 'year' | 'month' | 'day'
  time: string
  description: string
  link?: string
  sortKey: string
  isGenerated?: boolean
  isCurrent?: boolean
}

const props = defineProps<{
  events: InputEvent[]
}>()

const getTodayDate = () => {
  const today = new Date()
  const year = today.getFullYear()
  const month = String(today.getMonth() + 1).padStart(2, '0')
  const day = String(today.getDate()).padStart(2, '0')
  return `${year}-${month}-${day}`
}

const processedEvents = computed(() => {
  const todayDate = getTodayDate()
  const result: TimelineEvent[] = []
  const userYears = new Set<string>()
  const userMonths = new Set<string>()
  const yearsWithEvents = new Map<string, string[]>()
  const monthsWithEvents = new Map<string, string[]>()
  let hasCurrentEvent = false

  // 解析用户事件
  let parsedEvents = props.events.map(event => {
    const time = event.time
    let type: 'year' | 'month' | 'day'
    let sortKey: string
    
    if (/^\d{4}$/.test(time)) {
      type = 'year'
      sortKey = time + '-99-99-2'
      userYears.add(time)
    } else if (/^\d{4}-\d{2}$/.test(time)) {
      type = 'month'
      sortKey = time + '-99-1'
      userMonths.add(time)
      const year = time.substring(0, 4)
      if (!yearsWithEvents.has(year)) yearsWithEvents.set(year, [])
    } else if (/^\d{4}-\d{2}-\d{2}$/.test(time)) {
      type = 'day'
      sortKey = time + '-0'
      const year = time.substring(0, 4)
      const month = time.substring(0, 7)
      
      if (!yearsWithEvents.has(year)) yearsWithEvents.set(year, [])
      if (!monthsWithEvents.has(month)) monthsWithEvents.set(month, [])
      monthsWithEvents.get(month)!.push(time)
    } else {
      type = 'day'
      sortKey = time + '-0'
    }

    const isCurrent = sortKey === todayDate
    if (isCurrent) hasCurrentEvent = true

    return {
      ...event,
      type,
      sortKey,
      isGenerated: false,
      isCurrent
    }
  })

  // 如果没有今天的事件，添加一个
  if (!hasCurrentEvent) {
    const todayYear = todayDate.substring(0, 4)
    const todayMonth = todayDate.substring(0, 7)
    
    parsedEvents.push({
      time: todayDate,
      description: '',
      type: 'day',
      sortKey: todayDate + '-0',
      isGenerated: false,
      isCurrent: true
    })
    
    if (!yearsWithEvents.has(todayYear)) yearsWithEvents.set(todayYear, [])
    if (!monthsWithEvents.has(todayMonth)) monthsWithEvents.set(todayMonth, [])
  }

  // 收集所有需要的年份
  parsedEvents.forEach(event => {
    if (event.type === 'day' || event.type === 'month') {
      const year = event.time.substring(0, 4)
      if (!yearsWithEvents.has(year)) {
        yearsWithEvents.set(year, [])
      }
    }
  })

  // 为每个年份生成年标记（如果用户没提供）
  yearsWithEvents.forEach((_, year) => {
    if (!userYears.has(year)) {
      result.push({
        type: 'year',
        time: year,
        description: year + ' 年',
        sortKey: year + '-99-99-2',
        isGenerated: true
      })
    }
  })

  // 为每个月份生成月标记（如果用户没提供）
  monthsWithEvents.forEach((_, month) => {
    if (!userMonths.has(month)) {
      const [year, monthNum] = month.split('-')
      result.push({
        type: 'month',
        time: `${year}年${monthNum}月`,
        description: `${year}年${monthNum}月`,
        sortKey: month + '-99-1',
        isGenerated: true
      })
    }
  })

  // 合并所有事件并排序
  result.push(...parsedEvents)
  result.sort((a, b) => b.sortKey.localeCompare(a.sortKey))

  return result
})
</script>

<style scoped>
.timeline {
  max-width: 900px;
  margin: 0 auto;
  padding: 20px;
}

.timeline-item {
  display: grid;
  grid-template-columns: 120px 40px 1fr;
  gap: 20px;
  position: relative;
  margin-bottom: 8px;
}

.timeline-left {
  text-align: right;
  padding-top: 4px;
}

.timeline-time {
  font-weight: 600;
  color: var(--vp-c-text-2);
}

/* 年份 - 大字体，品牌色 */
.timeline-year .timeline-time {
  font-size: 1.5rem;
  color: var(--vp-c-brand-1);
  font-weight: 700;
}

/* 月份 - 中等字体，紫色 */
.timeline-month .timeline-time {
  font-size: 1.1rem;
  color: #9333ea;
  font-weight: 600;
}

/* 日期 - 小字体，蓝色 */
.timeline-day .timeline-time {
  font-size: 0.95rem;
  color: #3b82f6;
  font-weight: 500;
}

.timeline-center {
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
}

.timeline-dot {
  border-radius: 50%;
  flex-shrink: 0;
  z-index: 2;
  background: var(--vp-c-bg);
  border: 3px solid var(--vp-c-brand-1);
}

/* 年份 - 大圆点 */
.timeline-year .timeline-dot {
  width: 20px;
  height: 20px;
  border-width: 4px;
  border-color: var(--vp-c-brand-1);
  box-shadow: 0 0 0 4px rgba(66, 184, 131, 0.2);
}

/* 月份 - 中等圆点 */
.timeline-month .timeline-dot {
  width: 16px;
  height: 16px;
  border-width: 3px;
  border-color: #9333ea;
  box-shadow: 0 0 0 3px rgba(147, 51, 234, 0.15);
}

/* 日期 - 小圆点 */
.timeline-day .timeline-dot {
  width: 12px;
  height: 12px;
  border-width: 3px;
  border-color: #3b82f6;
  box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.15);
}

.timeline-line {
  width: 2px;
  flex-grow: 1;
  background: var(--vp-c-divider);
  margin-top: 4px;
}

.timeline-right {
  padding-top: 2px;
  padding-bottom: 20px;
}

.timeline-content {
  color: var(--vp-c-text-1);
  line-height: 1.6;
}

.timeline-year .timeline-content {
  font-size: 1.1rem;
  font-weight: 600;
}

.timeline-month .timeline-content {
  font-size: 1rem;
  font-weight: 500;
}

.timeline-day .timeline-content {
  font-size: 0.95rem;
}

.timeline-link {
  text-decoration: none;
  color: var(--vp-c-text-1);
  transition: all 0.2s ease;
  display: inline-block;
  position: relative;
}

.timeline-link::after {
  content: '';
  position: absolute;
  left: 0;
  right: 0;
  bottom: -2px;
  height: 2px;
  background: var(--vp-c-brand-1);
  transform: scaleX(0);
  transition: transform 0.2s ease;
}

.timeline-link:hover {
  color: var(--vp-c-brand-1);
}

.timeline-link:hover::after {
  transform: scaleX(1);
}

.timeline-clickable .timeline-dot {
  cursor: pointer;
  transition: all 0.2s ease;
}

.timeline-clickable:hover .timeline-dot {
  transform: scale(1.2);
  box-shadow: 0 0 0 6px rgba(66, 184, 131, 0.3);
}

.timeline-clickable.timeline-month:hover .timeline-dot {
  box-shadow: 0 0 0 5px rgba(147, 51, 234, 0.25);
}

.timeline-clickable.timeline-day:hover .timeline-dot {
  box-shadow: 0 0 0 4px rgba(59, 130, 246, 0.25);
}

/* 当前事件 - 呼吸动画 */
.timeline-current .timeline-dot {
  animation: breathing 2s ease-in-out infinite;
  border-color: var(--vp-c-brand-1);
}

@keyframes breathing {
  0%, 100% {
    transform: scale(1);
    box-shadow: 0 0 0 0 rgba(66, 184, 131, 0.7);
  }
  50% {
    transform: scale(1.1);
    box-shadow: 0 0 0 8px rgba(66, 184, 131, 0);
  }
}

@media (max-width: 640px) {
  .timeline-item {
    grid-template-columns: 80px 30px 1fr;
    gap: 12px;
  }

  .timeline-year .timeline-time {
    font-size: 1.2rem;
  }

  .timeline-month .timeline-time {
    font-size: 1rem;
  }

  .timeline-day .timeline-time {
    font-size: 0.85rem;
  }

  .timeline-year .timeline-content {
    font-size: 1rem;
  }

  .timeline-month .timeline-content {
    font-size: 0.95rem;
  }

  .timeline-day .timeline-content {
    font-size: 0.9rem;
  }
}
</style>
