// https://vitepress.dev/guide/custom-theme
import { h } from 'vue'
import type { Theme } from 'vitepress'
import DefaultTheme from 'vitepress/theme'
import './style.css'
import CodeTyping from './components/CodeTyping.vue'
import TeamShowcase from './components/CoreTeam.vue'
import ProjectsShowcase from './components/ProjectsShowcase.vue'
import ContributorsWall from './components/ContributorsWall.vue'
import AboutLayout from './components/AboutLayout.vue'
import AnimatedBackground from './components/AnimatedBackground.vue'
import ScrollGuide from './components/ScrollGuide.vue'
import ProjectsPage from './components/ProjectsPage.vue'
import AutoRedirect from './components/AutoRedirect.vue'
import Timeline from './components/Timeline.vue'

export default {
  extends: DefaultTheme,
  Layout: () => {
    return h(DefaultTheme.Layout, null, {
      // https://vitepress.dev/guide/extending-default-theme#layout-slots
      'home-hero-image': () => h(CodeTyping)
    })
  },
  enhanceApp({ app, router, siteData }) {
    app.component('TeamShowcase', TeamShowcase)
    app.component('ProjectsShowcase', ProjectsShowcase)
    app.component('ContributorsWall', ContributorsWall)
    app.component('AboutLayout', AboutLayout)
    app.component('AnimatedBackground', AnimatedBackground)
    app.component('ScrollGuide', ScrollGuide)
    app.component('ProjectsPage', ProjectsPage)
    app.component('Timeline', Timeline)
    app.component('AutoRedirect', AutoRedirect)
  }
} satisfies Theme
