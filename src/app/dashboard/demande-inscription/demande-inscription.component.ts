import { Component, OnInit } from '@angular/core';
import { DemandeinsService } from 'src/app/services/DemandeIns.service';
import { Demandeins } from 'src/app/model/Demandeins';
import { Formation } from 'src/app/model/formation';

@Component({
  selector: 'app-demande-inscription',
  templateUrl: './demande-inscription.component.html',
  styleUrls: ['./demande-inscription.component.css']
})
export class DemandeInscriptionComponent implements OnInit {
  demandes: Demandeins[] = [];

  constructor(private demandeinsService: DemandeinsService) { }

  ngOnInit(): void {
    this.getDemandes();
  }

  getDemandes(): void {
    this.demandeinsService.getDemandeins().subscribe((data: Demandeins[]) => {
      this.demandes = data
        .map(demande => ({
          ...demande,
          Formation: demande.Formation || { nomformation: 'N/A', duree: '', description: '', prix: 0, image: '', niveau: '', categorie: null }
        }))
        .reverse(); // Inverser l'ordre des demandes ici
    });
  }

  deleteDemande(id: string): void {
    this.demandeinsService.deleteDemandeins(id).subscribe(() => {
      this.demandes = this.demandes.filter(d => d._id !== id);
    });
  }
}
