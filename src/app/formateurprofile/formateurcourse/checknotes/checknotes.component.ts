import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ModuleService } from 'src/app/services/module.service';
import { NoteService } from 'src/app/services/note.service';

@Component({
  selector: 'app-checknotes',
  templateUrl: './checknotes.component.html',
  styleUrls: ['./checknotes.component.css']
})
export class ChecknotesComponent implements OnInit {
  notes: any[] = [];
  moduleName: string = '';

  constructor(
    private noteService: NoteService,
    public dialogRef: MatDialogRef<ChecknotesComponent>,
    private moduleService: ModuleService,
    @Inject(MAT_DIALOG_DATA) public data: { moduleId: string }
  ) {}

  ngOnInit(): void {
    this.loadNotes();
    this.loadModuleName();
  }

  loadModuleName(): void {
    this.moduleService.getModuleById(this.data.moduleId).subscribe({
      next: (module) => {
        this.moduleName = module.nomModule;
      },
      error: (error) => {
        console.error('Error loading module name:', error);
      }
    });
  }
  loadNotes(): void {
    this.noteService.getNotesByModuleId(this.data.moduleId).subscribe({
      next: (notes) => {
        this.notes = notes;
      },
      error: (error) => {
        console.error('Error loading notes:', error);
      }
    });
  }

  close(): void {
    this.dialogRef.close();
  }

  printNotes(): void {
    const printContent = document.getElementById('print-section')?.innerHTML;
    if (printContent) {
      const WindowPrt = window.open('', '', 'left=0,top=0,width=800,height=900,toolbar=0,scrollbars=0,status=0');
      WindowPrt!.document.write(`
        <html>
          <head>
            <title>Print Notes</title>
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