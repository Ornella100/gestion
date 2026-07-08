import { Router, type IRouter } from "express";
const router: IRouter = Router();

/* ─── ÉTUDIANTS ─── */
const etudiants = [
  { matricule:"ETU-2024-001", nom:"Koné", prenom:"Aminata", email:"a.kone@univ.ci", telephone:"+225 07 00 00 001", genre:"F", filiere:"Génie Informatique", filiereCode:"GI", classe:"L1-GI-A", niveau:"L1", annee_entree:2024, statut:"Actif", date_inscription:"07/07/2024" },
  { matricule:"ETU-2024-002", nom:"Diallo", prenom:"Mamadou", email:"m.diallo@univ.ci", telephone:"+225 07 00 00 002", genre:"M", filiere:"Gestion des Entreprises", filiereCode:"GE", classe:"L1-GE-B", niveau:"L1", annee_entree:2024, statut:"Actif", date_inscription:"07/07/2024" },
  { matricule:"ETU-2024-003", nom:"Traoré", prenom:"Fatoumata", email:"f.traore@univ.ci", telephone:"+225 07 00 00 003", genre:"F", filiere:"Droit des Affaires", filiereCode:"DA", classe:"L2-DA-A", niveau:"L2", annee_entree:2023, statut:"Actif", date_inscription:"06/07/2024" },
  { matricule:"ETU-2024-004", nom:"Coulibaly", prenom:"Ibrahim", email:"i.coulibaly@univ.ci", telephone:"+225 07 00 00 004", genre:"M", filiere:"Génie Civil", filiereCode:"GC", classe:"L1-GC-A", niveau:"L1", annee_entree:2024, statut:"Actif", date_inscription:"06/07/2024" },
  { matricule:"ETU-2024-005", nom:"Ouédraogo", prenom:"Marie", email:"m.ouedraogo@univ.ci", telephone:"+225 07 00 00 005", genre:"F", filiere:"Santé Publique", filiereCode:"SP", classe:"L3-SP-B", niveau:"L3", annee_entree:2022, statut:"Actif", date_inscription:"05/07/2024" },
  { matricule:"ETU-2024-006", nom:"Sané", prenom:"Ibrahima", email:"i.sane@univ.ci", telephone:"+225 07 00 00 006", genre:"M", filiere:"Génie Informatique", filiereCode:"GI", classe:"L2-GI-A", niveau:"L2", annee_entree:2023, statut:"En attente", date_inscription:"05/07/2024" },
  { matricule:"ETU-2024-007", nom:"Bah", prenom:"Aïssatou", email:"a.bah@univ.ci", telephone:"+225 07 00 00 007", genre:"F", filiere:"Sciences Économiques", filiereCode:"SE", classe:"L1-SE-C", niveau:"L1", annee_entree:2024, statut:"Actif", date_inscription:"04/07/2024" },
  { matricule:"ETU-2024-008", nom:"Camara", prenom:"Seydou", email:"s.camara@univ.ci", telephone:"+225 07 00 00 008", genre:"M", filiere:"Génie Électrique", filiereCode:"GEL", classe:"L1-GEL-A", niveau:"L1", annee_entree:2024, statut:"Actif", date_inscription:"04/07/2024" },
  { matricule:"ETU-2024-009", nom:"Sylla", prenom:"Kadiatou", email:"k.sylla@univ.ci", telephone:"+225 07 00 00 009", genre:"F", filiere:"Marketing", filiereCode:"MKT", classe:"L2-MKT-A", niveau:"L2", annee_entree:2023, statut:"Suspendu", date_inscription:"03/07/2024" },
  { matricule:"ETU-2024-010", nom:"Barry", prenom:"Thierno", email:"t.barry@univ.ci", telephone:"+225 07 00 00 010", genre:"M", filiere:"Génie Informatique", filiereCode:"GI", classe:"L3-GI-A", niveau:"L3", annee_entree:2022, statut:"Actif", date_inscription:"03/07/2024" },
  { matricule:"ETU-2024-011", nom:"Cissé", prenom:"Mariam", email:"m.cisse@univ.ci", telephone:"+225 07 00 00 011", genre:"F", filiere:"Lettres & Langues", filiereCode:"LAL", classe:"L1-LAL-A", niveau:"L1", annee_entree:2024, statut:"Actif", date_inscription:"02/07/2024" },
  { matricule:"ETU-2024-012", nom:"Doumbia", prenom:"Bakary", email:"b.doumbia@univ.ci", telephone:"+225 07 00 00 012", genre:"M", filiere:"Gestion des Entreprises", filiereCode:"GE", classe:"L3-GE-A", niveau:"L3", annee_entree:2022, statut:"Inactif", date_inscription:"01/07/2024" },
  { matricule:"ETU-2024-013", nom:"Fofana", prenom:"Awa", email:"a.fofana@univ.ci", telephone:"+225 07 00 00 013", genre:"F", filiere:"Sciences Économiques", filiereCode:"SE", classe:"L2-SE-A", niveau:"L2", annee_entree:2023, statut:"Actif", date_inscription:"01/07/2024" },
  { matricule:"ETU-2024-014", nom:"Kouyaté", prenom:"Moussa", email:"m.kouyate@univ.ci", telephone:"+225 07 00 00 014", genre:"M", filiere:"Droit des Affaires", filiereCode:"DA", classe:"L1-DA-A", niveau:"L1", annee_entree:2024, statut:"En attente", date_inscription:"30/06/2024" },
  { matricule:"ETU-2024-015", nom:"Sanogo", prenom:"Oumou", email:"o.sanogo@univ.ci", telephone:"+225 07 00 00 015", genre:"F", filiere:"Santé Publique", filiereCode:"SP", classe:"L2-SP-A", niveau:"L2", annee_entree:2023, statut:"Actif", date_inscription:"30/06/2024" },
];

/* ─── ENSEIGNANTS ─── */
const enseignants = [
  { matricule:"ENS-001", nom:"Dr. Ouattara", prenom:"Ibrahim", email:"i.ouattara@univ.ci", telephone:"+225 05 00 00 001", specialite:"Algorithmique & Structures de données", grade:"Maître-assistant", statut:"Permanent", nb_ue:3, nb_heures:180, filieres:["GI","GEL"] },
  { matricule:"ENS-002", nom:"Prof. Koné", prenom:"Aminata", email:"a.kone2@univ.ci", telephone:"+225 05 00 00 002", specialite:"Droit commercial et des affaires", grade:"Professeur", statut:"Permanent", nb_ue:4, nb_heures:240, filieres:["DA"] },
  { matricule:"ENS-003", nom:"Dr. Traoré", prenom:"Seydou", email:"s.traore@univ.ci", telephone:"+225 05 00 00 003", specialite:"Économie générale & Macro-économie", grade:"Maître-assistant", statut:"Permanent", nb_ue:3, nb_heures:180, filieres:["SE","GE"] },
  { matricule:"ENS-004", nom:"Dr. Bamba", prenom:"Fatoumata", email:"f.bamba@univ.ci", telephone:"+225 05 00 00 004", specialite:"Réseaux & Systèmes distribués", grade:"Assistant", statut:"Permanent", nb_ue:2, nb_heures:120, filieres:["GI"] },
  { matricule:"ENS-005", nom:"M. Coulibaly", prenom:"Lamine", email:"l.coulibaly@univ.ci", telephone:"+225 05 00 00 005", specialite:"Résistance des matériaux", grade:"Assistant", statut:"Vacataire", nb_ue:2, nb_heures:96, filieres:["GC"] },
  { matricule:"ENS-006", nom:"Prof. Diallo", prenom:"Mariama", email:"m.diallo2@univ.ci", telephone:"+225 05 00 00 006", specialite:"Épidémiologie & Santé communautaire", grade:"Professeur", statut:"Permanent", nb_ue:4, nb_heures:240, filieres:["SP"] },
  { matricule:"ENS-007", nom:"Dr. Keita", prenom:"Adama", email:"a.keita@univ.ci", telephone:"+225 05 00 00 007", specialite:"Électronique de puissance", grade:"Maître-assistant", statut:"Permanent", nb_ue:3, nb_heures:180, filieres:["GEL"] },
  { matricule:"ENS-008", nom:"M. Sanogo", prenom:"Boubacar", email:"b.sanogo@univ.ci", telephone:"+225 05 00 00 008", specialite:"Marketing digital & E-commerce", grade:"Assistant", statut:"Vacataire", nb_ue:2, nb_heures:96, filieres:["MKT","GE"] },
  { matricule:"ENS-009", nom:"Dr. Camara", prenom:"Hawa", email:"h.camara@univ.ci", telephone:"+225 05 00 00 009", specialite:"Linguistique & Littérature française", grade:"Maître-assistant", statut:"Permanent", nb_ue:3, nb_heures:180, filieres:["LAL"] },
  { matricule:"ENS-010", nom:"Prof. Sylla", prenom:"Mamadou", email:"m.sylla@univ.ci", telephone:"+225 05 00 00 010", specialite:"Géotechnique & Fondations", grade:"Professeur", statut:"Permanent", nb_ue:3, nb_heures:180, filieres:["GC"] },
  { matricule:"ENS-011", nom:"Mme. Barry", prenom:"Kadiatou", email:"k.barry@univ.ci", telephone:"+225 05 00 00 011", specialite:"Comptabilité & Finance d'entreprise", grade:"Assistant", statut:"Vacataire", nb_ue:2, nb_heures:120, filieres:["GE","SE"] },
  { matricule:"ENS-012", nom:"Dr. Fofana", prenom:"Souleymane", email:"s.fofana@univ.ci", telephone:"+225 05 00 00 012", specialite:"Intelligence artificielle & Machine Learning", grade:"Maître-assistant", statut:"Permanent", nb_ue:2, nb_heures:120, filieres:["GI"] },
];

/* ─── FILIÈRES ─── */
const filieres = [
  { code:"GI", intitule:"Génie Informatique", departement:"Sciences & Technologies", responsable:"Dr. Ouattara Ibrahim", duree:3, niveaux:["L1","L2","L3"], nb_etudiants:482, nb_classes:6, capacite_max:540, description:"Formation aux métiers du développement logiciel, réseaux, IA et systèmes d'information." },
  { code:"GC", intitule:"Génie Civil", departement:"Sciences & Technologies", responsable:"Prof. Sylla Mamadou", duree:3, niveaux:["L1","L2","L3"], nb_etudiants:318, nb_classes:4, capacite_max:360, description:"Formation aux métiers de la construction, topographie, géotechnique et infrastructure." },
  { code:"GEL", intitule:"Génie Électrique", departement:"Sciences & Technologies", responsable:"Dr. Keita Adama", duree:3, niveaux:["L1","L2"], nb_etudiants:214, nb_classes:3, capacite_max:270, description:"Electronique, électrotechnique, automatismes et énergie électrique." },
  { code:"GE", intitule:"Gestion des Entreprises", departement:"Sciences Économiques & Gestion", responsable:"Dr. Traoré Seydou", duree:3, niveaux:["L1","L2","L3"], nb_etudiants:624, nb_classes:8, capacite_max:720, description:"Management, ressources humaines, stratégie et entrepreneuriat." },
  { code:"SE", intitule:"Sciences Économiques", departement:"Sciences Économiques & Gestion", responsable:"Dr. Traoré Seydou", duree:3, niveaux:["L1","L2","L3"], nb_etudiants:390, nb_classes:5, capacite_max:450, description:"Microéconomie, macroéconomie, économétrie et politique économique." },
  { code:"DA", intitule:"Droit des Affaires", departement:"Sciences Juridiques", responsable:"Prof. Koné Aminata", duree:3, niveaux:["L1","L2","L3"], nb_etudiants:556, nb_classes:7, capacite_max:630, description:"Droit commercial, droit des contrats, droit fiscal et droit international des affaires." },
  { code:"SP", intitule:"Santé Publique", departement:"Sciences de la Santé", responsable:"Prof. Diallo Mariama", duree:3, niveaux:["L1","L2","L3"], nb_etudiants:278, nb_classes:4, capacite_max:300, description:"Épidémiologie, hygiène, santé communautaire et gestion des systèmes de santé." },
  { code:"LAL", intitule:"Lettres & Langues", departement:"Lettres & Sciences Humaines", responsable:"Dr. Camara Hawa", duree:3, niveaux:["L1","L2"], nb_etudiants:180, nb_classes:2, capacite_max:200, description:"Linguistique, littérature française et africaine, communication et traduction." },
];

/* ─── CLASSES ─── */
const classes = [
  { code:"L1-GI-A", intitule:"Licence 1 GI — Groupe A", filiere:"Génie Informatique", filiereCode:"GI", niveau:"L1", effectif:82, capacite:90, enseignant_principal:"Dr. Ouattara Ibrahim", salle:"Amphi A", horaire:"Lun–Ven 08h–17h" },
  { code:"L1-GI-B", intitule:"Licence 1 GI — Groupe B", filiere:"Génie Informatique", filiereCode:"GI", niveau:"L1", effectif:78, capacite:90, enseignant_principal:"Dr. Bamba Fatoumata", salle:"Amphi B", horaire:"Lun–Ven 08h–17h" },
  { code:"L2-GI-A", intitule:"Licence 2 GI — Groupe A", filiere:"Génie Informatique", filiereCode:"GI", niveau:"L2", effectif:74, capacite:80, enseignant_principal:"Dr. Fofana Souleymane", salle:"Salle 204", horaire:"Lun–Ven 08h–17h" },
  { code:"L3-GI-A", intitule:"Licence 3 GI — Groupe A", filiere:"Génie Informatique", filiereCode:"GI", niveau:"L3", effectif:68, capacite:80, enseignant_principal:"Dr. Ouattara Ibrahim", salle:"Salle 305", horaire:"Lun–Ven 08h–17h" },
  { code:"L1-GC-A", intitule:"Licence 1 GC — Groupe A", filiere:"Génie Civil", filiereCode:"GC", niveau:"L1", effectif:86, capacite:90, enseignant_principal:"M. Coulibaly Lamine", salle:"Amphi C", horaire:"Lun–Ven 08h–17h" },
  { code:"L1-GEL-A", intitule:"Licence 1 GEL — Groupe A", filiere:"Génie Électrique", filiereCode:"GEL", niveau:"L1", effectif:72, capacite:90, enseignant_principal:"Dr. Keita Adama", salle:"Labo Elec 1", horaire:"Lun–Ven 08h–17h" },
  { code:"L1-GE-A", intitule:"Licence 1 GE — Groupe A", filiere:"Gestion des Entreprises", filiereCode:"GE", niveau:"L1", effectif:88, capacite:90, enseignant_principal:"M. Sanogo Boubacar", salle:"Amphi D", horaire:"Lun–Ven 08h–17h" },
  { code:"L1-GE-B", intitule:"Licence 1 GE — Groupe B", filiere:"Gestion des Entreprises", filiereCode:"GE", niveau:"L1", effectif:85, capacite:90, enseignant_principal:"Mme. Barry Kadiatou", salle:"Amphi E", horaire:"Lun–Ven 08h–17h" },
  { code:"L1-SE-A", intitule:"Licence 1 SE — Groupe A", filiere:"Sciences Économiques", filiereCode:"SE", niveau:"L1", effectif:80, capacite:90, enseignant_principal:"Dr. Traoré Seydou", salle:"Salle 102", horaire:"Lun–Ven 08h–17h" },
  { code:"L1-DA-A", intitule:"Licence 1 DA — Groupe A", filiere:"Droit des Affaires", filiereCode:"DA", niveau:"L1", effectif:90, capacite:90, enseignant_principal:"Prof. Koné Aminata", salle:"Amphi F", horaire:"Lun–Ven 08h–17h" },
  { code:"L1-SP-A", intitule:"Licence 1 SP — Groupe A", filiere:"Santé Publique", filiereCode:"SP", niveau:"L1", effectif:75, capacite:80, enseignant_principal:"Prof. Diallo Mariama", salle:"Salle Santé 1", horaire:"Lun–Ven 08h–17h" },
  { code:"L1-LAL-A", intitule:"Licence 1 LAL — Groupe A", filiere:"Lettres & Langues", filiereCode:"LAL", niveau:"L1", effectif:60, capacite:70, enseignant_principal:"Dr. Camara Hawa", salle:"Salle 108", horaire:"Lun–Ven 08h–17h" },
];

/* ─── INSCRIPTIONS ─── */
const inscriptions = [
  { ref:"INS-2024-0001", etudiant:"Koné Aminata", matricule:"ETU-2024-001", filiere:"Génie Informatique", classe:"L1-GI-A", date_depot:"07/07/2024", documents:true, statut:"Validé", agent:"Admin" },
  { ref:"INS-2024-0002", etudiant:"Diallo Mamadou", matricule:"ETU-2024-002", filiere:"Gestion des Entreprises", classe:"L1-GE-B", date_depot:"07/07/2024", documents:true, statut:"Validé", agent:"Admin" },
  { ref:"INS-2024-0003", etudiant:"Traoré Fatoumata", matricule:"ETU-2024-003", filiere:"Droit des Affaires", classe:"L2-DA-A", date_depot:"06/07/2024", documents:true, statut:"Validé", agent:"Admin" },
  { ref:"INS-2024-0004", etudiant:"Coulibaly Ibrahim", matricule:"ETU-2024-004", filiere:"Génie Civil", classe:"L1-GC-A", date_depot:"06/07/2024", documents:true, statut:"Validé", agent:"Admin" },
  { ref:"INS-2024-0005", etudiant:"Ouédraogo Marie", matricule:"ETU-2024-005", filiere:"Santé Publique", classe:"L3-SP-B", date_depot:"05/07/2024", documents:true, statut:"Validé", agent:"Admin" },
  { ref:"INS-2024-0006", etudiant:"Sané Ibrahima", matricule:"ETU-2024-006", filiere:"Génie Informatique", classe:"L2-GI-A", date_depot:"05/07/2024", documents:false, statut:"En attente", agent:"-" },
  { ref:"INS-2024-0007", etudiant:"Bah Aïssatou", matricule:"ETU-2024-007", filiere:"Sciences Économiques", classe:"L1-SE-C", date_depot:"04/07/2024", documents:true, statut:"Validé", agent:"Admin" },
  { ref:"INS-2024-0008", etudiant:"Camara Seydou", matricule:"ETU-2024-008", filiere:"Génie Électrique", classe:"L1-GEL-A", date_depot:"04/07/2024", documents:true, statut:"Validé", agent:"Admin" },
  { ref:"INS-2024-0009", etudiant:"Sylla Kadiatou", matricule:"ETU-2024-009", filiere:"Marketing", classe:"L2-MKT-A", date_depot:"03/07/2024", documents:true, statut:"Rejeté", agent:"Admin" },
  { ref:"INS-2024-0010", etudiant:"Barry Thierno", matricule:"ETU-2024-010", filiere:"Génie Informatique", classe:"L3-GI-A", date_depot:"03/07/2024", documents:true, statut:"Validé", agent:"Admin" },
  { ref:"INS-2024-0011", etudiant:"Cissé Mariam", matricule:"ETU-2024-011", filiere:"Lettres & Langues", classe:"L1-LAL-A", date_depot:"02/07/2024", documents:true, statut:"Validé", agent:"Admin" },
  { ref:"INS-2024-0012", etudiant:"Doumbia Bakary", matricule:"ETU-2024-012", filiere:"Gestion des Entreprises", classe:"L3-GE-A", date_depot:"01/07/2024", documents:false, statut:"En attente", agent:"-" },
  { ref:"INS-2024-0013", etudiant:"Fofana Awa", matricule:"ETU-2024-013", filiere:"Sciences Économiques", classe:"L2-SE-A", date_depot:"01/07/2024", documents:true, statut:"Validé", agent:"Admin" },
  { ref:"INS-2024-0014", etudiant:"Kouyaté Moussa", matricule:"ETU-2024-014", filiere:"Droit des Affaires", classe:"L1-DA-A", date_depot:"30/06/2024", documents:false, statut:"En attente", agent:"-" },
  { ref:"INS-2024-0015", etudiant:"Sanogo Oumou", matricule:"ETU-2024-015", filiere:"Santé Publique", classe:"L2-SP-A", date_depot:"30/06/2024", documents:true, statut:"Validé", agent:"Admin" },
  { ref:"INS-2024-0016", etudiant:"Diakité Omar", matricule:"ETU-2024-016", filiere:"Génie Civil", classe:"L2-GC-A", date_depot:"29/06/2024", documents:false, statut:"En attente", agent:"-" },
  { ref:"INS-2024-0017", etudiant:"Keita Mariama", matricule:"ETU-2024-017", filiere:"Marketing", classe:"L1-MKT-A", date_depot:"28/06/2024", documents:true, statut:"En attente", agent:"-" },
  { ref:"INS-2024-0018", etudiant:"Balde Ousmane", matricule:"ETU-2024-018", filiere:"Génie Informatique", classe:"L1-GI-A", date_depot:"28/06/2024", documents:true, statut:"Rejeté", agent:"Admin" },
];

/* ─── PAIEMENTS ─── */
const paiements = [
  { ref:"PAY-2024-0001", etudiant:"Koné Aminata", matricule:"ETU-2024-001", type:"Inscription", montant:50_000, mode:"Espèces", date:"07/07/2024", statut:"Validé" },
  { ref:"PAY-2024-0002", etudiant:"Koné Aminata", matricule:"ETU-2024-001", type:"Scolarité", montant:450_000, mode:"Virement", date:"07/07/2024", statut:"Validé" },
  { ref:"PAY-2024-0003", etudiant:"Diallo Mamadou", matricule:"ETU-2024-002", type:"Inscription", montant:50_000, mode:"Mobile Money", date:"07/07/2024", statut:"Validé" },
  { ref:"PAY-2024-0004", etudiant:"Diallo Mamadou", matricule:"ETU-2024-002", type:"Scolarité", montant:450_000, mode:"Chèque", date:"07/07/2024", statut:"Validé" },
  { ref:"PAY-2024-0005", etudiant:"Traoré Fatoumata", matricule:"ETU-2024-003", type:"Frais divers", montant:75_000, mode:"Espèces", date:"07/07/2024", statut:"Validé" },
  { ref:"PAY-2024-0006", etudiant:"Coulibaly Ibrahim", matricule:"ETU-2024-004", type:"Scolarité", montant:450_000, mode:"Mobile Money", date:"07/07/2024", statut:"En attente" },
  { ref:"PAY-2024-0007", etudiant:"Ouédraogo Marie", matricule:"ETU-2024-005", type:"Scolarité", montant:380_000, mode:"Virement", date:"07/07/2024", statut:"Validé" },
  { ref:"PAY-2024-0008", etudiant:"Sané Ibrahima", matricule:"ETU-2024-006", type:"Inscription", montant:50_000, mode:"Espèces", date:"07/07/2024", statut:"Validé" },
  { ref:"PAY-2024-0009", etudiant:"Bah Aïssatou", matricule:"ETU-2024-007", type:"Scolarité", montant:450_000, mode:"Chèque", date:"07/07/2024", statut:"Rejeté" },
  { ref:"PAY-2024-0010", etudiant:"Camara Seydou", matricule:"ETU-2024-008", type:"Scolarité", montant:450_000, mode:"Mobile Money", date:"07/07/2024", statut:"Validé" },
  { ref:"PAY-2024-0011", etudiant:"Barry Thierno", matricule:"ETU-2024-010", type:"Examen", montant:25_000, mode:"Espèces", date:"06/07/2024", statut:"Validé" },
  { ref:"PAY-2024-0012", etudiant:"Cissé Mariam", matricule:"ETU-2024-011", type:"Scolarité", montant:420_000, mode:"Virement", date:"06/07/2024", statut:"Validé" },
  { ref:"PAY-2024-0013", etudiant:"Fofana Awa", matricule:"ETU-2024-013", type:"Scolarité", montant:450_000, mode:"Mobile Money", date:"05/07/2024", statut:"Validé" },
  { ref:"PAY-2024-0014", etudiant:"Sanogo Oumou", matricule:"ETU-2024-015", type:"Inscription", montant:50_000, mode:"Espèces", date:"05/07/2024", statut:"Validé" },
  { ref:"PAY-2024-0015", etudiant:"Sanogo Oumou", matricule:"ETU-2024-015", type:"Scolarité", montant:380_000, mode:"Chèque", date:"04/07/2024", statut:"En attente" },
  { ref:"PAY-2024-0016", etudiant:"Doumbia Bakary", matricule:"ETU-2024-012", type:"Scolarité", montant:450_000, mode:"Virement", date:"03/07/2024", statut:"Validé" },
  { ref:"PAY-2024-0017", etudiant:"Sylla Kadiatou", matricule:"ETU-2024-009", type:"Frais divers", montant:30_000, mode:"Espèces", date:"02/07/2024", statut:"Validé" },
  { ref:"PAY-2024-0018", etudiant:"Kouyaté Moussa", matricule:"ETU-2024-014", type:"Inscription", montant:50_000, mode:"Mobile Money", date:"01/07/2024", statut:"En attente" },
];

/* ─── NOTIFICATIONS ─── */
const notifications_data = [
  { id:1, titre:"Paiement en attente de validation", message:"Le paiement PAY-2024-0006 d'Ibrahim Coulibaly (450 000 FCFA) est en attente de validation.", categorie:"Paiements", date:"07/07/2024 09:15", lu:false },
  { id:2, titre:"12 nouvelles inscriptions reçues", message:"12 nouveaux dossiers d'inscription ont été déposés et sont en attente de traitement.", categorie:"Inscriptions", date:"07/07/2024 08:30", lu:false },
  { id:3, titre:"Réunion pédagogique demain 09h00", message:"Rappel : Réunion du corps enseignant demain matin à 09h00 en salle des délibérations.", categorie:"Académique", date:"06/07/2024 16:00", lu:false },
  { id:4, titre:"Paiement rejeté — Bah Aïssatou", message:"Le paiement par chèque de Bah Aïssatou a été rejeté (chèque sans provision).", categorie:"Paiements", date:"06/07/2024 14:20", lu:true },
  { id:5, titre:"Mise à jour du système", message:"Une mise à jour de maintenance sera effectuée ce weekend du 13 au 14 juillet 2024.", categorie:"Système", date:"05/07/2024 10:00", lu:true },
  { id:6, titre:"Clôture inscriptions L1 dans 24 jours", message:"Rappel : la date limite d'inscription en Licence 1 est le 31 juillet 2024.", categorie:"Inscriptions", date:"05/07/2024 08:00", lu:true },
  { id:7, titre:"Nouveau paiement Mobile Money reçu", message:"Paiement de 450 000 FCFA reçu par Mobile Money pour Camara Seydou (ETU-2024-008).", categorie:"Paiements", date:"04/07/2024 11:45", lu:true },
  { id:8, titre:"Inscription rejetée — dossier incomplet", message:"Le dossier d'Ibrahima Sané a été retourné : pièces d'identité manquantes.", categorie:"Inscriptions", date:"03/07/2024 15:30", lu:true },
  { id:9, titre:"Soutenance de thèses — liste des jurys", message:"La liste des membres de jury pour les soutenances du 20 août est disponible.", categorie:"Académique", date:"02/07/2024 09:00", lu:true },
  { id:10, titre:"Sauvegarde hebdomadaire effectuée", message:"La sauvegarde automatique des données du système a été réalisée avec succès.", categorie:"Système", date:"01/07/2024 02:00", lu:true },
];

/* ─── RAPPORTS ─── */
const taux_reussite = [
  { filiere:"Génie Informatique", taux:78, admis:376, total:482 },
  { filiere:"Gestion Entreprises", taux:82, admis:512, total:624 },
  { filiere:"Droit des Affaires", taux:75, admis:417, total:556 },
  { filiere:"Sciences Éco.", taux:80, admis:312, total:390 },
  { filiere:"Génie Civil", taux:71, admis:226, total:318 },
  { filiere:"Santé Publique", taux:85, admis:236, total:278 },
  { filiere:"Génie Électrique", taux:69, admis:148, total:214 },
  { filiere:"Lettres & Langues", taux:88, admis:158, total:180 },
];

const repartition_genre = [
  { name:"Femmes", value:1640, fill:"hsl(221, 83%, 53%)" },
  { name:"Hommes", value:2202, fill:"hsl(142, 71%, 45%)" },
];

const evolution_effectifs = [
  { annee:"2019-2020", etudiants:2100, enseignants:180 },
  { annee:"2020-2021", etudiants:2480, enseignants:198 },
  { annee:"2021-2022", etudiants:2850, enseignants:215 },
  { annee:"2022-2023", etudiants:3200, enseignants:228 },
  { annee:"2023-2024", etudiants:3560, enseignants:240 },
  { annee:"2024-2025", etudiants:3842, enseignants:247 },
];

/* ─── EVENEMENTS (calendar) ─── */
const evenements = [
  { id:1, titre:"Rentrée académique 2024-2025", date:"2024-09-02", type:"Académique", description:"Début de l'année universitaire" },
  { id:2, titre:"Examens de mi-semestre", date:"2024-11-11", type:"Examen", description:"Sessions d'examens pour tous les niveaux" },
  { id:3, titre:"Conseil d'administration", date:"2024-07-15", type:"Administratif", description:"Réunion du CA — Salle des délibérations" },
  { id:4, titre:"Journée portes ouvertes", date:"2024-07-20", type:"Événement", description:"Accueil des futurs étudiants" },
  { id:5, titre:"Clôture des inscriptions L1", date:"2024-07-31", type:"Inscription", description:"Date limite d'inscription en Licence 1" },
  { id:6, titre:"Soutenance de thèses", date:"2024-08-20", type:"Académique", description:"Soutenances Doctorat — Amphithéâtre A" },
  { id:7, titre:"Réunion pédagogique", date:"2024-07-10", type:"Administratif", description:"Réunion du corps enseignant" },
  { id:8, titre:"Dépôt dossiers Master", date:"2024-07-25", type:"Inscription", description:"Dossiers d'inscription Master 1 — Bureau scolarité" },
  { id:9, titre:"Jury de délibération L3", date:"2024-08-05", type:"Examen", description:"Délibérations finales Licence 3 — Amphi B" },
  { id:10, titre:"Conférence académique", date:"2024-09-15", type:"Académique", description:"Colloque international sur l'innovation pédagogique" },
];

/* ─── ROUTES ─── */
router.get("/etudiants",    (_req, res) => res.json(etudiants));
router.get("/enseignants",  (_req, res) => res.json(enseignants));
router.get("/filieres",     (_req, res) => res.json(filieres));
router.get("/classes",      (_req, res) => res.json(classes));
router.get("/inscriptions", (_req, res) => res.json(inscriptions));
router.get("/paiements",    (_req, res) => res.json(paiements));
router.get("/notifications",(_req, res) => res.json(notifications_data));
router.get("/evenements",   (_req, res) => res.json(evenements));
router.get("/rapports/taux-reussite",   (_req, res) => res.json(taux_reussite));
router.get("/rapports/genre",           (_req, res) => res.json(repartition_genre));
router.get("/rapports/evolution",       (_req, res) => res.json(evolution_effectifs));

export default router;
