import { Component, Inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { ModuleService } from 'src/app/services/module.service';
import { Module } from 'src/app/model/module';
import { EMPTY } from 'rxjs';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { EmploidetailsComponent } from 'src/app/compte/emploidetails/emploidetails.component';
import { EmploiService } from 'src/app/services/emploi.service';
import { Emploi } from 'src/app/model/emploi';

@Component({
  selector: 'app-module-details',
  templateUrl: './module-details.component.html',
  styleUrls: ['./module-details.component.css']
})
export class ModuleDetailsComponent implements OnInit {
  private moduleSubject = new BehaviorSubject<Module | undefined>(undefined);
  module$: Observable<Module | undefined> = this.moduleSubject.asObservable();
  selectedFile: File | null = null;
  description: string = ''; // Initialize the description property




  constructor(
    private route: ActivatedRoute,
    private moduleService: ModuleService,
    private emploiService: EmploiService,
    private dialog: MatDialog

  ) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const moduleId = params['id'];
      if (moduleId) {
        this.loadModule(moduleId);
      } else {
        console.error('Module ID is undefined');
      }
    });
  }
  
  loadModule(id: string): void {
    this.moduleService.getModuleById(id).subscribe({
      next: (module) => {
        this.moduleSubject.next(module);
      },
      error: (error) => console.error('Error loading module:', error)
    });
  }
  
  
  
  onFileSelected(event: Event): void {
    const element = event.currentTarget as HTMLInputElement;
    let fileList: FileList | null = element.files;
    if (fileList) {
      this.selectedFile = fileList[0];
    } else {
      this.selectedFile = null;
    }
  }

  uploadDocument(moduleId: string): void {
    if (this.selectedFile) {
      this.moduleService.addDocumentToModule(moduleId, this.selectedFile, this.description)
        .subscribe(event => {
          console.log('Upload complete', event);
          // Handle response or progress here
        }, error => {
          console.error('Upload failed', error);
        });
    } else {
      console.log('No file selected');
    }
  }
  deleteDocument(moduleId: string, documentId: string): void {
    this.moduleService.removeDocumentFromModule(moduleId, documentId).subscribe({
      next: () => {
        console.log('Document deleted successfully');
        this.removeDocumentFromLocalState(documentId);
      },
      error: (error) => console.error('Failed to delete document:', error)
    });
  }

  private removeDocumentFromLocalState(documentId: string): void {
    const currentModule = this.moduleSubject.value;
    if (currentModule && currentModule.documents) {
      const updatedDocuments = currentModule.documents.filter(doc => doc._id !== documentId);
      this.moduleSubject.next({...currentModule, documents: updatedDocuments});
    }
  }

  openDocument(url: string): void {
    window.open(url, '_blank');
    
  }
  fetchEmploiDetails(empoiId: string, moduleId: string): void {
    this.emploiService.getEmploiById(empoiId).subscribe(
      (emploi: Emploi) => {
        const dialogRef = this.dialog.open(EmploidetailsComponent, {
          width: '100%',
          height: '100%',
          data: { emploi, moduleId }
        });
        dialogRef.afterClosed().subscribe(result => {
          console.log("Dialog closed, refreshing modules...");
        });
      },
      (error) => {
        console.error('Error fetching emploi details:', error);
      }
    );
  }
}
