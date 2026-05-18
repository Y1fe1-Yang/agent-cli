const fs = require('fs');
const tools = JSON.parse(fs.readFileSync('D:/cli/data/tools.json', 'utf8'));

const newTools = [
  {
    slug: 'gwcli',
    name: 'Google Workspace CLI',
    tagline: { en: 'Manage Google Workspace resources from the command line', zh: '在命令行管理 Google Workspace 资源' },
    description: { en: 'Official Google Workspace CLI for managing users, groups, calendars, Drive, Gmail, and more. Automate Google Workspace administration and data export from your terminal or CI pipeline.', zh: 'Google Workspace 官方 CLI，支持管理用户、群组、日历、云端硬盘、Gmail 等，可在终端或 CI 流水线中自动化 Google Workspace 管理。' },
    homepage: 'https://developers.google.com/workspace',
    repo: 'https://github.com/googleworkspace/cli',
    license: 'Apache-2.0',
    category: 'productivity',
    tags: ['google', 'workspace', 'admin', 'saas'],
    install: { npm: 'npm install -g @googleworkspace/cli' },
    github: { stars: 26300, language: 'Rust', last_updated: '2025-05' },
    examples: [
      { command: 'gwcli users list', description: { en: 'List all users in the domain', zh: '列出域内所有用户' } },
      { command: 'gwcli drive files list --user user@example.com', description: { en: 'List Drive files for a user', zh: '列出某用户的云端硬盘文件' } },
      { command: 'gwcli calendar events list --user user@example.com', description: { en: 'List calendar events', zh: '列出日历事件' } }
    ],
    ai_env: { claude_code: true, codex: true, happycapy: true, notes: { en: '', zh: '' } }
  },
  {
    slug: 'shopify-cli',
    name: 'Shopify CLI',
    tagline: { en: 'Build and deploy Shopify themes and apps from the terminal', zh: '在终端构建和部署 Shopify 主题和应用' },
    description: { en: 'Shopify CLI accelerates theme and app development with local dev servers, hot reload, and direct store deployment. Manage products, orders, and store configuration from the command line.', zh: 'Shopify CLI 通过本地开发服务器、热重载和直接部署加速主题和应用开发，支持在命令行管理商品、订单和店铺配置。' },
    homepage: 'https://shopify.dev',
    repo: 'https://github.com/Shopify/cli',
    license: 'MIT',
    category: 'dev-tools',
    tags: ['ecommerce', 'shopify', 'themes', 'apps'],
    install: { npm: 'npm install -g @shopify/cli', brew: 'brew tap shopify/shopify && brew install shopify-cli' },
    github: { stars: 691, language: 'TypeScript', last_updated: '2025-05' },
    examples: [
      { command: 'shopify theme dev', description: { en: 'Start local theme development server', zh: '启动本地主题开发服务器' } },
      { command: 'shopify theme push', description: { en: 'Push theme to your store', zh: '将主题推送到店铺' } },
      { command: 'shopify app dev', description: { en: 'Run Shopify app locally with tunneling', zh: '本地运行 Shopify 应用并开启隧道' } }
    ],
    ai_env: { claude_code: true, codex: true, happycapy: true, notes: { en: '', zh: '' } }
  },
  {
    slug: 'sentry-cli',
    name: 'Sentry CLI',
    tagline: { en: 'Manage Sentry releases and source maps from the terminal', zh: '在终端管理 Sentry 发布版本和 Source Maps' },
    description: { en: 'Sentry CLI manages releases, uploads source maps, associates commits, and triggers deploys in Sentry. Essential for CI/CD pipelines that need proper error tracking with correct stack traces.', zh: 'Sentry CLI 管理发布版本、上传 Source Maps、关联提交记录和触发部署，是 CI/CD 流水线中正确错误追踪的必备工具。' },
    homepage: 'https://docs.sentry.io/cli/',
    repo: 'https://github.com/getsentry/sentry-cli',
    license: 'Apache-2.0',
    category: 'dev-tools',
    tags: ['error-tracking', 'monitoring', 'source-maps', 'releases'],
    install: { npm: 'npm install -g @sentry/cli', brew: 'brew install getsentry/tools/sentry-cli' },
    github: { stars: 1000, language: 'Rust', last_updated: '2025-05' },
    examples: [
      { command: 'sentry-cli releases new 1.0.0', description: { en: 'Create a new release in Sentry', zh: '在 Sentry 创建新的发布版本' } },
      { command: 'sentry-cli releases files 1.0.0 upload-sourcemaps ./dist', description: { en: 'Upload source maps for a release', zh: '上传发布版本的 Source Maps' } },
      { command: 'sentry-cli releases deploys 1.0.0 new -e production', description: { en: 'Mark a deploy to production', zh: '标记生产环境部署' } }
    ],
    ai_env: { claude_code: true, codex: true, happycapy: true, notes: { en: '', zh: '' } }
  },
  {
    slug: 'pscale',
    name: 'PlanetScale CLI',
    tagline: { en: 'Manage PlanetScale databases and branches from the terminal', zh: '在终端管理 PlanetScale 数据库和分支' },
    description: { en: 'PlanetScale CLI manages database branches, deploy requests, and connection strings. Treats database schema changes like Git branches — create, review, and merge schema changes without downtime.', zh: 'PlanetScale CLI 管理数据库分支、部署请求和连接字符串，像 Git 分支一样处理 schema 变更，实现无停机数据库升级。' },
    homepage: 'https://planetscale.com/cli',
    repo: 'https://github.com/planetscale/cli',
    license: 'Apache-2.0',
    category: 'database',
    tags: ['mysql', 'serverless', 'branching', 'saas'],
    install: { brew: 'brew install planetscale/tap/pscale' },
    github: { stars: 652, language: 'Go', last_updated: '2025-04' },
    examples: [
      { command: 'pscale branch create mydb feature-branch', description: { en: 'Create a database branch', zh: '创建数据库分支' } },
      { command: 'pscale connect mydb main', description: { en: 'Open a secure connection to the database', zh: '打开到数据库的安全连接' } },
      { command: 'pscale deploy-request create mydb feature-branch', description: { en: 'Create a deploy request to merge schema', zh: '创建 schema 合并的部署请求' } }
    ],
    ai_env: { claude_code: true, codex: true, happycapy: true, notes: { en: '', zh: '' } }
  },
  {
    slug: 'turso',
    name: 'Turso CLI',
    tagline: { en: 'Manage Turso edge databases from the command line', zh: '在命令行管理 Turso 边缘数据库' },
    description: { en: 'Turso CLI creates and manages libSQL edge databases that replicate across the globe. Create databases, manage replicas, run queries, and handle access tokens from the terminal.', zh: 'Turso CLI 创建和管理全球复制的 libSQL 边缘数据库，支持在终端创建数据库、管理副本、执行查询和处理访问令牌。' },
    homepage: 'https://turso.tech',
    repo: 'https://github.com/tursodatabase/turso-cli',
    license: 'MIT',
    category: 'database',
    tags: ['sqlite', 'edge', 'libsql', 'serverless'],
    install: { brew: 'brew install tursodatabase/tap/turso', npm: 'npm install -g @turso/cli' },
    github: { stars: 300, language: 'Go', last_updated: '2025-05' },
    examples: [
      { command: 'turso db create mydb', description: { en: 'Create a new Turso database', zh: '创建新的 Turso 数据库' } },
      { command: 'turso db shell mydb', description: { en: 'Open an interactive SQL shell', zh: '打开交互式 SQL 终端' } },
      { command: 'turso db replicate mydb --location ams', description: { en: 'Replicate database to Amsterdam', zh: '将数据库复制到阿姆斯特丹节点' } }
    ],
    ai_env: { claude_code: true, codex: true, happycapy: true, notes: { en: '', zh: '' } }
  },
  {
    slug: 'twilio',
    name: 'Twilio CLI',
    tagline: { en: 'Send SMS, make calls, and manage Twilio resources from the terminal', zh: '在终端发送短信、拨打电话并管理 Twilio 资源' },
    description: { en: 'Twilio CLI lets you interact with the Twilio API, send messages, make calls, debug webhooks, and manage phone numbers — all from the command line or CI pipelines.', zh: 'Twilio CLI 支持调用 Twilio API、发送短信、拨打电话、调试 Webhook 和管理电话号码，可在命令行或 CI 流水线中使用。' },
    homepage: 'https://www.twilio.com/docs/twilio-cli',
    repo: 'https://github.com/twilio/twilio-cli',
    license: 'MIT',
    category: 'dev-tools',
    tags: ['sms', 'voice', 'communications', 'api'],
    install: { npm: 'npm install -g twilio-cli', brew: 'brew tap twilio/brew && brew install twilio' },
    github: { stars: 189, language: 'JavaScript', last_updated: '2025-04' },
    examples: [
      { command: 'twilio api:core:messages:create --from +1234567890 --to +0987654321 --body "Hello"', description: { en: 'Send an SMS message', zh: '发送短信' } },
      { command: 'twilio phone-numbers:list', description: { en: 'List your Twilio phone numbers', zh: '列出你的 Twilio 电话号码' } },
      { command: 'twilio debugger:logs:list', description: { en: 'View recent error logs', zh: '查看最近的错误日志' } }
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
