import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Enseignant } from '../model/enseignant';

@Injectable({
  providedIn: 'root'
})
export class EnseignantService {
  private baseUrl = 'http://localhost:3001/api/enseignants';

  constructor(private http: HttpClient) { }

  getAllEnseignant(): Observable<Enseignant[]> {
    return this.http.get<Enseignant[]>(this.baseUrl);
  }

  getEnseignantById(id: string): Observable<Enseignant> {
    return this.http.get<Enseignant>(`${this.baseUrl}/${id}`);
  }

  createEnseignant(enseignantData: any): Observable<Enseignant> {
    return this.http.post<Enseignant>(this.baseUrl, enseignantData);
  }

  updateEnseignant(id: string, enseignantData: any): Observable<Enseignant> {
    return this.http.put<Enseignant>(`${this.baseUrl}/${id}`, enseignantData);
  }

  deleteEnseignant(id: string): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`);
  }

    addCompteToEnseignant(id: string, compteData: any): Observable<any> {
      return this.http.post(`${this.baseUrl}/${id}/add-compte`, compteData);
    }

  deleteCompteFromEnseignant(id: string): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}/compte`);
  }
}
