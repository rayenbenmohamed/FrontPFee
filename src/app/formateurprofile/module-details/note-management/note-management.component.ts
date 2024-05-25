// src/app/formateurprofile/module-details/note-management/note-management.component.ts
import { Component, Input, OnInit } from '@angular/core';
import { NoteService } from 'src/app/services/note.service';
import { MatTableDataSource } from '@angular/material/table';
import { ModuleService } from 'src/app/services/module.service';
import { Note } from 'src/app/model/note';

@Component({
  selector: 'app-note-management',
  templateUrl: './note-management.component.html',
  styleUrls: ['./note-management.component.css']
})
export class NoteManagementComponent implements OnInit {
  @Input() moduleId!: string;
  etudiants = new MatTableDataSource<any>([]);
  notesData: { [etudiantId: string]: { note: number; commentaire: string; exists: boolean } } = {};

  displayedColumns: string[] = ['nom', 'prenom', 'email', 'note', 'commentaire', 'actions'];

  constructor(private noteService: NoteService, private moduleService: ModuleService) {}

  ngOnInit(): void {
    if (this.moduleId) {
      this.moduleService.getModuleById(this.moduleId).subscribe({
        next: (module) => {
          this.etudiants.data = module.etudiants;
          this.etudiants.data.forEach((etudiant: any) => {
            this.notesData[etudiant._id] = { note: 0, commentaire: '', exists: false };
            this.loadExistingNoteForStudent(etudiant._id);
          });
        },
        error: (error) => console.error('Error loading module:', error)
      });
    }
  }

  loadExistingNoteForStudent(etudiantId: string): void {
    this.noteService.getNotesByEtudiantId(etudiantId).subscribe({
      next: (response) => {
        const note = response.notes.find((n: Note) => n.etudiant && n.etudiant._id === etudiantId);
        if (note) {
          this.notesData[etudiantId] = {
            note: note.note,
            commentaire: note.commentaire,
            exists: true
          };
        }
      },
      error: (error) => console.error('Error loading notes for student:', error)
    });
  }

  saveNote = (etudiantId: string) => {
    const noteData = this.notesData[etudiantId];
    if (noteData.exists) {
      this.noteService.updateNote(etudiantId, noteData.note, noteData.commentaire).subscribe({
        next: (note) => {
          console.log('Note updated:', note);
        },
        error: (error) => {
          console.error('Failed to update note', error);
        }
      });
    } else {
      this.noteService.addNote(this.moduleId, etudiantId, noteData.note, noteData.commentaire).subscribe({
        next: (note) => {
          console.log('Note added:', note);
          noteData.exists = true;
        },
        error: (error) => {
          console.error('Failed to add note', error);
        }
      });
    }
  }
}