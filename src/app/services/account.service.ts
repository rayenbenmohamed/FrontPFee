import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  private baseUrl = 'http://localhost:3001/api'; // Adjust this as necessary

  constructor(private http: HttpClient) { }

  // Method to upload a new account image
  uploadAccountImage(compteId: string, imageFile: File): Observable<any> {
    const formData = new FormData();
    formData.append('image', imageFile);
    return this.http.put(`${this.baseUrl}/compte/${compteId}/image`, formData);
  }

  // Method to update an existing account image
  updateAccountImage(compteId: string, imageFile: File): Observable<any> {
    const formData = new FormData();
    formData.append('image', imageFile);
    return this.http.put(`${this.baseUrl}/compte/${compteId}/update-image`, formData);
  }
}
