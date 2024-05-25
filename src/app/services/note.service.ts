// src/app/services/note.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Note } from '../model/note';

@Injectable({
  providedIn: 'root'
})
export class NoteService {
  private baseUrl = 'http://localhost:3001/api'; // Replace with your actual API base URL

  constructor(private http: HttpClient) { }

  addNote(moduleId: string, etudiantId: string, note: number, commentaire: string): Observable<Note> {
    const noteData = { note, commentaire };
    return this.http.post<Note>(`${this.baseUrl}/modules/${moduleId}/etudiants/${etudiantId}/notes`, noteData);
  }

  updateNote(id: string, note: number, commentaire: string): Observable<Note> {
    const noteData = { note, commentaire };
    return this.http.put<Note>(`${this.baseUrl}/notes/${id}`, noteData);
  }

  deleteNote(id: string): Observable<{ message: string }> {
    return this.http.delete<{ message: string }>(`${this.baseUrl}/notes/${id}`);
  }

  getNotesByModuleId(moduleId: string): Observable<Note[]> {
    return this.http.get<Note[]>(`${this.baseUrl}/modules/${moduleId}/notes`);
  }

  getNotesByEtudiantId(etudiantId: string): Observable<{ etudiant: any, notes: Note[] }> {
    return this.http.get<{ etudiant: any, notes: Note[] }>(`${this.baseUrl}/etudiants/${etudiantId}/notes`);
  }
}
