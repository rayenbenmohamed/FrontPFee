import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { EnseignantService } from 'src/app/services/Formateur.service';

@Component({
  selector: 'app-formateur-add',
  templateUrl: './formateur-add.component.html',
  styleUrls: ['./formateur-add.component.css']
})
export class FormateurAddComponent {
  formateurForm: FormGroup = this.fb.group({
    nom: ['', Validators.required],
    prenom: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    numTel: ['', Validators.required],
    cin: ['', Validators.required],
    certificat: ['']
  });
  
  constructor(
    private fb: FormBuilder,
    private enseignantService: EnseignantService,
    private dialogRef: MatDialogRef<FormateurAddComponent>
  ) { }
  

  createForm() {
    this.formateurForm = this.fb.group({
      nom: [''],
      prenom: [''],
      email: [''],
      numTel: [''],
      cin: [''],
      certificat: ['']
    });
  }
  

  onSubmit() {
    console.log('Attempting to submit form');
    console.log('Form validity:', this.formateurForm.valid);
  
    if (this.formateurForm.valid) {
      this.enseignantService.createEnseignant(this.formateurForm.value).subscribe({
        next: (enseignant) => {
          console.log('Enseignant added:', enseignant);
          this.dialogRef.close(enseignant);
        },
        error: (error) => {
          console.error('Error creating enseignant:', error);
        }
      });
    } else {
      Object.keys(this.formateurForm.controls).forEach(key => {
        // Use optional chaining to access errors safely
        const controlErrors = this.formateurForm.get(key)?.errors;
        if (controlErrors != null) {
          console.log('Control:', key, 'Errors:', controlErrors);
        }
      });
    }
  }
  
}
