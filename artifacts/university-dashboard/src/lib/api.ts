// Load mock data from local JSON file instead of API
let mockDataCache: Record<string, unknown> | null = null;

async function loadMockData() {
  if (!mockDataCache) {
    const res = await fetch("/mockData.json");
    if (!res.ok) throw new Error(`Failed to load mock data: ${res.status}`);
    mockDataCache = await res.json();
  }
  return mockDataCache;
}

export async function fetchApi<T>(path: string, params?: Record<string, string>): Promise<T> {
  const data = await loadMockData();
  
  // Map API paths to mock data keys
  const pathMap: Record<string, string> = {
    "/dashboard/stats": "stats",
    "/dashboard/enrollments/chart": "enrollmentsChart",
    "/dashboard/revenue/chart": "revenueChart",
    "/dashboard/students/recent": "recentStudents",
    "/dashboard/payments/recent": "recentPayments",
    "/dashboard/events": "events",
    "/dashboard/academic-years": "academicYears",
    "/modules/etudiants": "etudiants",
    "/modules/enseignants": "enseignants",
    "/modules/filieres": "filieres",
    "/modules/classes": "classes",
  };
  
  const key = pathMap[path];
  if (!key || !(key in data)) {
    throw new Error(`Mock data not found for path: ${path}`);
  }
  
  return data[key] as T;
}

export interface Stats {
  students: number;
  teachers: number;
  filieres: number;
  classes: number;
  inscriptions: number;
  paiementsJour: number;
  montantEncaisse: number;
  studentsTrend: number;
  teachersTrend: number;
  inscriptionsTrend: number;
  montantTrend: number;
}

export interface EnrollmentPoint {
  mois: string;
  inscriptions: number;
}

export interface RevenuePoint {
  mois: string;
  scolarite: number;
  autres: number;
}

export interface Student {
  id: string;
  nom: string;
  filiere: string;
  classe: string;
  date: string;
  statut: string;
}

export interface Payment {
  ref: string;
  etudiant: string;
  type: string;
  montant: number;
  date: string;
  statut: string;
}

export interface CalendarEvent {
  id: number;
  titre: string;
  date: string;
  type: string;
  description: string;
}

export interface AcademicYear {
  value: string;
  label: string;
}

export function formatAmount(n: number): string {
  return new Intl.NumberFormat("fr-FR").format(n) + " FCFA";
}
