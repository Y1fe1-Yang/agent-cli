const fs = require('fs');
const tools = JSON.parse(fs.readFileSync('D:/cli/data/tools.json', 'utf8'));

const ramp = {
  slug: 'ramp',
  name: 'Ramp CLI',
  tagline: { en: 'Query transactions and manage corporate cards from the terminal', zh: '在终端查询交易记录并管理企业卡' },
  description: {
    en: 'Ramp CLI lets AI agents approve expenses, query transactions, and manage team corporate cards — all scriptable without touching the Ramp dashboard. Built for agentic finance automation in CI/CD pipelines.',
    zh: 'Ramp CLI 让 AI Agent 能够审批支出、查询交易记录并管理团队企业卡，无需打开 Ramp 控制台，完全可脚本化，适合 CI/CD 中的智能财务自动化。'
  },
  homepage: 'https://ramp.com',
  repo: 'https://github.com/ramp-platform/ramp-cli',
  license: 'Proprietary',
  category: 'productivity',
  tags: ['finance', 'expenses', 'corporate', 'agents'],
  install: { brew: 'curl -fsSL http://agents.ramp.com/install.sh | bash' },
  github: { stars: 0, language: 'Go', last_updated: '2025-05' },
  examples: [
    { command: 'ramp transactions list --limit 20', description: { en: 'List recent transactions', zh: '列出最近的交易记录' } },
    { command: 'ramp expenses approve --id exp_123', description: { en: 'Approve a pending expense', zh: '审批待处理的支出' } },
    { command: 'ramp cards list --team engineering', description: { en: 'List corporate cards for a team', zh: '列出某团队的企业卡' } }
  ],
  ai_env: { claude_code: true, codex: true, happycapy: true, notes: { en: '', zh: '' } }
};

if (tools.find(t => t.slug === 'ramp')) {
  console.log('Already exists');
} else {
  tools.push(ramp);
  require('fs').writeFileSync('D:/cli/data/tools.json', JSON.stringify(tools, null, 2));
  console.log('Added: ramp');
  console.log('Total tools:', tools.length);
}
