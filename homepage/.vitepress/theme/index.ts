// https://vitepress.dev/guide/custom-theme
import { h } from 'vue'
import type { Theme } from 'vitepress'
import DefaultTheme from 'vitepress/theme'
import './style.css'
import CodeTyping from './components/CodeTyping.vue'
import CoreTeam from './components/CoreTeam.vue'

export default {
  extends: DefaultTheme,
  Layout: () => {
    return h(DefaultTheme.Layout, null, {
      // https://vitepress.dev/guide/extending-default-theme#layout-slots
      'home-hero-image': () => h(CodeTyping)
    })
  },
  enhanceApp({ app, router, siteData }) {
    app.component('CoreTeam', CoreTeam)
  }
} satisfies Theme
