import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private apiUrl = 'http://localhost:3001/api'; // Replace this with the URL of your Node.js API

  constructor(private http: HttpClient) { }

  login(nomUtilisateur: string, motDePasse: string): Observable<any> {
    // Define the URL of the login endpoint in your Node.js API
    const loginUrl = `${this.apiUrl}/login`;

    // Send a POST request with the credentials
    return this.http.post(loginUrl, { nomUtilisateur, motDePasse });
  }
}
