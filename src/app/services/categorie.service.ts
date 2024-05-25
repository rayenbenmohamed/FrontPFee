import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Categorie } from '../model/categorie';

@Injectable({
  providedIn: 'root'
})
export class CategorieService {
  private baseUrl = 'http://localhost:3001/api/categories'; // Ajustez selon l'URL de votre API

  constructor(private http: HttpClient) { }

  // Pour lister toutes les catégories
  getAllCategories(): Observable<any> {
    return this.http.get(`${this.baseUrl}`);
  }
  
  // Pour obtenir les détails d'une seule catégorie par son ID
  getCategorieById(id: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/${id}`);
  }
  createCategorie(categorieData: any): Observable<any> {
    return this.http.post(`${this.baseUrl}`, categorieData);
  }

  // Pour créer une catégorie
  

  // Pour mettre à jour une catégorie
  updateCategorie(id: string, categorieData: Categorie): Observable<any> {
    return this.http.put(`${this.baseUrl}/${id}`, categorieData);
  }
  // Pour supprimer une catégorie
  deleteCategorie(id: string): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`); // Changed from '/delete/${id}'
  }
}
