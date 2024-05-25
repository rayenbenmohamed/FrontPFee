import { Component, EventEmitter, Inject, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Categorie } from 'src/app/model/categorie';
import { Formation } from 'src/app/model/formation';
import { FormationService } from 'src/app/services/formation.service';

@Component({
  selector: 'app-update-formation',
  templateUrl: './update-formation.component.html',
  styleUrls: ['./update-formation.component.css']
})
export class UpdateFormationComponent implements OnInit {
  updateFormationForm: FormGroup = new FormGroup({});
  allCategories: Categorie[] = []; // Define a property to hold all categories

  @Output() formationUpdated: EventEmitter<void> = new EventEmitter<void>();

  constructor(
    private formBuilder: FormBuilder,
    private formationService: FormationService,
    public dialogRef: MatDialogRef<UpdateFormationComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { formation: Formation }
  ) { }

  ngOnInit(): void {
    this.updateFormationForm = this.formBuilder.group({
      nomformation: [this.data.formation.nomformation, Validators.required],
      duree: [this.data.formation.duree, Validators.required],
      description: [this.data.formation.description, Validators.required],
      prix: [this.data.formation.prix, Validators.required],
      niveau: [this.data.formation.niveau, Validators.required],
      categorie: [this.data.formation.categorie, Validators.required]
    });
    this.getAllCategories(); // Call the method to fetch all categories

  }

  getAllCategories(): void {
    this.formationService.getAllCategories().subscribe(
      categories => {
        this.allCategories = categories; // Assign fetched categories to allCategories
      },
      error => {
        console.error('Error fetching categories:', error);
      }
    );
  }

  onSubmit(): void {
    const updatedFormationData = this.updateFormationForm.value;
    const updatedFormation: Formation = {
      ...this.data.formation,
      ...updatedFormationData
    };
    if (updatedFormation._id) {
      this.formationService.updateFormation(updatedFormation._id, updatedFormation).subscribe({
        next: () => {
          console.log('Formation updated successfully');
          this.formationUpdated.emit(); // Emit event when formation is updated
          this.dialogRef.close(); // Close the dialog
        },
        error: (error) => {
          console.error('Error updating formation:', error);
          // Handle error accordingly
        }
      });
    } else {
      console.error('Formation ID is undefined');
      // Handle the scenario where formation ID is undefined
    }
  }

  closeModal(): void {
    // Close the dialog without any actions
    this.dialogRef.close();
  }
}
