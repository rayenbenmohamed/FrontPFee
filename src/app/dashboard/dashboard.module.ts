import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { DashboardRoutingModule } from './dashboard-routing.module';

// Import all the components used in the dashboard
import { ModuleComponent } from './module/module.component';
import { CategorieComponent } from '../categorie/categorie.component';
import { EmploiComponent } from './emploi/emploi.component';
import { EtudiantComponent } from './etudiant/etudiant.component';
import { FormateurComponent } from './formateur/formateur.component';
import { ListeCategorieComponent } from './liste-categorie/liste-categorie.component';
import { ListeFormationComponent } from './liste-formation/liste-formation.component';

// Angular Material Modules
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatOptionModule } from '@angular/material/core';
import { RouterModule } from '@angular/router';
import { SidebarComponent } from './sidebar/sidebar.component';
import { EtudiantModuleComponent } from './module/etudiant-module/etudiant-module.component';
import { AddStudentComponent } from './etudiant/add-student/add-student.component';
import { RegisterAccountComponent } from './etudiant/register-account/register-account.component';
import { EmploiDetailsModalComponent } from './module/emploi-details-modal/emploi-details-modal.component';
import { UpdateModuleComponent } from './module/edit/update-module/update-module.component';
import { AddStudentModuleComponent } from './module/edit/add-student-module/add-student-module.component';
import { AddModuleComponent } from './module/edit/add-module/add-module.component';
import { UpdateFormationComponent } from './liste-formation/update-formation/update-formation.component';
import { AddFormationComponent } from './liste-formation/add-formation/add-formation.component';
import { UpdateCategorieComponent } from './liste-categorie/update-categorie/update-categorie.component';
import { AddcategorieComponent } from './liste-categorie/addcategorie/addcategorie.component';
import { UpdateStudentComponent } from './etudiant/update-student/update-student.component';
import { UpdateEmploiComponent } from './emploi/update-emploi/update-emploi.component';
import { AddemploiComponent } from './emploi/addemploi/addemploi.component';
import { DashboardComponent } from './dashboard.component';
import { CompteComponent } from '../compte/compte.component';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { FormateurAddComponent } from './formateur/formateur-add/formateur-add.component';
import { FormateurUpdateComponent } from './formateur/formateur-update/formateur-update.component';
import { FormateurRegisterComponent } from './formateur/formateur-register/formateur-register.component';
import { AbsencenotesComponent } from './absencenotes/absencenotes.component';

@NgModule({
  declarations: [
    ModuleComponent,
    CategorieComponent,
    EmploiComponent,
    EtudiantComponent,
    FormateurComponent,
    ListeCategorieComponent,
    ListeFormationComponent,
    SidebarComponent,
    EtudiantModuleComponent,
    AddStudentComponent,
    RegisterAccountComponent,
    EmploiDetailsModalComponent,
    UpdateModuleComponent,
    AddStudentComponent,
    AddStudentModuleComponent,
    AddModuleComponent,
    UpdateFormationComponent,
    AddFormationComponent,
    UpdateCategorieComponent,
    AddcategorieComponent,
    UpdateStudentComponent,
    UpdateEmploiComponent,
    AddemploiComponent,
    DashboardComponent,
    CompteComponent,
    FormateurAddComponent,
    FormateurUpdateComponent,
    FormateurRegisterComponent,
    AbsencenotesComponent,

  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatOptionModule,
    MatTableModule,
    MatPaginatorModule,
    MatSnackBarModule,
    MatDialogModule,
    DashboardRoutingModule,
    MatToolbarModule,
    MatSidenavModule,
    MatListModule,
    MatIconModule,
  ]
})
export class DashboardModule { }
