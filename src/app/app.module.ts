import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { NavbarComponent } from './navbar/navbar.component';
import { FooterComponent } from './footer/footer.component';
import { ContactComponent } from './contact/contact.component';
import { Er404Component } from './er404/er404.component';
import { TeamComponent } from './team/team.component';
import { LoginComponent } from './login/login.component';
import { ModulesComponent } from './modules/modules.component';
import { HttpClientModule } from '@angular/common/http';
import { MatTableModule } from '@angular/material/table';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { DashboardModule } from './dashboard/dashboard.module';
import { EmploidetailsComponent } from './compte/emploidetails/emploidetails.component';
import { FormateurprofileComponent } from './formateurprofile/formateurprofile.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatListModule } from '@angular/material/list';
import { MatToolbarModule } from '@angular/material/toolbar';
import { CommonModule } from '@angular/common';
import { FormationComponent } from './formation/formation.component';
import { DemandeInsComponent } from './demande-ins/demande-ins.component';
import { FormationDesComponent } from './formation-des/formation-des.component';





@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AboutComponent,
    NavbarComponent,
    FooterComponent,
    ContactComponent,
    Er404Component,
    TeamComponent,
    FormationComponent,
    LoginComponent,
    ModulesComponent,
    EmploidetailsComponent,
    FormateurprofileComponent,
    DemandeInsComponent,
    FormationDesComponent,
   
  ],
  imports: [
    BrowserModule,
    DashboardModule,
    AppRoutingModule,
    HttpClientModule,
    MatTableModule,
    BrowserAnimationsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    ReactiveFormsModule,
    FormsModule,
    MatSnackBarModule,
    MatPaginatorModule,
    MatSelectModule,
    MatIconModule,
    MatTableModule,
    MatPaginatorModule,
    MatSidenavModule,
    BrowserAnimationsModule,
    MatIconModule,
    MatListModule,
    MatToolbarModule,
    MatSidenavModule,
    CommonModule
  ],
  providers: [
    MatDatepickerModule,
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
