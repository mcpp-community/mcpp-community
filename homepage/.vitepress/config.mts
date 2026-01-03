import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "mcpp community",
  description: "mcpp community homepage",
  appearance: 'dark',
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    logo: "/mcpp-logo.png",
    socialLinks: [
      { icon: 'github', link: 'https://github.com/mcpp-community' }
    ]
  }
})
