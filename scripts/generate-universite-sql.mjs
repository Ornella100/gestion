import { readFileSync, mkdirSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const modulesTs = readFileSync(join(root, 'artifacts/api-server/src/routes/modules.ts'), 'utf8');
const seedData = JSON.parse(readFileSync(join(root, 'artifacts/university-dashboard/public/seedData.json'), 'utf8'));

const moduleArrays = {
  etudiants: 'etudiants',
  enseignants: 'enseignants',
  filieres: 'filieres',
  classes: 'classes',
  inscriptions: 'inscriptions',
  paiements: 'paiements',
  notifications_data: 'notifications',
  taux_reussite: 'rapport_taux_reussite',
  repartition_genre: 'rapport_genre',
  evolution_effectifs: 'rapport_evolution',
  evenements: 'evenements',
};

const dashboardResources = {
  dashboard_stats: seedData.stats,
  dashboard_enrollments_chart: seedData.enrollmentsChart,
  dashboard_revenue_chart: seedData.revenueChart,
  dashboard_students_recent: seedData.recentStudents,
  dashboard_payments_recent: seedData.recentPayments,
  dashboard_events: seedData.events,
  academic_years: seedData.academicYears,
};

function extractArray(source, name) {
  const marker = `const ${name} = [`;
  const start = source.indexOf(marker);
  if (start === -1) throw new Error(`Array not found: ${name}`);
  const arrayStart = source.indexOf('[', start);
  let depth = 0;
  let end = arrayStart;
  for (; end < source.length; end++) {
    const char = source[end];
    if (char === '[') depth++;
    if (char === ']') depth--;
    if (depth === 0) break;
  }
  const literal = source.slice(arrayStart, end + 1);
  return Function(`return (${literal});`)();
}

function tableName(name) {
  return name.replace(/[^a-z0-9_]/gi, '_').toLowerCase();
}

function sqlString(value) {
  return `'${String(value).replace(/\\/g, '\\\\').replace(/'/g, "''")}'`;
}

function keyFor(row, index) {
  return row.matricule ?? row.code ?? row.ref ?? row.id ?? row.value ?? row.filiere ?? row.name ?? `row-${index + 1}`;
}

const resources = {};
for (const [sourceName, destinationName] of Object.entries(moduleArrays)) {
  resources[destinationName] = extractArray(modulesTs, sourceName);
}
for (const [name, value] of Object.entries(dashboardResources)) {
  resources[name] = Array.isArray(value) ? value : [value];
}

let sql = `CREATE DATABASE IF NOT EXISTS universite CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;\nUSE universite;\n\n`;

const legacyTables = [
  'product_images',
  'product_specs',
  'product_features',
  'products',
  'site_pages',
];

for (const table of legacyTables) {
  sql += `DROP TABLE IF EXISTS ${table};\n`;
}

for (const name of Object.keys(resources)) {
  const table = tableName(name);
  sql += `DROP TABLE IF EXISTS ${table};\n`;
}

sql += `\n`;

for (const [name, rows] of Object.entries(resources)) {
  const table = tableName(name);
  sql += `CREATE TABLE ${table} (\n  id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,\n  resource_key VARCHAR(120) NOT NULL,\n  payload JSON NOT NULL,\n  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,\n  INDEX idx_${table}_resource_key (resource_key)\n) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;\n\n`;
  rows.forEach((row, index) => {
    sql += `INSERT INTO ${table} (resource_key, payload) VALUES (${sqlString(keyFor(row, index))}, ${sqlString(JSON.stringify(row))});\n`;
  });
  sql += `\n`;
}

mkdirSync(join(root, 'database'), { recursive: true });
writeFileSync(join(root, 'database/universite.sql'), sql, 'utf8');
console.log(`Generated database/universite.sql with ${Object.keys(resources).length} tables.`);


