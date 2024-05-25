import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ModuleComponent } from './module/module.component';
import { CategorieComponent } from '../categorie/categorie.component';
import { EmploiComponent } from './emploi/emploi.component';
import { EtudiantComponent } from './etudiant/etudiant.component';
import { FormateurComponent } from './formateur/formateur.component';
import { ListeCategorieComponent } from './liste-categorie/liste-categorie.component';
import { ListeFormationComponent } from './liste-formation/liste-formation.component';
import { AuthGuard } from '../auth.guard';
import { AbsencenotesComponent } from './absencenotes/absencenotes.component';

const routes: Routes = [
  { path: 'dashboard/etudiant', component: EtudiantComponent ,  canActivate: [AuthGuard]},
  { path: 'dashboard/formateur', component: FormateurComponent,  canActivate: [AuthGuard] },
  { path: 'dashboard/listeformation', component: ListeFormationComponent ,  canActivate: [AuthGuard]},
  { path: 'dashboard/categorie', component: CategorieComponent,  canActivate: [AuthGuard] },
  { path: 'dashboard/listecategorie', component: ListeCategorieComponent ,  canActivate: [AuthGuard]},
  { path: 'dashboard/emploi', component: EmploiComponent,  canActivate: [AuthGuard] },
  { path: 'dashboard/module', component: ModuleComponent,  canActivate: [AuthGuard] },
  { path: 'dashboard/absencenotes', component: AbsencenotesComponent,  canActivate: [AuthGuard] }

  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
