import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog'; // Import MatDialogRef
import { Module } from 'src/app/model/module';
import { ModuleService } from 'src/app/services/module.service';
import { Etudiant } from 'src/app/model/etudiant';

@Component({
  selector: 'app-etudiant-module',
  templateUrl: './etudiant-module.component.html',
  styleUrls: ['./etudiant-module.component.css']
})
export class EtudiantModuleComponent implements OnInit {
  module!: Module;
  displayedColumns: string[] = ['nom', 'prenom', 'numTel', 'email', 'cin', 'niveauScolaire', 'actions'];

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<EtudiantModuleComponent>, // Inject MatDialogRef
    private moduleService: ModuleService
  ) {}

  ngOnInit(): void {
    this.module = this.data.module;
  }

  removeEtudiant(etudiantId: string): void {
    const moduleId = this.module._id;
    if (!moduleId) {
      console.error('Module ID is not available.');
      return;
    }

    this.moduleService.removeStudentFromGroup(moduleId, etudiantId).subscribe(
      () => {
        // Handle success
        console.log('Student removed from the group successfully.');
        // Close the modal
        this.dialogRef.close();
        // Refresh the list immediately
        this.moduleService.getModuleById(moduleId).subscribe(
          (module: Module) => {
            this.module = module;
          },
          (error) => {
            console.error('Error refreshing module:', error);
          }
        );
      },
      (error) => {
        // Handle error
        console.error('Error removing student from the group:', error);
      }
    );
  }
}
