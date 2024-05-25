// In FormateurprofileRoutingModule
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormateurcourseComponent } from './formateurcourse/formateurcourse.component';
import { FormateurLayoutComponent } from './formateur-layout/formateur-layout.component';
import { ModuleDetailsComponent } from './module-details/module-details.component';

const routes: Routes = [
  {
    path: '',
    component: FormateurLayoutComponent, // All child routes will load within this layout
    children: [
      { path: '', pathMatch: 'full', redirectTo: 'formateurcourse' },
      { path: 'formateurcourse', component: FormateurcourseComponent },
      {
        path: 'module-details/:id',
        component: ModuleDetailsComponent
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FormateurprofileRoutingModule { }