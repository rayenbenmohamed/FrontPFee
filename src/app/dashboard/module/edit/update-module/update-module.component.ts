import { Component, EventEmitter, Inject, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ModuleService } from 'src/app/services/module.service';
import { FormationService } from 'src/app/services/formation.service';
import { EnseignantService } from 'src/app/services/Formateur.service';
import { Formation } from 'src/app/model/formation';
import { Enseignant } from 'src/app/model/enseignant';

@Component({
  selector: 'app-update-module',
  templateUrl: './update-module.component.html',
  styleUrls: ['./update-module.component.css']
})
export class UpdateModuleComponent implements OnInit {
  @Output() ModuleUpdated = new EventEmitter<void>();
  updateForm: FormGroup;
  formateurs: Enseignant[] = [];
  formations: Formation[] = [];

  constructor(
    private fb: FormBuilder,
    private moduleService: ModuleService,
    private formationService: FormationService,
    private enseignantService: EnseignantService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<UpdateModuleComponent>
  ) {
    this.updateForm = this.fb.group({
      nomModule: [this.data.module.nomModule],
      enseignantId: [this.data.module.enseignant?._id], // Updated from 'enseignant'
      formationsId: [this.data.module.formation?._id], // Updated from 'formation'
    });
    
    
    
  }

  ngOnInit(): void {
    this.loadFormateurs();
    this.loadFormations();
  }

  onSubmit(): void {
    if (this.updateForm.valid) {
      this.moduleService.updateModule(this.data.module._id, this.updateForm.value).subscribe({
        next: () => {
          this.ModuleUpdated.emit(); // Notify parent component of the update
          console.log('Module updated successfully');
          this.dialogRef.close(); // Close the dialog
        },
        error: (error) => {
          console.error('Error updating module:', error);
          // Optionally handle errors, perhaps by displaying a message within the dialog
        }
      });
    }
  }
  

  loadFormateurs() {
    this.enseignantService.getAllEnseignant().subscribe({
      next: (data) => this.formateurs = data,
      error: (error) => console.error('Error fetching enseignants', error)
    });
  }

  loadFormations() {
    this.formationService.getAllFormations().subscribe({
      next: (data) => this.formations = data,
      error: (error) => console.error('Error fetching formations', error)
    });
  }
}
