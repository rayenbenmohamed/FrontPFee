import { Component, OnInit } from '@angular/core';
import { EnseignantService } from 'src/app/services/Formateur.service';
import { Enseignant } from 'src/app/model/enseignant';
import { MatDialog } from '@angular/material/dialog';
import { FormateurAddComponent } from './formateur-add/formateur-add.component'; // Adjust path here
import { FormateurUpdateComponent } from './formateur-update/formateur-update.component';
import { FormateurRegisterComponent } from './formateur-register/formateur-register.component';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-formateur',
  templateUrl: './formateur.component.html',
  styleUrls: ['./formateur.component.css']
})
export class FormateurComponent implements OnInit {
  formateurs: Enseignant[] = [];
  displayedColumns: string[] = ['nom', 'prenom', 'numTel', 'email', 'cin', 'certificat', 'compte', 'actions'];

  constructor(private enseignantService: EnseignantService, private dialog: MatDialog,private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.getAllFormateurs();
  }
  deleteCompte(id: string): void {
    if (confirm('Êtes-vous sûr de vouloir supprimer le compte de cet enseignant ?')) {
      this.enseignantService.deleteCompteFromEnseignant(id).subscribe({
        next: () => {
          console.log('Compte supprimé avec succès');
          this.refreshEnseignants(); // Refresh the list to reflect changes
        },
        error: (error) => {
          console.error('Error deleting compte:', error);
          alert('Failed to delete compte');  // You may decide to handle this differently
        }
      });
    }
  }

  getAllFormateurs(): void {
    this.enseignantService.getAllEnseignant().subscribe(
      (formateurs: Enseignant[]) => {
        this.formateurs = formateurs;
      },
      (error) => {
        console.error('Error fetching formateurs:', error);
        // Handle error
      }
    );
  }

  openAddFormateurDialog(): void {
    const dialogRef = this.dialog.open(FormateurAddComponent, {
      width: '600px', // Adjust the width as needed
      data: {} // You can pass data to the dialog if needed
    });

    dialogRef.afterClosed().subscribe(result => {
      // Handle dialog close event if needed
    });
  }
  deleteEnseignant(id: string): void {
    if (confirm('Êtes-vous sûr de vouloir supprimer cet Formateur ?')) {
      this.enseignantService.deleteEnseignant(id).subscribe({
        next: () => {
          this.snackBar.open('formateur supprimé avec succées', 'Close', { duration: 2000 });
          // Remove the enseignant from the local array
          this.formateurs = this.formateurs.filter(formateur => formateur._id !== id);
        },
        error: (error) => {
          console.error('Error deleting enseignant:', error);
          alert('Failed to delete enseignant');  // You may decide to handle this differently
        }
      });
    }
  }
  
  refreshEnseignants(): void {
    this.enseignantService.getAllEnseignant().subscribe(
      (formateurs: Enseignant[]) => {
        this.formateurs = formateurs;
      },
      (error) => {
        console.error('Error fetching formateurs:', error);
      }
    );
  }
  
  openRegister(formateur: Enseignant): void {
    if (!formateur._id) {
      console.error('Attempted to open register dialog without a valid formateur ID');
      return;
    }
    
    const dialogRef = this.dialog.open(FormateurRegisterComponent, {
      width: '400px',
      data: { formateurId: formateur._id }
    });
  
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log('Registration successful for formateur ID:', formateur._id);
      }
    });
  }
  

  openUpdateFormateurDialog(formateur: Enseignant): void {
    const dialogRef = this.dialog.open(FormateurUpdateComponent, {
      width: '600px',
      data: { formateur: formateur }
    });
  
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.refreshEnseignants(); // Optionally refresh the list if needed
      }
    });
  }
  

}
