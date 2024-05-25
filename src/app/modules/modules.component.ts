import { Component, OnInit } from '@angular/core';
import { Module } from '../model/module'; // Assurez-vous d'importer correctement votre modèle de module
import { ModuleService } from '../services/module.service';

@Component({
  selector: 'app-modules',
  templateUrl: './modules.component.html',
  styleUrls: ['./modules.component.css']
})
export class ModulesComponent implements OnInit {
  modules: Module[] = []; // Déclarez la propriété modules et initialisez-la avec un tableau vide

  constructor(private moduleService: ModuleService) { }

  ngOnInit(): void {
    this.fetchModules(); // Appeler la méthode pour récupérer les modules lors de l'initialisation du composant
  }

  fetchModules(): void {
    this.moduleService.getAllModules().subscribe(
      modules => {
        this.modules = modules; // Affecter les modules récupérés au tableau modules
      },
      error => {
        console.error('Erreur lors de la récupération des modules :', error);
      }
    );
  }
}
