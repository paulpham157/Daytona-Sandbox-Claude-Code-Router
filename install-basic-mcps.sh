#!/bin/bash

claude mcp add perplexity-mcp --scope user -- npx -y perplexity-mcp &&\
claude mcp add pointer -e MCP_POINTER_PORT=7007 --scope user -- npx -y @mcp-pointer/server@latest start  &&\
claude mcp add sequential-thinking --scope user -- npx -y @modelcontextprotocol/server-sequential-thinking &&\
claude mcp add filesystem -e MCP_FILESYSTEM_ROOT=/root --scope user -- npx -y @modelcontextprotocol/server-filesystem &&\
claude mcp add memory --scope user -- npx -y @modelcontextprotocol/server-memory

echo 'Installed basic MCP servers!'