export interface Etudiant {
    _id?: string; // Identifiant MongoDB généré automatiquement
    nom: string;
    prenom: string;
    date_naissance: Date;
    numTel?: string; // Facultatif
    email?: string; // Facultatif
    cin?: string; // Facultatif
    niveauScolaire?: string; // Facultatif
    montantApaye?: number; // Facultatif
    compte: string; // Identifiant d'objet Compte
  }
  