// emploi.ts
export interface PlageHoraire {
  heureDebut: string;
  heureFin: string;
  _id?: string;
}

export interface Emploi {
  _id?: string;
  nom: string;
  lundi: PlageHoraire[];
  mardi: PlageHoraire[];  
  mercredi: PlageHoraire[];
  jeudi: PlageHoraire[];
  vendredi: PlageHoraire[]; 
  samedi: PlageHoraire[];
  dimanche: PlageHoraire[];
}
