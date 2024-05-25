import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { EnseignantService } from 'src/app/services/Formateur.service';

@Component({
  selector: 'app-formateur-register',
  templateUrl: './formateur-register.component.html',
  styleUrls: ['./formateur-register.component.css']
})
export class FormateurRegisterComponent {
  registerForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<FormateurRegisterComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private enseignantService: EnseignantService
  ) {
    console.log('Received Formateur ID:', this.data.formateurId);  // Check the received ID
    if (!this.data.formateurId) {
      console.error('No Formateur ID provided to FormateurRegisterComponent');
    }
  
    this.registerForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }
  
  onSubmit(): void {
    console.log('Form Data:', this.registerForm.value);  // Check the exact payload being sent
  
    if (this.registerForm.valid) {
      this.enseignantService.addCompteToEnseignant(this.data.formateurId, {
        nomUtilisateur: this.registerForm.value.username,
        motDePasse: this.registerForm.value.password
      }).subscribe({
        next: () => {
          this.dialogRef.close(true);
          console.log('Account successfully added');
        },
        error: (error) => {
          console.error('Error adding account:', error);
        }
      });
    } else {
      console.log('Form is not valid', this.registerForm.errors);
    }
  }
  
}
