---
layout: home

hero:
  name: "MC++ Community"
  text: "现代 C++ 爱好者社区"
  tagline: 现代 C++ 库开发维护、开源文化、技术交流
  actions:
    - theme: brand
      text: 👥 了解社区 ->
      link: /docs/base/intro.md
    - theme: alt
      text: 🐙 GitHub
      link: https://github.com/mcpp-community
    - theme: alt
      text: 💬 论坛
      link: https://forum.d2learn.org/category/20
    - theme: sponsor
      text: ❤️ Sponsor
      link: /pages/sponsor.md
---

<ProjectsShowcase
  :projects="[
    {
      name: 'd2mcpp',
      description: '交互式现代 C++ 入门教程，现代 C++ 特性与发展历程',
      link: 'https://github.com/mcpp-community/d2mcpp',
      tags: ['交互式', 'D2X', '教程'],
      status: 'active',
      highlight: true
    },
    {
      name: 'llmapi',
      description: 'C++ LLM/AI API 客户端，简化 OpenAI 等接口调用与模型集成',
      link: 'https://github.com/mcpplibs/llmapi',
      tags: ['mcpplibs', 'llm api', 'C++23', '跨平台'],
      status: 'wip'
    },
    {
      name: 'mcpp-style-ref',
      description: 'Modern/Module C++ Style Reference | 现代C++编码/项目风格参考',
      link: 'https://github.com/mcpp-community/mcpp-style-ref',
      tags: ['文档', '编码风格', '模块化'],
      status: 'incubating'
    },
    {
      name: 'members',
      description: 'mcpp社区成员和开发者申请工具',
      link: 'https://github.com/mcpp-community/members',
      tags: ['工具', '社区', '开发者', '团队'],
      status: 'wip'
    },
    {
      name: 'd2mystl',
      description: '从零实现一个迷你STL库',
      link: 'https://github.com/mcpp-community/d2mystl',
      tags: ['教程', '标准库', 'STL'],
      status: 'incubating'
    },
    {
      name: 'mcpp-community',
      description: '社区官网与内容建设，展示项目、团队和最新动态',
      link: 'https://github.com/mcpp-community/mcpp-community',
      tags: ['Docs', '社区', '展示'],
      status: 'incubating'
    }
  ]"
/>

<TeamShowcase
  :coreTeam="[
    {
      name: 'Sunrisepeak',
      avatar: 'https://avatars.githubusercontent.com/u/38786181',
      bio: 'mcpp社区发起人',
      projects: [
        { name: 'd2mcpp - 交互式现代C++入门教程', link: 'https://github.com/mcpp-community/d2mcpp' },
        { name: 'llmapi - Modern C++ LLM API client', link: 'https://github.com/mcpplibs/llmapi' },
      ],
      homepage: 'https://whois.d2learn.org/Sunrisepeak',
      github: 'https://github.com/Sunrisepeak',
      bilibili: 'https://space.bilibili.com/65858958',
      zhihu: 'https://www.zhihu.com/people/SPeakShen',
      youtube: 'https://www.youtube.com/@sunrisepeak',
      x: `https://x.com/sunrisepeak_x`,
      sponsor: 'https://space.bilibili.com/65858958'
    },
    {
      name: 'FrozenLemonTee',
      avatar: 'https://avatars.githubusercontent.com/u/64787592',
      bio: '核心团队成员',
      projects: [
        { name: 'mcpplibs - 现代C++库集合', link: 'https://github.com/mcpplibs' },
      ],
      github: 'https://github.com/FrozenLemonTee',
      sponsor: 'https://github.com/FrozenLemonTee'
    },
    {
      name: 'MoYingJi',
      avatar: 'https://avatars.githubusercontent.com/u/64307394',
      bio: '摸鱼怪兼邪教徒',
      projects: [
        { name: 'mcpplibs - 现代C++库集合', link: 'https://github.com/mcpplibs' },
      ],
      github: 'https://github.com/MoYingJi',
      bilibili: 'https://space.bilibili.com/591913409'
    },
    {
      name: '欢迎加入',
      avatar: 'mcpp-logo.png',
      bio: '快来加入我们吧...',
      projects: [
        { name: '注册社区论坛', link: 'https://forum.d2learn.org/category/20' },
        { name: '申请社区开发者', link: 'https://github.com/mcpp-community/members' },
        { name: '加入社区群组(Q:1067245099)', link: 'https://qm.qq.com/q/2QTJFidsOk' },
      ],
      github: 'https://github.com/mcpp-community',
      bilibili: 'https://space.bilibili.com/3493107582633996',
      sponsor: 'https://github.com/mcpp-community'
    },
    {
      name: '欢迎加入',
      avatar: 'mcpp-logo.png',
      bio: '快来加入我们吧...',
      projects: [
        { name: '注册社区论坛', link: 'https://forum.d2learn.org/category/20' },
        { name: '申请社区开发者', link: 'https://github.com/mcpp-community/members' },
        { name: '加入社区群组(Q:1067245099)', link: 'https://qm.qq.com/q/2QTJFidsOk' },
      ],
      github: 'https://github.com/mcpp-community',
      bilibili: 'https://space.bilibili.com/3493107582633996',
      sponsor: 'https://github.com/mcpp-community'
    },
  ]"
  :vTeam="[
    {
      name: '欢迎加入',
      avatar: 'mcpp-logo.png',
      bio: '快来加入我们吧...',
      projects: [
        { name: '注册社区论坛', link: 'https://forum.d2learn.org/category/20' },
        { name: '申请社区开发者', link: 'https://github.com/mcpp-community/members' },
        { name: '加入社区群组(Q:1067245099)', link: 'https://qm.qq.com/q/2QTJFidsOk' },
      ],
      github: 'https://github.com/mcpp-community',
      bilibili: 'https://space.bilibili.com/3493107582633996',
      sponsor: 'https://github.com/mcpp-community'
    },
    {
      name: '欢迎加入',
      avatar: 'mcpp-logo.png',
      bio: '快来加入我们吧...',
      projects: [
        { name: '注册社区论坛', link: 'https://forum.d2learn.org/category/20' },
        { name: '申请社区开发者', link: 'https://github.com/mcpp-community/members' },
        { name: '加入社区群组(Q:1067245099)', link: 'https://qm.qq.com/q/2QTJFidsOk' },
      ],
      github: 'https://github.com/mcpp-community',
      bilibili: 'https://space.bilibili.com/3493107582633996',
      sponsor: 'https://github.com/mcpp-community'
    },
    {
      name: '欢迎加入',
      avatar: 'mcpp-logo.png',
      bio: '快来加入我们吧...',
      projects: [
        { name: '注册社区论坛', link: 'https://forum.d2learn.org/category/20' },
        { name: '申请社区开发者', link: 'https://github.com/mcpp-community/members' },
        { name: '加入社区群组(Q:1067245099)', link: 'https://qm.qq.com/q/2QTJFidsOk' },
      ],
      github: 'https://github.com/mcpp-community',
      bilibili: 'https://space.bilibili.com/3493107582633996',
      sponsor: 'https://github.com/mcpp-community'
    },
    {
      name: '欢迎加入',
      avatar: 'mcpp-logo.png',
      bio: '快来加入我们吧...',
      projects: [
        { name: '注册社区论坛', link: 'https://forum.d2learn.org/category/20' },
        { name: '申请社区开发者', link: 'https://github.com/mcpp-community/members' },
        { name: '加入社区群组(Q:1067245099)', link: 'https://qm.qq.com/q/2QTJFidsOk' },
      ],
      github: 'https://github.com/mcpp-community',
      bilibili: 'https://space.bilibili.com/3493107582633996',
      sponsor: 'https://github.com/mcpp-community'
    },
    {
      name: '欢迎加入',
      avatar: 'mcpp-logo.png',
      bio: '快来加入我们吧...',
      projects: [
        { name: '注册社区论坛', link: 'https://forum.d2learn.org/category/20' },
        { name: '申请社区开发者', link: 'https://github.com/mcpp-community/members' },
        { name: '加入社区群组(Q:1067245099)', link: 'https://qm.qq.com/q/2QTJFidsOk' },
      ],
      github: 'https://github.com/mcpp-community',
      bilibili: 'https://space.bilibili.com/3493107582633996',
      sponsor: 'https://github.com/mcpp-community'
    },
    {
      name: '欢迎加入',
      avatar: 'mcpp-logo.png',
      bio: '快来加入我们吧...',
      projects: [
        { name: '注册社区论坛', link: 'https://forum.d2learn.org/category/20' },
        { name: '申请社区开发者', link: 'https://github.com/mcpp-community/members' },
        { name: '加入社区群组(Q:1067245099)', link: 'https://qm.qq.com/q/2QTJFidsOk' },
      ],
      github: 'https://github.com/mcpp-community',
      bilibili: 'https://space.bilibili.com/3493107582633996',
      sponsor: 'https://github.com/mcpp-community'
    },
    {
      name: '欢迎加入',
      avatar: 'mcpp-logo.png',
      bio: '快来加入我们吧...',
      projects: [
        { name: '注册社区论坛', link: 'https://forum.d2learn.org/category/20' },
        { name: '申请社区开发者', link: 'https://github.com/mcpp-community/members' },
        { name: '加入社区群组(Q:1067245099)', link: 'https://qm.qq.com/q/2QTJFidsOk' },
      ],
      github: 'https://github.com/mcpp-community',
      bilibili: 'https://space.bilibili.com/3493107582633996',
      sponsor: 'https://github.com/mcpp-community'
    },
    {
      name: '欢迎加入',
      avatar: 'mcpp-logo.png',
      bio: '快来加入我们吧...',
      projects: [
        { name: '注册社区论坛', link: 'https://forum.d2learn.org/category/20' },
        { name: '申请社区开发者', link: 'https://github.com/mcpp-community/members' },
        { name: '加入社区群组(Q:1067245099)', link: 'https://qm.qq.com/q/2QTJFidsOk' },
      ],
      github: 'https://github.com/mcpp-community',
      bilibili: 'https://space.bilibili.com/3493107582633996',
      sponsor: 'https://github.com/mcpp-community'
    },
    {
      name: '欢迎加入',
      avatar: 'mcpp-logo.png',
      bio: '快来加入我们吧...',
      projects: [
        { name: '注册社区论坛', link: 'https://forum.d2learn.org/category/20' },
        { name: '申请社区开发者', link: 'https://github.com/mcpp-community/members' },
        { name: '加入社区群组(Q:1067245099)', link: 'https://qm.qq.com/q/2QTJFidsOk' },
      ],
      github: 'https://github.com/mcpp-community',
      bilibili: 'https://space.bilibili.com/3493107582633996',
      sponsor: 'https://github.com/mcpp-community'
    },
    {
      name: '欢迎加入',
      avatar: 'mcpp-logo.png',
      bio: '快来加入我们吧...',
      projects: [
        { name: '注册社区论坛', link: 'https://forum.d2learn.org/category/20' },
        { name: '申请社区开发者', link: 'https://github.com/mcpp-community/members' },
        { name: '加入社区群组(Q:1067245099)', link: 'https://qm.qq.com/q/2QTJFidsOk' },
      ],
      github: 'https://github.com/mcpp-community',
      bilibili: 'https://space.bilibili.com/3493107582633996',
      sponsor: 'https://github.com/mcpp-community'
    }
  ]"
/>

<ContributorsWall
  imageUrl="https://raw.githubusercontent.com/mcpp-community/.github/refs/heads/main/.thanks-contributors/contributors.png"
/>
