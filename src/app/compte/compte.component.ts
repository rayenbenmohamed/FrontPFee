import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { AuthService } from '../auth.service';
import { Module } from '../model/module';
import { Compte } from '../model/compte';
import { MatDialog } from '@angular/material/dialog';
import { Emploi } from '../model/emploi';
import { EmploiService } from '../services/emploi.service';
import { ModuleService } from '../services/module.service';
import { EmploidetailsComponent } from './emploidetails/emploidetails.component';
import { Etudiant } from '../model/etudiant';
import { Enseignant } from '../model/enseignant';
import { HttpClient } from '@angular/common/http';
import { AccountService } from '../services/account.service';
import { NoteService } from '../services/note.service'; // Import NoteService
import { Note } from '../model/note'; // Import Note model

@Component({
  selector: 'app-compte',
  templateUrl: './compte.component.html',
  styleUrls: ['./compte.component.css']
})
export class CompteComponent implements OnInit {
  @ViewChild('fileInput') fileInput!: ElementRef;
  compte: Compte | null = null;
  etud: Etudiant | null = null;
  selectedFile: File | null = null;
  enseig: Enseignant | null = null;
  modules: Module[] = [];
  notes: { [key: string]: Note[] } = {}; // Object to store notes for each module

  constructor(
    private accountService: AccountService,
    private moduleService: ModuleService,
    private dialog: MatDialog,
    private emploiService: EmploiService,
    private authService: AuthService,
    private http: HttpClient,
    private noteService: NoteService // Inject NoteService
  ) { }

  ngOnInit(): void {
    this.fetchAccountDetails();
    this.fetchNotesForModules(); // Fetch notes for each module
  }

  fetchAccountDetails(): void {
    this.etud = this.authService.getEtudiant();
    this.enseig = this.authService.getEnsegnant();
    this.compte = this.authService.getCompteInfo();
    if (this.compte) {
      this.modules = this.authService.getModules() || [];
    }
  }

  fetchNotesForModules(): void {
    if (this.modules.length > 0) {
      this.modules.forEach(module => {
        if (module.idModule) { // Check if idModule is defined
          this.noteService.getNotesByModuleId(module.idModule).subscribe(
            (notes: Note[]) => {
              this.notes[module.idModule] = notes;
            },
            (error) => {
              console.error('Error fetching notes for module:', module.idModule, error);
            }
          );
        } else {
          console.error('Module ID is undefined for module:', module);
        }
      });
    }
  }

  fetchEmploiDetails(emploiId: string, moduleId: string): void {
    this.emploiService.getEmploiById(emploiId).subscribe(
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

  handleFileInput(event: any, isUpdate: boolean = false) {
    const element = event.target as HTMLInputElement;
    const files = element.files;
    console.log('File selected:', files);
    if (files && files.length > 0) {
      this.selectedFile = files.item(0);
      console.log('Handling file:', this.selectedFile);
      if (isUpdate) {
        this.updateImage();
      } else if (this.compte && this.compte._id) {
        this.uploadImage(event, this.compte._id);  // Ensures _id is not undefined
      } else {
        console.error('Account or account ID is undefined');
      }
    }
  }

  uploadImage(event: Event, compteId: string) {
    event.preventDefault();
    if (this.selectedFile && this.compte && this.compte._id) {
      this.accountService.uploadAccountImage(compteId, this.selectedFile).subscribe({
        next: (response) => {
          console.log('Image uploaded successfully', response);
          if (this.compte) {  // Additional check for compte not being null
            this.compte.imageUrl = response.imageUrl;
          }
        },
        error: (error) => console.error('Error uploading image', error)
      });
    } else {
      console.error('Selected file or account details are undefined');
    }
  }

  updateImage() {
    if (this.selectedFile && this.compte && this.compte._id) {
      this.accountService.updateAccountImage(this.compte._id, this.selectedFile).subscribe({
        next: (response) => {
          console.log('Image updated successfully', response);
          if (this.compte) {  // Ensure compte is not null
            this.compte.imageUrl = response.imageUrl;
            this.fetchAccountDetails();
          }
        },
        error: (error) => console.error('Error updating image', error)
      });
    } else {
      console.error('Selected file or account details are missing');
    }
  }

  triggerFileInput() {
    this.fileInput.nativeElement.click();
  }
}
