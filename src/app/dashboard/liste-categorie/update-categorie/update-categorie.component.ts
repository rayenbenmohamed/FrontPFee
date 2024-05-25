import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CategorieService } from 'src/app/services/categorie.service';
import { Categorie } from 'src/app/model/categorie';

@Component({
  selector: 'app-update-categorie',
  templateUrl: './update-categorie.component.html',
  styleUrls: ['./update-categorie.component.css']
})
export class UpdateCategorieComponent implements OnInit {
  updateCategorieForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private categorieService: CategorieService,
    public dialogRef: MatDialogRef<UpdateCategorieComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { categorie: Categorie }
  ) { 
    this.updateCategorieForm = this.formBuilder.group({
      nom: ['', Validators.required],
      description: ['']
    });
  }

  ngOnInit(): void {
    if (this.data.categorie) {
      this.updateCategorieForm.patchValue(this.data.categorie);
    }
  }

  onSubmit(): void {
    if (this.updateCategorieForm.valid) {
      const updatedCategorie = {
        ...this.data.categorie,
        ...this.updateCategorieForm.value
      };

      this.categorieService.updateCategorie(updatedCategorie._id, updatedCategorie).subscribe({
        next: () => {
          console.log('Category updated successfully');
          this.dialogRef.close(true); // Close the dialog and indicate success
        },
        error: (error) => {
          console.error('Error updating category:', error);
          // Optionally handle the error, e.g., show an error message
        }
      });
    }
  }

  closeModal(): void {
    this.dialogRef.close(); // Close the dialog without any actions
  }
}
