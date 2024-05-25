import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FormationService } from 'src/app/services/formation.service';
import { Formation } from 'src/app/model/formation'; // Import the Formation interface
import { Categorie } from 'src/app/model/categorie'; // Import the Categorie interface
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-add-formation',
  templateUrl: './add-formation.component.html',
  styleUrls: ['./add-formation.component.css']
})
export class AddFormationComponent implements OnInit {
  formationForm: FormGroup;
  categories: Categorie[] = []; // Define an array to store categories

  constructor(private formBuilder: FormBuilder, private formationService: FormationService,   private dialogRef: MatDialogRef<AddFormationComponent> // Add this
) {
    this.formationForm = this.formBuilder.group({
      nomformation: ['', Validators.required],
      duree: ['', Validators.required],
      prix: ['', Validators.required],
      niveau: ['', Validators.required],
      description: [''],
      image: [null],  // This is okay as long as it's accounted for in your logic
      categorie: ['', Validators.required]
    });
  }
  
  ngOnInit(): void {
    this.fetchCategories(); 
  }

  fetchCategories(): void {
    this.formationService.getAllCategories().subscribe(
      (categories: Categorie[]) => {
        this.categories = categories; 
      },
      error => {
        console.error('Error fetching categories:', error);
        // Handle error accordingly
      }
    );
  }

// Add Formation Component Class
handleFileInput(event: Event): void {
  const element = event.target as HTMLInputElement;
  if (element.files && element.files.length > 0) {
    this.formationForm.patchValue({ image: element.files[0] });
    // Optionally call updateValueAndValidity() if needed
  }
}



onSubmit(): void {
  if (this.formationForm.valid) {
    const formData = new FormData();
    Object.keys(this.formationForm.controls).forEach(key => {
      const control = this.formationForm.get(key);
      if (!control) return; // Skip further processing if the control is null

      if (key === 'image') {
        if (control.value && control.value instanceof File) {
          formData.append(key, control.value, control.value.name);
        }
      } else {
        formData.append(key, control.value);
      }
    });

    this.formationService.createFormation(formData).subscribe({
      next: () => {
        console.log('Formation added successfully');
        this.dialogRef.close(true);  // Close the dialog and indicate success
      },
      error: error => {
        console.error('Error while adding new formation:', error);
        // Handle error actions
      }
    });
  }
}


}
