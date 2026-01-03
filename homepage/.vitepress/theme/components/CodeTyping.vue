<template>
  <div v-if="isHomePage" class="code-background">
    <div class="code-container">
      <pre class="code-snippet"><code><span class="keyword">import</span> std;
<span class="keyword">auto</span> <span class="function">main</span>() <span class="operator">-></span> <span class="type">int</span> {
    std::<span class="function">println</span>(<span class="string">"{{ dynamicText }}<span v-if="displayedCode" class="cursor">|</span>"</span>);
}</code></pre>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useRoute } from 'vitepress'

const route = useRoute()
const isHomePage = computed(() => route.path === '/' || route.path === '/index.html')

const text = "Hello, MCPP Community!"

const displayedCode = ref('')
let currentIndex = 0
let timeoutId: number | null = null

const dynamicText = computed(() => displayedCode.value)

const typeNextChar = () => {
  if (currentIndex < text.length) {
    displayedCode.value = text.substring(0, currentIndex + 1)
    currentIndex++
    timeoutId = setTimeout(typeNextChar, 100) as unknown as number
  } else {
    timeoutId = setTimeout(() => {
      displayedCode.value = ''
      currentIndex = 0
      typeNextChar()
    }, 3000) as unknown as number
  }
}

onMounted(() => {
  if (isHomePage.value) {
    typeNextChar()
  }
})

onUnmounted(() => {
  if (timeoutId) {
    clearTimeout(timeoutId)
  }
})
</script>

<style scoped>
.code-background {
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;
}

.code-container {
  background: rgba(26, 27, 38, 0.5);
  border-radius: clamp(8px, 1.5vw, 12px);
  overflow: hidden;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.4);
  border: 1px solid rgba(255, 255, 255, 0.1);
  width: min(90vw, 480px);
  max-width: 90vw;
}

.code-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.75rem 1.25rem;
  background: rgba(0, 0, 0, 0.3);
  border-bottom: 1px solid rgba(255, 255, 255, 0.05);
}

.lang {
  font-size: 11px;
  font-weight: 600;
  color: #61afef;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.dots {
  display: flex;
  gap: 6px;
}

.dot {
  width: 10px;
  height: 10px;
  border-radius: 50%;
}

.dot:nth-child(1) { background: #ff5f57; }
.dot:nth-child(2) { background: #ffbd2e; }
.dot:nth-child(3) { background: #28ca42; }

.code-snippet {
  margin: 0;
  padding: clamp(1rem, 2vw, 1.5rem) clamp(0.875rem, 1.8vw, 1.25rem);
  font-family: 'Fira Code', 'JetBrains Mono', 'Consolas', monospace;
  font-size: clamp(12px, 1.8vw, 14px);
  line-height: 1.8;
  color: #abb2bf;
  white-space: pre;
  text-align: left;
  min-height: clamp(100px, 15vh, 120px);
  display: flex;
  align-items: flex-start;
}

.code-snippet code {
  flex: 1;
}

/* 语法高亮 */
.keyword {
  color: #c678dd;
  font-weight: 600;
}

.function {
  color: #61afef;
}

.type {
  color: #e5c07b;
}

.string {
  color: #98c379;
}

.operator {
  color: #56b6c2;
}

.cursor {
  color: #61afef;
  font-weight: 400;
  margin-left: 2px;
  animation: blink 1s step-end infinite;
}

@keyframes blink {
  0%, 50% { opacity: 1; }
  51%, 100% { opacity: 0; }
}

@media (max-width: 960px) {
  .code-container {
    width: min(85vw, 420px);
  }
  
  .code-snippet {
    font-size: 13px;
    padding: 1.25rem 1rem;
  }
}

@media (max-width: 640px) {
  .code-background {
    padding: 1rem;
  }
  
  .code-container {
    width: 100%;
    max-width: 95vw;
  }
  
  .code-snippet {
    font-size: 12px;
    padding: 1rem 0.875rem;
    min-height: 100px;
  }
  
  .code-header {
    padding: 0.625rem 1rem;
  }
}
</style>
