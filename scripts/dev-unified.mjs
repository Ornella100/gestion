import { spawn } from 'node:child_process';
import { join } from 'node:path';

const root = join(import.meta.dirname, '..');
const isWindows = process.platform === 'win32';
const phpCommand = process.env.PHP_BIN ?? (isWindows ? 'C:\\xampp\\php\\php.exe' : 'php');
const webPort = process.env.WEB_PORT ?? '5174';

function commandConfig(command, args) {
  if (!isWindows) return { command, args };
  return { command: 'cmd.exe', args: ['/d', '/s', '/c', command, ...args] };
}

const processes = [
  {
    name: 'api',
    command: phpCommand,
    args: ['-S', 'localhost:8000', 'api/index.php'],
    cwd: root,
  },
  {
    name: 'web',
    command: isWindows ? 'pnpm.cmd' : 'pnpm',
    args: ['--dir', 'artifacts/university-dashboard', 'dev'],
    cwd: root,
  },
];

const children = processes.map(({ name, command, args, cwd }) => {
  const runnable = commandConfig(command, args);
  const child = spawn(runnable.command, runnable.args, {
    cwd,
    env: { ...process.env, PORT: name === 'web' ? webPort : process.env.PORT },
    stdio: ['ignore', 'pipe', 'pipe'],
  });

  child.stdout.on('data', (chunk) => process.stdout.write(`[${name}] ${chunk}`));
  child.stderr.on('data', (chunk) => process.stderr.write(`[${name}] ${chunk}`));
  child.on('exit', (code) => {
    if (code && code !== 0) {
      console.error(`[${name}] arrêté avec le code ${code}`);
      shutdown();
    }
  });

  return child;
});

function shutdown() {
  for (const child of children) {
    if (!child.killed) child.kill();
  }
}

process.on('SIGINT', () => {
  shutdown();
  process.exit(0);
});

process.on('SIGTERM', shutdown);
