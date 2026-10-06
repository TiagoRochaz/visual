// O override permite compilar com tooling externo em volumes virtualizados (Drive).
const { spawnSync } = require('node:child_process');
const path = require('node:path');
const root = path.resolve(__dirname, '../..');
const cli = process.env.TAILWIND_CLI || require.resolve('tailwindcss/lib/cli.js', { paths: [root] });
const result = spawnSync(process.execPath, [cli, '-c', 'tailwind.config.cjs', '-i', 'tailwind-input.css',
    '-o', 'assets/tailwind.css', '--minify'], { cwd: root, stdio: 'inherit' });
if (result.error) throw result.error;
process.exitCode = result.status ?? 1;
