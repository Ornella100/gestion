import { createReadStream } from 'node:fs';
import { join } from 'node:path';
import { spawn } from 'node:child_process';

const root = join(import.meta.dirname, '..');
const mysqlBin = process.env.MYSQL_BIN ?? 'C:\\xampp\\mysql\\bin\\mysql.exe';
const sqlFile = join(root, 'database', 'universite.sql');

const mysql = spawn(mysqlBin, ['-u', process.env.DB_USERNAME ?? 'root'], {
  cwd: root,
  stdio: ['pipe', 'inherit', 'inherit'],
});

createReadStream(sqlFile).pipe(mysql.stdin);

mysql.on('exit', (code) => {
  if (code === 0) {
    console.log('Base universite importée dans XAMPP/MySQL.');
    return;
  }

  process.exitCode = code ?? 1;
});
