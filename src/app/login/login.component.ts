import { Component } from '@angular/core';
import { Router } from '@angular/router'; // Import du Router
import { AuthService } from '../auth.service';
import { Compte } from '../model/compte';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  username: string = ''; // Ajoutez un type explicite et une valeur par défaut
  password: string = ''; // Ajoutez un type explicite et une valeur par défaut
  newUsername: string = ''; // Ajoutez le champ de nouvel utilisateur
  newPassword: string = ''; 
  constructor(
    private authService: AuthService,
    private router: Router // Injection du Router
  ) {}

  login(): void {
    this.authService.login(this.username, this.password).subscribe({
      next: (response) => {
        if (response.token && response.compte && response.modules) {
          if (response.compte.role==="candidat" ||response.compte.role==="admin"){
          this.authService.setToken(response.token);
          this.authService.setCompte(response.compte);
          this.authService.setModules(response.etudiant.modules);
          this.authService.setEtudiant(response.etudiant)
          console.log(response.modules);
          if (response.compte.role==="candidat"){
          this.router.navigate(['/compte']);
        }}
          else if (response.compte.role==="formateur"){
            this.authService.setToken(response.token);
            this.authService.setCompte(response.compte);
            this.authService.setModules(response.formateur.modules);
            this.authService.setEnseignant(response.formateur)
            console.log(response.formateur.modules)
            this.router.navigate(['/formateurprofile'])
          }
      }
      },
      error: (error) => {
        console.error('Login failed:', error);
        // Ajoutez une gestion des erreurs ici, comme un message à l'utilisateur
      }
    });
    
  }
  register(): void {
    this.authService.register(this.newUsername, this.newPassword).subscribe((registered) => {
      if (registered) {
        // Rediriger vers la page de connexion après l'inscription réussie
        this.router.navigate(['/login']);
      } else {
        // Gérer l'échec de l'inscription
      }
    });
  }

}