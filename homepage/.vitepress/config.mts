import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "mcpp community",
  description: "mcpp community homepage",
  appearance: 'dark',
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    logo: "/mcpp-logo.png",
    nav: [
      { text: '主页', link: '/' },
      { text: '文档', link: '/docs/base/intro.md' },
      { text: '项目', link: '/pages/projects.md' },
      {
        text: '社区与生态',
        items: [
          {
            text: 'MCPP',
            items: [
              { text: 'mcpp论坛', link: 'https://forum.d2learn.org/category/22/mcpp' },
              { text: 'mcpp开源', link: 'https://forum.d2learn.org/category/22/mcpp' },
              { text: 'mcpplibs库', link: 'https://forum.d2learn.org/category/22/mcpp' },
            ]
          },
          {
            text: 'D2Learn',
            items: [
              { text: 'd2learn社区', link: 'https://d2learn.org' },
              { text: 'd2learn开源', link: 'https://github.com/d2learn' },
              { text: 'd2learn论坛', link: 'https://forum.d2learn.org' },
            ]
          },
          {
            text: 'MOGA / 墨伽',
            items: [
              { text: 'moga基金会', link: 'https://moga.d2learn.org' },
              { text: 'moga论坛', link: 'https://forum.d2learn.org/category/22' },
            ]
          },
        ]
      },
      {
        text: '关于',
        items: [
          { text: '简介', link: '/pages/about/intro.md' },
          { text: '历史线', link: '/pages/about/history.md' },
        ]
      },
      { text: '❤️ 赞助', link: '/pages/sponsor.md' },
    ],
    sidebar: {
      '/docs/' : [
        {
          text: '了解社区',
          collapsed: false,
          items: [
            { text: '认识', link: '/docs/base/intro.md' },
            { text: '新手教程', link: '/docs/base/quick-start.md' },
            { text: '加入社区', link: '/docs/base/join.md' },
            { text: '常见问题', link: '/docs/base/qa.md' },
          ]
        },
      ],
    },
    socialLinks: [
      { icon: 'github', link: 'https://github.com/mcpp-community' }
    ]
  }
})
