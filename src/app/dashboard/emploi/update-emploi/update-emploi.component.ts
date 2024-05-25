import { Component, EventEmitter, Inject, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, FormControl } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Emploi, PlageHoraire } from 'src/app/model/emploi';
import { EmploiService } from 'src/app/services/emploi.service';

@Component({
  selector: 'app-update-emploi',
  templateUrl: './update-emploi.component.html',
  styleUrls: ['./update-emploi.component.css'],
})
export class UpdateEmploiComponent implements OnInit {
  @Output() emploiUpdated = new EventEmitter<void>();
  emploiForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private emploiService: EmploiService,
    @Inject(MAT_DIALOG_DATA) public data: { emploi: Emploi }
  ) {
    this.emploiForm = this.fb.group({
      nom: [''],
      lundi_heureDebut: [''],
      lundi_heureFin: [''],
      mardi_heureDebut: [''],
      mardi_heureFin: [''],
      mercredi_heureDebut: [''],
      mercredi_heureFin: [''],
      jeudi_heureDebut: [''],
      jeudi_heureFin: [''],
      vendredi_heureDebut: [''],
      vendredi_heureFin: [''],
      samedi_heureDebut: [''],
      samedi_heureFin: [''],
      dimanche_heureDebut: [''],
      dimanche_heureFin: [''],
    });

    if (this.data.emploi) {
      this.populateForm(this.data.emploi);
    }
  }

  ngOnInit(): void {}

  populateForm(emploi: Emploi): void {
    this.emploiForm.patchValue({
      nom: emploi.nom,
      lundi_heureDebut: this.getPlageHeureDebut(emploi.lundi),
      lundi_heureFin: this.getPlageHeureFin(emploi.lundi),
      mardi_heureDebut: this.getPlageHeureDebut(emploi.mardi),
      mardi_heureFin: this.getPlageHeureFin(emploi.mardi),
      mercredi_heureDebut: this.getPlageHeureDebut(emploi.mercredi),
      mercredi_heureFin: this.getPlageHeureFin(emploi.mercredi),
      jeudi_heureDebut: this.getPlageHeureDebut(emploi.jeudi),
      jeudi_heureFin: this.getPlageHeureFin(emploi.jeudi),
      vendredi_heureDebut: this.getPlageHeureDebut(emploi.vendredi),
      vendredi_heureFin: this.getPlageHeureFin(emploi.vendredi),
      samedi_heureDebut: this.getPlageHeureDebut(emploi.samedi),
      samedi_heureFin: this.getPlageHeureFin(emploi.samedi),
      dimanche_heureDebut: this.getPlageHeureDebut(emploi.dimanche),
      dimanche_heureFin: this.getPlageHeureFin(emploi.dimanche),
    });
  }

  getPlageHeureDebut(plages: PlageHoraire[]): string {
    if (plages.length > 0) {
      return plages[0].heureDebut;
    }
    return '';
  }

  getPlageHeureFin(plages: PlageHoraire[]): string {
    const lastIndex = plages.length - 1;
    if (lastIndex >= 0) {
      return plages[lastIndex].heureFin;
    }
    return '';
  }

  saveEmploi(): void {
    if (this.emploiForm.valid) {
      const updatedEmploi: Emploi = {
        _id: this.data.emploi._id, // Include the emploi ID for updating
        nom: this.emploiForm.get('nom')?.value || '', // Use optional chaining and provide a default value
        lundi: [{
          heureDebut: this.emploiForm.get('lundi_heureDebut')?.value || '', // Use optional chaining and provide a default value
          heureFin: this.emploiForm.get('lundi_heureFin')?.value || '' // Use optional chaining and provide a default value
        }],
        mardi: [{
          heureDebut: this.emploiForm.get('mardi_heureDebut')?.value || '', // Use optional chaining and provide a default value
          heureFin: this.emploiForm.get('mardi_heureFin')?.value || '' // Use optional chaining and provide a default value
        }],
        mercredi: [{
          heureDebut: this.emploiForm.get('mercredi_heureDebut')?.value || '', // Use optional chaining and provide a default value
          heureFin: this.emploiForm.get('mercredi_heureFin')?.value || '' // Use optional chaining and provide a default value
        }],
        jeudi: [{
          heureDebut: this.emploiForm.get('jeudi_heureDebut')?.value || '', // Use optional chaining and provide a default value
          heureFin: this.emploiForm.get('jeudi_heureFin')?.value || '' // Use optional chaining and provide a default value
        }],
        vendredi: [{
          heureDebut: this.emploiForm.get('vendredi_heureDebut')?.value || '', // Use optional chaining and provide a default value
          heureFin: this.emploiForm.get('vendredi_heureFin')?.value || '' // Use optional chaining and provide a default value
        }],
        samedi: [{
          heureDebut: this.emploiForm.get('samedi_heureDebut')?.value || '', // Use optional chaining and provide a default value
          heureFin: this.emploiForm.get('samedi_heureFin')?.value || '' // Use optional chaining and provide a default value
        }],
        dimanche: [{
          heureDebut: this.emploiForm.get('dimanche_heureDebut')?.value || '', // Use optional chaining and provide a default value
          heureFin: this.emploiForm.get('dimanche_heureFin')?.value || '' // Use optional chaining and provide a default value
        }]
      };
  
      this.emploiService.updateEmploi(this.data.emploi._id!, updatedEmploi).subscribe({
        next: (response) => {
          this.emploiUpdated.emit();
          console.log('Emploi updated successfully', response);
        },
        error: (error) => console.error('Error updating emploi:', error)
      });
    }
  }
  
  
  removePlage(day: string, index: number): void {
    (this.emploiForm.get(day) as FormArray).removeAt(index);
  }
}
