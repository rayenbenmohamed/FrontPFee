import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Enseignant } from 'src/app/model/enseignant';
import { Formation } from 'src/app/model/formation';
import { EnseignantService } from 'src/app/services/Formateur.service';
import { FormationService } from 'src/app/services/formation.service';
import { ModuleService } from 'src/app/services/module.service';

@Component({
  selector: 'app-add-module',
  templateUrl: './add-module.component.html',
  styleUrls: ['./add-module.component.css']
})
export class AddModuleComponent implements OnInit {
  moduleForm: FormGroup;
  enseignants: Enseignant[] = []; // Should be populated from your data source
  formations: Formation[] = []; // Should be populated from your data source

  constructor(
    private fb: FormBuilder,
    private enseignantService: EnseignantService,
    private formationService: FormationService,
    private moduleService: ModuleService,  
    private dialogRef: MatDialogRef<AddModuleComponent> // Inject MatDialogRef
    // Inject the ModuleService
  ) {
    // In AddModuleComponent
this.moduleForm = this.fb.group({
  nomModule: '',
  enseignantId: '', // Rename from 'enseignant' to 'enseignantId'
  formationsId: '', // Rename from 'formation' to 'formationsId'
});

  }

  ngOnInit(): void {
    this.loadFormateurs();
    this.loadFormations();

    // Populate enseignants and formations from your data source here
  }

  onSubmit(): void {
    if (this.moduleForm.valid) {
      this.moduleService.createModule(this.moduleForm.value).subscribe({
        next: (response) => {
          console.log('Module created successfully', response);
          this.moduleForm.reset(); // Optional: Reset form after successful submission
          this.dialogRef.close(); // Close the dialog
        },
        error: (error) => {
          console.error('There was an error creating the module', error);
          // Handle error here (e.g., showing an error message)
        }
      });
    } else {
      console.log('Form is not valid');
      // Handle form validation errors
    }
  }
  
  
  loadFormateurs() {
    this.enseignantService.getAllEnseignant().subscribe({
      next: (data) => this.enseignants = data,
      error: (error) => console.error('Error fetching formateurs', error)
    });
  }
  loadFormations() {
    this.formationService.getAllFormations().subscribe({
      next: (data) => {
        this.formations = data;
      },
      error: (error) => {
        console.error('There was an error fetching the formations', error);
      }
    });
  }
}
