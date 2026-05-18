# CLI 资源站设计文档

**日期：** 2026-05-18  
**状态：** 已确认

---

## 目标

构建一个面向泛技术社区的 CLI 工具资源站，帮助开发者、产品经理等快速发现和使用优质 CLI 工具。

核心价值点：
- 数据质量高（人工筛选 + 双语描述）
- 差异化字段：AI 环境兼容性（Claude Code / Codex）
- 1-click 复制安装命令，降低使用门槛

---

## 技术栈

- **框架：** Next.js 15（App Router，SSG）
- **样式：** Tailwind CSS
- **搜索：** Fuse.js（客户端模糊搜索）
- **i18n：** next-intl
- **部署：** Vercel（免费）
- **数据：** 静态 `data/tools.json`，手动维护

---

## 目录结构

```
data/
  tools.json

messages/
  en.json
  zh.json

app/
  [locale]/
    layout.tsx
    page.tsx
    tools/[slug]/
      page.tsx

components/
  SearchBar.tsx
  ToolCard.tsx
  ToolDetail.tsx
  CategoryFilter.tsx
  InstallCommand.tsx

lib/
  tools.ts
  fuse.ts
```

---

## 数据 Schema

```typescript
interface Tool {
  slug: string;
  name: string;
  tagline: { en: string; zh: string };
  description: { en: string; zh: string };
  homepage: string;
  repo: string;
  license: string;
  category: Category;
  tags: string[];
  install: Partial<{
    brew: string;
    apt: string;
    npm: string;
    cargo: string;
    pip: string;
    winget: string;
    scoop: string;
    go: string;
    dnf: string;
    pacman: string;
  }>;
  github: {
    stars: number;
    language: string;
    last_updated: string; // ISO date
  };
  examples: Array<{
    command: string;
    description: { en: string; zh: string };
  }>;
  ai_env: {
    claude_code: boolean;
    codex: boolean;
    notes: { en: string; zh: string };
  };
}

type Category =
  | "file-management"
  | "network"
  | "git"
  | "dev-tools"
  | "productivity"
  | "database"
  | "media"
  | "system"
  | "fun";
```

---

## i18n 架构

- URL：`/en/...` 和 `/zh/...`
- UI 字符串存 `messages/{locale}.json`
- 数据文本字段内联双语：`{ en: "...", zh: "..." }`
- 默认 locale：`zh`

**messages 覆盖范围：** 导航、按钮、搜索占位符、分类名称、工具详情页标签

---

## 核心功能

### 首页
- 搜索框（Fuse.js，搜索 name / tagline / tags）
- 分类侧边栏过滤
- 工具卡片列表（name、tagline、stars、install badge、tags）

### 工具详情页（`/[locale]/tools/[slug]`）
- 完整描述（双语）
- 安装命令块，每种包管理器一个 tab，1-click 复制
- 使用示例列表
- GitHub 元数据（stars、language、last updated）
- AI 兼容性标注（Claude Code ✓ / Codex ✓）

### 搜索
- 客户端 Fuse.js，搜索字段：`name`、`tags`、`tagline.{locale}`
- 无结果时展示友好提示

---

## 数据来源

初始数据来自以下来源人工整理：
- [awesome-cli-apps](https://github.com/agarrharr/awesome-cli-apps)
- 各工具官方 GitHub 仓库
- npm / Homebrew / crates.io 等包管理器页面
