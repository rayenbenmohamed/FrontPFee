import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { FormationPopulaire } from '../model/FormationPopulaire';

@Injectable({
  providedIn: 'root'
})
export class FormationPopulaireService {
  private baseUrl = 'http://localhost:3001/api/popularFormations';  // Adjust according to your API endpoint

  constructor(private http: HttpClient) { }

  getAllPopularFormations(): Observable<FormationPopulaire[]> {
    return this.http.get<FormationPopulaire[]>(`${this.baseUrl}`);
  }

  addPopularFormation(formationId: string): Observable<any> {
    return this.http.post(`${this.baseUrl}/${formationId}`, {});
  }

  deletePopularFormation(id: string): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`);
  }
}
