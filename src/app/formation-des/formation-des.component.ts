import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormationService } from '../services/formation.service';

@Component({
  selector: 'app-formation-des',
  templateUrl: './formation-des.component.html',
  styleUrls: ['./formation-des.component.css']
})
export class FormationDesComponent implements OnInit {
  formation: any = {};

  constructor(
    private route: ActivatedRoute,
    private formationService: FormationService
  ) {}

  ngOnInit(): void {
    const formationId = this.route.snapshot.paramMap.get('id');
    if (formationId) {
      this.formationService.getFormationById(formationId).subscribe((data: any) => {
        this.formation = data;
      });
    } else {
      console.error('Formation ID is null');
    }
  }
}
