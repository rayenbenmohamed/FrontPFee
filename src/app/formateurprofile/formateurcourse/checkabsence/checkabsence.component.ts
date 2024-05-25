import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { AbsenceService } from 'src/app/services/absence.service';

@Component({
  selector: 'app-checkabsence',
  templateUrl: './checkabsence.component.html',
  styleUrls: ['./checkabsence.component.css']
})
export class CheckabsenceComponent implements OnInit {
  absences: any[] = [];

  constructor(
    private absenceService: AbsenceService,
    public dialogRef: MatDialogRef<CheckabsenceComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { moduleId: string }
  ) {}

  ngOnInit(): void {
    this.loadAbsences();
  }

  loadAbsences(): void {
    this.absenceService.getAbsencesByModuleId(this.data.moduleId).subscribe({
      next: (absences) => {
        this.absences = absences;
      },
      error: (error) => {
        console.error('Error loading absences:', error);
      }
    });
  }

  close(): void {
    this.dialogRef.close();
  }

  printAbsences(): void {
    const printContent = document.getElementById('print-section')?.innerHTML;
    if (printContent) {
      const WindowPrt = window.open('', '', 'left=0,top=0,width=800,height=900,toolbar=0,scrollbars=0,status=0');
      WindowPrt!.document.write(`
        <html>
          <head>
            <title>Print Absences</title>
            <style>
              table {
                width: 100%;
                border-collapse: collapse;
              }
              th, td {
                border: 1px solid black;
                padding: 8px;
                text-align: left;
              }
            </style>
          </head>
          <body onload="window.print(); window.close();">
            ${printContent}
          </body>
        </html>`
      );
      WindowPrt!.document.close();
    } else {
      console.error('Print section not found');
    }
  }
}
