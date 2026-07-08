import { Router, type IRouter } from "express";

const router: IRouter = Router();

// Stats overview
router.get("/stats", (_req, res) => {
  res.json({
    students: 3842,
    teachers: 247,
    filieres: 18,
    classes: 64,
    inscriptions: 412,
    paiementsJour: 38,
    montantEncaisse: 2_850_000,
    studentsTrend: +5.2,
    teachersTrend: +1.6,
    inscriptionsTrend: +8.1,
    montantTrend: +12.4,
  });
});

// Enrollment chart — last 12 months
router.get("/enrollments/chart", (_req, res) => {
  const months = [
    "Août", "Sep", "Oct", "Nov", "Déc", "Jan",
    "Fév", "Mar", "Avr", "Mai", "Juin", "Juil",
  ];
  const data = [312, 298, 275, 260, 240, 410, 385, 352, 330, 290, 260, 412];
  res.json(months.map((mois, i) => ({ mois, inscriptions: data[i] })));
});

// Revenue chart — last 12 months
router.get("/revenue/chart", (_req, res) => {
  const months = [
    "Août", "Sep", "Oct", "Nov", "Déc", "Jan",
    "Fév", "Mar", "Avr", "Mai", "Juin", "Juil",
  ];
  const scolarite = [
    1_800_000, 1_650_000, 1_500_000, 1_400_000, 1_200_000, 2_400_000,
    2_200_000, 2_000_000, 1_850_000, 1_650_000, 1_450_000, 2_850_000,
  ];
  const autres = [
    320_000, 290_000, 260_000, 240_000, 200_000, 410_000,
    380_000, 350_000, 320_000, 290_000, 260_000, 430_000,
  ];
  res.json(months.map((mois, i) => ({ mois, scolarite: scolarite[i], autres: autres[i] })));
});

// Recently enrolled students
router.get("/students/recent", (_req, res) => {
  res.json([
    { id: "ETU-2024-001", nom: "Koné Aminata", filiere: "Génie Informatique", classe: "L1-GI-A", date: "2024-07-07", statut: "Actif" },
    { id: "ETU-2024-002", nom: "Diallo Mamadou", filiere: "Gestion des Entreprises", classe: "L1-GE-B", date: "2024-07-07", statut: "Actif" },
    { id: "ETU-2024-003", nom: "Traoré Fatoumata", filiere: "Droit des Affaires", classe: "L2-DA-A", date: "2024-07-06", statut: "Actif" },
    { id: "ETU-2024-004", nom: "Coulibaly Ibrahim", filiere: "Génie Civil", classe: "L1-GC-A", date: "2024-07-06", statut: "Actif" },
    { id: "ETU-2024-005", nom: "Ouédraogo Marie", filiere: "Santé Publique", classe: "L3-SP-B", date: "2024-07-05", statut: "Actif" },
    { id: "ETU-2024-006", nom: "Sané Ibrahima", filiere: "Génie Informatique", classe: "L2-GI-A", date: "2024-07-05", statut: "En attente" },
    { id: "ETU-2024-007", nom: "Bah Aïssatou", filiere: "Sciences Économiques", classe: "L1-SE-C", date: "2024-07-04", statut: "Actif" },
    { id: "ETU-2024-008", nom: "Camara Seydou", filiere: "Génie Électrique", classe: "L1-GE-A", date: "2024-07-04", statut: "Actif" },
  ]);
});

// Recent payments
router.get("/payments/recent", (_req, res) => {
  res.json([
    { ref: "PAY-2024-0412", etudiant: "Koné Aminata", type: "Scolarité", montant: 450_000, date: "07/07/2024", statut: "Validé" },
    { ref: "PAY-2024-0411", etudiant: "Diallo Mamadou", type: "Scolarité", montant: 450_000, date: "07/07/2024", statut: "Validé" },
    { ref: "PAY-2024-0410", etudiant: "Traoré Fatoumata", type: "Frais divers", montant: 75_000, date: "07/07/2024", statut: "Validé" },
    { ref: "PAY-2024-0409", etudiant: "Coulibaly Ibrahim", type: "Scolarité", montant: 450_000, date: "07/07/2024", statut: "En attente" },
    { ref: "PAY-2024-0408", etudiant: "Ouédraogo Marie", type: "Scolarité", montant: 380_000, date: "07/07/2024", statut: "Validé" },
    { ref: "PAY-2024-0407", etudiant: "Sané Ibrahima", type: "Inscription", montant: 50_000, date: "07/07/2024", statut: "Validé" },
    { ref: "PAY-2024-0406", etudiant: "Bah Aïssatou", type: "Scolarité", montant: 450_000, date: "07/07/2024", statut: "Rejeté" },
    { ref: "PAY-2024-0405", etudiant: "Camara Seydou", type: "Scolarité", montant: 450_000, date: "07/07/2024", statut: "Validé" },
  ]);
});

// Calendar events
router.get("/events", (_req, res) => {
  res.json([
    { id: 1, titre: "Rentrée académique 2024-2025", date: "2024-09-02", type: "Académique", description: "Début de l'année universitaire" },
    { id: 2, titre: "Examens de mi-semestre", date: "2024-11-11", type: "Examen", description: "Sessions d'examens pour tous les niveaux" },
    { id: 3, titre: "Conseil d'administration", date: "2024-07-15", type: "Administratif", description: "Réunion du CA - Salle des délibérations" },
    { id: 4, titre: "Journée portes ouvertes", date: "2024-07-20", type: "Événement", description: "Accueil des futurs étudiants" },
    { id: 5, titre: "Clôture des inscriptions L1", date: "2024-07-31", type: "Inscription", description: "Date limite d'inscription en Licence 1" },
    { id: 6, titre: "Soutenance de thèses", date: "2024-08-20", type: "Académique", description: "Soutenances Doctorat — Amphithéâtre A" },
    { id: 7, titre: "Réunion pédagogique", date: "2024-07-10", type: "Administratif", description: "Réunion du corps enseignant" },
  ]);
});

// Academic years list (for filter)
router.get("/academic-years", (_req, res) => {
  res.json([
    { value: "2024-2025", label: "2024-2025 (En cours)" },
    { value: "2023-2024", label: "2023-2024" },
    { value: "2022-2023", label: "2022-2023" },
    { value: "2021-2022", label: "2021-2022" },
  ]);
});

export default router;
