import { Categorie } from "./categorie";

export interface Formation {
  _id?: string;
  nomformation: string;
  duree: string;
  description: string;
  prix: number;
  image: string;
  niveau: string;
  categorie: Categorie; // Change type to Categorie
}
