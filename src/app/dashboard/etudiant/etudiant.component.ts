// src/app/components/etudiant/etudiant.component.ts
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { Etudiant } from 'src/app/model/etudiant';
import { EtudiantService } from './etudiant.service';
import { AddStudentComponent } from './add-student/add-student.component';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UpdateStudentComponent } from './update-student/update-student.component';
import { AuthService } from 'src/app/auth.service';
import { RegisterAccountComponent } from './register-account/register-account.component';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';



@Component({
  selector: 'app-etudiant',
  templateUrl: './etudiant.component.html',
  styleUrls: ['./etudiant.component.css']
})
export class EtudiantComponent implements OnInit , AfterViewInit{
  etudiants: Etudiant[] = [];
  displayedColumns: string[] = ['nom', 'prenom', 'date_naissance', 'numTel', 'email', 'cin', 'niveauScolaire','compte',  'actions'];
  selectedEtudiant: Etudiant | null = null; // Declare selectedEtudiant property here
  dataSource = new MatTableDataSource<Etudiant>();

  @ViewChild(MatPaginator) paginator: MatPaginator | null = null;

  constructor(private etudiantService: EtudiantService, public dialog: MatDialog, private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.fetchEtudiants();
  }
  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }
  
  refreshEtudiants(): void {
    this.etudiantService.getAllEtudiants().subscribe({
      next: (data: Etudiant[]) => {
        this.dataSource.data = data;
        if (this.paginator) {
          this.paginator.firstPage(); // Reset paginator to first page if there are multiple pages
        }
      },
      error: (error) => console.error('Error fetching etudiants:', error)
    });
  }
  
  

  fetchEtudiants(): void {
    this.etudiantService.getAllEtudiants().subscribe({
      next: (data: Etudiant[]) => {
        this.dataSource.data = data; // Update the dataSource's data property
      },
      error: (error) => {
        console.error('Error fetching etudiants:', error);
        this.snackBar.open('Failed to fetch students', 'Close', {
          duration: 2000,
        });
      }
    });
  }

  
  openAddStudentDialog(): void {
    const dialogRef = this.dialog.open(AddStudentComponent, {

    });
  
    dialogRef.afterClosed().subscribe(result => {
      if (result) { // Check if result is not undefined
        console.log('New student added, refreshing list...');
        this.refreshEtudiants();
      }
    });
  }
  
  
  deleteEtudiant(id: string): void {
    if (confirm('    Êtes-vous sûr de vouloir supprimer cet Candidat ?')) {
      this.etudiantService.deleteEtudiant(id).subscribe({
        next: () => {
          this.snackBar.open('Student successfully deleted', 'Close', { duration: 2000 });
          this.refreshEtudiants(); // Ensure this is called right after successful deletion
        },
        error: (error) => {
          console.error('Error deleting student:', error);
          this.snackBar.open('Failed to delete student', 'Close', { duration: 2000 });
        }
      });
    }
  }
  
  
  openUpdateStudentModal(etudiant: Etudiant) {
    const dialogRef = this.dialog.open(UpdateStudentComponent, {
      data: { etudiant }, // Pass the student data to the update student component


    });

    dialogRef.componentInstance.studentUpdated.subscribe(() => {
      console.log('Student updated, refreshing list...');
      this.refreshEtudiants();
    });

    dialogRef.afterClosed().subscribe((result: any) => {
      console.log('The dialog was closed');
      // Handle any actions after the modal is closed
    });
  }


  openRegister(etudiant: Etudiant): void {
    if (etudiant && etudiant._id) { // Check if etudiant and _id are defined
      const dialogRef = this.dialog.open(RegisterAccountComponent, {
        data: { etudiant }, // Pass the etudiant data to the registration modal
        // center horizontally and vertically
        // Add any other modal options here
      });
    
      dialogRef.afterClosed().subscribe((result: any) => {
        console.log('The registration modal was closed');
        // Handle any actions after the modal is closed, if needed
        this.refreshEtudiants();
      });
    } else {
      console.error('Invalid etudiant or missing _id');
      // Optionally display an error message to the user
    }
  }
  
  
}
