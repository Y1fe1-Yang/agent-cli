const fs = require('fs');
const data = JSON.parse(fs.readFileSync('D:/cli/data/tools.json', 'utf8'));

const rewrites = {
  'gwcli': {
    tagline: {
      en: 'Let your AI agent control Gmail, Calendar, Drive, and more — no browser needed',
      zh: '让 AI Agent 直接操控 Gmail、日历、Drive——无需打开浏览器'
    },
    description: {
      en: 'Google Workspace is the suite of productivity tools used by millions of organizations: Gmail, Google Drive, Calendar, Docs, Sheets, and more. This official CLI lets you manage all of it from your terminal, or hand control to an AI agent — automate email, schedule meetings, list files, and export data without ever opening a browser tab.',
      zh: 'Google Workspace 是数百万企业使用的办公套件，包括 Gmail、Google Drive、日历、文档、表格等。这个官方 CLI 让你在终端管理所有服务，或者直接交给 AI Agent 操控——自动收发邮件、安排会议、列出文件，完全不用打开浏览器。'
    }
  },
  'lark-cli': {
    tagline: {
      en: 'Let your AI agent send messages, manage docs, and schedule meetings on Lark/Feishu',
      zh: '让 AI Agent 在飞书收发消息、管理文档、安排会议'
    },
    description: {
      en: 'Lark (Feishu) is the enterprise collaboration platform by ByteDance — think Slack + Notion + Google Calendar, all in one. This official CLI covers 17 built-in modules: messaging, documents, spreadsheets, calendar, email, tasks, meetings, wiki, and more. Designed from day one for AI agents, it ships 24 pre-built AI skills ready to use with Claude Code and Cursor.',
      zh: '飞书（Lark）是字节跳动推出的企业协作平台，集消息、文档、日历、视频会议于一体。这个官方 CLI 覆盖 17 个业务模块：消息、文档、多维表格、日历、邮件、任务、会议、知识库等，提供 200+ 命令。内置 24 个 AI Agent Skill，专为 Claude Code、Cursor 等 AI 工具设计，开箱即用。'
    }
  },
  'ntn': {
    tagline: {
      en: 'Search your Notion workspace, create pages, and query databases from the terminal',
      zh: '在终端搜索 Notion 内容、新建页面、查询数据库'
    },
    description: {
      en: 'Notion is an all-in-one workspace for notes, documents, wikis, and databases — used by teams to organize everything from project plans to company knowledge. This official CLI lets you search pages, create new content, and query databases directly from the terminal, so your AI agent can read and write Notion without opening a browser.',
      zh: 'Notion 是集笔记、文档、Wiki 和数据库于一体的团队协作平台，用来存储项目计划、公司知识库等各类信息。这个官方 CLI 可以直接搜索页面、新建内容、查询数据库，让 AI Agent 读写 Notion 完全不用打开浏览器。'
    }
  },
  'gh': {
    tagline: {
      en: 'Manage GitHub repos, pull requests, and issues without leaving your terminal',
      zh: '不离开终端，直接管理 GitHub 仓库、PR 和 Issue'
    },
    description: {
      en: 'GitHub is where most software teams store their code and collaborate — pull requests, code reviews, issue tracking, and CI/CD pipelines all live there. The official GitHub CLI brings all of that into your terminal: create and review pull requests, manage issues, trigger workflows, and interact with the GitHub API. AI agents use it to automate the entire software development lifecycle.',
      zh: 'GitHub 是全球最大的代码托管平台，团队在这里协作开发——PR 代码审查、Issue 问题追踪、CI/CD 自动化流水线都在上面。官方 GitHub CLI 把这些功能全部带入终端：创建和审查 PR、管理 Issue、触发工作流、调用 GitHub API。AI Agent 可以用它自动化整个开发流程。'
    }
  },
  'agentmail': {
    tagline: {
      en: 'Give your AI agent a real email address it can send, receive, and reply from',
      zh: '给你的 AI Agent 一个真实邮箱，可以收发邮件、管理对话'
    },
    description: {
      en: 'Agentmail gives AI agents a real email address — agents can send emails, receive replies, and carry on multi-turn email conversations as part of automated workflows. Unlike traditional email APIs, Agentmail is designed specifically for agents: it handles threading, webhooks for incoming mail, and semantic inbox search out of the box.',
      zh: 'Agentmail 为 AI Agent 提供真实的电子邮箱，让 Agent 可以发送邮件、接收回复、维护多轮邮件对话，成为自动化工作流的一部分。与传统邮件 API 不同，Agentmail 专为 Agent 设计：开箱即支持邮件线程、收件 Webhook 推送和语义搜索。'
    }
  },
  'opencli': {
    tagline: {
      en: 'Turn any website or app into a command an AI agent can run',
      zh: '把任意网站或应用变成 AI Agent 可以直接调用的命令'
    },
    description: {
      en: 'Most websites do not have an API — which means AI agents cannot use them directly. OpenCLI solves this by wrapping websites, desktop apps, and local tools into standard CLI commands. It has built-in support for 100+ sites (Bilibili, Twitter, Reddit, and more), so your AI agent can interact with any web service without needing an API key or writing custom code.',
      zh: '大多数网站没有开放 API——这意味着 AI Agent 无法直接操作它们。OpenCLI 通过把网站、桌面应用和本地工具封装成标准 CLI 命令来解决这个问题。内置支持 100+ 网站（Bilibili、Twitter、Reddit 等），让 AI Agent 无需 API Key、无需写代码，就能操作任意 Web 服务。'
    }
  },
  'vercel': {
    tagline: {
      en: 'Deploy your website to the internet with one command — no server setup required',
      zh: '一条命令把网站发布到互联网，不需要配置服务器'
    },
    description: {
      en: 'Vercel is a hosting platform for websites and web apps — connect your GitHub repo and every code push automatically deploys a new version. The official CLI lets you do all of this from your terminal: deploy to production, create preview links for branches, pull down environment variables for local development, and manage domains. AI agents use it to automate the entire deploy pipeline.',
      zh: 'Vercel 是一个网站和 Web 应用的托管平台——连接 GitHub 仓库后，每次推送代码都会自动部署新版本。官方 CLI 让你在终端完成所有操作：发布到生产环境、为分支生成预览链接、拉取本地开发所需的环境变量、管理域名。AI Agent 可以用它自动化整个部署流水线。'
    }
  },
  'supabase': {
    tagline: {
      en: "Manage your app's database, user auth, and file storage from the terminal",
      zh: '在终端管理你的应用数据库、用户登录和文件存储'
    },
    description: {
      en: 'Supabase is a backend platform that gives your app a PostgreSQL database, user authentication, file storage, and serverless functions — all without writing backend code. The CLI manages everything from your terminal: push database schema changes, generate TypeScript types from your schema, run a full local Supabase stack for development, and deploy serverless functions.',
      zh: 'Supabase 是一个后端平台，为你的应用提供 PostgreSQL 数据库、用户认证、文件存储和无服务器函数——无需编写后端代码。CLI 在终端管理所有这些：推送数据库变更、从 schema 生成 TypeScript 类型、本地运行完整 Supabase 环境，以及部署无服务器函数。'
    }
  },
  'railway': {
    tagline: {
      en: 'Deploy any app, API, or database to the cloud in seconds — no DevOps needed',
      zh: '几秒钟把应用、API 或数据库部署到云端，不需要运维知识'
    },
    description: {
      en: 'Railway is a cloud platform where you can deploy web apps, APIs, background workers, cron jobs, and databases with minimal setup — no Kubernetes, no complex infrastructure. The CLI connects your local project to Railway: run one command to deploy, stream logs in real time, inject environment variables, and run commands inside your deployed containers.',
      zh: 'Railway 是一个云部署平台，几乎不需要配置就能运行 Web 应用、API、后台任务和数据库——不需要 Kubernetes，不需要复杂基础设施。CLI 把本地项目连接到 Railway：一条命令部署、实时查看日志、注入环境变量、在容器内执行命令。'
    }
  },
  'wrangler': {
    tagline: {
      en: "Deploy code that runs on servers near your users — Cloudflare's global network",
      zh: '把你的代码部署到全球 300 个服务器节点——基于 Cloudflare 网络'
    },
    description: {
      en: "Cloudflare Workers let you run JavaScript or TypeScript on Cloudflare's network of 300+ servers worldwide — your code runs close to each user, making APIs and dynamic content much faster. Wrangler is the official CLI to write, test, and deploy these programs. It also manages R2 object storage (like S3), D1 serverless databases, and KV key-value stores — all the building blocks for fast, global apps.",
      zh: 'Cloudflare Workers 让你的 JavaScript 或 TypeScript 代码运行在 Cloudflare 全球 300+ 个服务器节点上——代码在离用户最近的地方运行，让 API 和动态内容快很多。Wrangler 是官方 CLI，用于编写、测试和部署这些程序，同时管理 R2 对象存储（类似 S3）、D1 无服务器数据库和 KV 键值存储。'
    }
  },
  'flyctl': {
    tagline: {
      en: 'Run your app on servers near your users — across 30+ cities worldwide',
      zh: '在离用户最近的城市运行你的应用——覆盖全球 30+ 个区域'
    },
    description: {
      en: "Fly.io runs your Docker containers on servers in 30+ cities worldwide, automatically routing each user to the nearest location for the lowest latency. flyctl is the official CLI to launch, scale, and monitor your apps from the terminal: deploy a new version, spin up machines in specific regions, inspect logs, and manage secrets. AI agents use it to automate deployment and scaling decisions.",
      zh: 'Fly.io 在全球 30+ 个城市的服务器上运行你的 Docker 容器，自动把每个用户路由到最近的节点以降低延迟。flyctl 是官方 CLI，在终端启动、扩缩容和监控应用：发布新版本、在指定区域启动实例、查看日志、管理密钥。AI Agent 可用它自动化部署和扩缩容决策。'
    }
  },
  'netlify': {
    tagline: {
      en: 'Deploy your website instantly — every git push goes live automatically',
      zh: '即时部署网站——每次 git push 自动上线'
    },
    description: {
      en: "Netlify hosts websites and web apps with automatic deployments — connect your GitHub repo and every code push triggers a new deployment with a unique preview URL. The CLI brings this workflow into your terminal: deploy manually, run a local dev server that emulates Netlify's edge functions, manage environment variables, and trigger builds.",
      zh: 'Netlify 是一个网站和 Web 应用托管平台，支持自动部署——连接 GitHub 仓库后，每次推送代码都会触发新部署，并生成独立的预览链接。CLI 把这套流程带入终端：手动部署、本地运行带边缘函数模拟的开发服务器、管理环境变量、触发构建。'
    }
  }
};

let count = 0;
data.forEach(tool => {
  if (rewrites[tool.slug]) {
    tool.tagline = rewrites[tool.slug].tagline;
    tool.description = rewrites[tool.slug].description;
    count++;
  }
});

fs.writeFileSync('D:/cli/data/tools.json', JSON.stringify(data, null, 2));
console.log('Rewrote', count, 'tools');
