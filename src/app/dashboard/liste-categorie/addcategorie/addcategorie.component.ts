import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { CategorieService } from 'src/app/services/categorie.service';

@Component({
  selector: 'app-addcategorie',
  templateUrl: './addcategorie.component.html',
  styleUrls: ['./addcategorie.component.css']
})
export class AddcategorieComponent {
  // Define a model for binding form data
  categorie = {
    nom: '',
    description: ''
  };

  constructor(
    public dialogRef: MatDialogRef<AddcategorieComponent>,
    private categorieService: CategorieService
  ) {}

  addCategory(): void {
    // Directly use the object since the backend expects application/json
    this.categorieService.createCategorie(this.categorie).subscribe({
      next: (result) => {
        console.log('Category added:', result);
        this.dialogRef.close(result); // Optionally pass the new category back
      },
      error: (error) => {
        console.error('Error adding category:', error);
      }
    });
  }
}
