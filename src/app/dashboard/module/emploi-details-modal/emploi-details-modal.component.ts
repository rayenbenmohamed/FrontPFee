import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ModuleService } from 'src/app/services/module.service';
import { Emploi } from 'src/app/model/emploi';

@Component({
  selector: 'app-emploi-details-modal',
  templateUrl: './emploi-details-modal.component.html',
  styleUrls: ['./emploi-details-modal.component.css']
})
export class EmploiDetailsModalComponent implements OnInit {
  emploi: Emploi;
  moduleId: string;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
    private moduleService: ModuleService,
    private dialogRef: MatDialogRef<EmploiDetailsModalComponent>) {
    this.emploi = data.emploi;
    this.moduleId = data.moduleId;
  }

  ngOnInit(): void {
  }

  deleteEmploi(): void {  
    // Only call deleteEmploiFromModule, expecting it to handle both removal and deletion
    this.moduleService.deleteEmploiFromModule(this.moduleId, this.emploi._id!).subscribe({
      next: () => {
        console.log(`Emploi  removed from module with and deleted successfully.`);
        // Close the dialog or refresh data as needed here
        this.dialogRef.close(true); // Assuming you want to close the modal upon successful deletion
      },
      error: (error) => console.error('Error removing and deleting emploi from module:', error)
    });
}
printEmploi(): void {
  window.print();
}

}