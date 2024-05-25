import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth.service';
import { AccountService } from 'src/app/services/account.service';
import { Compte } from 'src/app/model/compte';
import { Enseignant } from 'src/app/model/enseignant';

@Component({
  selector: 'app-formateur-layout',
  templateUrl: './formateur-layout.component.html',
  styleUrls: ['./formateur-layout.component.css']
})
export class FormateurLayoutComponent implements OnInit {
  compte: Compte | null = null;
  enseig: Enseignant | null = null;

  constructor(private authService: AuthService, private accountService: AccountService) { }

  ngOnInit(): void {
    this.fetchAccountDetails();
  }

  fetchAccountDetails(): void {
    this.enseig = this.authService.getEnsegnant();
    this.compte = this.authService.getCompteInfo(); // Adjust according to actual service methods
  }
  onFileSelected(event: any): void {
    const file: File = event.target.files[0];
    if (file) {
      this.uploadImage(file);
    }
  }
  uploadImage(file: File): void {
    if (this.compte && this.compte._id) {
      this.accountService.uploadAccountImage(this.compte._id, file).subscribe({
        next: (response) => {
          console.log('Image uploaded successfully:', response);
          if (this.compte) { // Check if compte is not null before accessing it
            this.compte.imageUrl = response.imageUrl; // Safely update imageUrl
          }
        },
        error: (error) => {
          console.error('Error uploading image:', error);
        }
      });
    }
  }

}
