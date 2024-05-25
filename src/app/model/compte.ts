export interface Compte {
    _id: string; // Identifiant MongoDB généré automatiquement
    nomUtilisateur: string;
    motDePasse: string;
    estActive: boolean;
    role: 'candidat' | 'formateur' | 'admin';
    imageUrl?: string;  // Optional property

  }
  