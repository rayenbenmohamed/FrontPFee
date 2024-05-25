export interface Enseignant {
  _id?: string;
  nom: string;
  prenom: string;
  numTel: number;
  email: string;
  cin: string;
  certificat: string;
  compte: string; // Assuming the compte is represented by its ID
}
