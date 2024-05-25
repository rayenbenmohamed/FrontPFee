import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Demandeins } from '../model/Demandeins'; // Assurez-vous que le modèle est correctement défini

@Injectable({
  providedIn: 'root'
})
export class DemandeinsService {

  private apiUrl = 'http://localhost:3001/api';

  constructor(private http: HttpClient) { }

  // In your DemandeinsService, you should have something like:
sendDemandeins(demandeins: Demandeins, formationId: string): Observable<Demandeins> {
  return this.http.post<Demandeins>(`${this.apiUrl}/formation/${formationId}`, demandeins);
}


  getDemandeins(): Observable<Demandeins[]> {
    return this.http.get<Demandeins[]>(`${this.apiUrl}/demande`);
  }

  getDemandeinsById(id: string): Observable<Demandeins> {
    return this.http.get<Demandeins>(`${this.apiUrl}/demande/${id}`);
  }

  updateDemandeins(id: string, demandeins: Demandeins): Observable<Demandeins> {
    return this.http.put<Demandeins>(`${this.apiUrl}/demande/${id}`, demandeins);
  }

  deleteDemandeins(id: string): Observable<{}> {
    return this.http.delete(`${this.apiUrl}/demande/${id}`);
  }
}
