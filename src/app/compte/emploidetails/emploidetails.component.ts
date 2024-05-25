import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { EmploiDetailsModalComponent } from 'src/app/dashboard/module/emploi-details-modal/emploi-details-modal.component';
import { Emploi } from 'src/app/model/emploi';
import { ModuleService } from 'src/app/services/module.service';

@Component({
  selector: 'app-emploidetails',
  templateUrl: './emploidetails.component.html',
  styleUrls: ['./emploidetails.component.css']
})
export class EmploidetailsComponent implements OnInit {
  emploi: Emploi;
  moduleId: string;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
    private moduleService: ModuleService,
    private dialogRef: MatDialogRef<EmploiDetailsModalComponent>) {
    this.emploi = data.emploi;
    this.moduleId = data.moduleId;
  } 
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }
  printEmploi(): void {
    window.print();
  }
}
