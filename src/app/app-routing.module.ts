import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { ContactComponent } from './contact/contact.component';
import { TeamComponent } from './team/team.component';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './auth.guard';
import { ModulesComponent } from './modules/modules.component';

import { DashboardComponent } from './dashboard/dashboard.component';
import { CompteComponent } from './compte/compte.component';
import { LoggedInGuard } from './logged-in.guard';
import { FormateurprofileComponent } from './formateurprofile/formateurprofile.component';
import { FormationComponent } from './formation/formation.component';
import { DemandeInsComponent } from './demande-ins/demande-ins.component';
import { FormationDesComponent } from './formation-des/formation-des.component';


const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'about', component: AboutComponent },
  {path:  'demande-ins/formation/:id', component: DemandeInsComponent},
  { path: 'contact', component: ContactComponent },
  { path: 'team', component: TeamComponent },
  {path:  'formation', component: FormationComponent},

  { path: 'formation/:id', component: FormationDesComponent },
  { path: 'login', component: LoginComponent, canActivate: [LoggedInGuard] }, 
  { path: 'compte', component: CompteComponent },
  { path: 'formateurprofile', component: FormateurprofileComponent },
  {
    path: 'formateurprofile',
    loadChildren: () => import('./formateurprofile/formateurprofile.module').then(m => m.FormateurprofileModule), 
  },
  { path: 'modules', component: ModulesComponent },
  
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [AuthGuard] 
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
