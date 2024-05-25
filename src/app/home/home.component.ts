import { Component, OnInit } from '@angular/core';

import { FormationPopulaire } from '../model/FormationPopulaire';
import { FormationPopulaireService } from '../services/formationpopulaire.service';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']

})
export class HomeComponent implements OnInit {
  popularFormations: FormationPopulaire[] = [];

  constructor(private formationPopulaireService: FormationPopulaireService) { }

  ngOnInit(): void {
    this.formationPopulaireService.getAllPopularFormations().subscribe({
      next: (formations) => {
        this.popularFormations = formations;
      },
      error: (err) => console.error('Failed to load popular formations:', err)
    });
  }
}
