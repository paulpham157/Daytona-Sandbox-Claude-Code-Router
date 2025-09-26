
# 🚀 Daytona Sandbox Claude Code Router

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Node.js](https://img.shields.io/badge/Node.js-43853D?logo=node.js&logoColor=white)](https://nodejs.org/)
[![Daytona](https://img.shields.io/badge/Daytona-Sandbox-blue)](https://daytona.io/)
[![Claude Code](https://img.shields.io/badge/Claude_Code-AI-orange)](https://claude.ai/)

**Multi-Provider AI Gateway** supporting 50+ models from:
[![OpenRouter](https://img.shields.io/badge/OpenRouter-50%2B_Models-green)](https://openrouter.ai/)
[![Gemini](https://img.shields.io/badge/Gemini-2.5_Pro-blue)](https://ai.google.dev/)
[![Groq](https://img.shields.io/badge/Groq-Ultra_Fast-orange)](https://groq.com/)
[![Perplexity](https://img.shields.io/badge/Perplexity-Web_Enhanced-purple)](https://perplexity.ai/)

<p align="center">
  <img src="https://raw.githubusercontent.com/paulpham157/daytona-sandbox-claude-code-router/main/assets/Daytona-Sandbox-Claude-Code-Router.png" alt="Daytona Sandbox Claude Code Router"/>
</p>

A Node.js/TypeScript application that creates and configures Daytona sandboxes with Claude Code Router - a multi-provider AI gateway for seamless access to various AI models and services.

## Overview

This project automates the creation of **cloud-based development sandboxes** using the Daytona platform. Each sandbox is a complete, isolated development environment that comes pre-configured with **Claude Code Router** - a sophisticated AI proxy that provides unified access to multiple AI providers including:

- **OpenRouter** - Access to 50+ open-source and commercial AI models
- **Google Gemini** - Latest Gemini 2.5 models with advanced reasoning capabilities
- **Groq** - High-speed inference with Llama and other models
- **Perplexity** - Web-enhanced AI models with real-time information
- **E2B** (TODO) - Planned AI code execution sandbox
- **Intelligent Routing** - Automatic model selection based on task type

## Key Features

- 🚀 **Automated Sandbox Creation** - Creates isolated cloud development environments
- 🔀 **Multi-Provider AI Gateway** - Unified access to 50+ AI models across providers
- 🧠 **Intelligent Model Routing** - Automatic selection based on task requirements:
  - **Default**: Fast responses for general coding tasks
  - **Background**: Efficient processing for batch operations
  - **Think**: Advanced reasoning for complex problems
  - **Long Context**: Extended context for large codebases
  - **Web Search**: Real-time information retrieval
  - **Image**: Vision and image understanding tasks
- 🔧 **Customizable Resources** - Configurable CPU, memory, and disk allocation
- 🌐 **SSH Access** - Secure SSH access to your sandbox environment
- 📦 **Volume Persistence** - Persistent storage across sandbox sessions with file sharing between sandboxes
- 🔄 **Environment Variables** - Flexible configuration via environment variables
- 🛠️ **Pre-installed Tools** - Complete development stack ready to use (including rsync for efficient file synchronization)
- 🌍 **Isolated Environment** - Your local machine remains unchanged

## Supported AI Providers

### OpenRouter (50+ Models)
- DeepSeek R1, Qwen 3, GLM-4, Llama 4, Mistral models
- Free tier models and premium options
- Latest open-source AI innovations

### Google Gemini
- Gemini 2.5 Flash/Pro for advanced reasoning
- Gemma 3 27B for lightweight tasks
- Vision and audio capabilities

### Groq
- Llama 4 Maverick/Scout models
- DeepSeek R1 Distill 70B
- Ultra-fast inference

### Perplexity
- Sonar models with web search
- Real-time information access
- Research and analysis capabilities

## Prerequisites

- **Node.js 20+ and npm** - For running the sandbox creator
- **Daytona API key** - Required for creating sandboxes
- **At least one LLM provider API key** - Required for AI functionality:
  - Google Gemini API key (recommended for beginners)
  - OpenRouter API key (recommended for maximum model access)
  - Groq API key (for fastest inference)
  - Perplexity API key (for web-enhanced AI)
- **Corresponding CCR environment variables** - Must match your chosen provider(s)

## Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/paulpham157/Daytona-Sandbox-Claude-Code-Router
   cd Daytona-Sandbox-Claude-Code-Router
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   Create a `.env` file based on `.env.example` and configure your API keys:
   ```bash
   cp .env.example .env
   ```

   Replace with your API keys.
   Required environment variables:
   - `DAYTONA_API_KEY` - Your Daytona platform API key
     - Get it from: https://app.daytona.io/dashboard/keys
   - `IMAGE_NAME` - Base image for sandbox (default: ubuntu:24.04)
   - `CPU` - CPU cores allocation (default: 4)
   - `MEMORY` - Memory in GB (default: 8)
   - `DISK` - Disk space in GB (default: 10)

   AI service API keys (⚠️ **Required: At least 1 LLM provider**):
   While optional individually, you must configure **at least one** of the following LLM providers:

   **Primary LLM Providers (choose at least one):**
   - `GEMINI_API_KEY` - Google Gemini API key
     - Get it from: https://aistudio.google.com/app/apikey
   - `OPENROUTER_API_KEY` - OpenRouter API key (recommended for 50+ models)
     - Get it from: https://openrouter.ai/settings/keys
   - `GROQ_API_KEY` - Groq API key
     - Get it from: https://console.groq.com/keys
   - `PERPLEXITY_API_KEY` - Perplexity API key
     - Get it from: https://www.perplexity.ai/account/api/keys

   **Additional Services (optional):**
   - `E2B_API_KEY` - E2B API key (TODO - Planned feature)
     - https://e2b.dev/docs

   **⚠️ Important**: Configure corresponding `CCR_*_MODEL` environment variables based on your chosen provider(s).

## Usage

### Basic Usage

1. **Start the application**
```bash
npm run dev
```

### API Keys Setup Guide

Before running the application, you'll need to obtain API keys from various providers:

#### 1. Daytona Platform API Key (Required)
1. Go to https://app.daytona.io/dashboard/keys
2. Sign in to your Daytona account, for new account, Daytona will give you $100 at https://app.daytona.io/dashboard/billing/wallet
3. Click "Create API Key" or use an existing one
4. Copy the API key and set it as `DAYTONA_API_KEY` in .env

#### 2. LLM Provider API Keys (⚠️ Required: Choose at least one)

**You must configure at least one of the following LLM providers:**

**Option 1: Google Gemini (Recommended for beginners):**
1. Visit https://aistudio.google.com/app/apikey
2. Sign in with your Google account
3. Click "Create API key"
4. Copy the API key and set it as `GEMINI_API_KEY`
5. **Configure CCR variables in .env**:
   ```bash
   export CCR_DEFAULT_MODEL="gemini,gemini-2.5-flash"
   export CCR_THINK_MODEL="gemini,gemini-2.5-pro"
   ...
   ```

**Option 2: OpenRouter (Recommended for maximum model access):**
1. Go to https://openrouter.ai/settings/keys
2. Sign up or sign in to OpenRouter
3. Navigate to "API Keys" section
4. Create a new API key and set it as `OPENROUTER_API_KEY`
5. **Configure CCR variables in .env** (example with DeepSeek):
   ```bash
   export CCR_DEFAULT_MODEL="openrouter,deepseek/deepseek-r1"
   export CCR_THINK_MODEL="openrouter,deepseek/deepseek-r1"
   ...
   ```

**Option 3: Groq (For fastest inference):**
1. Visit https://console.groq.com/keys
2. Sign up or sign in to Groq
3. Go to "API Keys" in your dashboard
4. Generate a new API key and set it as `GROQ_API_KEY`
5. **Configure CCR variables in .env**:
   ```bash
   export CCR_DEFAULT_MODEL="groq,llama-3.3-70b-versatile"
   export CCR_THINK_MODEL="groq,deepseek-r1-distill-llama-70b"
   ```

**Option 4: Perplexity (For web-enhanced AI):**
1. Go to https://www.perplexity.ai/account/api/keys
2. Sign in to your Perplexity account
3. Navigate to "API" settings
4. Create an API key and set it as `PERPLEXITY_API_KEY`
5. **Configure CCR variables in .env**:
   ```bash
   export CCR_DEFAULT_MODEL="perplexity,sonar"
   export CCR_WEB_SEARCH_MODEL="perplexity,sonar-pro"
   ```

#### 3. Additional Services (Optional)

**E2B API Key (TODO - Planned Feature):**
1. Visit https://e2b.dev/docs
2. ⚠️ **Note**: E2B integration is currently planned but not yet implemented

**💡 Pro Tips:**
- **OpenRouter** gives you access to 50+ models with a single API key
- **Gemini** is free tier available for basic usage
- **Mix providers** by setting different models for different CCR variables
- **Check your chosen provider** supports the models you specify in CCR variables

2. **The application will:**
   - Create or retrieve a persistent volume for data storage
   - Create or activate a snapshot with your specified resources
   - Configure the sandbox with essential development tools
   - Install and configure Claude Code Router with multi-provider support
   - Set up intelligent AI model routing based on task types
   - Install system monitoring tools including lsof and htop
   - Copy MCP installation scripts for optional enhanced AI capabilities
   - Configure environment variables for all supported AI providers
   - Provide secure SSH access to your sandbox

### Configuration Options

Customize sandbox resources by setting environment variables:

```bash
# High-performance sandbox
export CPU=8
export MEMORY=8
export DISK=10
npm run dev

# Minimal sandbox
export CPU=1
export MEMORY=1
export DISK=5
npm run dev
```

## Sandbox Features

Once your sandbox is created, you'll have access to a fully configured development environment with:

### Pre-installed Tools in this Daytona Sandbox
The following tools are automatically installed and configured in your Daytona sandbox:

- **🟢 uv** - Fast Python package installer and resolver (latest version)
- **🟢 nvm** - Node.js version manager with Node.js 20 pre-installed
- **🟢 git** - Version control system with SSH keys configured
- **🟢 rsync** - Fast, versatile file copying tool for efficient data synchronization
- **🟢 lsof** - LiSt Open Files - Essential tool for monitoring file access and network connections
- **🟢 Claude Code** - AI-powered coding assistant (latest version)
- **🟢 pm2** - Advanced process manager for Node.js applications
- **🟡 claude-code-webui** - Web interface for Claude Code (optional, install with `sh ~/install-cc-webui.sh`)

**Note**: These tools are installed **inside the sandbox**, not on your local machine. The sandbox provides a complete, isolated development environment.

### Basic MCP (Model Context Protocol) Servers
The following MCP servers can be installed in your Daytona sandbox using the included script:

- **🟡 perplexity-mcp** - Web search and real-time information retrieval
- **🟡 pointer** - Browser automation and web interaction capabilities
- **🟡 sequential-thinking** - Enhanced reasoning and step-by-step problem solving
- **🟡 filesystem** - File system access and manipulation (root at `/root`)
- **🟡 memory** - Persistent memory and knowledge graph functionality

**Installation**: Run `sh ~/install-basic-mcps.sh` inside your sandbox to install these MCP servers.

### AI Router Configuration
The Claude Code Router is pre-configured with intelligent routing:

- **Default Model**: Gemini 2.5 Flash (balanced speed and quality)
- **Background Model**: Gemini 2.5 Flash (efficient for batch processing)
- **Thinking Model**: Gemini 2.5 Pro (advanced reasoning for complex tasks)
- **Long Context Model**: Gemini 2.5 Pro (extended context for large codebases)
- **Web Search Model**: Gemini 2.5 Flash (with real-time web access)
- **Image Model**: Gemma 3 27B (vision and image understanding)

### Multi-Provider Access
- **OpenRouter**: Access to 50+ cutting-edge AI models
- **Gemini**: Google's latest models with vision/audio capabilities
- **Groq**: Ultra-fast inference with Llama 4 and DeepSeek models
- **Perplexity**: Web-enhanced models for research and analysis
- **Other Providers**: You can setup in `~/.claude-code-router/config.json`

### MCP Server Capabilities
The included MCP servers provide advanced functionality for enhanced AI development:

- **🧠 Perplexity MCP**: Real-time web search and information retrieval
- **🖱️ Pointer**: Browser automation, screenshot capture, and web interaction
- **🧩 Sequential Thinking**: Step-by-step reasoning and complex problem decomposition
- **📁 Filesystem**: Direct file system access and manipulation capabilities
- **🧠 Memory**: Persistent memory storage and knowledge graph management

**Usage**: After installing with `sh ~/install-basic-mcps.sh`, these MCP servers will be available when using Claude Code in your sandbox. You can reference them in your conversations and they will provide enhanced capabilities for web browsing, file management, complex reasoning, and persistent memory.

### Sandbox Environment Setup
Your sandbox is pre-configured with the following environment:

- **🌐 Vietnamese locale (vi_VN.UTF-8)** - Vietnamese language support in terminal
- **⚙️ Custom bash configurations** - Optimized .bashrc with useful aliases
- **🔒 SSL certificates & packages** - Essential system dependencies pre-installed
- **📁 rsync** - Fast file synchronization and copying tool
- **🔍 lsof** - LiSt Open Files - Monitor file access, network connections, and system resources
- **🛠️ Development-optimized settings** - Ready-to-code environment

**Example aliases available in sandbox:**
- `specify` → `uvx --from git+https://github.com/github/spec-kit.git specify`
- `claude` → Direct access to Claude Code via Claude Code Router
- Vietnamese locale settings and custom ASCII art banner

### Volume Storage and File Sharing
Your sandbox includes a **persistent volume** that allows you to:

#### **📦 Persistent Storage**
- **Data persistence** - Files remain available across sandbox sessions
- **Volume naming** - Automatically named based on your API key: `volume_{first3chars}_{last3chars}`
- **Mount location** - Available at `~/volume_*` directory in your sandbox

#### **🔄 File Sharing Between Sandboxes**
You can share files and configurations between multiple sandboxes:

**Example workflow:**
```bash
# In sandbox 1 - Save configuration files
cp ~/.bashrc ~/volume_abc_def/
cp ~/.claude-code-router/config.json ~/volume_abc_def/

# In sandbox 2 - Access shared files
cp ~/volume_abc_def/.bashrc ~/
cp ~/volume_abc_def/config.json ~/.claude-code-router/
```

**Common use cases:**
- **Share project templates** between different development environments
- **Backup configuration files** (dotfiles, settings, scripts)
- **Transfer data** between sandboxes with different resource allocations
- **Collaborate** by sharing code and resources across team sandboxes

**Note**: The volume is tied to your Daytona API key, so all sandboxes created with the same API key will share the same persistent volume.

## Accessing Your Sandbox

After creation, you'll receive SSH access information:
```bash
ssh <access-token>@ssh.app.daytona.io
```

### Inside Your Sandbox Environment

Once connected to your sandbox, you'll have access to all pre-installed tools:

1. **Navigate to your project folder**: `cd your-project`
2. **Install Basic MCP servers (optional)**: `sh ~/install-basic-mcps.sh`
   - **🧠 Enhanced AI capabilities** with web search, browser automation, and memory
3. **Use persistent volume for file sharing**: `ls ~/volume_*`
   - **📦 Share files between sandboxes** using the persistent volume
   - **💾 Backup configurations** and important files to persistent storage
4. **Monitor system resources**: `lsof` and `htop`
   - **🔍 Check file access** and network connections with `lsof`
   - **📊 Monitor processes** and system performance with `htop`
5. **Initialize with spec-kit (optional)**: `specify init --here`
6. **Start coding with AI assistance**: `claude`
   - **🧠 Intelligent model routing** based on your task
   - **🌐 Multi-provider access** to 50+ AI models
   - **⚡ Automatic optimization** for speed vs quality
7. **Install Claude Code Web UI (optional)**: `sh ~/install-cc-webui.sh`
8. **Customize settings**: Edit `nano ~/.claude-code-router/config.json`

### Sandbox vs Local Machine

| Feature | Local Machine | Daytona Sandbox |
|---------|---------------|-----------------|
| **uv (Python)** | ❌ Install manually | ✅ Pre-installed |
| **nvm (Node.js)** | ❌ Install manually | ✅ Pre-installed (Node.js 20) |
| **Claude Code** | ❌ Install manually | ✅ Pre-installed & configured |
| **rsync** | ❌ Install manually | ✅ Pre-installed |
| **lsof** | ❌ Install manually | ✅ Pre-installed |
| **AI Router** | ❌ Setup required | ✅ Pre-configured |
| **Vietnamese locale** | ❌ Manual setup | ✅ Pre-configured |
| **Development tools** | ❌ Individual installs | ✅ All pre-installed |
| **MCP Servers** | ❌ Manual installation | 🟡 Script available |

**Note**: All tools and configurations are **sandbox-specific**. Your local machine remains unchanged.

## API Reference

### Environment Variables

| Variable | Description | Default | Required |
|----------|-------------|---------|----------|
| `DAYTONA_API_KEY` | Daytona platform API key | - | Yes |
| `IMAGE_NAME` | Base Docker image | `ubuntu:24.04` | No |
| `CPU` | CPU cores | `4` | No |
| `MEMORY` | Memory in GB | `8` | No |
| `DISK` | Disk space in GB | `10` | No |


### Claude Code Router Configuration

| Variable | Description | Default | Purpose |
|----------|-------------|---------|---------|
| `CCR_DEFAULT_MODEL` | Default AI model | `gemini,gemini-2.5-flash` | General coding tasks |
| `CCR_BACKGROUND_MODEL` | Background processing model | `gemini,gemini-2.5-flash` | Batch operations |
| `CCR_THINK_MODEL` | Advanced reasoning model | `gemini,gemini-2.5-pro` | Complex problem solving |
| `CCR_LONG_CONTEXT_MODEL` | Long context model | `gemini,gemini-2.5-pro` | Large codebases |
| `CCR_LONG_CONTEXT_THRESHOLD` | Context threshold | `2000000` | Token limit for long context |
| `CCR_WEB_SEARCH_MODEL` | Web search model | `gemini,gemini-2.5-flash` | Real-time information |
| `CCR_IMAGE_MODEL` | Vision model | `gemini,gemma-3-27b-it` | Image understanding |

### AI Provider API Keys

| Variable | Description | Provider | Features |
|----------|-------------|----------|----------|
| `GEMINI_API_KEY` | Google Gemini API key | Google AI | Vision, audio, reasoning |
| `OPENROUTER_API_KEY` | OpenRouter API key | OpenRouter | 50+ AI models access |
| `GROQ_API_KEY` | Groq API key | Groq | Ultra-fast inference |
| `PERPLEXITY_API_KEY` | Perplexity API key | Perplexity | Web search & research |
| `E2B_API_KEY` | E2B API key | E2B | Code execution sandbox |
| `API_KEY_FAKE` | Placeholder API key | Local | For Claude Code Router |

## Troubleshooting

### Common Issues

1. **API Key Errors**
   - Ensure all required API keys are properly set in `.env`
   - Check that Daytona API key has sufficient permissions

2. **Resource Allocation Errors**
   - Verify your Daytona account has enough resources allocated, not reaching limited value
   - Try reducing CPU/Memory/Disk values if creation fails, you can delete old sandbox to reducing

3. **SSH Connection Issues**
   - Check firewall settings
   - Ensure SSH access token is correct
   - Try regenerating SSH access in Daytona dashboard Web UI

4. **Volume and File Sharing Issues**
   - **Volume not found**: Check that you're using the correct API key - volumes are tied to API keys
   - **Files not persisting**: Ensure you're saving files to `~/volume_*` directory, not just `~/`
   - **Permission issues**: Files in volume should have proper permissions (755 for directories, 644 for files)
   - **Sharing between sandboxes**: All sandboxes created with the same API key share the same volume
   - **Volume size limits**: Monitor your volume usage in Daytona dashboard if files aren't saving

4. **API Key Issues**
   - **No LLM Provider Configured**: You must set at least one of: `GEMINI_API_KEY`, `OPENROUTER_API_KEY`, `GROQ_API_KEY`, or `PERPLEXITY_API_KEY`
   - **Invalid API Key**: Double-check that you've copied the complete API key
   - **API Key not working**: Ensure the API key has the correct permissions
   - **Missing CCR Configuration**: Set corresponding `CCR_*_MODEL` variables for your chosen provider
   - **Model not supported**: Verify your chosen provider supports the specified models in CCR variables
   - **Rate limits**: Some providers have rate limits, try again later
   - **Region restrictions**: Some APIs may have geographic restrictions
   - **API key format**: Ensure no extra spaces or characters in your `.env` file

### Debug Mode

Enable verbose logging by setting:
```bash
export DEBUG=true
npm run dev
```

## Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit your changes: `git commit -m 'Add amazing feature'`
4. Push to the branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

## License

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.

### MIT License

```
MIT License

Copyright (c) 2025 Daytona Sandbox Claude Code Router

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```

### Third-Party Licenses
This project integrates several open-source components, each with their own licenses:

#### Proprietary Software
- **Daytona Platform**: Proprietary license (daytona.io)
- **Claude Code**: Proprietary license (Anthropic, anthropic.com)
- **Google Gemini API**: Proprietary license (Google AI, ai.google.dev)

#### Terms of Service
- **OpenRouter**: Terms of Service (openrouter.ai/terms)
- **Groq**: Terms of Service (console.groq.com/docs/legal)
- **Perplexity**: Terms of Service (www.perplexity.ai/hub/legal/perplexity-api-terms-of-service) (www.perplexity.ai/hub/legal/perplexity-api-terms-of-service-search)
- **E2B** (TODO): Planned integration - Terms of Service (e2b.dev/terms)

#### Open Source Licenses
- **All Node.js dependencies**: MIT/BSD/Apache 2.0 licenses (see individual projects)
- **System tools**: Various GPL/LGPL/MIT licenses
- **AI models**: Individual model licenses (see provider documentation)

**Note**: Users are responsible for complying with the terms of service and licenses of all integrated services and APIs.

## Planned Features (TODO)

This section outlines features that are planned for future development:

### 🔄 E2B Integration
- **AI Code Execution Sandbox**: Enable secure code execution within AI conversations
- **Interactive Code Testing**: Run and test code snippets directly from Claude Code
- **Sandbox Security**: Isolated execution environment for untrusted code
- **Status**: Environment variable configured but implementation pending

### 🚀 Additional AI Providers
- Support for more AI model providers as they become available
- Custom provider configurations
- Provider failover mechanisms

### 🔧 Enhanced Sandbox Features
- Custom Docker image support
- Advanced resource monitoring
- Sandbox sharing and collaboration features

### 📊 Analytics & Monitoring
- Usage analytics for AI providers
- Performance monitoring
- Cost optimization recommendations

---

**Note**: Users are responsible for complying with the terms of service and licenses of all integrated services and APIs.

## Support

For support and questions:
- Create an issue in the repository
- Check the Daytona documentation: https://docs.daytona.io
- Review Claude Code documentation: https://docs.anthropic.com/claude
- Claude Code Router repository: https://github.com/musistudio/claude-code-router
- AI Provider documentation:
  - OpenRouter: https://openrouter.ai/docs/quickstart
  - Google Gemini: https://ai.google.dev/docs
  - Groq: https://console.groq.com/docs/overview
  - Perplexity: https://docs.perplexity.ai/getting-started/overview

## Architecture

```
┌─────────────────┐    ┌─────────────────┐
│   Daytona       │    │   AI Providers  │
│   Sandbox       │───▶│   - OpenRouter  │
│                 │    │   - Gemini      │
│   + Tools       │    │   - Groq        │
│   + Claude Code │    │   - Perplexity  │
│   + Router      │    │                 │
└─────────────────┘    └─────────────────┘
```

## Credits & Dependencies

This project integrates and builds upon several open-source projects and services:

### Core Dependencies
- **[@daytonaio/sdk](https://www.daytona.io/docs/en/typescript-sdk/)** - Official Daytona SDK for sandbox management
- **[dotenv](https://github.com/motdotla/dotenv)** - Environment variable loading
- **[tsx](https://github.com/esbuild-kit/tsx)** - TypeScript execution for Node.js
- **[TypeScript](https://github.com/microsoft/TypeScript)** - TypeScript compiler and tooling

### AI & Development Tools
- **[Claude Code](https://github.com/anthropics/claude-code)** - AI-powered coding assistant by Anthropic
- **[claude-code-router](https://github.com/musistudio/claude-code-router)** - Multi-provider AI gateway
- **[claude-code-webui](https://github.com/sugyan/claude-code-webui)** - Web interface for Claude Code
- **[uv](https://github.com/astral-sh/uv)** - Fast Python package installer and resolver
- **[nvm](https://github.com/nvm-sh/nvm)** - Node.js version manager
- **[spec-kit](https://github.com/github/spec-kit)** - GitHub's specification toolkit

### AI Providers
- **[OpenRouter](https://openrouter.ai/)** - Unified API for 50+ AI models
- **[Google Gemini](https://ai.google.dev/)** - Advanced reasoning and multimodal AI
- **[Groq](https://groq.com/)** - Ultra-fast AI inference platform
- **[Perplexity](https://perplexity.ai/)** - Web-enhanced AI search and research
- **[E2B](https://e2b.dev/)** (TODO) - Planned AI code execution sandbox

### System Tools
- **[PM2](https://pm2.keymetrics.io/)** - Advanced Node.js process manager
- **[Git](https://git-scm.com/)** - Distributed version control system
- **[Rsync](https://rsync.samba.org/)** - Fast, versatile file copying tool
- **[lsof](https://linux.die.net/man/8/lsof)** - LiSt Open Files utility for file and network monitoring
- **[Ubuntu](https://ubuntu.com/)** - Base container image
- **[Curl](https://curl.se/)** - Command line tool for transferring data
- **[Nano](https://nano-editor.org/)** - Simple text editor
- **[Htop](https://htop.dev/)** - Interactive process viewer
- **[Locales](https://wiki.debian.org/Locale)** - System localization support

### Special Thanks
- **Daytona Team** for the excellent cloud development platform
- **Anthropic** for Claude AI and Claude Code
- **OpenRouter** for democratizing access to AI models
- **All open-source contributors** who made this project possible

---

**Happy coding with AI!** 🚀🤖
