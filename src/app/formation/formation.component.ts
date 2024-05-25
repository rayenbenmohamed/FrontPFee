// src/app/formation/formation.component.ts
import { Component, OnInit } from '@angular/core';
import { Formation } from '../model/formation'; // Importer le modèle de formation
import { FormationService } from '../services/formation.service'; // Importer le service de formation

@Component({
  selector: 'app-formation',
  templateUrl: './formation.component.html',
  styleUrls: ['./formation.component.css']
})
export class FormationComponent implements OnInit {
  formations: Formation[] = [];
  filteredFormations: Formation[] = [];
  searchText: string = '';

  constructor(private formationService: FormationService) {}

  ngOnInit(): void {
    this.getAllFormations();
  }

  getAllFormations(): void {
    this.formationService.getAllFormations().subscribe({
      next: (formations) => {
        this.formations = formations;
        this.filteredFormations = formations; // Initialize filtered formations
      },
      error: (error) => {
        console.error('Error fetching formations:', error);
      }
    });
  }

  onSearchTextChange(): void {
    this.filteredFormations = this.filterFormation();
  }

  filterFormation(): Formation[] {
    if (!this.searchText.trim()) {
      return this.formations; // If search text is empty, return all formations
    }

    const searchTextLowerCase = this.searchText.toLowerCase();
    return this.formations.filter(formation =>
      formation.nomformation.toLowerCase().includes(searchTextLowerCase)
    );
  }
}
