import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Etudiant } from 'src/app/model/etudiant';
import { EtudiantService } from '../etudiant.service';

@Component({
  selector: 'app-register-account',
  templateUrl: './register-account.component.html',
  styleUrls: ['./register-account.component.css']
})
export class RegisterAccountComponent {
  hide = true;
  constructor(
    public dialogRef: MatDialogRef<RegisterAccountComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { etudiant: Etudiant },
    private etudiantService: EtudiantService,
  ) {}

  registerCompte(nomUtilisateur: string, motDePasse: string ): void {
    if (this.data.etudiant && this.data.etudiant._id) { // Check if etudiant and _id are defined
      this.etudiantService.addCompteToEtudiant(this.data.etudiant._id, nomUtilisateur, motDePasse).subscribe(
        () => {
          console.log('Compte registration successful');
          // Optionally display a success message to the user
          this.dialogRef.close(); // Close the modal after successful registration
        },
        error => {
          console.error('Error registering compte:', error);
          // Optionally display an error message to the user
        }
      );
    } else {
      console.error('Invalid etudiant or missing _id');
      // Optionally display an error message to the user
    }
  }
}
