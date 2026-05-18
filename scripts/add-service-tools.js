const fs = require('fs');
const tools = JSON.parse(fs.readFileSync('D:/cli/data/tools.json', 'utf8'));

const newTools = [
  {
    slug: 'vercel',
    name: 'Vercel CLI',
    tagline: { en: 'Deploy and manage Vercel projects from the terminal', zh: '在终端一键部署和管理 Vercel 项目' },
    description: { en: 'Official Vercel CLI to deploy web apps, manage projects, pull environment variables, and configure domains. Supports instant preview deployments and production releases with a single command.', zh: 'Vercel 官方 CLI，用于部署 Web 应用、管理项目、拉取环境变量和配置域名。支持一条命令完成预览部署和生产发布。' },
    homepage: 'https://vercel.com',
    repo: 'https://github.com/vercel/vercel',
    license: 'Apache-2.0',
    category: 'cloud',
    tags: ['deployment', 'hosting', 'serverless', 'frontend'],
    install: { npm: 'npm install -g vercel' },
    github: { stars: 15500, language: 'TypeScript', last_updated: '2025-05' },
    examples: [
      { command: 'vercel', description: { en: 'Deploy to preview environment', zh: '部署到预览环境' } },
      { command: 'vercel --prod', description: { en: 'Deploy to production', zh: '部署到生产环境' } },
      { command: 'vercel env pull .env.local', description: { en: 'Pull environment variables locally', zh: '拉取环境变量到本地' } }
    ],
    ai_env: { claude_code: true, codex: true, happycapy: true, notes: { en: '', zh: '' } }
  },
  {
    slug: 'netlify',
    name: 'Netlify CLI',
    tagline: { en: 'Deploy and manage Netlify sites from the command line', zh: '在命令行部署和管理 Netlify 站点' },
    description: { en: 'Netlify CLI lets you deploy sites, run local dev servers with function emulation, manage environment variables, and trigger builds from the terminal.', zh: 'Netlify CLI 支持部署站点、在本地运行带函数模拟的开发服务器、管理环境变量和触发构建。' },
    homepage: 'https://cli.netlify.com',
    repo: 'https://github.com/netlify/cli',
    license: 'MIT',
    category: 'cloud',
    tags: ['deployment', 'hosting', 'jamstack', 'serverless'],
    install: { npm: 'npm install -g netlify-cli' },
    github: { stars: 1900, language: 'TypeScript', last_updated: '2025-05' },
    examples: [
      { command: 'netlify deploy', description: { en: 'Deploy to draft URL', zh: '部署到草稿 URL' } },
      { command: 'netlify deploy --prod', description: { en: 'Deploy to production', zh: '部署到生产环境' } },
      { command: 'netlify dev', description: { en: 'Run local dev server with edge functions', zh: '本地运行带边缘函数的开发服务器' } }
    ],
    ai_env: { claude_code: true, codex: true, happycapy: true, notes: { en: '', zh: '' } }
  },
  {
    slug: 'flyctl',
    name: 'flyctl',
    tagline: { en: 'Deploy and manage apps on Fly.io globally', zh: '全球部署和管理 Fly.io 应用' },
    description: { en: 'flyctl is the official Fly.io CLI. Launch apps across global regions, scale machines, manage secrets, and inspect logs — all from the command line.', zh: 'flyctl 是 Fly.io 官方 CLI，支持在全球多区域启动应用、扩缩容机器、管理密钥和查看日志。' },
    homepage: 'https://fly.io',
    repo: 'https://github.com/superfly/flyctl',
    license: 'Apache-2.0',
    category: 'cloud',
    tags: ['deployment', 'containers', 'paas', 'global'],
    install: { brew: 'brew install flyctl', npm: 'npm install -g @flydotio/flyctl' },
    github: { stars: 1700, language: 'Go', last_updated: '2025-05' },
    examples: [
      { command: 'fly launch', description: { en: 'Scan and configure a new app', zh: '扫描并配置新应用' } },
      { command: 'fly deploy', description: { en: 'Deploy the current app', zh: '部署当前应用' } },
      { command: 'fly logs', description: { en: 'Stream live app logs', zh: '实时查看应用日志' } }
    ],
    ai_env: { claude_code: true, codex: true, happycapy: true, notes: { en: '', zh: '' } }
  },
  {
    slug: 'wrangler',
    name: 'Wrangler',
    tagline: { en: 'Build and deploy Cloudflare Workers from the CLI', zh: '在 CLI 中构建和部署 Cloudflare Workers' },
    description: { en: 'Wrangler is the official Cloudflare Workers CLI. Deploy edge functions, manage KV stores, Durable Objects, R2 buckets, and D1 databases from your terminal.', zh: 'Wrangler 是 Cloudflare Workers 官方 CLI，支持在终端部署边缘函数、管理 KV 存储、Durable Objects、R2 和 D1 数据库。' },
    homepage: 'https://developers.cloudflare.com/workers/',
    repo: 'https://github.com/cloudflare/workers-sdk',
    license: 'Apache-2.0',
    category: 'cloud',
    tags: ['edge', 'serverless', 'cloudflare', 'workers'],
    install: { npm: 'npm install -g wrangler' },
    github: { stars: 4100, language: 'TypeScript', last_updated: '2025-05' },
    examples: [
      { command: 'wrangler dev', description: { en: 'Run worker locally', zh: '本地运行 Worker' } },
      { command: 'wrangler deploy', description: { en: 'Deploy worker to Cloudflare edge', zh: '部署 Worker 到 Cloudflare 边缘网络' } },
      { command: 'wrangler kv key put key value', description: { en: 'Write a KV store entry', zh: '写入 KV 存储条目' } }
    ],
    ai_env: { claude_code: true, codex: true, happycapy: true, notes: { en: '', zh: '' } }
  },
  {
    slug: 'railway',
    name: 'Railway CLI',
    tagline: { en: 'Deploy and manage Railway projects from your terminal', zh: '在终端部署和管理 Railway 项目' },
    description: { en: 'Railway CLI connects your local environment to Railway projects. Deploy services, stream logs, run commands inside containers, and manage environment variables without leaving the terminal.', zh: 'Railway CLI 将本地环境连接到 Railway 项目，支持部署服务、查看日志、在容器内执行命令，全程无需离开终端。' },
    homepage: 'https://railway.com',
    repo: 'https://github.com/railwayapp/cli',
    license: 'MIT',
    category: 'cloud',
    tags: ['deployment', 'paas', 'containers', 'databases'],
    install: { npm: 'npm install -g @railway/cli', brew: 'brew install railway' },
    github: { stars: 544, language: 'Rust', last_updated: '2025-05' },
    examples: [
      { command: 'railway up', description: { en: 'Deploy current directory to Railway', zh: '将当前目录部署到 Railway' } },
      { command: 'railway logs', description: { en: 'Stream deployment logs', zh: '查看部署日志' } },
      { command: 'railway run npm start', description: { en: 'Run a command with Railway env vars', zh: '使用 Railway 环境变量运行命令' } }
    ],
    ai_env: { claude_code: true, codex: true, happycapy: true, notes: { en: '', zh: '' } }
  },
  {
    slug: 'supabase',
    name: 'Supabase CLI',
    tagline: { en: 'Manage Supabase projects and run a local dev stack', zh: '管理 Supabase 项目并运行本地开发环境' },
    description: { en: 'Supabase CLI manages migrations, generates TypeScript types, runs a full local Supabase stack (Postgres + Auth + Storage + Edge Functions), and links to remote projects.', zh: 'Supabase CLI 支持管理数据库迁移、生成 TypeScript 类型、本地运行完整 Supabase 栈，并与远端项目关联。' },
    homepage: 'https://supabase.com/docs/reference/cli',
    repo: 'https://github.com/supabase/cli',
    license: 'Apache-2.0',
    category: 'cloud',
    tags: ['database', 'baas', 'postgres', 'auth'],
    install: { npm: 'npm install -g supabase', brew: 'brew install supabase/tap/supabase' },
    github: { stars: 2200, language: 'Go', last_updated: '2025-05' },
    examples: [
      { command: 'supabase start', description: { en: 'Start local Supabase stack', zh: '启动本地 Supabase 服务' } },
      { command: 'supabase db push', description: { en: 'Push migrations to remote database', zh: '推送迁移到远端数据库' } },
      { command: 'supabase gen types typescript --linked', description: { en: 'Generate TypeScript types from schema', zh: '从数据库 schema 生成 TypeScript 类型' } }
    ],
    ai_env: { claude_code: true, codex: true, happycapy: true, notes: { en: '', zh: '' } }
  },
  {
    slug: 'firebase-tools',
    name: 'Firebase CLI',
    tagline: { en: 'Deploy and manage Firebase projects from the terminal', zh: '在终端部署和管理 Firebase 项目' },
    description: { en: 'Firebase CLI deploys Hosting, Cloud Functions, Firestore rules, and more. Includes local emulators for testing the full Firebase stack offline before deploying.', zh: 'Firebase CLI 支持部署 Hosting、Cloud Functions、Firestore 规则等，并提供本地模拟器用于部署前离线测试。' },
    homepage: 'https://firebase.google.com/docs/cli',
    repo: 'https://github.com/firebase/firebase-tools',
    license: 'MIT',
    category: 'cloud',
    tags: ['baas', 'google', 'hosting', 'functions'],
    install: { npm: 'npm install -g firebase-tools' },
    github: { stars: 4400, language: 'TypeScript', last_updated: '2025-05' },
    examples: [
      { command: 'firebase deploy', description: { en: 'Deploy to Firebase', zh: '部署到 Firebase' } },
      { command: 'firebase emulators:start', description: { en: 'Start local Firebase emulator suite', zh: '启动本地 Firebase 模拟器套件' } },
      { command: 'firebase functions:log', description: { en: 'Stream Cloud Functions logs', zh: '查看 Cloud Functions 日志' } }
    ],
    ai_env: { claude_code: true, codex: true, happycapy: true, notes: { en: '', zh: '' } }
  },
  {
    slug: 'stripe',
    name: 'Stripe CLI',
    tagline: { en: 'Test Stripe integrations and manage your account from the terminal', zh: '在终端测试 Stripe 集成并管理账户' },
    description: { en: 'Stripe CLI forwards webhooks to localhost, triggers test events, runs API requests, and inspects logs — making local Stripe development fast and fully observable.', zh: 'Stripe CLI 支持将 Webhook 转发到本地、触发测试事件、执行 API 请求和查看日志，让本地 Stripe 开发更高效可观测。' },
    homepage: 'https://stripe.com/docs/stripe-cli',
    repo: 'https://github.com/stripe/stripe-cli',
    license: 'Apache-2.0',
    category: 'dev-tools',
    tags: ['payments', 'webhooks', 'api', 'testing'],
    install: { brew: 'brew install stripe/stripe-cli/stripe', npm: 'npm install -g stripe' },
    github: { stars: 2000, language: 'Go', last_updated: '2025-05' },
    examples: [
      { command: 'stripe listen --forward-to localhost:3000/webhook', description: { en: 'Forward webhooks to local server', zh: '将 Webhook 转发到本地服务器' } },
      { command: 'stripe trigger payment_intent.succeeded', description: { en: 'Trigger a test payment event', zh: '触发测试支付事件' } },
      { command: 'stripe customers list', description: { en: 'List Stripe customers', zh: '列出 Stripe 客户' } }
    ],
    ai_env: { claude_code: true, codex: true, happycapy: true, notes: { en: '', zh: '' } }
  },
  {
    slug: 'doctl',
    name: 'doctl',
    tagline: { en: 'Manage DigitalOcean resources from the command line', zh: '在命令行管理 DigitalOcean 资源' },
    description: { en: 'doctl is the official DigitalOcean CLI. Create and manage Droplets, Kubernetes clusters, App Platform apps, databases, and domains — fully scriptable for automation.', zh: 'doctl 是 DigitalOcean 官方 CLI，支持创建和管理 Droplet、Kubernetes 集群、App Platform 应用、数据库和域名，完全可脚本化。' },
    homepage: 'https://docs.digitalocean.com/reference/doctl/',
    repo: 'https://github.com/digitalocean/doctl',
    license: 'Apache-2.0',
    category: 'cloud',
    tags: ['vps', 'kubernetes', 'cloud', 'infrastructure'],
    install: { brew: 'brew install doctl' },
    github: { stars: 3400, language: 'Go', last_updated: '2025-05' },
    examples: [
      { command: 'doctl compute droplet list', description: { en: 'List all Droplets', zh: '列出所有 Droplet' } },
      { command: 'doctl apps create --spec spec.yaml', description: { en: 'Create an App Platform app from spec', zh: '从配置文件创建 App Platform 应用' } },
      { command: 'doctl kubernetes cluster kubeconfig save myCluster', description: { en: 'Save kubeconfig for a cluster', zh: '保存集群的 kubeconfig' } }
    ],
    ai_env: { claude_code: true, codex: true, happycapy: true, notes: { en: '', zh: '' } }
  },
  {
    slug: 'heroku',
    name: 'Heroku CLI',
    tagline: { en: 'Create and manage Heroku apps from the terminal', zh: '在终端创建和管理 Heroku 应用' },
    description: { en: 'Heroku CLI lets you create and manage apps directly from the terminal. Deploy with git push, scale dynos, tail logs, run one-off commands, and manage add-ons.', zh: 'Heroku CLI 支持直接从终端创建和管理应用，通过 git push 部署代码、扩缩容 dyno、查看日志和管理插件。' },
    homepage: 'https://devcenter.heroku.com/articles/heroku-cli',
    repo: 'https://github.com/heroku/cli',
    license: 'ISC',
    category: 'cloud',
    tags: ['paas', 'deployment', 'dynos', 'addons'],
    install: { brew: 'brew tap heroku/brew && brew install heroku', npm: 'npm install -g heroku' },
    github: { stars: 886, language: 'TypeScript', last_updated: '2025-04' },
    examples: [
      { command: 'heroku create my-app', description: { en: 'Create a new Heroku app', zh: '创建新的 Heroku 应用' } },
      { command: 'git push heroku main', description: { en: 'Deploy app via git push', zh: '通过 git push 部署应用' } },
      { command: 'heroku logs --tail', description: { en: 'Stream live app logs', zh: '实时查看应用日志' } }
    ],
    ai_env: { claude_code: true, codex: true, happycapy: true, notes: { en: '', zh: '' } }
  },
  {
    slug: 'auth0',
    name: 'Auth0 CLI',
    tagline: { en: 'Manage Auth0 tenants and resources from the terminal', zh: '在终端管理 Auth0 租户和资源' },
    description: { en: 'Auth0 CLI manages applications, APIs, rules, connections, and tenant settings from your terminal. Useful for automating Auth0 configuration in CI/CD pipelines.', zh: 'Auth0 CLI 支持在终端管理应用、API、规则、连接和租户设置，适合在 CI/CD 流水线中自动化 Auth0 配置。' },
    homepage: 'https://auth0.github.io/auth0-cli/',
    repo: 'https://github.com/auth0/auth0-cli',
    license: 'MIT',
    category: 'dev-tools',
    tags: ['auth', 'identity', 'security', 'saas'],
    install: { brew: 'brew tap auth0/auth0-cli && brew install auth0' },
    github: { stars: 312, language: 'Go', last_updated: '2025-04' },
    examples: [
      { command: 'auth0 apps list', description: { en: 'List all applications', zh: '列出所有应用' } },
      { command: 'auth0 logs tail', description: { en: 'Stream Auth0 tenant logs', zh: '实时查看 Auth0 租户日志' } },
      { command: 'auth0 users search -q "email:user@example.com"', description: { en: 'Search for a user by email', zh: '按邮箱搜索用户' } }
    ],
    ai_env: { claude_code: true, codex: true, happycapy: true, notes: { en: '', zh: '' } }
  },
  {
    slug: 'pulumi',
    name: 'Pulumi',
    tagline: { en: 'Infrastructure as Code using real programming languages', zh: '用真实编程语言编写基础设施即代码' },
    description: { en: 'Pulumi defines cloud infrastructure using TypeScript, Python, Go, or C#. Deploy to AWS, Azure, GCP, and 100+ providers. Infrastructure is just code, making it ideal for AI-driven automation.', zh: 'Pulumi 支持用 TypeScript、Python、Go 或 C# 定义云基础设施，可部署到 AWS、Azure、GCP 等 100+ 云平台，基础设施即代码，对 AI 自动化非常友好。' },
    homepage: 'https://www.pulumi.com',
    repo: 'https://github.com/pulumi/pulumi',
    license: 'Apache-2.0',
    category: 'cloud',
    tags: ['iac', 'infrastructure', 'multi-cloud', 'devops'],
    install: { brew: 'brew install pulumi/tap/pulumi', npm: 'npm install -g @pulumi/pulumi' },
    github: { stars: 25200, language: 'Go', last_updated: '2025-05' },
    examples: [
      { command: 'pulumi new typescript', description: { en: 'Create a new TypeScript infrastructure project', zh: '创建新的 TypeScript 基础设施项目' } },
      { command: 'pulumi up', description: { en: 'Preview and deploy infrastructure changes', zh: '预览并部署基础设施变更' } },
      { command: 'pulumi destroy', description: { en: 'Destroy all provisioned resources', zh: '销毁所有已创建的资源' } }
    ],
    ai_env: { claude_code: true, codex: true, happycapy: true, notes: { en: '', zh: '' } }
  },
  {
    slug: 'doppler',
    name: 'Doppler CLI',
    tagline: { en: 'Sync and inject secrets from Doppler into any environment', zh: '从 Doppler 同步和注入密钥到任意环境' },
    description: { en: 'Doppler CLI syncs environment secrets across local, staging, and production. Inject secrets at runtime without storing them in .env files or CI configuration.', zh: 'Doppler CLI 在本地、测试和生产环境间同步密钥，在运行时注入，无需将密钥存储在 .env 文件或 CI 配置中。' },
    homepage: 'https://docs.doppler.com',
    repo: 'https://github.com/DopplerHQ/cli',
    license: 'Apache-2.0',
    category: 'dev-tools',
    tags: ['secrets', 'env-vars', 'security', 'config'],
    install: { brew: 'brew install dopplerhq/cli/doppler' },
    github: { stars: 372, language: 'Go', last_updated: '2025-05' },
    examples: [
      { command: 'doppler run -- npm start', description: { en: 'Inject secrets and run a command', zh: '注入密钥并运行命令' } },
      { command: 'doppler secrets', description: { en: 'List all secrets in current config', zh: '列出当前配置中的所有密钥' } },
      { command: 'doppler setup', description: { en: 'Link current directory to a Doppler project', zh: '将当前目录关联到 Doppler 项目' } }
    ],
    ai_env: { claude_code: true, codex: true, happycapy: true, notes: { en: '', zh: '' } }
  },
  {
    slug: 'resend',
    name: 'Resend CLI',
    tagline: { en: 'Send emails and manage Resend resources from the terminal', zh: '在终端发送邮件并管理 Resend 资源' },
    description: { en: 'Resend CLI sends emails, manages API keys, domains, and audiences from the command line. Useful for testing email templates and automating transactional email workflows.', zh: 'Resend CLI 支持在命令行发送邮件、管理 API 密钥、域名和受众，适合测试邮件模板和自动化邮件工作流。' },
    homepage: 'https://resend.com',
    repo: 'https://github.com/resend/resend-cli',
    license: 'MIT',
    category: 'dev-tools',
    tags: ['email', 'api', 'transactional', 'saas'],
    install: { npm: 'npm install -g resend-cli' },
    github: { stars: 369, language: 'TypeScript', last_updated: '2025-04' },
    examples: [
      { command: 'resend emails send --from you@example.com --to user@example.com --subject Hi --text Hello', description: { en: 'Send a plain text email', zh: '发送纯文本邮件' } },
      { command: 'resend domains list', description: { en: 'List verified sending domains', zh: '列出已验证的发件域名' } },
      { command: 'resend api-keys list', description: { en: 'List all API keys', zh: '列出所有 API 密钥' } }
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
