// src/app/services/formation.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Formation } from '../model/formation';
import { Categorie } from '../model/categorie';

@Injectable({
  providedIn: 'root'
})
export class FormationService {

  private baseUrl = 'http://localhost:3001/api'; // Mettez l'URL de votre API Node.js

  constructor(private http: HttpClient) { }

  getAllFormations(): Observable<Formation[]> {
    return this.http.get<Formation[]>(`${this.baseUrl}/formations`);
  }

  getFormationById(id: string): Observable<Formation> {
    return this.http.get<Formation>(`${this.baseUrl}/formations/${id}`);
  }

  getAllCategories(): Observable<Categorie[]> {
    return this.http.get<Categorie[]>(`${this.baseUrl}/categories`);
  }

  createFormation(formData: FormData): Observable<any> {
    return this.http.post(`${this.baseUrl}/formations`, formData);
  }
  
  updateFormationImage(formationId: string, file: File): Observable<any> {
    const formData = new FormData();
    formData.append('image', file);

    return this.http.put<any>(`${this.baseUrl}/formations/${formationId}/image`, formData);
  }

  updateFormation(id: string, formationData: FormData | any): Observable<any> {
    return this.http.put<any>(`${this.baseUrl}/formations/${id}`, formationData);
  }
  
  getFormationsByCategorie(categorieId: string): Observable<Formation[]> {
    return this.http.get<Formation[]>(`${this.baseUrl}/formations/categorie/${categorieId}`);
  }

  deleteFormation(id: string): Observable<any> {
    return this.http.delete<any>(`${this.baseUrl}/formations/${id}`); 
  }
}
