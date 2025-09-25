#!/bin/bash

PORT=3457 pm2 start $(which claude-code-webui) --name claude-code-webui && pm2 save
echo 'Go to: https://3457-<YOUR_SANDBOX_ID>.proxy.daytona.works/projects/root/your-project to access Claude Code Web UI.'