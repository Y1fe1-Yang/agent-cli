const fs = require('fs');
const data = JSON.parse(fs.readFileSync('D:/cli/data/tools.json', 'utf8'));

const rewrites = {
  // ── FILE MANAGEMENT ──────────────────────────────────────────────────────
  'bat': {
    tagline: { en: 'Preview any file in your terminal with syntax highlighting and Git markers', zh: '在终端预览任意文件，带语法高亮和 Git 变更标记' },
    description: { en: 'bat is a smarter version of the cat command — it displays file contents in your terminal with syntax highlighting for code, shows Git changes in the margin, and automatically pipes long files through a pager. Drop-in replacement for cat that makes reading code and config files much more pleasant.', zh: 'bat 是 cat 命令的升级版——在终端显示文件内容时，会对代码进行语法高亮，在边距显示 Git 变更，长文件自动分页翻阅。直接替换 cat，让阅读代码和配置文件更舒适。' }
  },
  'eza': {
    tagline: { en: 'See your files and folders in the terminal with colors, icons, and Git status', zh: '在终端浏览文件夹，带颜色、图标和 Git 状态' },
    description: { en: 'eza is a modern replacement for the ls command that lists files with color-coded types, file icons, Git integration, and tree view support. It shows permissions, sizes, and dates in a readable format — everything ls should have been from the start.', zh: 'eza 是 ls 命令的现代替代品，显示文件时带有颜色区分类型、文件图标、Git 集成和树形视图。权限、大小、日期一目了然——ls 本该如此。' }
  },
  'fd': {
    tagline: { en: 'Find any file on your computer by name — fast, simple, and friendly', zh: '按文件名快速找到电脑上的任意文件，简单好用' },
    description: { en: 'fd is a fast, user-friendly alternative to the find command. Type a name or pattern and it instantly searches your entire directory tree — with sensible defaults like ignoring hidden files and respecting .gitignore, colored output, and much simpler syntax than the classic find command.', zh: 'fd 是 find 命令快速友好的替代品。输入名称或模式，立即在整个目录树中搜索——默认忽略隐藏文件和 .gitignore 中的内容，彩色输出，语法比经典 find 简单得多。' }
  },
  'ripgrep': {
    tagline: { en: 'Search through thousands of files instantly to find any text or pattern', zh: '瞬间在成千上万个文件中搜索任意文字或模式' },
    description: { en: 'ripgrep searches the contents of files recursively across your entire project — finding any word, phrase, or pattern across thousands of files in milliseconds. It automatically skips hidden files, binary files, and anything in .gitignore. The fastest way for AI agents to locate code, configs, or any text in a codebase.', zh: 'ripgrep 在整个项目中递归搜索文件内容——在几毫秒内从数千个文件中找到任意单词、短语或模式。自动跳过隐藏文件、二进制文件和 .gitignore 中的内容。AI Agent 在代码库中定位代码、配置或任意文本的最快方式。' }
  },
  'fzf': {
    tagline: { en: 'Instantly find anything — files, commands, history — by typing a few letters', zh: '输入几个字母，瞬间找到任意文件、命令或历史记录' },
    description: { en: 'fzf is an interactive fuzzy finder that works with anything — files, command history, Git branches, processes, or any list of items. Type a few characters and it instantly narrows the list to matching results. Works great as a picker in scripts, letting AI agents interactively select from dynamic lists.', zh: 'fzf 是一个交互式模糊查找器，适用于任何内容——文件、命令历史、Git 分支、进程或任意列表。输入几个字符，立即缩小到匹配结果。非常适合在脚本中用作选择器，让 AI Agent 从动态列表中交互式选择。' }
  },
  'lsd': {
    tagline: { en: 'Browse your files in the terminal with colorful icons and Git indicators', zh: '在终端浏览文件，带彩色图标和 Git 状态指示' },
    description: { en: 'lsd (LSDeluxe) is a stylish replacement for ls that adds file-type icons, color-coded permissions, human-readable sizes, and Git status indicators to every file listing. Supports tree view for exploring directory structures at a glance. Makes terminal file browsing much more visual and readable.', zh: 'lsd（LSDeluxe）是 ls 的精美替代品，为每个文件列表添加文件类型图标、彩色权限显示、人类可读的文件大小和 Git 状态指示。支持树形视图，一眼看清目录结构。让终端文件浏览更直观易读。' }
  },
  'broot': {
    tagline: { en: 'Explore your entire folder tree at a glance, with instant search and navigation', zh: '一眼看清整个目录树，支持即时搜索和快速导航' },
    description: { en: 'broot shows your entire directory tree in the terminal and lets you navigate and search it interactively. Unlike ls or tree, it scales gracefully — even a huge project with thousands of files stays browsable. Type to filter, enter to open, and use it to preview files without leaving the terminal.', zh: 'broot 在终端中显示整个目录树，支持交互式浏览和搜索。与 ls 或 tree 不同，它能优雅地处理规模——即使是有数千个文件的大型项目也能流畅浏览。输入即过滤，回车即打开，全程不离开终端预览文件。' }
  },
  'zoxide': {
    tagline: { en: 'Jump to any folder you have visited before by typing just a few letters', zh: '只需几个字母，瞬间跳转到任何曾访问过的文件夹' },
    description: { en: 'zoxide is a smarter cd command that remembers every directory you visit and ranks them by frequency. Type a fragment of the path and it jumps straight there — no need to remember the full path or type it out. AI agents use it to navigate codebases and projects quickly without hardcoded paths.', zh: 'zoxide 是更智能的 cd 命令，记住你访问过的每个目录并按频率排名。输入路径的片段就能直接跳转——无需记住完整路径。AI Agent 可用它快速导航代码库和项目，无需硬编码路径。' }
  },
  'ranger': {
    tagline: { en: 'Navigate and manage your files with keyboard shortcuts — a full file manager in the terminal', zh: '用键盘快捷键管理文件——终端里的完整文件管理器' },
    description: { en: 'ranger is a terminal file manager with a three-column layout (parent, current, preview) that lets you navigate your filesystem entirely with keyboard shortcuts. Preview images, open files with the right app, bulk rename, and move files — all without leaving your terminal. Highly configurable and scriptable.', zh: 'ranger 是一个三栏布局（父目录、当前目录、预览）的终端文件管理器，完全用键盘快捷键操作。预览图片、用合适的程序打开文件、批量重命名和移动文件——全程不离开终端。高度可配置且可脚本化。' }
  },
  'nnn': {
    tagline: { en: 'The fastest terminal file manager — tiny, distraction-free, and keyboard-driven', zh: '最快的终端文件管理器——轻量、专注、全键盘操作' },
    description: { en: 'nnn is a minimalist terminal file manager that starts instantly and runs on almost any system. Navigate directories, preview files, bulk operate, and launch programs — all from the keyboard. Its tiny size and zero dependencies make it ideal for remote servers and automated scripts.', zh: 'nnn 是一个极简终端文件管理器，启动极快，几乎能在任何系统上运行。浏览目录、预览文件、批量操作、启动程序——全部通过键盘完成。体积小、零依赖，非常适合远程服务器和自动化脚本。' }
  },

  // ── NETWORK ──────────────────────────────────────────────────────────────
  'httpie': {
    tagline: { en: 'Send HTTP requests and test APIs from your terminal — human-readable output', zh: '在终端发送 HTTP 请求、测试 API，输出清晰易读' },
    description: { en: 'HTTPie is a command-line HTTP client designed for humans — it makes API calls with simple syntax, colors the response JSON automatically, and shows headers in a readable format. Perfect for testing REST APIs, debugging webhooks, and exploring API endpoints without a GUI tool like Postman.', zh: 'HTTPie 是一个为人类设计的命令行 HTTP 客户端——语法简洁，自动对响应 JSON 着色，以可读格式显示请求头。非常适合测试 REST API、调试 Webhook，以及无需 Postman 等 GUI 工具直接探索 API 端点。' }
  },
  'xh': {
    tagline: { en: 'A fast alternative to HTTPie for sending HTTP requests and testing APIs', zh: '更快的 HTTPie 替代品，用于发送 HTTP 请求和测试 API' },
    description: { en: 'xh is a fast, HTTPie-compatible HTTP client rewritten in Rust. It sends HTTP requests with the same friendly syntax as HTTPie but starts up much faster — ideal for scripts and AI agents that make frequent API calls. Supports JSON, form data, file uploads, and all standard HTTP methods.', zh: 'xh 是用 Rust 重写的快速 HTTP 客户端，与 HTTPie 语法兼容。启动速度比 HTTPie 快很多——非常适合频繁发起 API 调用的脚本和 AI Agent。支持 JSON、表单数据、文件上传和所有标准 HTTP 方法。' }
  },
  'dog': {
    tagline: { en: 'Look up DNS records for any domain — friendlier than nslookup or dig', zh: '查询任意域名的 DNS 记录，比 nslookup 和 dig 更友好' },
    description: { en: 'dog is a command-line DNS lookup tool that shows DNS records (A, AAAA, MX, TXT, CNAME, and more) in a clean, colored format. Much easier to read than the classic dig or nslookup commands. Useful for debugging DNS issues, verifying domain configurations, and checking email/SPF records.', zh: 'dog 是一个命令行 DNS 查询工具，以清晰彩色格式显示 DNS 记录（A、AAAA、MX、TXT、CNAME 等）。比经典的 dig 或 nslookup 命令易读得多。适合调试 DNS 问题、验证域名配置和检查邮件/SPF 记录。' }
  },
  'nmap': {
    tagline: { en: 'Scan your network to discover connected devices and open ports', zh: '扫描网络，发现连接的设备和开放的端口' },
    description: { en: 'nmap is the industry-standard network scanner. It discovers which devices are on a network, what ports they have open, what services are running, and can detect the operating system. Used by network administrators and security engineers for auditing, troubleshooting, and authorized security assessments.', zh: 'nmap 是业界标准的网络扫描工具。它能发现网络中的设备、开放的端口、运行的服务，还能检测操作系统类型。网络管理员和安全工程师用它进行审计、故障排查和授权安全评估。' }
  },
  'aria2': {
    tagline: { en: 'Download files at maximum speed with parallel connections and multiple protocols', zh: '多连接并行下载，速度最大化，支持多种协议' },
    description: { en: 'aria2 is a lightweight download utility that accelerates downloads by opening multiple connections simultaneously — often dramatically faster than a single-connection download. Supports HTTP/HTTPS, FTP, BitTorrent, and Metalink. AI agents use it to reliably download datasets, model weights, and large files.', zh: 'aria2 是一个通过同时开启多个连接来加速下载的轻量工具——通常比单连接下载快得多。支持 HTTP/HTTPS、FTP、BitTorrent 和 Metalink。AI Agent 可用它可靠地下载数据集、模型权重和大文件。' }
  },
  'mitmproxy': {
    tagline: { en: 'Intercept and inspect HTTPS traffic between apps and servers — for security testing', zh: '拦截并检查应用与服务器之间的 HTTPS 流量——用于安全测试' },
    description: { en: 'mitmproxy sits between your app and the internet, letting you see every HTTP/HTTPS request and response in real time. You can inspect, modify, and replay traffic — invaluable for debugging APIs, understanding how mobile apps communicate, and authorized security testing. Requires explicit setup and authorization.', zh: 'mitmproxy 位于应用和互联网之间，让你实时查看每一个 HTTP/HTTPS 请求和响应。可以检查、修改和重放流量——对调试 API、理解移动应用通信和授权安全测试非常有价值。需要明确配置和授权使用。' }
  },
  'gping': {
    tagline: { en: 'Ping a server and watch the latency over time as a live graph in your terminal', zh: '实时 Ping 服务器，在终端中以折线图显示延迟变化' },
    description: { en: 'gping runs ping and displays the round-trip latency as a scrolling graph directly in your terminal. You can ping multiple hosts at once and compare their latency side by side. Instantly shows network hiccups, spikes, and patterns that raw numbers would hide.', zh: 'gping 运行 ping 并在终端中以滚动折线图显示往返延迟。可以同时 ping 多个主机并排比较延迟。即时显示原始数字所掩盖的网络抖动、延迟峰值和规律。' }
  },
  'bandwhich': {
    tagline: { en: 'See which programs are using your network bandwidth in real time', zh: '实时查看哪些程序正在占用你的网络带宽' },
    description: { en: 'bandwhich shows a live breakdown of network usage by process, connection, and remote host — so you can immediately see which program is downloading something large, which server is consuming bandwidth, and what connections are active. Useful for debugging unexpected network activity.', zh: 'bandwhich 按进程、连接和远程主机实时分解网络使用情况——让你立即看到哪个程序正在下载大文件、哪个服务器在消耗带宽，以及哪些连接处于活跃状态。适合调试意外的网络活动。' }
  },

  // ── GIT ──────────────────────────────────────────────────────────────────
  'lazygit': {
    tagline: { en: 'A visual Git interface in your terminal — stage, commit, and branch without memorizing commands', zh: '终端里的可视化 Git 界面——无需记命令就能提交、管理分支' },
    description: { en: 'lazygit is a terminal UI that wraps Git in a visual, keyboard-driven interface. See all your branches, unstaged changes, and commit history at once — stage individual lines, resolve merge conflicts, and create pull requests without typing a single git command. Makes Git accessible without losing the power of the terminal.', zh: 'lazygit 是将 Git 包装成可视化键盘驱动界面的终端 UI。同时查看所有分支、未暂存的变更和提交历史——按行暂存、解决合并冲突、创建 PR，无需输入任何 git 命令。让 Git 变得易用，同时不失终端的强大。' }
  },
  'delta': {
    tagline: { en: 'See Git diffs with syntax highlighting and side-by-side comparison', zh: '用语法高亮和并排对比查看 Git 差异' },
    description: { en: 'delta replaces the default git diff output with syntax-highlighted, line-numbered diffs that are much easier to read. Supports side-by-side view, word-level diff highlighting, and themes. Simply set it as your Git pager and every git diff, git show, and git log automatically becomes more readable.', zh: 'delta 用带语法高亮、行号的差异视图替换默认的 git diff 输出，易读性大幅提升。支持并排视图、单词级别的差异高亮和主题。设为 Git pager 后，所有 git diff、git show、git log 都自动变得更易读。' }
  },
  'tig': {
    tagline: { en: 'Browse your Git history, branches, and diffs with a keyboard-driven terminal UI', zh: '用键盘驱动的终端 UI 浏览 Git 历史、分支和差异' },
    description: { en: 'tig is a text-mode interface for Git that lets you visually navigate commit history, inspect diffs, browse branches and tags, and stage changes — all from the terminal. Think of it as a lightweight alternative to a Git GUI, but faster and accessible over SSH.', zh: 'tig 是 Git 的文本模式界面，可以可视化浏览提交历史、查看差异、浏览分支和标签、暂存变更——全部在终端内完成。可以把它看作轻量级 Git GUI 的替代品，但更快，还能通过 SSH 使用。' }
  },
  'gitui': {
    tagline: { en: 'A fast visual Git client for your terminal — stage, commit, and manage branches with ease', zh: '快速的终端 Git 可视化客户端——轻松暂存、提交、管理分支' },
    description: { en: 'gitui is a blazing-fast terminal UI for Git written in Rust. It shows your status, staged/unstaged changes, commit log, and branches in a tabbed interface — letting you do everything with keyboard shortcuts. Faster than lazygit on large repos, and great for AI agents that need a structured view of repository state.', zh: 'gitui 是用 Rust 编写的极速终端 Git UI，在标签式界面中显示状态、已暂存/未暂存的变更、提交日志和分支——一切都可通过键盘快捷键操作。在大型仓库上比 lazygit 更快，非常适合需要结构化查看仓库状态的 AI Agent。' }
  },

  // ── DEV TOOLS ────────────────────────────────────────────────────────────
  'jq': {
    tagline: { en: 'Extract and transform JSON data in your terminal — perfect for working with API responses', zh: '在终端提取和转换 JSON 数据，处理 API 响应的利器' },
    description: { en: 'jq is the standard tool for working with JSON in the terminal. Pipe any JSON into jq and use its query language to extract fields, filter arrays, reshape objects, and transform data. Every AI agent that calls APIs uses jq to parse and process the JSON responses — it is the universal glue between HTTP calls and shell scripts.', zh: 'jq 是在终端处理 JSON 的标准工具。将任意 JSON 通过管道传入 jq，用其查询语言提取字段、过滤数组、重塑对象、转换数据。每个调用 API 的 AI Agent 都用 jq 解析和处理 JSON 响应——它是 HTTP 调用和 Shell 脚本之间的万能胶水。' }
  },
  'yq': {
    tagline: { en: 'Read, edit, and convert YAML, JSON, and XML files from your terminal', zh: '在终端读取、编辑和转换 YAML、JSON、XML 文件' },
    description: { en: 'yq is like jq but for YAML — it reads, writes, and transforms YAML, JSON, TOML, XML, and CSV files with a consistent query syntax. Essential for working with Kubernetes configs, GitHub Actions workflows, Docker Compose files, and any other YAML-based configuration. AI agents use it to modify config files programmatically.', zh: 'yq 是面向 YAML 的 jq——用统一的查询语法读取、写入和转换 YAML、JSON、TOML、XML 和 CSV 文件。处理 Kubernetes 配置、GitHub Actions 工作流、Docker Compose 文件等任何基于 YAML 的配置时必不可少。AI Agent 用它以编程方式修改配置文件。' }
  },
  'fx': {
    tagline: { en: 'Explore and browse JSON interactively in your terminal — fold, filter, and navigate', zh: '在终端交互式浏览 JSON——折叠、过滤、导航' },
    description: { en: 'fx is an interactive JSON viewer and processor for the terminal. Open any JSON file or pipe API output into fx to browse it with an interactive tree view — expand and collapse objects, search for keys, and run JavaScript transformations on the data. Makes large, deeply nested JSON responses easy to understand at a glance.', zh: 'fx 是终端的交互式 JSON 查看器和处理器。打开任意 JSON 文件或将 API 输出通过管道传入 fx，用交互式树形视图浏览——展开折叠对象、搜索键名、对数据运行 JavaScript 转换。让大型深层嵌套的 JSON 响应一目了然。' }
  },
  'tldr': {
    tagline: { en: 'Quick cheat sheets for any command — practical examples instead of overwhelming manuals', zh: '任意命令的速查手册——实用示例，告别冗长 man 页面' },
    description: { en: 'tldr shows simplified, community-maintained help pages for thousands of commands — focused on the most common usage examples instead of exhaustive documentation. When you know the name of a tool but forget the exact syntax, tldr shows you a working example in seconds. AI agents use it to discover command syntax without parsing man pages.', zh: 'tldr 显示数千个命令的简化社区帮助页面——专注于最常用的使用示例，而非面面俱到的文档。当你知道工具名称但忘记具体语法时，tldr 几秒内就给出一个可用的示例。AI Agent 用它发现命令语法，无需解析 man 页面。' }
  },
  'shellcheck': {
    tagline: { en: 'Automatically find bugs and mistakes in your shell scripts before running them', zh: '运行前自动发现 Shell 脚本中的 Bug 和错误' },
    description: { en: 'ShellCheck is a static analysis tool that reads your bash/sh scripts and flags common mistakes: unquoted variables, deprecated syntax, logic errors, and security issues. It explains why each issue is a problem and suggests the correct fix. Essential for any AI agent that writes or modifies shell scripts.', zh: 'ShellCheck 是读取 bash/sh 脚本并标记常见错误的静态分析工具：未加引号的变量、过时的语法、逻辑错误和安全问题。它解释每个问题的原因并建议正确的修复方式。任何编写或修改 Shell 脚本的 AI Agent 必备工具。' }
  },
  'hyperfine': {
    tagline: { en: 'Measure and compare how fast commands run — with statistics and warmup runs', zh: '测量和比较命令的运行速度，带统计数据和预热运行' },
    description: { en: 'hyperfine is a command-line benchmarking tool that runs a command many times and reports the mean runtime, standard deviation, and min/max times. Compare two commands side by side to see which is faster. Useful for optimizing build scripts, comparing tool versions, and validating performance improvements.', zh: 'hyperfine 是一个命令行基准测试工具，多次运行命令并报告平均时间、标准差和最小/最大时间。并排比较两个命令，看哪个更快。适合优化构建脚本、比较工具版本和验证性能改进。' }
  },
  'tokei': {
    tagline: { en: 'Count lines of code in any project — broken down by language, fast', zh: '统计项目代码行数，按语言分类，速度极快' },
    description: { en: 'tokei counts the lines of code, comments, and blank lines in a project and breaks them down by programming language. It processes even large codebases in seconds and supports 200+ languages. AI agents use it to quickly understand the size and composition of an unfamiliar codebase.', zh: 'tokei 统计项目中的代码行、注释行和空行，并按编程语言分类。即使是大型代码库也能在几秒内处理完，支持 200+ 种语言。AI Agent 用它快速了解陌生代码库的规模和构成。' }
  },
  'ctop': {
    tagline: { en: 'Monitor your running Docker containers in real time — like top but for containers', zh: '实时监控运行中的 Docker 容器——容器版 top 命令' },
    description: { en: 'ctop is a real-time metrics dashboard for Docker containers. It shows CPU usage, memory consumption, network I/O, and block I/O for every running container in a clean terminal UI — similar to top or htop but focused entirely on containers. Useful for diagnosing performance issues without opening the Docker web dashboard.', zh: 'ctop 是 Docker 容器的实时指标仪表盘。在简洁的终端 UI 中显示每个运行中容器的 CPU 使用率、内存占用、网络 I/O 和块 I/O——类似 top 或 htop，但专注于容器。无需打开 Docker 网页仪表盘即可诊断性能问题。' }
  },
  'direnv': {
    tagline: { en: 'Automatically load the right environment variables when you enter a project folder', zh: '进入项目文件夹时自动加载对应的环境变量' },
    description: { en: 'direnv watches which directory you are in and automatically loads (or unloads) environment variables from a .envrc file when you change directories. No more manually sourcing .env files or accidentally using the wrong API keys between projects. AI agents use it to ensure the right credentials are always loaded for the current project.', zh: 'direnv 监视当前目录，在切换目录时自动从 .envrc 文件加载（或卸载）环境变量。不再需要手动 source .env 文件，也不会在项目间意外使用错误的 API 密钥。AI Agent 用它确保始终为当前项目加载正确的凭证。' }
  },
  'stripe': {
    tagline: { en: 'Test Stripe payments, trigger webhooks, and manage your account from the terminal', zh: '在终端测试 Stripe 支付、触发 Webhook、管理账户' },
    description: { en: 'Stripe is the payment infrastructure used by millions of businesses to accept credit card payments. The Stripe CLI lets you test your integration from the terminal: trigger test events (like a successful payment), listen to webhooks locally, create test customers and charges, and manage your Stripe account — without opening the web dashboard.', zh: 'Stripe 是数百万企业用来接受信用卡支付的支付基础设施。Stripe CLI 让你在终端测试集成：触发测试事件（如成功支付）、在本地监听 Webhook、创建测试客户和订单、管理 Stripe 账户——无需打开网页仪表盘。' }
  },
  'auth0': {
    tagline: { en: 'Manage Auth0 user login, apps, and settings from your terminal', zh: '在终端管理 Auth0 用户登录、应用和设置' },
    description: { en: 'Auth0 is an authentication platform that handles user sign-up, login, and identity for your app — so you do not have to build it yourself. The Auth0 CLI lets you manage tenants, create applications, configure connection settings, and deploy Auth0 Actions (serverless functions that run during login) all from your terminal.', zh: 'Auth0 是一个为你的应用处理用户注册、登录和身份认证的平台——这样你就不必自己构建这些功能。Auth0 CLI 让你在终端管理租户、创建应用、配置连接设置，以及部署 Auth0 Actions（登录时运行的无服务器函数）。' }
  },
  'doppler': {
    tagline: { en: 'Sync secrets and API keys across all your environments — no more .env files', zh: '跨所有环境同步密钥和 API Key——告别 .env 文件管理' },
    description: { en: 'Doppler is a secrets manager that stores your API keys, database passwords, and other sensitive config in one place and syncs them securely to every environment — local dev, staging, production. The CLI injects those secrets into your app at runtime, so you never have to copy-paste .env files between machines or risk committing secrets to Git.', zh: 'Doppler 是一个密钥管理器，将 API Key、数据库密码等敏感配置存储在一处，并安全地同步到所有环境——本地开发、测试、生产。CLI 在运行时将这些密钥注入你的应用，无需在机器间复制粘贴 .env 文件，也不会有误提交密钥到 Git 的风险。' }
  },
  'resend': {
    tagline: { en: 'Send transactional emails and manage your Resend account from the terminal', zh: '在终端发送事务性邮件并管理 Resend 账户' },
    description: { en: 'Resend is an email delivery service for developers — it handles sending transactional emails (password resets, notifications, receipts) reliably at scale. The CLI lets you send test emails, manage domains and API keys, and inspect delivery logs directly from your terminal. AI agents use it to send notifications as part of automated workflows.', zh: 'Resend 是面向开发者的邮件发送服务——可靠地大规模发送事务性邮件（密码重置、通知、收据等）。CLI 让你直接在终端发送测试邮件、管理域名和 API Key、查看投递日志。AI Agent 用它在自动化工作流中发送通知。' }
  },
  'shopify-cli': {
    tagline: { en: 'Build, preview, and deploy Shopify themes and apps from your terminal', zh: '在终端构建、预览和部署 Shopify 主题及应用' },
    description: { en: 'Shopify is the leading e-commerce platform powering millions of online stores. The Shopify CLI is the official tool for developers building on Shopify: create and preview custom store themes, scaffold new apps, push code changes, and manage store resources — all from your terminal without using the web admin.', zh: 'Shopify 是为数百万在线商店提供支持的领先电商平台。Shopify CLI 是为 Shopify 开发者准备的官方工具：创建和预览自定义店铺主题、生成新应用脚手架、推送代码变更、管理商店资源——全部在终端完成，无需使用网页管理后台。' }
  },
  'sentry-cli': {
    tagline: { en: 'Manage Sentry error tracking — upload source maps and create releases from your terminal', zh: '管理 Sentry 错误追踪——在终端上传 Source Map、创建 Release' },
    description: { en: 'Sentry automatically tracks and reports errors and crashes in your application. The Sentry CLI is the link between your deployment process and Sentry: upload source maps so minified stack traces become readable, mark new releases so you can track which version introduced a bug, and send custom events from your CI/CD pipeline.', zh: 'Sentry 自动追踪和报告应用中的错误和崩溃。Sentry CLI 是你的部署流程与 Sentry 之间的纽带：上传 Source Map 让混淆的堆栈跟踪变得可读、标记新 Release 以追踪是哪个版本引入了 Bug，以及从 CI/CD 流水线发送自定义事件。' }
  },
  'android-cli': {
    tagline: { en: "Google's official CLI for Android — build, test, and inspect apps without Android Studio", zh: 'Google 官方 Android CLI——无需 Android Studio 就能构建、测试和检查应用' },
    description: { en: "Google's official Android CLI is designed from the ground up for AI agents and automated workflows. It provides non-interactive access to Android development tasks: build APKs, run tests, inspect app state, capture screenshots, and interact with the Android emulator — all from the terminal. Part of Google's agent-first developer tooling initiative.", zh: 'Google 官方 Android CLI 从底层专为 AI Agent 和自动化工作流设计。提供对 Android 开发任务的非交互式访问：构建 APK、运行测试、检查应用状态、截图，以及与 Android 模拟器交互——全部通过终端完成。是 Google Agent 优先开发者工具计划的一部分。' }
  },
  'firecrawl': {
    tagline: { en: 'Turn any website into clean, structured data your AI agent can read and use', zh: '把任意网站转化为 AI Agent 可读可用的干净结构化数据' },
    description: { en: 'Firecrawl crawls websites and extracts their content as clean Markdown or structured JSON — removing ads, navigation, and other noise. AI agents use it to read web pages, research topics, monitor competitor sites, and extract data without writing web scrapers. Supports single pages, full site crawls, and search-based extraction.', zh: 'Firecrawl 爬取网站并将内容提取为干净的 Markdown 或结构化 JSON——去除广告、导航栏等噪音。AI Agent 用它读取网页、研究主题、监控竞品站点，以及无需编写爬虫就能提取数据。支持单页、全站爬取和基于搜索的提取。' }
  },
  'valyu': {
    tagline: { en: 'Search the live web and proprietary datasets from the terminal — built for AI agents', zh: '在终端搜索实时网络和专有数据集——专为 AI Agent 设计' },
    description: { en: 'Valyu provides real-time web search and access to specialized proprietary datasets — financial data, scientific papers, news, and more. Unlike general search, it returns structured, agent-readable results optimized for use in AI pipelines. Gives your AI agent access to up-to-date information beyond its training cutoff.', zh: 'Valyu 提供实时网络搜索和专有数据集访问——金融数据、科学论文、新闻等。与普通搜索不同，它返回结构化、适合 AI 读取的结果，为 AI 流水线优化。让你的 AI Agent 获取训练截止日期之外的最新信息。' }
  },
  'posthog': {
    tagline: { en: 'Set up product analytics and query user events from your terminal', zh: '在终端配置产品分析并查询用户事件' },
    description: { en: 'PostHog is an open-source product analytics platform that tracks how users interact with your app — page views, feature usage, funnels, and custom events. The CLI helps you set up tracking, manage your self-hosted instance, run migrations, and send events from automated pipelines. AI agents use it to monitor product metrics and trigger alerts.', zh: 'PostHog 是一个开源产品分析平台，追踪用户如何与你的应用互动——页面访问、功能使用、转化漏斗和自定义事件。CLI 帮助你设置追踪、管理自托管实例、运行迁移，以及从自动化流水线发送事件。AI Agent 用它监控产品指标和触发告警。' }
  },
  'twilio': {
    tagline: { en: 'Send SMS, make phone calls, and manage Twilio resources from your terminal', zh: '在终端发短信、打电话、管理 Twilio 资源' },
    description: { en: 'Twilio is a communications platform that lets apps send SMS messages, make and receive phone calls, and handle WhatsApp messages. The official CLI lets you send messages, inspect logs, manage phone numbers, deploy Twilio Functions (serverless code that handles calls and messages), and test webhooks — all from your terminal. AI agents use it to automate notifications and communication workflows.', zh: 'Twilio 是一个通信平台，让应用能够发送短信、拨打/接听电话和处理 WhatsApp 消息。官方 CLI 让你在终端发送消息、查看日志、管理电话号码、部署 Twilio Functions（处理通话和消息的无服务器代码）并测试 Webhook。AI Agent 用它自动化通知和通信工作流。' }
  },

  // ── PRODUCTIVITY ─────────────────────────────────────────────────────────
  'tmux': {
    tagline: { en: 'Split your terminal into panels, run multiple things at once, and keep sessions alive', zh: '把终端分割成多个面板，同时运行多个任务，保持会话不断开' },
    description: { en: 'tmux is a terminal multiplexer — it lets you split your terminal window into multiple panes running different commands at the same time, and keeps everything running even if you close your laptop or lose your SSH connection. Pick up exactly where you left off by reattaching to the session. Essential for remote development and long-running AI agent workflows.', zh: 'tmux 是终端复用器——让你把终端窗口分割成多个面板同时运行不同命令，即使关闭笔记本或断开 SSH 连接，一切也会继续运行。重新连接会话后从断点继续。对远程开发和长时间运行的 AI Agent 工作流必不可少。' }
  },
  'zellij': {
    tagline: { en: 'A modern terminal workspace — split panes, save layouts, and manage sessions with ease', zh: '现代终端工作区——分割面板、保存布局、轻松管理会话' },
    description: { en: 'zellij is a modern alternative to tmux with a friendlier interface and built-in features like a floating pane mode, session management, and layout templates. It shows a help bar at the bottom so you never forget keybindings, and supports plugins for extending functionality. Great for developers who want tmux power without the steep learning curve.', zh: 'zellij 是 tmux 的现代替代品，界面更友好，内置浮动面板模式、会话管理和布局模板。底部显示帮助栏，不会忘记快捷键，支持插件扩展功能。适合想要 tmux 功能但不想花大量时间学习的开发者。' }
  },
  'starship': {
    tagline: { en: 'Customize your terminal prompt to show Git branch, language, and status at a glance', zh: '自定义终端提示符，一眼看到当前 Git 分支、语言和状态' },
    description: { en: 'Starship is a minimal, fast shell prompt that shows the information you actually need: current Git branch and status, active programming language and version, last command exit code, and more. Works with any shell (bash, zsh, fish, PowerShell) and configures via a simple TOML file. Makes your terminal more informative without slowing it down.', zh: 'Starship 是一个极简快速的 Shell 提示符，显示你真正需要的信息：当前 Git 分支和状态、活跃的编程语言和版本、上一条命令的退出码等。支持任意 Shell（bash、zsh、fish、PowerShell），通过简单的 TOML 文件配置。让终端更信息丰富，同时不影响速度。' }
  },
  'oh-my-posh': {
    tagline: { en: 'Customize your terminal prompt with beautiful themes and icons — works on Windows, Mac, and Linux', zh: '用精美主题和图标美化终端提示符——支持 Windows、Mac 和 Linux' },
    description: { en: 'Oh My Posh is a prompt theme engine that works with any shell on any platform. Choose from hundreds of community themes or build your own, showing Git status, cloud credentials, language versions, and custom segments. Particularly popular on Windows where it works seamlessly with PowerShell and Windows Terminal.', zh: 'Oh My Posh 是一个适用于任意平台任意 Shell 的提示符主题引擎。从数百个社区主题中选择或自定义，显示 Git 状态、云凭证、语言版本和自定义片段。在 Windows 上与 PowerShell 和 Windows Terminal 无缝协作，特别受欢迎。' }
  },
  'thefuck': {
    tagline: { en: 'Made a typo in your last command? Run "fuck" and it automatically fixes and reruns it', zh: '上条命令打错了？运行 "fuck" 自动修正并重新执行' },
    description: { en: 'thefuck watches your last command, detects the mistake (misspelled command, missing sudo, wrong flags), and fixes it when you type "fuck". Supports hundreds of rules for common shell mistakes across git, npm, pip, brew, and many other tools. A small convenience that saves typing the same command twice.', zh: 'thefuck 监视你的上一条命令，检测错误（拼错的命令、缺少 sudo、错误的参数），当你输入 "fuck" 时自动修正。支持数百条针对 git、npm、pip、brew 等工具常见 Shell 错误的规则。省去重新输入命令的麻烦。' }
  },
  'atuin': {
    tagline: { en: 'Search your entire command history instantly — synced across all your machines', zh: '即时搜索完整命令历史，跨所有机器同步' },
    description: { en: 'atuin replaces your shell history with a SQLite database that records every command along with its directory, exit code, and duration. Search your history with full-text queries, filter by directory or time, and optionally sync it encrypted across all your machines. AI agents use it to find previously run commands and learn from past workflows.', zh: 'atuin 用 SQLite 数据库替换 Shell 历史，记录每条命令及其目录、退出码和运行时间。用全文查询搜索历史，按目录或时间过滤，并可选择加密同步到所有机器。AI Agent 用它查找之前运行的命令，从过去的工作流中学习。' }
  },
  'mcfly': {
    tagline: { en: 'A smarter shell history search — suggests the most relevant past commands based on context', zh: '更智能的 Shell 历史搜索——根据上下文推荐最相关的历史命令' },
    description: { en: 'McFly replaces the default Ctrl+R history search with a neural network that ranks past commands by how relevant they are to your current directory, recent commands, and usage patterns. The more you use it, the smarter it gets. Finds the command you actually want instead of just the most recent match.', zh: 'McFly 用神经网络替换默认的 Ctrl+R 历史搜索，根据当前目录、最近命令和使用模式对历史命令进行相关性排序。用得越多越智能。找到你真正想要的命令，而不仅仅是最近的匹配。' }
  },
  'navi': {
    tagline: { en: 'Browse and run command snippets from interactive cheat sheets in your terminal', zh: '在终端浏览和运行交互式速查表中的命令片段' },
    description: { en: 'navi is an interactive cheat sheet tool that lets you browse a curated library of command snippets with descriptions, fill in placeholders, and execute them. Works with community cheat sheets for git, kubectl, docker, and hundreds of other tools. AI agents use it to discover and execute complex commands without memorizing syntax.', zh: 'navi 是一个交互式速查表工具，让你浏览带描述的命令片段库，填写占位符后直接执行。支持 git、kubectl、docker 等数百种工具的社区速查表。AI Agent 用它发现和执行复杂命令，无需记忆语法。' }
  },
  'glow': {
    tagline: { en: 'Read Markdown files beautifully in your terminal — with formatting and a pager', zh: '在终端优雅地阅读 Markdown 文件，带格式化和分页' },
    description: { en: 'glow renders Markdown files in your terminal with proper formatting — headings, bold, code blocks, tables, and lists all look correct. Browse your project README, documentation, and notes without opening a browser. Also supports a TUI for discovering and stashing Markdown files. AI agents use it to parse and display formatted documentation.', zh: 'glow 在终端以正确格式渲染 Markdown 文件——标题、加粗、代码块、表格和列表都能正确显示。无需打开浏览器就能浏览项目 README、文档和笔记。还支持 TUI 发现和收藏 Markdown 文件。AI Agent 用它解析和显示格式化文档。' }
  },
  'ramp': {
    tagline: { en: 'Query corporate card transactions and manage expenses from your terminal', zh: '在终端查询公司卡交易记录并管理报销' },
    description: { en: 'Ramp is a corporate card and expense management platform used by thousands of companies. The Ramp CLI lets you query transaction data, filter by merchant or category, export reports, and manage cards from your terminal — making it easy for AI agents to automate expense reporting, monitor spending, and reconcile transactions.', zh: 'Ramp 是数千家公司使用的企业卡和报销管理平台。Ramp CLI 让你在终端查询交易数据、按商户或分类过滤、导出报表、管理卡片——让 AI Agent 轻松自动化报销流程、监控支出、核对交易。' }
  },

  // ── SYSTEM ───────────────────────────────────────────────────────────────
  'htop': {
    tagline: { en: 'See all running processes and resource usage in real time — a better Task Manager for the terminal', zh: '实时查看所有运行进程和资源占用——终端里更好用的任务管理器' },
    description: { en: 'htop is an interactive process viewer for the terminal that shows CPU, memory, and swap usage at the top, with a scrollable list of every running process below. Search, filter, sort, and kill processes with keyboard shortcuts. A much more powerful and readable alternative to the basic top command.', zh: 'htop 是终端的交互式进程查看器，顶部显示 CPU、内存和交换空间使用情况，下方是所有运行进程的可滚动列表。用键盘快捷键搜索、过滤、排序和终止进程。比基础的 top 命令功能更强大、更易读。' }
  },
  'btop': {
    tagline: { en: 'A beautiful real-time dashboard for CPU, memory, disk, and network — all in one terminal view', zh: '精美的实时系统监控仪表盘——CPU、内存、磁盘、网络一屏搞定' },
    description: { en: 'btop is a resource monitor with a stunning terminal UI that shows CPU usage per core, memory and swap, disk activity, and network traffic — all in one beautiful dashboard with graphs. Highly configurable with themes and multiple display modes. The most visually impressive way to monitor your system in the terminal.', zh: 'btop 是一个拥有精美终端 UI 的资源监控器，在一个漂亮的仪表盘中显示每个核心的 CPU 使用率、内存和交换空间、磁盘活动和网络流量——带有图表。高度可配置，支持主题和多种显示模式。终端中最视觉震撼的系统监控方式。' }
  },
  'glances': {
    tagline: { en: 'Monitor your entire system at a glance — with a web interface and API for remote access', zh: '一屏监控整个系统——支持 Web 界面和 API 远程访问' },
    description: { en: 'glances is a cross-platform system monitor that shows CPU, memory, disk, network, processes, and sensors in a single terminal view. Uniquely, it also runs as a web server and exposes a REST API, so you can monitor a remote machine from a browser or have an AI agent query system stats programmatically.', zh: 'glances 是跨平台系统监控工具，在单个终端视图中显示 CPU、内存、磁盘、网络、进程和传感器信息。独特之处在于它还能作为 Web 服务器运行并提供 REST API，让你通过浏览器监控远程机器，或让 AI Agent 以编程方式查询系统状态。' }
  },
  'duf': {
    tagline: { en: 'See how much disk space is used on each drive — cleaner and more readable than df', zh: '查看每个磁盘的空间占用情况，比 df 命令更清晰易读' },
    description: { en: 'duf shows disk usage for all mounted drives in a clean table with color-coded usage bars — much easier to read than the classic df command. Shows total size, used space, available space, and usage percentage for every drive, including network mounts and special filesystems. Works on macOS, Linux, and Windows.', zh: 'duf 在带彩色使用进度条的简洁表格中显示所有挂载磁盘的使用情况——比经典 df 命令易读得多。显示每个磁盘的总大小、已用空间、可用空间和使用百分比，包括网络挂载和特殊文件系统。支持 macOS、Linux 和 Windows。' }
  },
  'dust': {
    tagline: { en: 'Find which files and folders are taking up the most disk space — fast and visual', zh: '快速直观地找出哪些文件和文件夹占用了最多磁盘空间' },
    description: { en: 'dust is a faster, more visual alternative to the du command. It scans a directory and shows you which subdirectories and files are consuming the most space, displayed as a tree with bar charts proportional to size. Instantly answers "why is my disk full?" without manual ls -lh digging.', zh: 'dust 是 du 命令更快更直观的替代品。扫描目录并以树形结构展示哪些子目录和文件占用最多空间，配有与大小成比例的条形图。无需手动 ls -lh 排查，即可立即回答"为什么磁盘满了？"' }
  },
  'procs': {
    tagline: { en: 'List running processes with more detail and better readability than the standard ps command', zh: '列出运行中的进程，比标准 ps 命令更详细、更易读' },
    description: { en: 'procs is a modern replacement for the ps command that shows processes with color-coded columns, human-readable memory sizes, tree view of parent-child relationships, and keyword search. Makes it easy to find a specific process, check its memory usage, and understand how processes relate to each other.', zh: 'procs 是 ps 命令的现代替代品，显示进程时带彩色列、人类可读的内存大小、父子关系树形视图和关键词搜索。让你轻松找到特定进程、检查内存占用，以及理解进程间的关系。' }
  },
  'bottom': {
    tagline: { en: 'A customizable system monitor with graphs for CPU, memory, disk, and network', zh: '可定制的系统监控器，带 CPU、内存、磁盘和网络图表' },
    description: { en: 'bottom (btm) is a cross-platform graphical system monitor for the terminal with a highly customizable layout. Shows CPU, memory, disk, network, temperature, and process information with scrollable graphs. Configure which widgets to show and where — everything is keyboard-driven and the layout can be saved.', zh: 'bottom（btm）是终端的跨平台图形化系统监控器，布局高度可定制。带可滚动图表显示 CPU、内存、磁盘、网络、温度和进程信息。可配置显示哪些组件及其位置——完全键盘驱动，布局可保存。' }
  },

  // ── DATABASE ─────────────────────────────────────────────────────────────
  'pgcli': {
    tagline: { en: 'Connect to your PostgreSQL database with autocomplete and syntax highlighting', zh: '连接 PostgreSQL 数据库，带自动补全和语法高亮' },
    description: { en: 'pgcli is a PostgreSQL client with smart autocomplete that suggests table names, column names, and SQL keywords as you type. It syntax-highlights your queries and the results, shows multi-line query history, and handles large result sets gracefully. A much more productive way to explore and query a Postgres database than the standard psql.', zh: 'pgcli 是带智能自动补全的 PostgreSQL 客户端，在你输入时自动建议表名、列名和 SQL 关键字。语法高亮查询和结果，显示多行查询历史，优雅处理大量结果。比标准 psql 探索和查询 Postgres 数据库高效得多。' }
  },
  'mycli': {
    tagline: { en: 'Connect to your MySQL database with smart autocomplete and syntax highlighting', zh: '连接 MySQL 数据库，带智能自动补全和语法高亮' },
    description: { en: 'mycli is a MySQL and MariaDB client with intelligent autocomplete for table names, column names, and SQL syntax. It colors your queries and results, keeps a searchable history, and makes navigating large tables easier. A much friendlier way to work with MySQL than the built-in mysql command.', zh: 'mycli 是 MySQL 和 MariaDB 客户端，对表名、列名和 SQL 语法有智能自动补全。高亮显示查询和结果，保留可搜索的历史记录，更易于浏览大型表。比内置 mysql 命令友好得多。' }
  },
  'litecli': {
    tagline: { en: 'Work with SQLite databases interactively — with autocomplete and a friendly interface', zh: '交互式操作 SQLite 数据库——带自动补全和友好界面' },
    description: { en: 'litecli is an interactive SQLite client with autocomplete, syntax highlighting, and a query history. SQLite is used everywhere — in mobile apps, browsers, local tools, and embedded systems. litecli makes it easy to inspect any SQLite database file, run queries, and explore schema without writing a script.', zh: 'litecli 是带自动补全、语法高亮和查询历史的交互式 SQLite 客户端。SQLite 无处不在——移动应用、浏览器、本地工具和嵌入式系统都在用。litecli 让你轻松检查任意 SQLite 数据库文件、运行查询、探索 schema，无需编写脚本。' }
  },
  'usql': {
    tagline: { en: 'Connect to any database — PostgreSQL, MySQL, SQLite, and 50+ more — with one tool', zh: '一个工具连接任意数据库——PostgreSQL、MySQL、SQLite 及 50+ 种' },
    description: { en: 'usql is a universal command-line client that works with PostgreSQL, MySQL, SQLite, Microsoft SQL Server, Oracle, MongoDB, Redis, and 50+ other databases using the same interface and commands. AI agents use it to query any database without needing to know which specific CLI to use — one tool handles them all.', zh: 'usql 是一个通用命令行客户端，用相同的界面和命令支持 PostgreSQL、MySQL、SQLite、Microsoft SQL Server、Oracle、MongoDB、Redis 和 50+ 种其他数据库。AI Agent 用它查询任意数据库，无需知道该用哪个特定 CLI——一个工具搞定所有。' }
  },
  'redis-cli': {
    tagline: { en: 'The official tool to interact with your Redis database — get, set, and inspect data', zh: 'Redis 官方命令行工具——读写数据、检查缓存状态' },
    description: { en: 'redis-cli is the official command-line interface for Redis — the in-memory database used for caching, session storage, and real-time data. Connect to any Redis server to get and set keys, inspect data structures, monitor commands in real time, run Lua scripts, and troubleshoot performance issues.', zh: 'redis-cli 是 Redis 的官方命令行界面——Redis 是用于缓存、会话存储和实时数据的内存数据库。连接任意 Redis 服务器以读写键值、检查数据结构、实时监控命令、运行 Lua 脚本并排查性能问题。' }
  },
  'mongosh': {
    tagline: { en: 'The official MongoDB shell — query collections, run scripts, and manage your database', zh: 'MongoDB 官方 Shell——查询集合、运行脚本、管理数据库' },
    description: { en: 'mongosh is the official modern shell for MongoDB — the popular document database used for flexible, schema-free data storage. Connect to any MongoDB instance to query collections with JavaScript, inspect documents, create indexes, run aggregation pipelines, and manage users and settings. Supports both local and cloud Atlas deployments.', zh: 'mongosh 是 MongoDB 的现代官方 Shell——MongoDB 是流行的文档数据库，用于灵活的无 schema 数据存储。连接任意 MongoDB 实例，用 JavaScript 查询集合、检查文档、创建索引、运行聚合管道，以及管理用户和设置。支持本地和云端 Atlas 部署。' }
  },
  'pscale': {
    tagline: { en: 'Manage PlanetScale databases with Git-like branching — branch, merge, and deploy schema changes', zh: '用类 Git 分支管理 PlanetScale 数据库——分支、合并、部署 Schema 变更' },
    description: { en: 'PlanetScale is a MySQL-compatible database platform that brings Git-like branching to database schemas — you can create a branch of your schema, make changes, and merge them without downtime. The CLI manages all of this from your terminal: create database branches, open deploy requests for schema changes, and connect to databases securely.', zh: 'PlanetScale 是一个 MySQL 兼容的数据库平台，将类 Git 分支引入数据库 schema——你可以创建 schema 分支，进行变更，然后无停机合并。CLI 在终端管理所有这些：创建数据库分支、为 schema 变更开启部署请求，以及安全连接数据库。' }
  },
  'turso': {
    tagline: { en: 'Create and manage SQLite databases that run at the edge — close to your users, worldwide', zh: '创建和管理运行在边缘节点的 SQLite 数据库——离用户更近，遍布全球' },
    description: { en: 'Turso runs SQLite databases on servers distributed around the world, close to your users — read queries are answered from the nearest server in milliseconds. The CLI creates and manages these databases: create new databases, replicate to new regions, manage access tokens, and execute SQL queries — all from your terminal.', zh: 'Turso 在分布于全球各地的服务器上运行 SQLite 数据库，让读取查询从最近的服务器毫秒级响应。CLI 创建和管理这些数据库：创建新数据库、复制到新区域、管理访问令牌，以及执行 SQL 查询——全部在终端完成。' }
  },

  // ── MEDIA ────────────────────────────────────────────────────────────────
  'ffmpeg': {
    tagline: { en: 'Convert, compress, trim, and process any video or audio file from the terminal', zh: '在终端转换、压缩、剪切和处理任意视频或音频文件' },
    description: { en: 'FFmpeg is the most powerful and widely used media processing tool in existence. It converts between any video and audio format, compresses videos for web, trims clips, extracts audio, adds subtitles, adjusts resolution, and processes streams — all from the command line. AI agents use it to automate video editing and transcoding pipelines.', zh: 'FFmpeg 是世界上最强大、使用最广泛的媒体处理工具。它能在任意视频和音频格式间转换、压缩视频用于网络、剪切片段、提取音频、添加字幕、调整分辨率，以及处理流媒体——全部通过命令行完成。AI Agent 用它自动化视频编辑和转码流水线。' }
  },
  'yt-dlp': {
    tagline: { en: 'Download videos and audio from YouTube, Vimeo, Twitter, and 1,000+ other sites', zh: '从 YouTube、Vimeo、Twitter 及 1000+ 个网站下载视频和音频' },
    description: { en: 'yt-dlp downloads video and audio from almost any website — YouTube, Vimeo, Twitter, TikTok, Bilibili, and over 1,000 other platforms. Choose the quality and format, download playlists, extract audio only, add metadata, and embed subtitles. AI agents use it to retrieve media content as part of research and processing pipelines.', zh: 'yt-dlp 几乎能从任意网站下载视频和音频——YouTube、Vimeo、Twitter、TikTok、Bilibili 及 1000+ 个平台。选择画质和格式、下载播放列表、仅提取音频、添加元数据并嵌入字幕。AI Agent 用它在研究和处理流水线中获取媒体内容。' }
  },
  'imagemagick': {
    tagline: { en: 'Resize, convert, and transform images in bulk from your terminal — no photo editor needed', zh: '在终端批量调整、转换和处理图片——不需要图片编辑器' },
    description: { en: 'ImageMagick is a powerful command-line image processing tool that can resize, crop, rotate, convert between formats (JPG, PNG, WebP, GIF, PDF, and hundreds more), apply filters, add watermarks, and generate images programmatically. AI agents use it to process screenshots, resize thumbnails, and automate image transformation pipelines.', zh: 'ImageMagick 是强大的命令行图像处理工具，可以调整大小、裁剪、旋转、在格式间转换（JPG、PNG、WebP、GIF、PDF 及数百种更多格式）、应用滤镜、添加水印，以及以编程方式生成图像。AI Agent 用它处理截图、调整缩略图大小，以及自动化图像转换流水线。' }
  },
  'viu': {
    tagline: { en: 'View images directly inside your terminal — no need to open a separate viewer', zh: '直接在终端中查看图片，无需打开单独的图片查看器' },
    description: { en: 'viu displays images inline in your terminal using modern protocols (iTerm2, Kitty) or Unicode half-blocks as a fallback. Supports JPEG, PNG, GIF, and even animated GIFs. Useful for quickly previewing images during development, in CI pipelines, or when working over SSH where opening a GUI is not practical.', zh: 'viu 使用现代协议（iTerm2、Kitty）或 Unicode 半块字符作为回退，在终端内联显示图片。支持 JPEG、PNG、GIF，甚至动态 GIF。适合在开发过程中快速预览图片、在 CI 流水线中使用，或在通过 SSH 工作时——这些情况下打开 GUI 不切实际。' }
  },
  'chafa': {
    tagline: { en: 'Display images and animations in any terminal — even ones that do not support graphics', zh: '在任意终端显示图片和动画——即使不支持图形协议也没问题' },
    description: { en: 'chafa converts images and videos to text-based representations that can display in any terminal — using Unicode block elements, Braille characters, or even pure ASCII. Unlike viu, it works in every terminal without special protocol support. Great for displaying images over SSH, in scripts, and in CI/CD pipelines.', zh: 'chafa 将图片和视频转换为文本表示，可以在任意终端显示——使用 Unicode 块状元素、盲文字符甚至纯 ASCII。与 viu 不同，它无需特殊协议支持即可在任何终端中工作。非常适合通过 SSH 显示图片、在脚本中使用，以及在 CI/CD 流水线中使用。' }
  },
  'elevenlabs': {
    tagline: { en: 'Convert text to realistic AI speech, clone voices, and transcribe audio from the terminal', zh: '在终端将文字转为真实 AI 语音、克隆声音、转录音频' },
    description: { en: 'ElevenLabs makes some of the most realistic AI-generated voices available. The CLI lets you convert any text to speech using pre-built or custom voices, clone a voice from an audio sample, transcribe audio files to text, and manage your ElevenLabs account — all from the terminal. AI agents use it to add voice output to automated workflows.', zh: 'ElevenLabs 提供目前最逼真的 AI 生成语音。CLI 让你在终端用预设或自定义声音将任意文字转为语音、从音频样本克隆声音、将音频文件转录为文字，以及管理 ElevenLabs 账户。AI Agent 用它为自动化工作流添加语音输出。' }
  },

  // ── FUN ──────────────────────────────────────────────────────────────────
  'lolcat': {
    tagline: { en: 'Add rainbow colors to any terminal output — pipe anything through it', zh: '给任意终端输出添加彩虹色——万物皆可彩虹' },
    description: { en: 'lolcat takes any text piped to it and outputs it with a smooth rainbow color gradient. Pipe the output of any command through lolcat to add color — it works great with figlet, cowsay, or any text output. A beloved terminal tradition that makes serious scripts look slightly less serious.', zh: 'lolcat 接收任意管道传入的文本，以平滑的彩虹渐变色输出。将任何命令的输出通过管道传给 lolcat 即可添加彩色——与 figlet、cowsay 或任意文本输出搭配效果极佳。深受喜爱的终端传统，让严肃的脚本看起来没那么严肃。' }
  },
  'cowsay': {
    tagline: { en: 'Make an ASCII cow (or any animal) say any message in your terminal', zh: '让 ASCII 奶牛（或任意动物）在终端说出任意消息' },
    description: { en: 'cowsay generates an ASCII art picture of a cow with a speech bubble containing your message. Works with dozens of other characters (penguins, dragons, etc.) and pairs perfectly with lolcat for colorful output. A classic terminal joke tool and a fun way to display important messages in scripts and CI pipelines.', zh: 'cowsay 生成一张带有说话气泡的 ASCII 奶牛图案，气泡中显示你的消息。支持数十种其他角色（企鹅、龙等），与 lolcat 搭配效果绝佳。经典的终端恶搞工具，也是在脚本和 CI 流水线中以有趣方式展示重要消息的好方法。' }
  },
  'cmatrix': {
    tagline: { en: 'Turn your terminal into the falling-code screensaver from The Matrix', zh: '把终端变成《黑客帝国》里的字符瀑布屏保' },
    description: { en: 'cmatrix fills your terminal with the scrolling green characters made famous by The Matrix movie — perfect as a screensaver while you wait for long builds or just to look impressive in front of non-technical colleagues. Customizable colors and scroll speed. No actual hacking included.', zh: 'cmatrix 用《黑客帝国》电影中那标志性的滚动绿色字符填满终端——等待漫长构建时的完美屏保，或者只是在非技术同事面前显得很酷。可自定义颜色和滚动速度。不含实际黑客技能。' }
  },
  'sl': {
    tagline: { en: 'A prank for mistyping "ls" — a steam locomotive drives across your screen', zh: '"ls" 打错时的整蛊——一列蒸汽火车驶过你的屏幕' },
    description: { en: 'sl (Steam Locomotive) is a classic Unix prank: if you mistype "ls" as "sl", instead of a file listing you get a fully animated ASCII art steam train chugging across your terminal. Created in 1993 to cure the bad habit of mistyping commands. Still delightful after 30 years.', zh: 'sl（蒸汽机车）是经典的 Unix 整蛊程序：如果把 "ls" 误打成 "sl"，不会显示文件列表，而是一列完整的 ASCII 蒸汽火车动画缓缓驶过你的终端。创作于 1993 年，用来纠正误打命令的坏习惯。30 年后依然令人愉快。' }
  },
  'fastfetch': {
    tagline: { en: 'Display your system info with a colorful logo — fast, maintained, and highly customizable', zh: '以彩色 Logo 展示系统信息——快速、活跃维护、高度可定制' },
    description: { en: 'fastfetch displays your system information (OS, kernel, CPU, GPU, RAM, shell, and more) alongside an ASCII or image logo in your terminal — similar to neofetch but significantly faster and actively maintained. Highly customizable via a JSON config file. Commonly used in screenshots to show off a terminal setup.', zh: 'fastfetch 在终端将系统信息（操作系统、内核、CPU、GPU、内存、Shell 等）与 ASCII 或图片 Logo 并排显示——类似 neofetch 但明显更快且持续维护。通过 JSON 配置文件高度可定制。常用于截图展示终端配置。' }
  },
  'figlet': {
    tagline: { en: 'Turn any text into giant ASCII art letters — great for banners and announcements', zh: '把任意文字变成巨大的 ASCII 艺术字——适合横幅和公告' },
    description: { en: 'figlet converts text into large ASCII art using a variety of fonts. Pipe text through figlet to create banners for script output, README headers, or terminal announcements. Combine with lolcat for rainbow-colored ASCII art. Supports hundreds of fonts for different visual styles.', zh: 'figlet 使用多种字体将文字转换为大型 ASCII 艺术字。将文字通过管道传给 figlet，为脚本输出、README 标题或终端公告创建横幅。与 lolcat 组合可生成彩虹色 ASCII 艺术字。支持数百种不同视觉风格的字体。' }
  },

  // ── CLOUD ────────────────────────────────────────────────────────────────
  'firebase-tools': {
    tagline: { en: 'Deploy and manage your Firebase app — hosting, database, functions, and auth from the terminal', zh: '在终端部署和管理 Firebase 应用——托管、数据库、函数和认证' },
    description: { en: 'Firebase is Google\'s platform for building apps — it provides a real-time database, user authentication, file storage, serverless Cloud Functions, and web hosting all in one. The Firebase CLI deploys and manages everything from your terminal: publish your website, deploy backend functions, set up Firestore rules, and run local emulators for testing.', zh: 'Firebase 是 Google 为构建应用提供的平台——集实时数据库、用户认证、文件存储、无服务器 Cloud Functions 和 Web 托管于一体。Firebase CLI 在终端部署和管理一切：发布网站、部署后端函数、设置 Firestore 规则，以及运行本地模拟器进行测试。' }
  },
  'doctl': {
    tagline: { en: 'Create and manage DigitalOcean servers, databases, and Kubernetes clusters from the terminal', zh: '在终端创建和管理 DigitalOcean 服务器、数据库和 Kubernetes 集群' },
    description: { en: 'DigitalOcean is a cloud provider known for affordable, developer-friendly servers (Droplets), managed databases, Kubernetes clusters, and object storage. doctl is the official CLI that manages all DigitalOcean resources from your terminal: create servers, set up databases, deploy Kubernetes apps, manage DNS, and automate your entire infrastructure.', zh: 'DigitalOcean 是以亲民价格和开发者友好著称的云服务商，提供服务器（Droplets）、托管数据库、Kubernetes 集群和对象存储。doctl 是官方 CLI，在终端管理所有 DigitalOcean 资源：创建服务器、配置数据库、部署 Kubernetes 应用、管理 DNS，以及自动化整个基础设施。' }
  },
  'heroku': {
    tagline: { en: 'Deploy and manage web apps on Heroku — scale dynos, tail logs, and manage add-ons from the terminal', zh: '在终端部署和管理 Heroku 应用——扩缩容、查看日志、管理插件' },
    description: { en: 'Heroku is a cloud platform for deploying and running web apps with minimal DevOps overhead — it handles servers, scaling, and infrastructure automatically. The Heroku CLI manages everything from your terminal: create apps, deploy via git push, scale web processes (dynos), stream live logs, run one-off commands, and manage add-ons like databases and caches.', zh: 'Heroku 是以最少运维开销部署和运行 Web 应用的云平台——自动处理服务器、扩缩容和基础设施。Heroku CLI 在终端管理一切：创建应用、通过 git push 部署、扩缩容 Web 进程（dynos）、实时查看日志、运行临时命令，以及管理数据库和缓存等插件。' }
  },
  'pulumi': {
    tagline: { en: 'Define and deploy cloud infrastructure using TypeScript, Python, or Go — no YAML required', zh: '用 TypeScript、Python 或 Go 定义和部署云基础设施——不需要写 YAML' },
    description: { en: 'Pulumi is an Infrastructure as Code tool that lets you define cloud resources (servers, databases, networks, storage) using real programming languages instead of YAML or custom DSLs. Write TypeScript, Python, Go, or C# to deploy to AWS, Azure, GCP, and 100+ other providers. AI agents can use it to create and modify entire cloud environments programmatically.', zh: 'Pulumi 是一个基础设施即代码工具，让你用真正的编程语言（而非 YAML 或自定义 DSL）定义云资源（服务器、数据库、网络、存储）。用 TypeScript、Python、Go 或 C# 部署到 AWS、Azure、GCP 和 100+ 其他提供商。AI Agent 可用它以编程方式创建和修改整个云环境。' }
  },
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
