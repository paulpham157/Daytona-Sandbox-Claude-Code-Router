import { Daytona, CreateSandboxFromSnapshotParams, VolumeMount, CreateSandboxFromImageParams, CreateSnapshotParams, Image, Resources } from '@daytonaio/sdk'
import dotenv from 'dotenv'
dotenv.config()


async function new_sandbox(
    {
        imageName = 'ubuntu:24.04',
        cpu = 4,
        memory = 8,
        disk = 10,
        daytonaApiKey = '',
        envs = {}
    }:
        {
            imageName: string,
            cpu: number,
            memory: number,
            disk: number,
            daytonaApiKey: string,
            envs: Record<string,
                string>
        }
): Promise<void> {
    const snapshotName = `${imageName}-${cpu}vcpu-${memory}ram-${disk}gb`
    const daytona = new Daytona({
        apiKey: daytonaApiKey,
        apiUrl: 'https://app.daytona.io/api',
        target: 'us'
    });

    const volumeName = "volume_" + daytonaApiKey.slice(0, 3) + '_' + daytonaApiKey.slice(-4, -1);

    let volume: any;
    try {
        volume = await daytona.volume.get(volumeName);
    } catch (error) {
        if (error?.message?.includes("not found") || error?.response?.status === 404) {
            volume = null;
        } else {
            console.error("Error: ", error);
        }
    }

    if (!volume) {
        console.log(`Volume ${volumeName} does not exist. Creating new volume...`);
        volume = await daytona.volume.get(volumeName, true);
        while (volume.state !== 'ready') {
            await new Promise(resolve => setTimeout(resolve, 1000));
            volume = await daytona.volume.get(volumeName, true);
        }
    }

    const mountVolume: VolumeMount[] = [
        {
            volumeId: volume.id,
            mountPath: `/root/${volumeName}`
        }
    ];

    let targetSnapshot: any;
    try {
        targetSnapshot = await daytona.snapshot.get(snapshotName);
    } catch (error) {
        if (error?.message?.includes("not found") || error?.response?.status === 404) {
            targetSnapshot = null;
        } else {
            console.error("Error: ", error);
        }
    }

    if (targetSnapshot) {
        console.log(`Snapshot ${targetSnapshot.name} is in state ${targetSnapshot.state}`);
        if (targetSnapshot.state !== 'active') {
            console.log(`Snapshot ${targetSnapshot.name} is not activated. Activating snapshot...`);
            await daytona.snapshot.activate(targetSnapshot);
        }
    } else {
        console.log(`Snapshot ${snapshotName} does not exist. Creating new snapshot...`);

        const targetResources: Resources = {
            cpu: cpu,
            memory: memory,
            disk: disk,
        }
        const targetSnapshotParams: CreateSnapshotParams = {
            name: snapshotName,
            image: imageName,
            resources: targetResources
        }
        targetSnapshot = await daytona.snapshot.create(targetSnapshotParams, { onLogs: console.log, timeout: 86400 });

        if (targetSnapshot.state !== 'active') {
            console.log(`Activating snapshot ${targetSnapshot.name}...`);
            await daytona.snapshot.activate(targetSnapshot);
        }
    }

    const params: CreateSandboxFromSnapshotParams = {
        language: 'python',
        snapshot: targetSnapshot.name,
        envVars: {
            ...envs
        },
        labels: {
            'who': volumeName
        },
        volumes: mountVolume,
        public: true,
        networkAllowList: '0.0.0.0/0',
        networkBlockAll: false,
        ephemeral: false,
        autoStopInterval: 0,
        autoArchiveInterval: 0,
        autoDeleteInterval: -1
    };

    try {
        const sandbox = await daytona.create(params, { timeout: 86400 });
        await sandbox.fs.createFolder("your-project", "755")
        console.log(`
        Remember that you can use Daytona sandbox Preview link to access the localhost web server:
        https://<YOUR_PORT>-<YOUR_SANDBOX_ID>.proxy.daytona.works
        equivalent to
        http://localhost:<YOUR_PORT>
        when you running your project in local.
        Example:
        https://3000-${sandbox.id}.proxy.daytona.works
        `)
        console.log('Installing dependencies... ')
        await sandbox.process.executeCommand(`
            apt update && \
            apt upgrade -y && \
            apt install ca-certificates gnupg curl htop wget nano git locales -y && \
            locale-gen vi_VN.UTF-8 && \
            update-locale LANG=vi_VN.UTF-8 LC_ALL=vi_VN.UTF-8 && \
            curl -LsSf https://astral.sh/uv/install.sh | sh && \
            curl -fsSL https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.5/install.sh | bash && \
            echo 'Installed dependencies!'
        `)

        await sandbox.process.executeCommand(`
        cat << 'EOF' >> ~/.bashrc
        alias specify="uvx --from git+https://github.com/github/spec-kit.git specify"
        export ANTHROPIC_BASE_URL=http://127.0.0.1:3456
        export ANTHROPIC_API_KEY=\${API_KEY_FAKE}
        export CLAUDE_HIDE_STARTUP_INFO=true
        export CLAUDE_QUIET_MODE=true
        export CLAUDE_CODE_QUIET_STARTUP=1
        export CLAUDE_SILENT_MODE=1
        export LANG=vi_VN.UTF-8
        export LC_ALL=vi_VN.UTF-8
        echo -e '
        \\e[31m
        ⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠐⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
        ⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣀⠤⢐⣒⣉⣉⣉⣉⣒⡲⢤⣀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
        ⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⡤⢊⣴⣾⣿⣿⣿⣿⣿⣿⣿⣿⣷⣌⡳⡄⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
        ⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣀⠀⠤⠤⠤⠞⣴⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣷⡜⣆⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
        ⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⡠⢖⣩⣴⣶⣾⣿⡇⢸⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣷⣈⣀⣒⡒⠢⢄⡀⠀⠀⠀⠀⠀
        ⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⡜⣡⣿⣿⣿⣿⣿⣿⡇⢸⣿⣿⣿⣿⣿⣿⣿⣿⠹⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣶⣍⠢⡄⠀⠀⠀
        ⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⡼⢰⣿⣿⣿⣿⣿⣿⣿⣇⠘⣿⣿⣿⣿⣿⣿⣿⣿⠇⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣷⡜⢆⠀⠀
        ⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⡇⣿⣿⣿⣿⣿⣿⣿⣿⣿⣦⣈⠛⠿⣿⣿⣿⡿⠋⣰⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⡜⣆⠀
        ⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢀⡠⠤⠾⢡⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣷⣶⣦⣤⣬⣶⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣷⢸⠀
        ⠀⡀⠀⠀⠀⠀⠀⠀⠀⠀⡠⢚⣡⣶⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⠈⡆
        ⠈⣟⠲⢄⡀⠀⠀⣀⠴⢋⣴⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⠟⣻⣶⣬⣽⣿⣿⣿⣿⣿⣿⣿⣿⠀⡇
        ⠀⠸⡄⣷⣬⣍⣭⣴⣾⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⠃⣼⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⡿⢸⠁
        ⠀⠀⢳⡸⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⠿⢿⠿⢿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⢸⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⢇⡎⠀
        ⠀⠀⠀⢣⠹⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⢟⣥⣶⣿⣿⣿⣶⣌⢻⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⠸⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⢋⡞⠀⠀
        ⠀⠀⠀⠀⠳⡙⢿⣿⣿⣿⣿⣿⣿⣿⠃⣾⣿⣿⣿⣿⣿⣿⣿⣾⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣧⡙⢿⣿⣿⣿⣿⣿⣿⠿⢋⡵⠋⠀⠀⠀
        ⠀⠀⠀⠀⠀⠈⠢⣙⠿⢿⣿⣿⣿⣿⡄⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣶⡮⣭⣉⡭⠭⠔⠚⠁⠀⡀⠀⢰⠀
        ⠀⠀⠀⠀⠀⠀⠀⠈⠙⠒⠲⠭⠭⠕⢣⡘⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⡟⣱⠁⠀⠀⠀⠀⠀⠀⠀⡇⠀⠀⠀
        ⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠘⠀⠀⠂⠀⠳⡙⢿⣿⣿⣿⣿⣿⣿⣿⣿⡿⢋⢧⡙⢿⣿⣿⣿⣿⣿⣿⣿⣿⠿⢋⠔⠁⠀⠀⠸⠀⠀⠘⠀⠀⠁⠀⠀⠀
        ⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠙⠢⣝⣛⠛⠛⠛⣛⣋⠥⠚⠁⠀⠉⠒⠬⢭⣛⣛⣛⣫⠭⠔⠊⠁⠀⢰⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
        ⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⡀⠀⢀⠀⠉⢉⠉⢁⠀⠀⠀⠀⠀⡀⠀⠀⠀⠀⢰⠀⠀⢀⠀⠀⡆⠀⠈⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
        ⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠁⠀⠈⠀⠀⠈⠀⠈⠀⠀⠠⠆⠀⠆⠀⠀⠀⠀⠈⠀⠀⠘⠀⠀⠃⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
        \\e[0m
        \\e[33m

        1. Hi, I guess this is your first time using this sandbox.
        2. Go to your-project folder.
        3. \(Optional\) command "specify init --here" to init your project spec-kit. Each project need 1 spec kit.
        Learn more: https:\/\/github.com\/github\/spec-kit
        4. Use command "claude" to use Claude Code CLI as normal.
        5. \(Optional\) use command "sh \~\/install-cc-webui.sh" to install Claude Code Web UI.
        Attention: claude-code-webui currently no built-in auth mechanism, so keep your sandbox id safe
        or integrate an additional layer of middleware security yourself.
        Otherwise, someone who knows your sandbox id can use your Claude WebUI code.
        Learn more: https:\/\/github.com\/sugyan\/claude-code-webui
        6. Command "bash" to see this message again. Or you will see this message again when next time ssh to this sandbox :\Đ.
        
        \\e[0m
        '
        ccr restart`)

        console.log('Installing Claude Code... you will see it done when ssh command appear.\n')
        await sandbox.process.executeCommand(`
            export NVM_DIR="$HOME/.nvm"
            [ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"
            [ -s "$NVM_DIR/bash_completion" ] && \. "$NVM_DIR/bash_completion"

            nvm install 20 && nvm use 20 && nvm alias default 20 && npm install -g pm2 pnpm @anthropic-ai/claude-code @musistudio/claude-code-router claude-code-webui -y && pm2 startup
        `)
        await sandbox.fs.createFolder(".claude-code-router", "755")
        await sandbox.fs.uploadFiles([
            {
                source: '.claude-code-router/config.json',
                destination: '/root/.claude-code-router/config.json'
            },
            {
                source: 'install-cc-webui.sh',
                destination: '/root/install-cc-webui.sh'
            }
        ], 86400)

        const ssh_access = await sandbox.createSshAccess(2147483647)
        console.log(`ssh ${ssh_access.token}@ssh.app.daytona.io`)
        console.log('\nAll done! Have fun :Đ')

        // console.log('Cloning timburgan repository...')
        // await sandbox.git.clone(
        //     'https://github.com/timburgan/timburgan.git',
        //     '/root/timburgan',
        // )
        // await sandbox.fs.uploadFiles([
        //     {
        //         source: 'timburgan-chess-prompt.md',
        //         destination: '/root/timburgan/timburgan-chess-prompt.md'
        //     }
        // ])

        // const sessions = await sandbox.process.listSessions();
        // for (const session of sessions) {
        //     console.log(`PID: ${session.sessionId}, Commands: ${session.commands}`);
        // }
        // const sessionId = "claude-code-chess";
        // try {
        //     await sandbox.process.createSession(sessionId);
        //     const session = await sandbox.process.getSession(sessionId);
        //     await sandbox.process.executeCommand('claude "/implement timburgan-chess-prompt.md"', '/root/timburgan', {}, 86400)
        //     // Trigger e2b sandbox to post process...
        // } catch (error) {
        //     console.error("Error: ", error)
        // } finally {
        //     // await sandbox.process.deleteSession();
        // }
    } catch (error) {
        console.error("Error: ", error)
    }
}


async function main() {
    await new_sandbox({
        imageName: process.env.IMAGE_NAME || 'ubuntu:24.04',
        cpu: parseInt(process.env.CPU || '4'),
        memory: parseInt(process.env.MEMORY || '8'),
        disk: parseInt(process.env.DISK || '10'),
        daytonaApiKey: process.env.DAYTONA_API_KEY || '',
        envs: {
            CCR_DEFAULT_MODEL: process.env.CCR_DEFAULT_MODEL || "gemini,gemini-2.5-flash",
            CCR_BACKGROUND_MODEL: process.env.CCR_BACKGROUND_MODEL || "gemini,gemini-2.5-flash",
            CCR_THINK_MODEL: process.env.CCR_THINK_MODEL || "gemini,gemini-2.5-pro",
            CCR_LONG_CONTEXT_MODEL: process.env.CCR_LONG_CONTEXT_MODEL || "gemini,gemini-2.5-pro",
            CCR_LONG_CONTEXT_THRESHOLD: process.env.CCR_LONG_CONTEXT_THRESHOLD || "2000000",
            CCR_WEB_SEARCH_MODEL: process.env.CCR_WEB_SEARCH_MODEL || "gemini,gemini-2.5-flash",
            CCR_IMAGE_MODEL: process.env.CCR_IMAGE_MODEL || "gemini,gemma-3-27b-it",
            E2B_API_KEY: process.env.E2B_API_KEY || '',
            GEMINI_API_KEY: process.env.GEMINI_API_KEY || '',
            GOOGLE_API_KEY: process.env.GOOGLE_API_KEY || '',
            OPENROUTER_API_KEY: process.env.OPENROUTER_API_KEY || '',
            GROQ_API_KEY: process.env.GROQ_API_KEY || '',
            PERPLEXITY_API_KEY: process.env.PERPLEXITY_API_KEY || '',
            API_KEY_FAKE: process.env.API_KEY_FAKE || 'hehehe'
        }
    })
}

main().catch(console.error)