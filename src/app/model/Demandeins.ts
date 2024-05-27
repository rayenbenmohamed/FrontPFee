import { Formation } from "./formation";

export interface Demandeins {
  _id: string;
  nom: string;
  Prenom: string;
  cin: string;
  date_naissance: Date;
  numTel: string;
  email: string;
  Formation: Formation;
  niveauScolaire: string;
}
