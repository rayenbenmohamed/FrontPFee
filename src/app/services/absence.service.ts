import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Absence } from '../model/absence';

@Injectable({
  providedIn: 'root'
})
export class AbsenceService {
  private apiUrl = 'http://localhost:3001/api'; // L'URL de base de votre API

  constructor(private http: HttpClient) {}

  getAllAbsences(): Observable<Absence[]> {
    return this.http.get<Absence[]>(`${this.apiUrl}/absences`);
  }

  getAbsenceById(id: string): Observable<Absence> {
    return this.http.get<Absence>(`${this.apiUrl}/absences/${id}`);
  }

  createAbsence(moduleId: string, etudiantIds: string[], date: Date): Observable<Absence> {
    const formattedDate = date.toISOString(); // Format the date to ISO string
    return this.http.post<Absence>(`${this.apiUrl}/modules/${moduleId}/absences`, { etudiantIds, date: formattedDate });
  }
  getAbsencesByModuleId(moduleId: string): Observable<Absence[]> {
    return this.http.get<Absence[]>(`${this.apiUrl}/modules/${moduleId}/absences`);
  }
  // Vous pouvez ajouter d'autres méthodes pour mettre à jour, supprimer, etc.
}
