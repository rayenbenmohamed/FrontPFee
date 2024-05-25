import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { DemandeinsService } from '../services/DemandeIns.service';
import { Demandeins } from '../model/Demandeins';
import { FormationService } from '../services/formation.service';
import { Formation } from '../model/formation';

@Component({
  selector: 'app-demande-ins',
  templateUrl: './demande-ins.component.html',
  styleUrls: ['./demande-ins.component.css']
})
export class DemandeInsComponent implements OnInit {
  formationId!: string;
  demandeinsForm!: FormGroup;
  formation:Formation | null = null;
  successMessage: string = '';
  showError: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private demandeinsService: DemandeinsService,
    private formBuilder: FormBuilder,
    private Formationservice :FormationService
  ) { }

  ngOnInit(): void {
    this.formationId = this.route.snapshot.paramMap.get('id')!;
    if (this.formationId) {
      this.Formationservice.getFormationById(this.formationId).subscribe({
        next: (data: Formation) => {
          this.formation = data; // Now correctly waits for the data to be fetched
        },
        error: (error) => {
          console.error('Failed to get formation details', error);
          this.formation = null; // Handle error, possibly clear the formation data
        }
      });
    } else {
      console.error('No formation ID provided in the route.');
      this.formation = null; // Handle missing ID appropriately
    }
  
    this.initForm();
  }
  

  private initForm(): void {
    this.demandeinsForm = this.formBuilder.group({
      nom: ['', Validators.required],
      Prenom: ['', Validators.required],
      cin: ['', Validators.required],
      date_naissance: ['', Validators.required],
      numTel: ['', [Validators.required, Validators.pattern("^[0-9]*$")]],
      email: ['', [Validators.required, Validators.email]],
      niveauScolaire: ['', Validators.required]
    });
  }

  onSubmit(): void {
    if (this.demandeinsForm.valid) {
      this.demandeinsService.sendDemandeins(this.demandeinsForm.value, this.formationId).subscribe({
        next: (response: Demandeins) => {
          this.successMessage = 'Inscription demandée avec succès!';
          this.showError = false;
          console.log('Inscription demandée avec succès:', response);
          this.demandeinsForm.reset(); // Reset the form after successful submission
        },
        error: (error: any) => {
          console.error('Erreur lors de l\'envoi de la demande:', error);
          this.successMessage = '';
          this.showError = true;
        }
      });
    } else {
      console.error('Formulaire non valide');
      this.showError = true;
      this.successMessage = '';
    }
  }
  
}
