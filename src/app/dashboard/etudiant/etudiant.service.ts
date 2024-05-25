// etudiant.service.ts
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Etudiant } from 'src/app/model/etudiant';
import { AuthService } from 'src/app/auth.service';
@Injectable({
  providedIn: 'root'
})
export class EtudiantService {
  private apiUrl = 'http://localhost:3001/api'; // Adjust based on your actual backend URL

  constructor(private http: HttpClient) { }
  addCompteToEtudiant(etudiantId: string, nomUtilisateur: string, motDePasse: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/etudiant/${etudiantId}/compte`, { nomUtilisateur, motDePasse });
  }
  

  getAllEtudiants(): Observable<Etudiant[]> {
    return this.http.get<Etudiant[]>(`${this.apiUrl}/etudiants`);
  }

  getEtudiantById(id: string): Observable<Etudiant> {
    return this.http.get<Etudiant>(`${this.apiUrl}/etudiants/${id}`);
  }

  createEtudiant(etudiant: Etudiant): Observable<Etudiant> {
    return this.http.post<Etudiant>(`${this.apiUrl}/etudiants`, etudiant);
  }

  updateEtudiant(id: string, etudiant: Etudiant): Observable<Etudiant> {
    return this.http.put<Etudiant>(`${this.apiUrl}/etudiants/${id}`, etudiant);
  }

  deleteEtudiant(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/etudiants/${id}`);
  }

  getFormationByCompte(compteId: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/etudiants/formation/${compteId}`);
  }

  getEtudiantByCompte(compteId: string): Observable<Etudiant> {
    return this.http.get<Etudiant>(`${this.apiUrl}/etudiants/byCompte/${compteId}`);
  }

  addFormationToEtudiant(etudiantId: string, formationId: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/etudiants/${etudiantId}/formations`, { formationId });
  }
}
