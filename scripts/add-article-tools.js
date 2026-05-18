const fs = require('fs');
const tools = JSON.parse(fs.readFileSync('D:/cli/data/tools.json', 'utf8'));

const newTools = [
  {
    slug: 'posthog',
    name: 'PostHog CLI',
    tagline: { en: 'Set up and manage product analytics from the terminal', zh: '在终端设置和管理产品分析' },
    description: {
      en: 'PostHog CLI auto-detects your framework and wires up product analytics in seconds. Deploy a self-hosted PostHog instance in one command, manage feature flags, and query events — all scriptable for AI agent workflows.',
      zh: 'PostHog CLI 自动检测框架并快速接入产品分析。一条命令部署自托管实例、管理功能开关、查询事件，完全可脚本化，适合 AI Agent 工作流。'
    },
    homepage: 'https://posthog.com',
    repo: 'https://github.com/PostHog/posthog',
    license: 'MIT',
    category: 'dev-tools',
    tags: ['analytics', 'feature-flags', 'monitoring', 'saas'],
    install: { brew: 'brew install posthog-cli' },
    github: { stars: 24000, language: 'TypeScript', last_updated: '2025-05' },
    examples: [
      { command: 'posthog init', description: { en: 'Auto-detect framework and set up analytics', zh: '自动检测框架并接入分析' } },
      { command: 'posthog feature-flags list', description: { en: 'List all feature flags', zh: '列出所有功能开关' } },
      { command: 'posthog events tail', description: { en: 'Stream live events from your project', zh: '实时查看项目事件流' } }
    ],
    ai_env: { claude_code: true, codex: true, happycapy: true, notes: { en: '', zh: '' } }
  },
  {
    slug: 'elevenlabs',
    name: 'ElevenLabs CLI',
    tagline: { en: 'Text-to-speech, speech-to-text, and voice cloning from the terminal', zh: '在终端实现文字转语音、语音转文字和声音克隆' },
    description: {
      en: 'ElevenLabs CLI brings AI voice capabilities to the command line. Generate speech from text, transcribe audio, clone voices, and pipe outputs directly into AI agent pipelines or CI workflows.',
      zh: 'ElevenLabs CLI 将 AI 语音能力带到命令行，支持文字转语音、音频转录、声音克隆，输出可直接接入 AI Agent 流水线或 CI 工作流。'
    },
    homepage: 'https://elevenlabs.io',
    repo: 'https://github.com/elevenlabs/elevenlabs-cli',
    license: 'MIT',
    category: 'media',
    tags: ['tts', 'voice', 'ai', 'speech', 'audio'],
    install: { npm: 'npm install -g @elevenlabs/cli' },
    github: { stars: 1200, language: 'TypeScript', last_updated: '2025-05' },
    examples: [
      { command: 'elevenlabs tts "Hello world" --voice Rachel --output hello.mp3', description: { en: 'Convert text to speech and save as MP3', zh: '将文字转为语音并保存为 MP3' } },
      { command: 'elevenlabs stt audio.mp3', description: { en: 'Transcribe an audio file to text', zh: '将音频文件转录为文字' } },
      { command: 'elevenlabs voices list', description: { en: 'List all available voices', zh: '列出所有可用声音' } }
    ],
    ai_env: { claude_code: true, codex: true, happycapy: true, notes: { en: '', zh: '' } }
  },
  {
    slug: 'agentmail',
    name: 'Agentmail CLI',
    tagline: { en: 'Create and manage email inboxes for AI agents', zh: '为 AI Agent 创建和管理邮件收件箱' },
    description: {
      en: 'Agentmail CLI creates real email inboxes with webhook delivery and thread management for AI agents. Agents can receive replies, maintain conversation threads, and search inboxes semantically — enabling true async email workflows.',
      zh: 'Agentmail CLI 为 AI Agent 创建真实邮件收件箱，支持 Webhook 投递和邮件线程管理。Agent 可接收回复、维护对话线程并进行语义搜索，实现真正的异步邮件工作流。'
    },
    homepage: 'https://agentmail.to',
    repo: 'https://github.com/agentmail-to/agentmail-toolkit',
    license: 'MIT',
    category: 'productivity',
    tags: ['email', 'agents', 'inbox', 'webhooks', 'async'],
    install: { npm: 'npm install -g agentmail-cli' },
    github: { stars: 120, language: 'TypeScript', last_updated: '2025-05' },
    examples: [
      { command: 'agentmail inbox create --name my-agent', description: { en: 'Create a new inbox for an agent', zh: '为 Agent 创建新收件箱' } },
      { command: 'agentmail inbox list', description: { en: 'List all agent inboxes', zh: '列出所有 Agent 收件箱' } },
      { command: 'agentmail threads list --inbox my-agent@agentmail.to', description: { en: 'List email threads in an inbox', zh: '列出收件箱中的邮件线程' } }
    ],
    ai_env: { claude_code: true, codex: true, happycapy: true, notes: { en: '', zh: '' } }
  }
];

const existing = new Set(tools.map(t => t.slug));
const toAdd = newTools.filter(t => !existing.has(t.slug));
const merged = [...tools, ...toAdd];
fs.writeFileSync('D:/cli/data/tools.json', JSON.stringify(merged, null, 2));
console.log('Added:', toAdd.map(t => t.slug).join(', '));
console.log('Total tools:', merged.length);
