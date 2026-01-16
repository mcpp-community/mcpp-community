<template>
  <div class="about-layout">
    <AnimatedBackground />
    <div class="about-content">
      <slot></slot>
    </div>
  </div>
</template>

<script setup lang="ts">
import AnimatedBackground from './AnimatedBackground.vue'
</script>

<style scoped>
.about-layout {
  position: relative;
  min-height: 100vh;
  margin-top: -64px;
  padding-top: 64px;
  overflow-y: auto;
  display: flex;
  align-items: center;
  justify-content: center;
}

.about-content {
  max-width: 1000px;
  padding: 40px 24px;
  margin: 0 auto;
  position: relative;
  z-index: 1;
  width: 100%;
}

@media (max-width: 960px) {
  .about-content {
    padding: 40px 16px;
  }
}

@media (max-width: 640px) {
  .about-layout {
    margin-top: -56px;
    padding-top: 56px;
  }
}
</style>
