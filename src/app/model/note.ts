import { Etudiant } from "./etudiant";
import { Module } from "./module";

// src/app/model/note.ts
export interface Note {
    _id?: string;
    etudiant: Etudiant; // This should be the ID of the Etudiant
    module: Module; // This should be the ID of the Module
    note: number;
    commentaire: string;
  }
  