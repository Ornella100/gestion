const { existsSync, rmSync } = require('fs');

['package-lock.json', 'yarn.lock'].forEach((file) => {
  if (existsSync(file)) {
    rmSync(file, { force: true });
  }
});

const userAgent = process.env.npm_config_user_agent || '';
if (!/^pnpm\//.test(userAgent)) {
  console.error('Use pnpm instead');
  process.exit(1);
}
