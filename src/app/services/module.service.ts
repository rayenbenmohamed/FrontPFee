import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError, map } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { Module } from '../model/module';
import { Etudiant } from '../model/etudiant';

@Injectable({
  providedIn: 'root'
})
export class ModuleService {

  private baseUrl = 'http://localhost:3001/api'; // Mettez l'URL de votre API Node.js

  constructor(private http: HttpClient) { }

  addEmploiToModule(moduleId: string, emploiId: string): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/modules/${moduleId}/addEmploi/${emploiId}`, {});
  }
  getAllModules(): Observable<Module[]> {
    return this.http.get<Module[]>(`${this.baseUrl}/modules`);
  }
  getEtudiantsByIds(etudiantIds: string[]): Observable<Etudiant[]> {
    return this.http.post<Etudiant[]>(`${this.baseUrl}/etudiants`, { etudiantIds });
  }

  getModuleById(id: string): Observable<Module> {
    return this.http.get<Module>(`${this.baseUrl}/modules/${id}`).pipe(
      map(response => {
        return response;
      })
    );
  }
  

  createModule(moduleData: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/modules`, moduleData);
  }

  updateModule(id: string, moduleData: any): Observable<any> {
    return this.http.put<any>(`${this.baseUrl}/modules/${id}`, moduleData);
  }

  deleteModule(id: string): Observable<any> {
    return this.http.delete<any>(`${this.baseUrl}/modules/${id}`);
  }

  getModulesByEtudiantId(etudiantId: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/modules/${etudiantId}`);
  }

  addStudentToGroup(moduleId: string, etudiantId: string): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/modules/${moduleId}/addStudent/${etudiantId}`, {});
  }
  getStudentsNotInModule(moduleId: string): Observable<Etudiant[]> {
    return this.http.get<Etudiant[]>(`${this.baseUrl}/modules/${moduleId}/students/notInModule`);
  }

  removeStudentFromGroup(moduleId: string, etudiantId: string): Observable<any> {
    return this.http.delete<any>(`${this.baseUrl}/modules/${moduleId}/students/${etudiantId}`);
  }

  deleteEmploiFromModule(moduleId: string, emploiId: string): Observable<any> {
    return this.http.delete(`${this.baseUrl}/modules/${moduleId}/emploi/${emploiId}`);
  }
  removeDocumentFromModule(moduleId: string, documentId: string): Observable<any> {
    return this.http.delete(`${this.baseUrl}/modules/${moduleId}/documents/${documentId}`);
  }
  addDocumentToModule(moduleId: string, file: File, description: string): Observable<any> {
    const url = `${this.baseUrl}/modules/${moduleId}/documents`;
    const formData = new FormData();
    formData.append('file', file);
    formData.append('description', description);
  
    return this.http.post(url, formData, {
      reportProgress: true,
      observe: 'events'
    }).pipe(
      tap(event => console.log('Upload event:', event)),
      catchError(error => {
        console.error('Error during file upload:', error);
        return throwError(() => new Error('File upload failed'));
      })
    );
  }
  


  addAbsenceToModule(moduleId: string, etudiantIds: string[], date: string): Observable<any> {
    const url = `${this.baseUrl}/modules/${moduleId}/absences`;
    const body = {
      etudiantIds: etudiantIds,
      date: date
    };
    return this.http.post(url, body);
  }
  
  getModulesByEnseignant(enseignantId: string): Observable<Module[]> {
    return this.http.get<Module[]>(`${this.baseUrl}/modules?enseignantId=${enseignantId}`);
  }
}
