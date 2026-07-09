<?php
declare(strict_types=1);

header('Content-Type: application/json; charset=utf-8');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Accept');

if (($_SERVER['REQUEST_METHOD'] ?? 'GET') === 'OPTIONS') {
    echo json_encode(['ok' => true]);
    exit;
}

function database(): PDO
{
    $host = getenv('DB_HOST') ?: '127.0.0.1';
    $port = getenv('DB_PORT') ?: '3306';
    $name = getenv('DB_DATABASE') ?: 'universite';
    $user = getenv('DB_USERNAME') ?: 'root';
    $pass = getenv('DB_PASSWORD') ?: '';

    return new PDO("mysql:host={$host};port={$port};dbname={$name};charset=utf8mb4", $user, $pass, [
        PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
        PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
    ]);
}

function rows(PDO $db, string $table): array
{
    $statement = $db->query("SELECT payload FROM {$table} ORDER BY id");
    return array_map(static fn(array $row) => json_decode($row['payload'], true), $statement->fetchAll());
}

$routes = [
    '/api/dashboard/stats' => ['dashboard_stats', 'object'],
    '/api/dashboard/enrollments/chart' => ['dashboard_enrollments_chart', 'array'],
    '/api/dashboard/revenue/chart' => ['dashboard_revenue_chart', 'array'],
    '/api/dashboard/students/recent' => ['dashboard_students_recent', 'array'],
    '/api/dashboard/payments/recent' => ['dashboard_payments_recent', 'array'],
    '/api/dashboard/events' => ['dashboard_events', 'array'],
    '/api/dashboard/academic-years' => ['academic_years', 'array'],
    '/api/modules/etudiants' => ['etudiants', 'array'],
    '/api/modules/enseignants' => ['enseignants', 'array'],
    '/api/modules/filieres' => ['filieres', 'array'],
    '/api/modules/classes' => ['classes', 'array'],
    '/api/modules/inscriptions' => ['inscriptions', 'array'],
    '/api/modules/paiements' => ['paiements', 'array'],
    '/api/modules/notifications' => ['notifications', 'array'],
    '/api/modules/evenements' => ['evenements', 'array'],
    '/api/modules/rapports/taux-reussite' => ['rapport_taux_reussite', 'array'],
    '/api/modules/rapports/genre' => ['rapport_genre', 'array'],
    '/api/modules/rapports/evolution' => ['rapport_evolution', 'array'],
    '/api/schema' => [null, 'schema'],
];

$path = parse_url($_SERVER['REQUEST_URI'] ?? '/api/schema', PHP_URL_PATH) ?: '/api/schema';
if (!isset($routes[$path])) {
    http_response_code(404);
    echo json_encode(['error' => 'Route introuvable', 'path' => $path], JSON_UNESCAPED_UNICODE);
    exit;
}

try {
    [$table, $mode] = $routes[$path];
    if ($mode === 'schema') {
        echo json_encode(['database' => 'universite', 'tables' => array_values(array_unique(array_filter(array_column($routes, 0))))], JSON_UNESCAPED_UNICODE);
        exit;
    }

    $data = rows(database(), $table);
    echo json_encode($mode === 'object' ? ($data[0] ?? new stdClass()) : $data, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
} catch (Throwable $error) {
    http_response_code(500);
    echo json_encode(['error' => 'Erreur base universite', 'detail' => $error->getMessage()], JSON_UNESCAPED_UNICODE);
}
