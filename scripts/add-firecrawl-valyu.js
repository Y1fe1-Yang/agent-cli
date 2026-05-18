const fs = require('fs');
const tools = JSON.parse(fs.readFileSync('D:/cli/data/tools.json', 'utf8'));

const newTools = [
  {
    slug: 'firecrawl',
    name: 'Firecrawl CLI',
    tagline: { en: 'Search, scrape, and clean the web for AI agents', zh: '为 AI Agent 提供网页搜索、抓取和清洗能力' },
    description: {
      en: 'Firecrawl CLI lets AI agents scrape any URL to clean markdown, crawl entire sites, search the web, and interact with pages using AI prompts. Built-in skill installer auto-registers Firecrawl as a callable skill in Claude Code, Codex, and other agents.',
      zh: 'Firecrawl CLI 让 AI Agent 能将任意 URL 抓取为干净的 Markdown、爬取整站、搜索网页，并通过 AI 提示与页面交互。内置技能安装器可自动注册为 Claude Code、Codex 等 Agent 的可调用技能。'
    },
    homepage: 'https://firecrawl.dev',
    repo: 'https://github.com/mendableai/firecrawl',
    license: 'AGPL-3.0',
    category: 'dev-tools',
    tags: ['web-scraping', 'crawling', 'ai-agents', 'data-extraction'],
    install: { npm: 'npx -y firecrawl-cli@latest init --all --browser' },
    github: { stars: 121000, language: 'TypeScript', last_updated: '2025-05' },
    examples: [
      { command: 'firecrawl scrape https://example.com', description: { en: 'Scrape a URL to clean markdown', zh: '抓取 URL 并转换为干净的 Markdown' } },
      { command: 'firecrawl search "topic" --limit 5', description: { en: 'Search the web and return structured results', zh: '搜索网页并返回结构化结果' } },
      { command: 'firecrawl interact "Search for iPhone 16 Pro Max"', description: { en: 'Interact with a page using an AI prompt', zh: '用 AI 提示与页面进行交互' } }
    ],
    ai_env: { claude_code: true, codex: true, happycapy: true, notes: { en: 'Run firecrawl init --all to register as an agent skill in Claude Code and Codex.', zh: '运行 firecrawl init --all 可将其注册为 Claude Code 和 Codex 的 Agent 技能。' } }
  },
  {
    slug: 'valyu',
    name: 'Valyu CLI',
    tagline: { en: 'Real-time web and proprietary data search for AI agents', zh: '为 AI Agent 提供实时网络与专有数据搜索' },
    description: {
      en: 'Valyu CLI gives AI agents access to 36+ data sources including real-time web, SEC filings, clinical trials, patents, academic papers (arXiv, PubMed), and financial data. Returns structured reports, making it ideal for research and fact-grounding agents.',
      zh: 'Valyu CLI 为 AI Agent 提供 36+ 数据源接入，包括实时网页、SEC 文件、临床试验、专利、学术论文（arXiv、PubMed）和金融数据，返回结构化报告，是研究型 Agent 的理想工具。'
    },
    homepage: 'https://www.valyu.network',
    repo: 'https://github.com/valyuAI/valyu-cli',
    license: 'MIT',
    category: 'dev-tools',
    tags: ['search', 'research', 'ai-agents', 'data', 'sec', 'academic'],
    install: { npm: 'npm install -g @valyu/cli', brew: 'brew install valyuAI/cli/valyu' },
    github: { stars: 8, language: 'TypeScript', last_updated: '2025-05' },
    examples: [
      { command: 'valyu search "quantum computing patents" --source sec,patents', description: { en: 'Search across SEC filings and patents', zh: '跨 SEC 文件和专利数据库搜索' } },
      { command: 'valyu answer "Latest clinical trials for diabetes?"', description: { en: 'Get an AI-synthesized answer from real-time sources', zh: '从实时数据源获取 AI 综合答案' } },
      { command: 'valyu deep-research "EV market analysis" --mode standard', description: { en: 'Generate a deep research report', zh: '生成深度研究报告' } }
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
