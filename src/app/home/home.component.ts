import { Component, OnInit } from '@angular/core';

import { FormationPopulaire } from '../model/FormationPopulaire';
import { FormationPopulaireService } from '../services/formationpopulaire.service';
import { FormationService } from '../services/formation.service';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']

})
export class HomeComponent implements OnInit {
  formations: any = {};

  constructor(private  formationService: FormationService) { }

  ngOnInit(): void {
    this.getAllFormations();
  }

  getAllFormations(): void {
    this.formationService.getAllFormations().subscribe({
      next: (formations) => {
        this.formations = formations;
        // Initialize filtered formations
      },
      error: (error) => {
        console.error('Error fetching formations:', error);
      }
    });
  }}
