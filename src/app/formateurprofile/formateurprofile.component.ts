// formateurprofile.component.ts
import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { Module } from '../model/module';
import { Compte } from '../model/compte';
import { AbsenceService } from '../services/absence.service';
import { AccountService } from '../services/account.service'; // Ensure you have imported AccountService

import { Etudiant } from '../model/etudiant';
import { Enseignant } from '../model/enseignant';
import { Router } from '@angular/router';

@Component({
  selector: 'app-formateurprofile',
  templateUrl: './formateurprofile.component.html',
  styleUrls: ['./formateurprofile.component.css']
})
export class FormateurprofileComponent {

  constructor(
    private accountService: AccountService,
    private authService: AuthService,
    private router:Router,
  ) {}

  compte: Compte | null = null;
  enseig: Enseignant | null = null;
  modules: Module[] = [];
  etudiantsAbsents: Etudiant[] = []; // Liste des étudiants absents
  selectedModuleId: string | null = null; // ID du module sélectionné

  ngOnInit(): void {
    this.fetchAccountDetails();
  }

 
  onFileSelected(event: any): void {
    const file: File = event.target.files[0];
    if (file) {
      this.uploadImage(file);
    }
  }
  uploadImage(file: File): void {
    if (this.compte && this.compte._id) {
      this.accountService.uploadAccountImage(this.compte._id, file).subscribe({
        next: (response) => {
          console.log('Image uploaded successfully:', response);
          if (this.compte) { // Check if compte is not null before accessing it
            this.compte.imageUrl = response.imageUrl; // Safely update imageUrl
          }
        },
        error: (error) => {
          console.error('Error uploading image:', error);
        }
      });
    }
  }

  fetchAccountDetails(): void {
    this.enseig = this.authService.getEnsegnant();
    this.compte = this.authService.getCompteInfo();
    if (this.compte) {
       this.modules = this.authService.getModules() || [];
    }
  }


}
