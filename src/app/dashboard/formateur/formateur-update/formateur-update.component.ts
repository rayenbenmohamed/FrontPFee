import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { EnseignantService } from 'src/app/services/Formateur.service';
import { Enseignant } from 'src/app/model/enseignant';

@Component({
  selector: 'app-formateur-update',
  templateUrl: './formateur-update.component.html',
  styleUrls: ['./formateur-update.component.css']
})
export class FormateurUpdateComponent implements OnInit {
  updateForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<FormateurUpdateComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { formateur: Enseignant },
    private enseignantService: EnseignantService
  ) {
    this.updateForm = this.fb.group({
      nom: ['', Validators.required],
      prenom: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      numTel: ['', Validators.required],
      cin: ['', Validators.required],
      certificat: ['']
    });
  }

  ngOnInit(): void {
    // Populate the form with the data passed to the dialog
    this.updateForm.patchValue(this.data.formateur);
  }

  onSubmit(): void {
    if (this.updateForm.valid) {
      const id = this.data.formateur._id;
      if (!id) {
        console.error('No ID provided for the formateur');
        console.log('Cannot update formateur without an ID');  // Log to console instead of alert
        return;
      }
  
      this.enseignantService.updateEnseignant(id, this.updateForm.value).subscribe({
        next: () => {
          this.dialogRef.close(true);
          console.log('Enseignant updated successfully');  // Log to console instead of alert
        },
        error: (error) => {
          console.error('Error updating enseignant:', error);
          console.log('Failed to update enseignant');  // Log to console instead of alert
        }
      });
    }
  }
  

  onCancel(): void {
    this.dialogRef.close();
  }
}
