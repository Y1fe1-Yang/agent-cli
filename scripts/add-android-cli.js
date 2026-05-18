const fs = require('fs');
const tools = JSON.parse(fs.readFileSync('D:/cli/data/tools.json', 'utf8'));

const androidCli = {
  slug: 'android-cli',
  name: 'Android CLI',
  tagline: { en: 'Google official agent-first CLI for Android development', zh: 'Google 官方面向 AI Agent 的 Android 开发 CLI' },
  description: {
    en: 'Official Google CLI designed for agent-first Android development workflows. Create projects from templates, manage emulators, install SDK components, deploy APKs, inspect UI layouts, and query the Android knowledge base — all optimized for AI agents.',
    zh: 'Google 官方 CLI，专为 AI Agent 优先的 Android 开发工作流设计。支持从模板创建项目、管理模拟器、安装 SDK 组件、部署 APK、检查 UI 布局并查询 Android 知识库，全面针对 AI 智能体优化。'
  },
  homepage: 'https://developer.android.google.com/tools/agents/android-cli',
  repo: 'https://developer.android.google.com/tools/agents/android-cli',
  license: 'Proprietary',
  category: 'dev-tools',
  tags: ['android', 'google', 'agent-first', 'mobile', 'emulator'],
  install: { brew: 'android update' },
  github: { stars: 0, language: 'Java', last_updated: '2025-05' },
  examples: [
    { command: 'android create list', description: { en: 'List available project templates', zh: '列出可用的项目模板' } },
    { command: 'android emulator start medium_phone', description: { en: 'Start an Android emulator', zh: '启动 Android 模拟器' } },
    { command: 'android docs search "performance optimization"', description: { en: 'Query the Android knowledge base', zh: '查询 Android 知识库' } },
    { command: 'android skills add --all', description: { en: 'Install all Android agent skills', zh: '安装全部 Android Agent 技能包' } }
  ],
  ai_env: {
    claude_code: true,
    codex: true,
    happycapy: true,
    notes: {
      en: 'Designed specifically for AI agent workflows. Run android init to install the android-cli skill.',
      zh: '专为 AI Agent 工作流设计，运行 android init 可安装 android-cli 技能包。'
    }
  }
};

if (tools.find(t => t.slug === 'android-cli')) {
  console.log('Already exists');
} else {
  tools.push(androidCli);
  fs.writeFileSync('D:/cli/data/tools.json', JSON.stringify(tools, null, 2));
  console.log('Added: android-cli');
  console.log('Total tools:', tools.length);
}
