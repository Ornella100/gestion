CREATE DATABASE IF NOT EXISTS universite CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE universite;

DROP TABLE IF EXISTS product_images;
DROP TABLE IF EXISTS product_specs;
DROP TABLE IF EXISTS product_features;
DROP TABLE IF EXISTS products;
DROP TABLE IF EXISTS site_pages;
DROP TABLE IF EXISTS etudiants;
DROP TABLE IF EXISTS enseignants;
DROP TABLE IF EXISTS filieres;
DROP TABLE IF EXISTS classes;
DROP TABLE IF EXISTS inscriptions;
DROP TABLE IF EXISTS paiements;
DROP TABLE IF EXISTS notifications;
DROP TABLE IF EXISTS rapport_taux_reussite;
DROP TABLE IF EXISTS rapport_genre;
DROP TABLE IF EXISTS rapport_evolution;
DROP TABLE IF EXISTS evenements;
DROP TABLE IF EXISTS dashboard_stats;
DROP TABLE IF EXISTS dashboard_enrollments_chart;
DROP TABLE IF EXISTS dashboard_revenue_chart;
DROP TABLE IF EXISTS dashboard_students_recent;
DROP TABLE IF EXISTS dashboard_payments_recent;
DROP TABLE IF EXISTS dashboard_events;
DROP TABLE IF EXISTS academic_years;

CREATE TABLE etudiants (
  id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  resource_key VARCHAR(120) NOT NULL,
  payload JSON NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  INDEX idx_etudiants_resource_key (resource_key)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

INSERT INTO etudiants (resource_key, payload) VALUES ('ETU-2024-001', '{"matricule":"ETU-2024-001","nom":"Koné","prenom":"Aminata","email":"a.kone@univ.ci","telephone":"+225 07 00 00 001","genre":"F","filiere":"Génie Informatique","filiereCode":"GI","classe":"L1-GI-A","niveau":"L1","annee_entree":2024,"statut":"Actif","date_inscription":"07/07/2024"}');
INSERT INTO etudiants (resource_key, payload) VALUES ('ETU-2024-002', '{"matricule":"ETU-2024-002","nom":"Diallo","prenom":"Mamadou","email":"m.diallo@univ.ci","telephone":"+225 07 00 00 002","genre":"M","filiere":"Gestion des Entreprises","filiereCode":"GE","classe":"L1-GE-B","niveau":"L1","annee_entree":2024,"statut":"Actif","date_inscription":"07/07/2024"}');
INSERT INTO etudiants (resource_key, payload) VALUES ('ETU-2024-003', '{"matricule":"ETU-2024-003","nom":"Traoré","prenom":"Fatoumata","email":"f.traore@univ.ci","telephone":"+225 07 00 00 003","genre":"F","filiere":"Droit des Affaires","filiereCode":"DA","classe":"L2-DA-A","niveau":"L2","annee_entree":2023,"statut":"Actif","date_inscription":"06/07/2024"}');
INSERT INTO etudiants (resource_key, payload) VALUES ('ETU-2024-004', '{"matricule":"ETU-2024-004","nom":"Coulibaly","prenom":"Ibrahim","email":"i.coulibaly@univ.ci","telephone":"+225 07 00 00 004","genre":"M","filiere":"Génie Civil","filiereCode":"GC","classe":"L1-GC-A","niveau":"L1","annee_entree":2024,"statut":"Actif","date_inscription":"06/07/2024"}');
INSERT INTO etudiants (resource_key, payload) VALUES ('ETU-2024-005', '{"matricule":"ETU-2024-005","nom":"Ouédraogo","prenom":"Marie","email":"m.ouedraogo@univ.ci","telephone":"+225 07 00 00 005","genre":"F","filiere":"Santé Publique","filiereCode":"SP","classe":"L3-SP-B","niveau":"L3","annee_entree":2022,"statut":"Actif","date_inscription":"05/07/2024"}');
INSERT INTO etudiants (resource_key, payload) VALUES ('ETU-2024-006', '{"matricule":"ETU-2024-006","nom":"Sané","prenom":"Ibrahima","email":"i.sane@univ.ci","telephone":"+225 07 00 00 006","genre":"M","filiere":"Génie Informatique","filiereCode":"GI","classe":"L2-GI-A","niveau":"L2","annee_entree":2023,"statut":"En attente","date_inscription":"05/07/2024"}');
INSERT INTO etudiants (resource_key, payload) VALUES ('ETU-2024-007', '{"matricule":"ETU-2024-007","nom":"Bah","prenom":"Aïssatou","email":"a.bah@univ.ci","telephone":"+225 07 00 00 007","genre":"F","filiere":"Sciences Économiques","filiereCode":"SE","classe":"L1-SE-C","niveau":"L1","annee_entree":2024,"statut":"Actif","date_inscription":"04/07/2024"}');
INSERT INTO etudiants (resource_key, payload) VALUES ('ETU-2024-008', '{"matricule":"ETU-2024-008","nom":"Camara","prenom":"Seydou","email":"s.camara@univ.ci","telephone":"+225 07 00 00 008","genre":"M","filiere":"Génie Électrique","filiereCode":"GEL","classe":"L1-GEL-A","niveau":"L1","annee_entree":2024,"statut":"Actif","date_inscription":"04/07/2024"}');
INSERT INTO etudiants (resource_key, payload) VALUES ('ETU-2024-009', '{"matricule":"ETU-2024-009","nom":"Sylla","prenom":"Kadiatou","email":"k.sylla@univ.ci","telephone":"+225 07 00 00 009","genre":"F","filiere":"Marketing","filiereCode":"MKT","classe":"L2-MKT-A","niveau":"L2","annee_entree":2023,"statut":"Suspendu","date_inscription":"03/07/2024"}');
INSERT INTO etudiants (resource_key, payload) VALUES ('ETU-2024-010', '{"matricule":"ETU-2024-010","nom":"Barry","prenom":"Thierno","email":"t.barry@univ.ci","telephone":"+225 07 00 00 010","genre":"M","filiere":"Génie Informatique","filiereCode":"GI","classe":"L3-GI-A","niveau":"L3","annee_entree":2022,"statut":"Actif","date_inscription":"03/07/2024"}');
INSERT INTO etudiants (resource_key, payload) VALUES ('ETU-2024-011', '{"matricule":"ETU-2024-011","nom":"Cissé","prenom":"Mariam","email":"m.cisse@univ.ci","telephone":"+225 07 00 00 011","genre":"F","filiere":"Lettres & Langues","filiereCode":"LAL","classe":"L1-LAL-A","niveau":"L1","annee_entree":2024,"statut":"Actif","date_inscription":"02/07/2024"}');
INSERT INTO etudiants (resource_key, payload) VALUES ('ETU-2024-012', '{"matricule":"ETU-2024-012","nom":"Doumbia","prenom":"Bakary","email":"b.doumbia@univ.ci","telephone":"+225 07 00 00 012","genre":"M","filiere":"Gestion des Entreprises","filiereCode":"GE","classe":"L3-GE-A","niveau":"L3","annee_entree":2022,"statut":"Inactif","date_inscription":"01/07/2024"}');
INSERT INTO etudiants (resource_key, payload) VALUES ('ETU-2024-013', '{"matricule":"ETU-2024-013","nom":"Fofana","prenom":"Awa","email":"a.fofana@univ.ci","telephone":"+225 07 00 00 013","genre":"F","filiere":"Sciences Économiques","filiereCode":"SE","classe":"L2-SE-A","niveau":"L2","annee_entree":2023,"statut":"Actif","date_inscription":"01/07/2024"}');
INSERT INTO etudiants (resource_key, payload) VALUES ('ETU-2024-014', '{"matricule":"ETU-2024-014","nom":"Kouyaté","prenom":"Moussa","email":"m.kouyate@univ.ci","telephone":"+225 07 00 00 014","genre":"M","filiere":"Droit des Affaires","filiereCode":"DA","classe":"L1-DA-A","niveau":"L1","annee_entree":2024,"statut":"En attente","date_inscription":"30/06/2024"}');
INSERT INTO etudiants (resource_key, payload) VALUES ('ETU-2024-015', '{"matricule":"ETU-2024-015","nom":"Sanogo","prenom":"Oumou","email":"o.sanogo@univ.ci","telephone":"+225 07 00 00 015","genre":"F","filiere":"Santé Publique","filiereCode":"SP","classe":"L2-SP-A","niveau":"L2","annee_entree":2023,"statut":"Actif","date_inscription":"30/06/2024"}');

CREATE TABLE enseignants (
  id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  resource_key VARCHAR(120) NOT NULL,
  payload JSON NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  INDEX idx_enseignants_resource_key (resource_key)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

INSERT INTO enseignants (resource_key, payload) VALUES ('ENS-001', '{"matricule":"ENS-001","nom":"Dr. Ouattara","prenom":"Ibrahim","email":"i.ouattara@univ.ci","telephone":"+225 05 00 00 001","specialite":"Algorithmique & Structures de données","grade":"Maître-assistant","statut":"Permanent","nb_ue":3,"nb_heures":180,"filieres":["GI","GEL"]}');
INSERT INTO enseignants (resource_key, payload) VALUES ('ENS-002', '{"matricule":"ENS-002","nom":"Prof. Koné","prenom":"Aminata","email":"a.kone2@univ.ci","telephone":"+225 05 00 00 002","specialite":"Droit commercial et des affaires","grade":"Professeur","statut":"Permanent","nb_ue":4,"nb_heures":240,"filieres":["DA"]}');
INSERT INTO enseignants (resource_key, payload) VALUES ('ENS-003', '{"matricule":"ENS-003","nom":"Dr. Traoré","prenom":"Seydou","email":"s.traore@univ.ci","telephone":"+225 05 00 00 003","specialite":"Économie générale & Macro-économie","grade":"Maître-assistant","statut":"Permanent","nb_ue":3,"nb_heures":180,"filieres":["SE","GE"]}');
INSERT INTO enseignants (resource_key, payload) VALUES ('ENS-004', '{"matricule":"ENS-004","nom":"Dr. Bamba","prenom":"Fatoumata","email":"f.bamba@univ.ci","telephone":"+225 05 00 00 004","specialite":"Réseaux & Systèmes distribués","grade":"Assistant","statut":"Permanent","nb_ue":2,"nb_heures":120,"filieres":["GI"]}');
INSERT INTO enseignants (resource_key, payload) VALUES ('ENS-005', '{"matricule":"ENS-005","nom":"M. Coulibaly","prenom":"Lamine","email":"l.coulibaly@univ.ci","telephone":"+225 05 00 00 005","specialite":"Résistance des matériaux","grade":"Assistant","statut":"Vacataire","nb_ue":2,"nb_heures":96,"filieres":["GC"]}');
INSERT INTO enseignants (resource_key, payload) VALUES ('ENS-006', '{"matricule":"ENS-006","nom":"Prof. Diallo","prenom":"Mariama","email":"m.diallo2@univ.ci","telephone":"+225 05 00 00 006","specialite":"Épidémiologie & Santé communautaire","grade":"Professeur","statut":"Permanent","nb_ue":4,"nb_heures":240,"filieres":["SP"]}');
INSERT INTO enseignants (resource_key, payload) VALUES ('ENS-007', '{"matricule":"ENS-007","nom":"Dr. Keita","prenom":"Adama","email":"a.keita@univ.ci","telephone":"+225 05 00 00 007","specialite":"Électronique de puissance","grade":"Maître-assistant","statut":"Permanent","nb_ue":3,"nb_heures":180,"filieres":["GEL"]}');
INSERT INTO enseignants (resource_key, payload) VALUES ('ENS-008', '{"matricule":"ENS-008","nom":"M. Sanogo","prenom":"Boubacar","email":"b.sanogo@univ.ci","telephone":"+225 05 00 00 008","specialite":"Marketing digital & E-commerce","grade":"Assistant","statut":"Vacataire","nb_ue":2,"nb_heures":96,"filieres":["MKT","GE"]}');
INSERT INTO enseignants (resource_key, payload) VALUES ('ENS-009', '{"matricule":"ENS-009","nom":"Dr. Camara","prenom":"Hawa","email":"h.camara@univ.ci","telephone":"+225 05 00 00 009","specialite":"Linguistique & Littérature française","grade":"Maître-assistant","statut":"Permanent","nb_ue":3,"nb_heures":180,"filieres":["LAL"]}');
INSERT INTO enseignants (resource_key, payload) VALUES ('ENS-010', '{"matricule":"ENS-010","nom":"Prof. Sylla","prenom":"Mamadou","email":"m.sylla@univ.ci","telephone":"+225 05 00 00 010","specialite":"Géotechnique & Fondations","grade":"Professeur","statut":"Permanent","nb_ue":3,"nb_heures":180,"filieres":["GC"]}');
INSERT INTO enseignants (resource_key, payload) VALUES ('ENS-011', '{"matricule":"ENS-011","nom":"Mme. Barry","prenom":"Kadiatou","email":"k.barry@univ.ci","telephone":"+225 05 00 00 011","specialite":"Comptabilité & Finance d''entreprise","grade":"Assistant","statut":"Vacataire","nb_ue":2,"nb_heures":120,"filieres":["GE","SE"]}');
INSERT INTO enseignants (resource_key, payload) VALUES ('ENS-012', '{"matricule":"ENS-012","nom":"Dr. Fofana","prenom":"Souleymane","email":"s.fofana@univ.ci","telephone":"+225 05 00 00 012","specialite":"Intelligence artificielle & Machine Learning","grade":"Maître-assistant","statut":"Permanent","nb_ue":2,"nb_heures":120,"filieres":["GI"]}');

CREATE TABLE filieres (
  id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  resource_key VARCHAR(120) NOT NULL,
  payload JSON NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  INDEX idx_filieres_resource_key (resource_key)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

INSERT INTO filieres (resource_key, payload) VALUES ('GI', '{"code":"GI","intitule":"Génie Informatique","departement":"Sciences & Technologies","responsable":"Dr. Ouattara Ibrahim","duree":3,"niveaux":["L1","L2","L3"],"nb_etudiants":482,"nb_classes":6,"capacite_max":540,"description":"Formation aux métiers du développement logiciel, réseaux, IA et systèmes d''information."}');
INSERT INTO filieres (resource_key, payload) VALUES ('GC', '{"code":"GC","intitule":"Génie Civil","departement":"Sciences & Technologies","responsable":"Prof. Sylla Mamadou","duree":3,"niveaux":["L1","L2","L3"],"nb_etudiants":318,"nb_classes":4,"capacite_max":360,"description":"Formation aux métiers de la construction, topographie, géotechnique et infrastructure."}');
INSERT INTO filieres (resource_key, payload) VALUES ('GEL', '{"code":"GEL","intitule":"Génie Électrique","departement":"Sciences & Technologies","responsable":"Dr. Keita Adama","duree":3,"niveaux":["L1","L2"],"nb_etudiants":214,"nb_classes":3,"capacite_max":270,"description":"Electronique, électrotechnique, automatismes et énergie électrique."}');
INSERT INTO filieres (resource_key, payload) VALUES ('GE', '{"code":"GE","intitule":"Gestion des Entreprises","departement":"Sciences Économiques & Gestion","responsable":"Dr. Traoré Seydou","duree":3,"niveaux":["L1","L2","L3"],"nb_etudiants":624,"nb_classes":8,"capacite_max":720,"description":"Management, ressources humaines, stratégie et entrepreneuriat."}');
INSERT INTO filieres (resource_key, payload) VALUES ('SE', '{"code":"SE","intitule":"Sciences Économiques","departement":"Sciences Économiques & Gestion","responsable":"Dr. Traoré Seydou","duree":3,"niveaux":["L1","L2","L3"],"nb_etudiants":390,"nb_classes":5,"capacite_max":450,"description":"Microéconomie, macroéconomie, économétrie et politique économique."}');
INSERT INTO filieres (resource_key, payload) VALUES ('DA', '{"code":"DA","intitule":"Droit des Affaires","departement":"Sciences Juridiques","responsable":"Prof. Koné Aminata","duree":3,"niveaux":["L1","L2","L3"],"nb_etudiants":556,"nb_classes":7,"capacite_max":630,"description":"Droit commercial, droit des contrats, droit fiscal et droit international des affaires."}');
INSERT INTO filieres (resource_key, payload) VALUES ('SP', '{"code":"SP","intitule":"Santé Publique","departement":"Sciences de la Santé","responsable":"Prof. Diallo Mariama","duree":3,"niveaux":["L1","L2","L3"],"nb_etudiants":278,"nb_classes":4,"capacite_max":300,"description":"Épidémiologie, hygiène, santé communautaire et gestion des systèmes de santé."}');
INSERT INTO filieres (resource_key, payload) VALUES ('LAL', '{"code":"LAL","intitule":"Lettres & Langues","departement":"Lettres & Sciences Humaines","responsable":"Dr. Camara Hawa","duree":3,"niveaux":["L1","L2"],"nb_etudiants":180,"nb_classes":2,"capacite_max":200,"description":"Linguistique, littérature française et africaine, communication et traduction."}');

CREATE TABLE classes (
  id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  resource_key VARCHAR(120) NOT NULL,
  payload JSON NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  INDEX idx_classes_resource_key (resource_key)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

INSERT INTO classes (resource_key, payload) VALUES ('L1-GI-A', '{"code":"L1-GI-A","intitule":"Licence 1 GI — Groupe A","filiere":"Génie Informatique","filiereCode":"GI","niveau":"L1","effectif":82,"capacite":90,"enseignant_principal":"Dr. Ouattara Ibrahim","salle":"Amphi A","horaire":"Lun–Ven 08h–17h"}');
INSERT INTO classes (resource_key, payload) VALUES ('L1-GI-B', '{"code":"L1-GI-B","intitule":"Licence 1 GI — Groupe B","filiere":"Génie Informatique","filiereCode":"GI","niveau":"L1","effectif":78,"capacite":90,"enseignant_principal":"Dr. Bamba Fatoumata","salle":"Amphi B","horaire":"Lun–Ven 08h–17h"}');
INSERT INTO classes (resource_key, payload) VALUES ('L2-GI-A', '{"code":"L2-GI-A","intitule":"Licence 2 GI — Groupe A","filiere":"Génie Informatique","filiereCode":"GI","niveau":"L2","effectif":74,"capacite":80,"enseignant_principal":"Dr. Fofana Souleymane","salle":"Salle 204","horaire":"Lun–Ven 08h–17h"}');
INSERT INTO classes (resource_key, payload) VALUES ('L3-GI-A', '{"code":"L3-GI-A","intitule":"Licence 3 GI — Groupe A","filiere":"Génie Informatique","filiereCode":"GI","niveau":"L3","effectif":68,"capacite":80,"enseignant_principal":"Dr. Ouattara Ibrahim","salle":"Salle 305","horaire":"Lun–Ven 08h–17h"}');
INSERT INTO classes (resource_key, payload) VALUES ('L1-GC-A', '{"code":"L1-GC-A","intitule":"Licence 1 GC — Groupe A","filiere":"Génie Civil","filiereCode":"GC","niveau":"L1","effectif":86,"capacite":90,"enseignant_principal":"M. Coulibaly Lamine","salle":"Amphi C","horaire":"Lun–Ven 08h–17h"}');
INSERT INTO classes (resource_key, payload) VALUES ('L1-GEL-A', '{"code":"L1-GEL-A","intitule":"Licence 1 GEL — Groupe A","filiere":"Génie Électrique","filiereCode":"GEL","niveau":"L1","effectif":72,"capacite":90,"enseignant_principal":"Dr. Keita Adama","salle":"Labo Elec 1","horaire":"Lun–Ven 08h–17h"}');
INSERT INTO classes (resource_key, payload) VALUES ('L1-GE-A', '{"code":"L1-GE-A","intitule":"Licence 1 GE — Groupe A","filiere":"Gestion des Entreprises","filiereCode":"GE","niveau":"L1","effectif":88,"capacite":90,"enseignant_principal":"M. Sanogo Boubacar","salle":"Amphi D","horaire":"Lun–Ven 08h–17h"}');
INSERT INTO classes (resource_key, payload) VALUES ('L1-GE-B', '{"code":"L1-GE-B","intitule":"Licence 1 GE — Groupe B","filiere":"Gestion des Entreprises","filiereCode":"GE","niveau":"L1","effectif":85,"capacite":90,"enseignant_principal":"Mme. Barry Kadiatou","salle":"Amphi E","horaire":"Lun–Ven 08h–17h"}');
INSERT INTO classes (resource_key, payload) VALUES ('L1-SE-A', '{"code":"L1-SE-A","intitule":"Licence 1 SE — Groupe A","filiere":"Sciences Économiques","filiereCode":"SE","niveau":"L1","effectif":80,"capacite":90,"enseignant_principal":"Dr. Traoré Seydou","salle":"Salle 102","horaire":"Lun–Ven 08h–17h"}');
INSERT INTO classes (resource_key, payload) VALUES ('L1-DA-A', '{"code":"L1-DA-A","intitule":"Licence 1 DA — Groupe A","filiere":"Droit des Affaires","filiereCode":"DA","niveau":"L1","effectif":90,"capacite":90,"enseignant_principal":"Prof. Koné Aminata","salle":"Amphi F","horaire":"Lun–Ven 08h–17h"}');
INSERT INTO classes (resource_key, payload) VALUES ('L1-SP-A', '{"code":"L1-SP-A","intitule":"Licence 1 SP — Groupe A","filiere":"Santé Publique","filiereCode":"SP","niveau":"L1","effectif":75,"capacite":80,"enseignant_principal":"Prof. Diallo Mariama","salle":"Salle Santé 1","horaire":"Lun–Ven 08h–17h"}');
INSERT INTO classes (resource_key, payload) VALUES ('L1-LAL-A', '{"code":"L1-LAL-A","intitule":"Licence 1 LAL — Groupe A","filiere":"Lettres & Langues","filiereCode":"LAL","niveau":"L1","effectif":60,"capacite":70,"enseignant_principal":"Dr. Camara Hawa","salle":"Salle 108","horaire":"Lun–Ven 08h–17h"}');

CREATE TABLE inscriptions (
  id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  resource_key VARCHAR(120) NOT NULL,
  payload JSON NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  INDEX idx_inscriptions_resource_key (resource_key)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

INSERT INTO inscriptions (resource_key, payload) VALUES ('ETU-2024-001', '{"ref":"INS-2024-0001","etudiant":"Koné Aminata","matricule":"ETU-2024-001","filiere":"Génie Informatique","classe":"L1-GI-A","date_depot":"07/07/2024","documents":true,"statut":"Validé","agent":"Admin"}');
INSERT INTO inscriptions (resource_key, payload) VALUES ('ETU-2024-002', '{"ref":"INS-2024-0002","etudiant":"Diallo Mamadou","matricule":"ETU-2024-002","filiere":"Gestion des Entreprises","classe":"L1-GE-B","date_depot":"07/07/2024","documents":true,"statut":"Validé","agent":"Admin"}');
INSERT INTO inscriptions (resource_key, payload) VALUES ('ETU-2024-003', '{"ref":"INS-2024-0003","etudiant":"Traoré Fatoumata","matricule":"ETU-2024-003","filiere":"Droit des Affaires","classe":"L2-DA-A","date_depot":"06/07/2024","documents":true,"statut":"Validé","agent":"Admin"}');
INSERT INTO inscriptions (resource_key, payload) VALUES ('ETU-2024-004', '{"ref":"INS-2024-0004","etudiant":"Coulibaly Ibrahim","matricule":"ETU-2024-004","filiere":"Génie Civil","classe":"L1-GC-A","date_depot":"06/07/2024","documents":true,"statut":"Validé","agent":"Admin"}');
INSERT INTO inscriptions (resource_key, payload) VALUES ('ETU-2024-005', '{"ref":"INS-2024-0005","etudiant":"Ouédraogo Marie","matricule":"ETU-2024-005","filiere":"Santé Publique","classe":"L3-SP-B","date_depot":"05/07/2024","documents":true,"statut":"Validé","agent":"Admin"}');
INSERT INTO inscriptions (resource_key, payload) VALUES ('ETU-2024-006', '{"ref":"INS-2024-0006","etudiant":"Sané Ibrahima","matricule":"ETU-2024-006","filiere":"Génie Informatique","classe":"L2-GI-A","date_depot":"05/07/2024","documents":false,"statut":"En attente","agent":"-"}');
INSERT INTO inscriptions (resource_key, payload) VALUES ('ETU-2024-007', '{"ref":"INS-2024-0007","etudiant":"Bah Aïssatou","matricule":"ETU-2024-007","filiere":"Sciences Économiques","classe":"L1-SE-C","date_depot":"04/07/2024","documents":true,"statut":"Validé","agent":"Admin"}');
INSERT INTO inscriptions (resource_key, payload) VALUES ('ETU-2024-008', '{"ref":"INS-2024-0008","etudiant":"Camara Seydou","matricule":"ETU-2024-008","filiere":"Génie Électrique","classe":"L1-GEL-A","date_depot":"04/07/2024","documents":true,"statut":"Validé","agent":"Admin"}');
INSERT INTO inscriptions (resource_key, payload) VALUES ('ETU-2024-009', '{"ref":"INS-2024-0009","etudiant":"Sylla Kadiatou","matricule":"ETU-2024-009","filiere":"Marketing","classe":"L2-MKT-A","date_depot":"03/07/2024","documents":true,"statut":"Rejeté","agent":"Admin"}');
INSERT INTO inscriptions (resource_key, payload) VALUES ('ETU-2024-010', '{"ref":"INS-2024-0010","etudiant":"Barry Thierno","matricule":"ETU-2024-010","filiere":"Génie Informatique","classe":"L3-GI-A","date_depot":"03/07/2024","documents":true,"statut":"Validé","agent":"Admin"}');
INSERT INTO inscriptions (resource_key, payload) VALUES ('ETU-2024-011', '{"ref":"INS-2024-0011","etudiant":"Cissé Mariam","matricule":"ETU-2024-011","filiere":"Lettres & Langues","classe":"L1-LAL-A","date_depot":"02/07/2024","documents":true,"statut":"Validé","agent":"Admin"}');
INSERT INTO inscriptions (resource_key, payload) VALUES ('ETU-2024-012', '{"ref":"INS-2024-0012","etudiant":"Doumbia Bakary","matricule":"ETU-2024-012","filiere":"Gestion des Entreprises","classe":"L3-GE-A","date_depot":"01/07/2024","documents":false,"statut":"En attente","agent":"-"}');
INSERT INTO inscriptions (resource_key, payload) VALUES ('ETU-2024-013', '{"ref":"INS-2024-0013","etudiant":"Fofana Awa","matricule":"ETU-2024-013","filiere":"Sciences Économiques","classe":"L2-SE-A","date_depot":"01/07/2024","documents":true,"statut":"Validé","agent":"Admin"}');
INSERT INTO inscriptions (resource_key, payload) VALUES ('ETU-2024-014', '{"ref":"INS-2024-0014","etudiant":"Kouyaté Moussa","matricule":"ETU-2024-014","filiere":"Droit des Affaires","classe":"L1-DA-A","date_depot":"30/06/2024","documents":false,"statut":"En attente","agent":"-"}');
INSERT INTO inscriptions (resource_key, payload) VALUES ('ETU-2024-015', '{"ref":"INS-2024-0015","etudiant":"Sanogo Oumou","matricule":"ETU-2024-015","filiere":"Santé Publique","classe":"L2-SP-A","date_depot":"30/06/2024","documents":true,"statut":"Validé","agent":"Admin"}');
INSERT INTO inscriptions (resource_key, payload) VALUES ('ETU-2024-016', '{"ref":"INS-2024-0016","etudiant":"Diakité Omar","matricule":"ETU-2024-016","filiere":"Génie Civil","classe":"L2-GC-A","date_depot":"29/06/2024","documents":false,"statut":"En attente","agent":"-"}');
INSERT INTO inscriptions (resource_key, payload) VALUES ('ETU-2024-017', '{"ref":"INS-2024-0017","etudiant":"Keita Mariama","matricule":"ETU-2024-017","filiere":"Marketing","classe":"L1-MKT-A","date_depot":"28/06/2024","documents":true,"statut":"En attente","agent":"-"}');
INSERT INTO inscriptions (resource_key, payload) VALUES ('ETU-2024-018', '{"ref":"INS-2024-0018","etudiant":"Balde Ousmane","matricule":"ETU-2024-018","filiere":"Génie Informatique","classe":"L1-GI-A","date_depot":"28/06/2024","documents":true,"statut":"Rejeté","agent":"Admin"}');

CREATE TABLE paiements (
  id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  resource_key VARCHAR(120) NOT NULL,
  payload JSON NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  INDEX idx_paiements_resource_key (resource_key)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

INSERT INTO paiements (resource_key, payload) VALUES ('ETU-2024-001', '{"ref":"PAY-2024-0001","etudiant":"Koné Aminata","matricule":"ETU-2024-001","type":"Inscription","montant":50000,"mode":"Espèces","date":"07/07/2024","statut":"Validé"}');
INSERT INTO paiements (resource_key, payload) VALUES ('ETU-2024-001', '{"ref":"PAY-2024-0002","etudiant":"Koné Aminata","matricule":"ETU-2024-001","type":"Scolarité","montant":450000,"mode":"Virement","date":"07/07/2024","statut":"Validé"}');
INSERT INTO paiements (resource_key, payload) VALUES ('ETU-2024-002', '{"ref":"PAY-2024-0003","etudiant":"Diallo Mamadou","matricule":"ETU-2024-002","type":"Inscription","montant":50000,"mode":"Mobile Money","date":"07/07/2024","statut":"Validé"}');
INSERT INTO paiements (resource_key, payload) VALUES ('ETU-2024-002', '{"ref":"PAY-2024-0004","etudiant":"Diallo Mamadou","matricule":"ETU-2024-002","type":"Scolarité","montant":450000,"mode":"Chèque","date":"07/07/2024","statut":"Validé"}');
INSERT INTO paiements (resource_key, payload) VALUES ('ETU-2024-003', '{"ref":"PAY-2024-0005","etudiant":"Traoré Fatoumata","matricule":"ETU-2024-003","type":"Frais divers","montant":75000,"mode":"Espèces","date":"07/07/2024","statut":"Validé"}');
INSERT INTO paiements (resource_key, payload) VALUES ('ETU-2024-004', '{"ref":"PAY-2024-0006","etudiant":"Coulibaly Ibrahim","matricule":"ETU-2024-004","type":"Scolarité","montant":450000,"mode":"Mobile Money","date":"07/07/2024","statut":"En attente"}');
INSERT INTO paiements (resource_key, payload) VALUES ('ETU-2024-005', '{"ref":"PAY-2024-0007","etudiant":"Ouédraogo Marie","matricule":"ETU-2024-005","type":"Scolarité","montant":380000,"mode":"Virement","date":"07/07/2024","statut":"Validé"}');
INSERT INTO paiements (resource_key, payload) VALUES ('ETU-2024-006', '{"ref":"PAY-2024-0008","etudiant":"Sané Ibrahima","matricule":"ETU-2024-006","type":"Inscription","montant":50000,"mode":"Espèces","date":"07/07/2024","statut":"Validé"}');
INSERT INTO paiements (resource_key, payload) VALUES ('ETU-2024-007', '{"ref":"PAY-2024-0009","etudiant":"Bah Aïssatou","matricule":"ETU-2024-007","type":"Scolarité","montant":450000,"mode":"Chèque","date":"07/07/2024","statut":"Rejeté"}');
INSERT INTO paiements (resource_key, payload) VALUES ('ETU-2024-008', '{"ref":"PAY-2024-0010","etudiant":"Camara Seydou","matricule":"ETU-2024-008","type":"Scolarité","montant":450000,"mode":"Mobile Money","date":"07/07/2024","statut":"Validé"}');
INSERT INTO paiements (resource_key, payload) VALUES ('ETU-2024-010', '{"ref":"PAY-2024-0011","etudiant":"Barry Thierno","matricule":"ETU-2024-010","type":"Examen","montant":25000,"mode":"Espèces","date":"06/07/2024","statut":"Validé"}');
INSERT INTO paiements (resource_key, payload) VALUES ('ETU-2024-011', '{"ref":"PAY-2024-0012","etudiant":"Cissé Mariam","matricule":"ETU-2024-011","type":"Scolarité","montant":420000,"mode":"Virement","date":"06/07/2024","statut":"Validé"}');
INSERT INTO paiements (resource_key, payload) VALUES ('ETU-2024-013', '{"ref":"PAY-2024-0013","etudiant":"Fofana Awa","matricule":"ETU-2024-013","type":"Scolarité","montant":450000,"mode":"Mobile Money","date":"05/07/2024","statut":"Validé"}');
INSERT INTO paiements (resource_key, payload) VALUES ('ETU-2024-015', '{"ref":"PAY-2024-0014","etudiant":"Sanogo Oumou","matricule":"ETU-2024-015","type":"Inscription","montant":50000,"mode":"Espèces","date":"05/07/2024","statut":"Validé"}');
INSERT INTO paiements (resource_key, payload) VALUES ('ETU-2024-015', '{"ref":"PAY-2024-0015","etudiant":"Sanogo Oumou","matricule":"ETU-2024-015","type":"Scolarité","montant":380000,"mode":"Chèque","date":"04/07/2024","statut":"En attente"}');
INSERT INTO paiements (resource_key, payload) VALUES ('ETU-2024-012', '{"ref":"PAY-2024-0016","etudiant":"Doumbia Bakary","matricule":"ETU-2024-012","type":"Scolarité","montant":450000,"mode":"Virement","date":"03/07/2024","statut":"Validé"}');
INSERT INTO paiements (resource_key, payload) VALUES ('ETU-2024-009', '{"ref":"PAY-2024-0017","etudiant":"Sylla Kadiatou","matricule":"ETU-2024-009","type":"Frais divers","montant":30000,"mode":"Espèces","date":"02/07/2024","statut":"Validé"}');
INSERT INTO paiements (resource_key, payload) VALUES ('ETU-2024-014', '{"ref":"PAY-2024-0018","etudiant":"Kouyaté Moussa","matricule":"ETU-2024-014","type":"Inscription","montant":50000,"mode":"Mobile Money","date":"01/07/2024","statut":"En attente"}');

CREATE TABLE notifications (
  id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  resource_key VARCHAR(120) NOT NULL,
  payload JSON NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  INDEX idx_notifications_resource_key (resource_key)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

INSERT INTO notifications (resource_key, payload) VALUES ('1', '{"id":1,"titre":"Paiement en attente de validation","message":"Le paiement PAY-2024-0006 d''Ibrahim Coulibaly (450 000 FCFA) est en attente de validation.","categorie":"Paiements","date":"07/07/2024 09:15","lu":false}');
INSERT INTO notifications (resource_key, payload) VALUES ('2', '{"id":2,"titre":"12 nouvelles inscriptions reçues","message":"12 nouveaux dossiers d''inscription ont été déposés et sont en attente de traitement.","categorie":"Inscriptions","date":"07/07/2024 08:30","lu":false}');
INSERT INTO notifications (resource_key, payload) VALUES ('3', '{"id":3,"titre":"Réunion pédagogique demain 09h00","message":"Rappel : Réunion du corps enseignant demain matin à 09h00 en salle des délibérations.","categorie":"Académique","date":"06/07/2024 16:00","lu":false}');
INSERT INTO notifications (resource_key, payload) VALUES ('4', '{"id":4,"titre":"Paiement rejeté — Bah Aïssatou","message":"Le paiement par chèque de Bah Aïssatou a été rejeté (chèque sans provision).","categorie":"Paiements","date":"06/07/2024 14:20","lu":true}');
INSERT INTO notifications (resource_key, payload) VALUES ('5', '{"id":5,"titre":"Mise à jour du système","message":"Une mise à jour de maintenance sera effectuée ce weekend du 13 au 14 juillet 2024.","categorie":"Système","date":"05/07/2024 10:00","lu":true}');
INSERT INTO notifications (resource_key, payload) VALUES ('6', '{"id":6,"titre":"Clôture inscriptions L1 dans 24 jours","message":"Rappel : la date limite d''inscription en Licence 1 est le 31 juillet 2024.","categorie":"Inscriptions","date":"05/07/2024 08:00","lu":true}');
INSERT INTO notifications (resource_key, payload) VALUES ('7', '{"id":7,"titre":"Nouveau paiement Mobile Money reçu","message":"Paiement de 450 000 FCFA reçu par Mobile Money pour Camara Seydou (ETU-2024-008).","categorie":"Paiements","date":"04/07/2024 11:45","lu":true}');
INSERT INTO notifications (resource_key, payload) VALUES ('8', '{"id":8,"titre":"Inscription rejetée — dossier incomplet","message":"Le dossier d''Ibrahima Sané a été retourné : pièces d''identité manquantes.","categorie":"Inscriptions","date":"03/07/2024 15:30","lu":true}');
INSERT INTO notifications (resource_key, payload) VALUES ('9', '{"id":9,"titre":"Soutenance de thèses — liste des jurys","message":"La liste des membres de jury pour les soutenances du 20 août est disponible.","categorie":"Académique","date":"02/07/2024 09:00","lu":true}');
INSERT INTO notifications (resource_key, payload) VALUES ('10', '{"id":10,"titre":"Sauvegarde hebdomadaire effectuée","message":"La sauvegarde automatique des données du système a été réalisée avec succès.","categorie":"Système","date":"01/07/2024 02:00","lu":true}');

CREATE TABLE rapport_taux_reussite (
  id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  resource_key VARCHAR(120) NOT NULL,
  payload JSON NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  INDEX idx_rapport_taux_reussite_resource_key (resource_key)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

INSERT INTO rapport_taux_reussite (resource_key, payload) VALUES ('Génie Informatique', '{"filiere":"Génie Informatique","taux":78,"admis":376,"total":482}');
INSERT INTO rapport_taux_reussite (resource_key, payload) VALUES ('Gestion Entreprises', '{"filiere":"Gestion Entreprises","taux":82,"admis":512,"total":624}');
INSERT INTO rapport_taux_reussite (resource_key, payload) VALUES ('Droit des Affaires', '{"filiere":"Droit des Affaires","taux":75,"admis":417,"total":556}');
INSERT INTO rapport_taux_reussite (resource_key, payload) VALUES ('Sciences Éco.', '{"filiere":"Sciences Éco.","taux":80,"admis":312,"total":390}');
INSERT INTO rapport_taux_reussite (resource_key, payload) VALUES ('Génie Civil', '{"filiere":"Génie Civil","taux":71,"admis":226,"total":318}');
INSERT INTO rapport_taux_reussite (resource_key, payload) VALUES ('Santé Publique', '{"filiere":"Santé Publique","taux":85,"admis":236,"total":278}');
INSERT INTO rapport_taux_reussite (resource_key, payload) VALUES ('Génie Électrique', '{"filiere":"Génie Électrique","taux":69,"admis":148,"total":214}');
INSERT INTO rapport_taux_reussite (resource_key, payload) VALUES ('Lettres & Langues', '{"filiere":"Lettres & Langues","taux":88,"admis":158,"total":180}');

CREATE TABLE rapport_genre (
  id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  resource_key VARCHAR(120) NOT NULL,
  payload JSON NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  INDEX idx_rapport_genre_resource_key (resource_key)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

INSERT INTO rapport_genre (resource_key, payload) VALUES ('1640', '{"name":"Femmes","value":1640,"fill":"hsl(221, 83%, 53%)"}');
INSERT INTO rapport_genre (resource_key, payload) VALUES ('2202', '{"name":"Hommes","value":2202,"fill":"hsl(142, 71%, 45%)"}');

CREATE TABLE rapport_evolution (
  id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  resource_key VARCHAR(120) NOT NULL,
  payload JSON NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  INDEX idx_rapport_evolution_resource_key (resource_key)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

INSERT INTO rapport_evolution (resource_key, payload) VALUES ('row-1', '{"annee":"2019-2020","etudiants":2100,"enseignants":180}');
INSERT INTO rapport_evolution (resource_key, payload) VALUES ('row-2', '{"annee":"2020-2021","etudiants":2480,"enseignants":198}');
INSERT INTO rapport_evolution (resource_key, payload) VALUES ('row-3', '{"annee":"2021-2022","etudiants":2850,"enseignants":215}');
INSERT INTO rapport_evolution (resource_key, payload) VALUES ('row-4', '{"annee":"2022-2023","etudiants":3200,"enseignants":228}');
INSERT INTO rapport_evolution (resource_key, payload) VALUES ('row-5', '{"annee":"2023-2024","etudiants":3560,"enseignants":240}');
INSERT INTO rapport_evolution (resource_key, payload) VALUES ('row-6', '{"annee":"2024-2025","etudiants":3842,"enseignants":247}');

CREATE TABLE evenements (
  id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  resource_key VARCHAR(120) NOT NULL,
  payload JSON NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  INDEX idx_evenements_resource_key (resource_key)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

INSERT INTO evenements (resource_key, payload) VALUES ('1', '{"id":1,"titre":"Rentrée académique 2024-2025","date":"2024-09-02","type":"Académique","description":"Début de l''année universitaire"}');
INSERT INTO evenements (resource_key, payload) VALUES ('2', '{"id":2,"titre":"Examens de mi-semestre","date":"2024-11-11","type":"Examen","description":"Sessions d''examens pour tous les niveaux"}');
INSERT INTO evenements (resource_key, payload) VALUES ('3', '{"id":3,"titre":"Conseil d''administration","date":"2024-07-15","type":"Administratif","description":"Réunion du CA — Salle des délibérations"}');
INSERT INTO evenements (resource_key, payload) VALUES ('4', '{"id":4,"titre":"Journée portes ouvertes","date":"2024-07-20","type":"Événement","description":"Accueil des futurs étudiants"}');
INSERT INTO evenements (resource_key, payload) VALUES ('5', '{"id":5,"titre":"Clôture des inscriptions L1","date":"2024-07-31","type":"Inscription","description":"Date limite d''inscription en Licence 1"}');
INSERT INTO evenements (resource_key, payload) VALUES ('6', '{"id":6,"titre":"Soutenance de thèses","date":"2024-08-20","type":"Académique","description":"Soutenances Doctorat — Amphithéâtre A"}');
INSERT INTO evenements (resource_key, payload) VALUES ('7', '{"id":7,"titre":"Réunion pédagogique","date":"2024-07-10","type":"Administratif","description":"Réunion du corps enseignant"}');
INSERT INTO evenements (resource_key, payload) VALUES ('8', '{"id":8,"titre":"Dépôt dossiers Master","date":"2024-07-25","type":"Inscription","description":"Dossiers d''inscription Master 1 — Bureau scolarité"}');
INSERT INTO evenements (resource_key, payload) VALUES ('9', '{"id":9,"titre":"Jury de délibération L3","date":"2024-08-05","type":"Examen","description":"Délibérations finales Licence 3 — Amphi B"}');
INSERT INTO evenements (resource_key, payload) VALUES ('10', '{"id":10,"titre":"Conférence académique","date":"2024-09-15","type":"Académique","description":"Colloque international sur l''innovation pédagogique"}');

CREATE TABLE dashboard_stats (
  id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  resource_key VARCHAR(120) NOT NULL,
  payload JSON NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  INDEX idx_dashboard_stats_resource_key (resource_key)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

INSERT INTO dashboard_stats (resource_key, payload) VALUES ('row-1', '{"students":3842,"teachers":247,"filieres":18,"classes":64,"inscriptions":412,"paiementsJour":38,"montantEncaisse":2850000,"studentsTrend":5.2,"teachersTrend":1.6,"inscriptionsTrend":8.1,"montantTrend":12.4}');

CREATE TABLE dashboard_enrollments_chart (
  id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  resource_key VARCHAR(120) NOT NULL,
  payload JSON NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  INDEX idx_dashboard_enrollments_chart_resource_key (resource_key)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

INSERT INTO dashboard_enrollments_chart (resource_key, payload) VALUES ('row-1', '{"mois":"Août","inscriptions":312}');
INSERT INTO dashboard_enrollments_chart (resource_key, payload) VALUES ('row-2', '{"mois":"Sep","inscriptions":298}');
INSERT INTO dashboard_enrollments_chart (resource_key, payload) VALUES ('row-3', '{"mois":"Oct","inscriptions":275}');
INSERT INTO dashboard_enrollments_chart (resource_key, payload) VALUES ('row-4', '{"mois":"Nov","inscriptions":260}');
INSERT INTO dashboard_enrollments_chart (resource_key, payload) VALUES ('row-5', '{"mois":"Déc","inscriptions":240}');
INSERT INTO dashboard_enrollments_chart (resource_key, payload) VALUES ('row-6', '{"mois":"Jan","inscriptions":410}');
INSERT INTO dashboard_enrollments_chart (resource_key, payload) VALUES ('row-7', '{"mois":"Fév","inscriptions":385}');
INSERT INTO dashboard_enrollments_chart (resource_key, payload) VALUES ('row-8', '{"mois":"Mar","inscriptions":352}');
INSERT INTO dashboard_enrollments_chart (resource_key, payload) VALUES ('row-9', '{"mois":"Avr","inscriptions":330}');
INSERT INTO dashboard_enrollments_chart (resource_key, payload) VALUES ('row-10', '{"mois":"Mai","inscriptions":290}');
INSERT INTO dashboard_enrollments_chart (resource_key, payload) VALUES ('row-11', '{"mois":"Juin","inscriptions":260}');
INSERT INTO dashboard_enrollments_chart (resource_key, payload) VALUES ('row-12', '{"mois":"Juil","inscriptions":412}');

CREATE TABLE dashboard_revenue_chart (
  id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  resource_key VARCHAR(120) NOT NULL,
  payload JSON NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  INDEX idx_dashboard_revenue_chart_resource_key (resource_key)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

INSERT INTO dashboard_revenue_chart (resource_key, payload) VALUES ('row-1', '{"mois":"Août","scolarite":1800000,"autres":320000}');
INSERT INTO dashboard_revenue_chart (resource_key, payload) VALUES ('row-2', '{"mois":"Sep","scolarite":1650000,"autres":290000}');
INSERT INTO dashboard_revenue_chart (resource_key, payload) VALUES ('row-3', '{"mois":"Oct","scolarite":1500000,"autres":260000}');
INSERT INTO dashboard_revenue_chart (resource_key, payload) VALUES ('row-4', '{"mois":"Nov","scolarite":1400000,"autres":240000}');
INSERT INTO dashboard_revenue_chart (resource_key, payload) VALUES ('row-5', '{"mois":"Déc","scolarite":1200000,"autres":200000}');
INSERT INTO dashboard_revenue_chart (resource_key, payload) VALUES ('row-6', '{"mois":"Jan","scolarite":2400000,"autres":410000}');
INSERT INTO dashboard_revenue_chart (resource_key, payload) VALUES ('row-7', '{"mois":"Fév","scolarite":2200000,"autres":380000}');
INSERT INTO dashboard_revenue_chart (resource_key, payload) VALUES ('row-8', '{"mois":"Mar","scolarite":2000000,"autres":350000}');
INSERT INTO dashboard_revenue_chart (resource_key, payload) VALUES ('row-9', '{"mois":"Avr","scolarite":1850000,"autres":320000}');
INSERT INTO dashboard_revenue_chart (resource_key, payload) VALUES ('row-10', '{"mois":"Mai","scolarite":1650000,"autres":290000}');
INSERT INTO dashboard_revenue_chart (resource_key, payload) VALUES ('row-11', '{"mois":"Juin","scolarite":1450000,"autres":260000}');
INSERT INTO dashboard_revenue_chart (resource_key, payload) VALUES ('row-12', '{"mois":"Juil","scolarite":2850000,"autres":430000}');

CREATE TABLE dashboard_students_recent (
  id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  resource_key VARCHAR(120) NOT NULL,
  payload JSON NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  INDEX idx_dashboard_students_recent_resource_key (resource_key)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

INSERT INTO dashboard_students_recent (resource_key, payload) VALUES ('ETU-2024-001', '{"id":"ETU-2024-001","nom":"Koné Aminata","filiere":"Génie Informatique","classe":"L1-GI-A","date":"2024-07-07","statut":"Actif"}');
INSERT INTO dashboard_students_recent (resource_key, payload) VALUES ('ETU-2024-002', '{"id":"ETU-2024-002","nom":"Diallo Mamadou","filiere":"Gestion des Entreprises","classe":"L1-GE-B","date":"2024-07-07","statut":"Actif"}');
INSERT INTO dashboard_students_recent (resource_key, payload) VALUES ('ETU-2024-003', '{"id":"ETU-2024-003","nom":"Traoré Fatoumata","filiere":"Droit des Affaires","classe":"L2-DA-A","date":"2024-07-06","statut":"Actif"}');
INSERT INTO dashboard_students_recent (resource_key, payload) VALUES ('ETU-2024-004', '{"id":"ETU-2024-004","nom":"Coulibaly Ibrahim","filiere":"Génie Civil","classe":"L1-GC-A","date":"2024-07-06","statut":"Actif"}');
INSERT INTO dashboard_students_recent (resource_key, payload) VALUES ('ETU-2024-005', '{"id":"ETU-2024-005","nom":"Ouédraogo Marie","filiere":"Santé Publique","classe":"L3-SP-B","date":"2024-07-05","statut":"Actif"}');
INSERT INTO dashboard_students_recent (resource_key, payload) VALUES ('ETU-2024-006', '{"id":"ETU-2024-006","nom":"Sané Ibrahima","filiere":"Génie Informatique","classe":"L2-GI-A","date":"2024-07-05","statut":"En attente"}');
INSERT INTO dashboard_students_recent (resource_key, payload) VALUES ('ETU-2024-007', '{"id":"ETU-2024-007","nom":"Bah Aïssatou","filiere":"Sciences Économiques","classe":"L1-SE-C","date":"2024-07-04","statut":"Actif"}');
INSERT INTO dashboard_students_recent (resource_key, payload) VALUES ('ETU-2024-008', '{"id":"ETU-2024-008","nom":"Camara Seydou","filiere":"Génie Électrique","classe":"L1-GEL-A","date":"2024-07-04","statut":"Actif"}');

CREATE TABLE dashboard_payments_recent (
  id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  resource_key VARCHAR(120) NOT NULL,
  payload JSON NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  INDEX idx_dashboard_payments_recent_resource_key (resource_key)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

INSERT INTO dashboard_payments_recent (resource_key, payload) VALUES ('PAY-2024-0412', '{"ref":"PAY-2024-0412","etudiant":"Koné Aminata","type":"Scolarité","montant":450000,"date":"07/07/2024","statut":"Validé"}');
INSERT INTO dashboard_payments_recent (resource_key, payload) VALUES ('PAY-2024-0411', '{"ref":"PAY-2024-0411","etudiant":"Diallo Mamadou","type":"Scolarité","montant":450000,"date":"07/07/2024","statut":"Validé"}');
INSERT INTO dashboard_payments_recent (resource_key, payload) VALUES ('PAY-2024-0410', '{"ref":"PAY-2024-0410","etudiant":"Traoré Fatoumata","type":"Frais divers","montant":75000,"date":"07/07/2024","statut":"Validé"}');
INSERT INTO dashboard_payments_recent (resource_key, payload) VALUES ('PAY-2024-0409', '{"ref":"PAY-2024-0409","etudiant":"Coulibaly Ibrahim","type":"Scolarité","montant":450000,"date":"07/07/2024","statut":"En attente"}');
INSERT INTO dashboard_payments_recent (resource_key, payload) VALUES ('PAY-2024-0408', '{"ref":"PAY-2024-0408","etudiant":"Ouédraogo Marie","type":"Scolarité","montant":380000,"date":"07/07/2024","statut":"Validé"}');
INSERT INTO dashboard_payments_recent (resource_key, payload) VALUES ('PAY-2024-0407', '{"ref":"PAY-2024-0407","etudiant":"Sané Ibrahima","type":"Inscription","montant":50000,"date":"07/07/2024","statut":"Validé"}');
INSERT INTO dashboard_payments_recent (resource_key, payload) VALUES ('PAY-2024-0406', '{"ref":"PAY-2024-0406","etudiant":"Bah Aïssatou","type":"Scolarité","montant":450000,"date":"07/07/2024","statut":"Rejeté"}');
INSERT INTO dashboard_payments_recent (resource_key, payload) VALUES ('PAY-2024-0405', '{"ref":"PAY-2024-0405","etudiant":"Camara Seydou","type":"Scolarité","montant":450000,"date":"07/07/2024","statut":"Validé"}');

CREATE TABLE dashboard_events (
  id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  resource_key VARCHAR(120) NOT NULL,
  payload JSON NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  INDEX idx_dashboard_events_resource_key (resource_key)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

INSERT INTO dashboard_events (resource_key, payload) VALUES ('1', '{"id":1,"titre":"Rentrée académique 2024-2025","date":"2024-09-02","type":"Académique","description":"Début de l''année universitaire"}');
INSERT INTO dashboard_events (resource_key, payload) VALUES ('2', '{"id":2,"titre":"Examens de mi-semestre","date":"2024-11-11","type":"Examen","description":"Sessions d''examens pour tous les niveaux"}');
INSERT INTO dashboard_events (resource_key, payload) VALUES ('3', '{"id":3,"titre":"Conseil d''administration","date":"2024-07-15","type":"Administratif","description":"Réunion du CA - Salle des délibérations"}');
INSERT INTO dashboard_events (resource_key, payload) VALUES ('4', '{"id":4,"titre":"Journée portes ouvertes","date":"2024-07-20","type":"Événement","description":"Accueil des futurs étudiants"}');
INSERT INTO dashboard_events (resource_key, payload) VALUES ('5', '{"id":5,"titre":"Clôture des inscriptions L1","date":"2024-07-31","type":"Inscription","description":"Date limite d''inscription en Licence 1"}');
INSERT INTO dashboard_events (resource_key, payload) VALUES ('6', '{"id":6,"titre":"Soutenance de thèses","date":"2024-08-20","type":"Académique","description":"Soutenances Doctorat — Amphithéâtre A"}');
INSERT INTO dashboard_events (resource_key, payload) VALUES ('7', '{"id":7,"titre":"Réunion pédagogique","date":"2024-07-10","type":"Administratif","description":"Réunion du corps enseignant"}');

CREATE TABLE academic_years (
  id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  resource_key VARCHAR(120) NOT NULL,
  payload JSON NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  INDEX idx_academic_years_resource_key (resource_key)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

INSERT INTO academic_years (resource_key, payload) VALUES ('2024-2025', '{"value":"2024-2025","label":"2024-2025 (En cours)"}');
INSERT INTO academic_years (resource_key, payload) VALUES ('2023-2024', '{"value":"2023-2024","label":"2023-2024"}');
INSERT INTO academic_years (resource_key, payload) VALUES ('2022-2023', '{"value":"2022-2023","label":"2022-2023"}');
INSERT INTO academic_years (resource_key, payload) VALUES ('2021-2022', '{"value":"2021-2022","label":"2021-2022"}');

