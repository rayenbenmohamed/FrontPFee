import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { catchError, tap } from 'rxjs/operators';
import { Compte } from './model/compte';
import { Module } from './model/module';
import { Formation } from './model/formation';
import { Etudiant } from './model/etudiant';
import { Enseignant } from './model/enseignant';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private isAuthenticated = false;
  private tokenKey = 'token';
  public compteInfo: Compte | null = null;
  public etudiantinf: Etudiant | null = null;
  public enseignantinf: Enseignant | null = null;
  public userModules: Module[] = [];
  public formationmodule: Formation | null = null;

  constructor(private http: HttpClient, private router: Router) {
    this.initializeAuthState();
  }

   initializeAuthState(): void {
    const token = localStorage.getItem(this.tokenKey);
    const compteData = localStorage.getItem('compteInfo');
    const etudiantData = localStorage.getItem('etudiantInfo');
    const enseignantData = localStorage.getItem('enseignantInfo');
    const modulesData = localStorage.getItem('userModules');

    if (token) {
      this.isAuthenticated = true;
    }

    try {
      if (compteData) {
        this.compteInfo = JSON.parse(compteData);
      }

      if (etudiantData) {
        this.etudiantinf = JSON.parse(etudiantData);
      } 
      if (enseignantData) {
        this.enseignantinf = JSON.parse(enseignantData);
      }

      if (modulesData) {
        this.userModules = JSON.parse(modulesData);
        console.log("Parsed modules from storage:", this.userModules);
        this.userModules.forEach(module => console.log("Stored Module ID:", module.idModule));
      }
    } catch (error) {
      console.error('Error parsing data from localStorage:', error);
      localStorage.clear();
    }
  }

  isAdminUser(): boolean {
    return this.isAuthenticatedUser() && this.compteInfo?.role === 'admin';
  }

  isFormateur(): boolean {
    return this.isAuthenticatedUser() && this.compteInfo?.role === 'formateur';
  }

  login(username: string, password: string): Observable<any> {
    return this.http.post<any>('http://localhost:3001/api/login', { nomUtilisateur: username, motDePasse: password }).pipe(
      tap(response => {
        if (response.token) {
          this.setToken(response.token);
          if(response.etudiant){
          this.setCompte(response.compte);
          this.setModules(response.etudiant.modules);
          console.log(response.etudiant)
          this.setEtudiant(response.etudiant);
          console.log(response.modules);
          this.isAuthenticated = true;
          this.router.navigate(['/compte'])

        }}
        if(response.formateur){
          this.setCompte(response.compte);
          this.setModules(response.formateur.modules);
          this.setEnseignant(response.formateur)
          console.log('Modules chargés:', response.formateur.modules)
          this.isAuthenticated = true;
          this.router.navigate(['/formateurprofile'])


        }
        if(response.compte.role==="admin"){
          this.setCompte(response.compte);
          this.isAuthenticated = true;
          this.router.navigate(['/dashboard'])

        }
      }),
      catchError(error => {
        console.error('Erreur de connexion :', error);
        throw error;
      })
    );
  }
  

  register(username: string, password: string): Observable<any> {
    return this.http.post<any>('http://localhost:3001/api/register', { nomUtilisateur: username, motDePasse: password });
  }

  logout(): void {
    localStorage.removeItem(this.tokenKey);
    localStorage.removeItem('compteInfo');
    localStorage.removeItem('etudiantInfo');
    localStorage.removeItem('userModules');
    localStorage.removeItem('enseignantinfo')
    this.isAuthenticated = false;
    this.compteInfo = null;
    this.etudiantinf = null;
    this.enseignantinf=null
    this.userModules = [];
    this.router.navigate(['/home']);
  }

  isAuthenticatedUser(): boolean {
    return this.isAuthenticated;
  }

  setToken(token: string): void {
    localStorage.setItem(this.tokenKey, token);
    this.isAuthenticated = true;
  }

  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  setCompte(compte: Compte): void {
    this.compteInfo = compte;
    localStorage.setItem('compteInfo', JSON.stringify(compte));
  }

  getCompteInfo(): Compte | null {
    return this.compteInfo;
  }

  setEtudiant(etudiant: Etudiant): void {
    this.etudiantinf = etudiant;
    localStorage.setItem('etudiantInfo', JSON.stringify(etudiant));
  }

  getEtudiant(): Etudiant | null {
    return this.etudiantinf;
  }

  setEnseignant(enseignant: Enseignant) {
    this.enseignantinf = enseignant;
    localStorage.setItem('enseignantInfo', JSON.stringify(enseignant));
  }

  getEnsegnant(): Enseignant | null {
    return this.enseignantinf;
  }

  setModules(module: Module[]): void {
    this.userModules = module;
    localStorage.setItem('userModules', JSON.stringify(module));
  }

  getModules(): Module[] {
    return this.userModules;
  }
}
