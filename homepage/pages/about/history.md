---
layout: page
---

<AboutLayout>
  <div class="history-container">
    <h2 class="history-title">历史线</h2>
    <Timeline :events="historyEvents" />
  </div>
</AboutLayout>

<script setup>
const historyEvents = [
  {
    time: '2026',
    description: '目标: MCPP社区完成从0到1的过程 - 实现可持续发展, 作为墨伽(MOGA)成功案例'
  },
  {
    time: '2026-01-10',
    description: 'CT-002加入, 社区团队(3人)进行第0次线上双周会',
  },
  {
    time: '2026-01-05',
    description: '社区架构、治理、文化、协作机制形成参考文档',
  },
  {
    time: '2026-01-01',
    description: '迁移mcpp-stnadard改名为d2mcpp, 作为社区冷启动项目',
    link: 'https://github.com/mcpp-community/d2mcpp'
  },
  {
    time: '2025',
    description: '起源 & 构想'
  },
  {
    time: '2025-12-27',
    description: '第一个核心团队成员CT-001加入',
  },
  {
    time: '2025-12-20',
    description: '筹备(初) - 社区架构、团队、协作机制、目标与路径',
  },
  {
    time: '2025-12-19',
    description: 'd2x工具、mcpplibs的templates和llmapi, C++23模块化实现案例',
  },
  {
    time: '2025-12-15',
    description: '初步构想社区形式及发展 - 技术传播、模块化库、社区文化',
  },
  {
    time: '2025-12-05',
    description: '创建mcpp-community和mcpplibs',
    link: 'https://github.com/mcpp-community'
  },
  {
    time: '2025-12-01',
    description: '起源 - 从MSCP社区活动, 演化成成立一个创建MCPP社区作为MOGA的开源可持续发展案例',
  },
  {
    time: '2025-11',
    description: 'MOGA/墨伽, 探索开源与可持续发展中的MSCP社区活动',
    link: 'https://moga.d2learn.org/activity/mscp/intro.html'
  },
  {
    time: '2025-06',
    description: 'mcpp-standard项目',
    link: 'https://github.com/mcpp-community/d2mcpp'
  },
]
</script>

<style scoped>
.history-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 40px 20px;
}

.history-title {
  font-size: clamp(1.8rem, 4vw, 2.5rem);
  font-weight: 700;
  color: var(--vp-c-text-1);
  margin: 0 0 16px 0;
}

.history-text {
  font-size: clamp(1.1rem, 2.5vw, 1.5rem);
  color: var(--vp-c-text-2);
  margin: 0;
  font-weight: 500;
}

@media (max-width: 640px) {
  .history-title {
    font-size: 1.6rem;
  }
  
  .history-text {
    font-size: 1.1rem;
  }
}
</style>