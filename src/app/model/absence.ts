import { Etudiant } from './etudiant'; // Adjust the import based on your file structure
import { Module } from './module'; // Adjust the import based on your file structure

export interface Absence {
  etudiants: Etudiant[]; 
  module: Module; 
  date: Date;
  sessionNumber: number;
}
