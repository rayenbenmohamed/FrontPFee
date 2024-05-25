import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Emploi } from '../model/emploi'; // Adjust the path as necessary

@Injectable({
  providedIn: 'root'
})
export class EmploiService {
  private baseUrl = 'http://localhost:3001/api/emplois'; // Adjust according to your API endpoint

  constructor(private http: HttpClient) { }

  getAllEmplois(): Observable<Emploi[]> {
    return this.http.get<Emploi[]>(this.baseUrl);
  }

  getEmploiById(id: string): Observable<Emploi> {
    return this.http.get<Emploi>(`${this.baseUrl}/${id}`);
  }

  createEmploi(emploiData: Emploi): Observable<Emploi> {
    return this.http.post<Emploi>(this.baseUrl, emploiData);
  }

  updateEmploi(id: string, emploiData: Emploi): Observable<Emploi> {
    return this.http.put<Emploi>(`${this.baseUrl}/${id}`, emploiData);
  }

  deleteEmploi(id: string): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`);
  }
}
