const API_BASE_URL = import.meta.env.VITE_API_BASE_URL ?? '/api';

function buildUrl(path: string, params?: Record<string, string>): string {
  const base = API_BASE_URL.replace(/\/$/, '');
  const url = new URL(`${base}${path}`, window.location.origin);
  Object.entries(params ?? {}).forEach(([key, value]) => url.searchParams.set(key, value));
  return url.toString();
}

export async function fetchApi<T>(path: string, params?: Record<string, string>): Promise<T> {
  const response = await fetch(buildUrl(path, params), { headers: { Accept: 'application/json' } });
  if (!response.ok) throw new Error(`API locale indisponible: ${response.status}`);
  return (await response.json()) as T;
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

export interface EnrollmentPoint { mois: string; inscriptions: number; }
export interface RevenuePoint { mois: string; scolarite: number; autres: number; }
export interface Student { id: string; nom: string; filiere: string; classe: string; date: string; statut: string; }
export interface Payment { ref: string; etudiant: string; type: string; montant: number; date: string; statut: string; }
export interface CalendarEvent { id: number; titre: string; date: string; type: string; description: string; }
export interface AcademicYear { value: string; label: string; }

export function formatAmount(n: number): string {
  return new Intl.NumberFormat('fr-FR').format(n) + ' FCFA';
}
