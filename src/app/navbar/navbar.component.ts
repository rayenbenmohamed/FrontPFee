// navbar.component.ts

import { Component } from '@angular/core';
import { AuthService } from '../auth.service'; // Assurez-vous de spécifier le bon chemin
import { Compte } from '../model/compte';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent {
  constructor(public _authService: AuthService,  private router: Router ) {}
  compte: Compte | null = null;
 
  ngOnit():void{
    this.compte=this._authService.getCompteInfo();
    if (this.compte?.role==="candidat" || this.compte?.role==="admin"){
      this.router.navigate(['/compte']);
    }
    else if (this.compte?.role==="formateur"){
      this.router.navigate(['/formateurprofile'])
    }

  }
}
