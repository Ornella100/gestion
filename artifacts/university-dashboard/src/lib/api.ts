const API_BASE = "/api";

export async function fetchApi<T>(path: string, params?: Record<string, string>): Promise<T> {
  const url = new URL(`${API_BASE}${path}`, window.location.origin);
  if (params) {
    Object.entries(params).forEach(([k, v]) => url.searchParams.set(k, v));
  }
  const res = await fetch(url.toString());
  if (!res.ok) throw new Error(`API error ${res.status}: ${path}`);
  return res.json() as Promise<T>;
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
