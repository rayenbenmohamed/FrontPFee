import { Component, OnInit, ViewChild } from '@angular/core';
import { ModuleService } from 'src/app/services/module.service';
import { Module } from 'src/app/model/module';
import { MatDialog } from '@angular/material/dialog';
import { AddemploiComponent } from '../emploi/addemploi/addemploi.component';
import { EtudiantModuleComponent } from './etudiant-module/etudiant-module.component';
import { AddStudentModuleComponent } from './edit/add-student-module/add-student-module.component';
import { EmploiService } from 'src/app/services/emploi.service';
import { Emploi } from 'src/app/model/emploi';
import { EmploiDetailsModalComponent } from './emploi-details-modal/emploi-details-modal.component';
import { AddModuleComponent } from './edit/add-module/add-module.component';
import { UpdateModuleComponent } from './edit/update-module/update-module.component';

@Component({
  selector: 'app-module',
  templateUrl: './module.component.html',
  styleUrls: ['./module.component.css']
})
export class ModuleComponent implements OnInit {
  modules: Module[] = [];

  @ViewChild(AddemploiComponent)
  addEmploiComponent!: AddemploiComponent; // Reference to the AddemploiComponent

  constructor(private moduleService: ModuleService,
     private dialog: MatDialog, private emploiService: EmploiService) { }

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

  addEmploiToModule(moduleId: string, emploiId: string): void {
    this.moduleService.addEmploiToModule(moduleId, emploiId).subscribe(
      (module: Module) => {
        // Optionally, update the module in your frontend
        console.log('Emploi added to module:', module);
        this.loadModules();

      },
      (error) => {
        console.error('Error adding emploi to module:', error);
      }
    );
  }
  
  openAddEmploiDialog(moduleId: string): void {
    console.log('Module ID:', moduleId); // Check if moduleId is correct
    const dialogRef = this.dialog.open(AddemploiComponent, {
      width: '100%',
          height:'500px'
      // Set the width as you prefer
      // You can pass data to the dialog as well if needed
    });
  
    dialogRef.componentInstance.emploiCreated.subscribe((emploiId: string) => {
      this.addEmploiToModule(moduleId, emploiId);
      this.loadModules();

    });
  }
  fetchEmploiDetails(empoiId: string, moduleId: string): void {
    this.emploiService.getEmploiById(empoiId).subscribe(
      (emploi: Emploi) => {
        const dialogRef = this.dialog.open(EmploiDetailsModalComponent, {
          width: '500px',
          height: '500px',
          data: { emploi, moduleId }
        });
  
        // Subscribe to the afterClosed observable to react when the dialog is closed
        dialogRef.afterClosed().subscribe(result => {
          console.log("Dialog closed, refreshing modules...");
          this.loadModules(); // Call loadModules once the modal closes
        });
      },
      (error) => {
        console.error('Error fetching emploi details:', error);
      }
    );
  }
  
  openEtudiantModuleDialog(module: Module): void {
    const dialogRef = this.dialog.open(EtudiantModuleComponent, {
      width: '100%',
      data: { module } // Pass module as data
    });
  
    dialogRef.afterClosed().subscribe(() => {
      this.loadModules(); // Reload modules after modal closes
    });
  }

  openAddStudentDialog(moduleId: string): void {
  const dialogRef = this.dialog.open(AddStudentModuleComponent, {
    width: '100%',
    height:'500px',
    data: { moduleId } // Pass moduleId as data
  });

  dialogRef.afterClosed().subscribe(() => {
    this.loadModules(); // Refresh modules after closing the dialog
  });
}
  // In module.component.ts

openAddModuleDialog(): void {
  const dialogRef = this.dialog.open(AddModuleComponent, {
    width: '600px',
    // You can adjust the width and height as needed
  });

  dialogRef.afterClosed().subscribe(result => {
    // Optional: handle any actions after the dialog is closed,
    // such as refreshing the list of modules
    this.loadModules();
  });
}

openUpdateModuleModal(module: Module): void {
  // Check if formation._id is defined
  if (module._id) {
    // Fetch the complete categorie object before opening the modal
    this.moduleService.getModuleById(module._id).subscribe((completeModule) => {
      // Pass the fetched completeFormation object to the modal
      const dialogRef = this.dialog.open(UpdateModuleComponent, {
        data: { module: completeModule },
        width: '600px',
        // Add any other modal options here
      });

      dialogRef.componentInstance.ModuleUpdated.subscribe(() => {
        console.log('Module updated, refreshing list...');
        this.loadModules();
      });

      dialogRef.afterClosed().subscribe(() => {
        console.log('The dialog was closed');
      });
    });
  } else {
    console.error('Module ID is undefined');
  }
}
deleteModule(moduleId: string): void {
  // Optionally, confirm the deletion with the user before proceeding
  const confirmDelete = confirm('Are you sure you want to delete this module?');
  if (!confirmDelete) {
      return;
  }

  this.moduleService.deleteModule(moduleId).subscribe({
      next: () => {
          console.log('Module deleted successfully');
          this.loadModules(); // Refresh the list of modules
      },
      error: (error) => {
          console.error('Error deleting module:', error);
          // Handle error (e.g., show a message to the user)
      }
  });
}


}
