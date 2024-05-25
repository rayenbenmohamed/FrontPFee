import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AuthService } from 'src/app/auth.service';
import { Compte } from 'src/app/model/compte';
import { Enseignant } from 'src/app/model/enseignant';
import { Module } from 'src/app/model/module';
import { ChecknotesComponent } from 'src/app/formateurprofile/formateurcourse/checknotes/checknotes.component';
import { CheckabsenceComponent } from 'src/app/formateurprofile/formateurcourse/checkabsence/checkabsence.component';
import { ModuleService } from 'src/app/services/module.service';
@Component({
  selector: 'app-absencenotes',
  templateUrl: './absencenotes.component.html',
  styleUrls: ['./absencenotes.component.css']
})
export class AbsencenotesComponent implements OnInit {
  modules: Module[] = [];
  compte: Compte | null = null;
  selectedFile: File | null = null;
  enseig: Enseignant | null = null;

  constructor(private authService: AuthService, private dialog: MatDialog, private moduleService:ModuleService) {}  // Inject AuthService

  ngOnInit(): void {
    this.loadModules();
  }

  loadModules(): void {
    this.moduleService.getAllModules().subscribe(
      (modules: Module[]) => {
        this.modules = modules;
      },
      (error) => {
        console.error('Error fetching modules:', error);
      }
    );
  }
  openCheckNotes(moduleId: string): void {
    console.log('Module ID:', moduleId); // Check if moduleId is correct
    const dialogRef = this.dialog.open(ChecknotesComponent, {

          data: { moduleId }
          // Set the width as you prefer
      // You can pass data to the dialog as well if needed
    });
  }
  openCheckabsences(moduleId: string): void {
    console.log('Module ID:', moduleId); // Check if moduleId is correct
    const dialogRef = this.dialog.open(CheckabsenceComponent, {

          data: { moduleId }
          // Set the width as you prefer
      // You can pass data to the dialog as well if needed
    });
  }
}
