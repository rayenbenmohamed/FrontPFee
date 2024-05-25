import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ModuleService } from 'src/app/services/module.service';
import { Etudiant } from 'src/app/model/etudiant';

@Component({
  selector: 'app-add-student-module',
  templateUrl: './add-student-module.component.html',
  styleUrls: ['./add-student-module.component.css']
})
export class AddStudentModuleComponent implements OnInit {
  moduleId: string;
  students: Etudiant[] = [];
  searchText: string = '';

  constructor(
    private moduleService: ModuleService,
    public dialogRef: MatDialogRef<AddStudentModuleComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.moduleId = data.moduleId;
  }

  ngOnInit(): void {
    this.getStudentsNotInModule();
  }

  getStudentsNotInModule(): void {
    this.moduleService.getStudentsNotInModule(this.moduleId).subscribe(
      (students: Etudiant[]) => {
        this.students = students;
      },
      (error) => {
        console.error('Error fetching students:', error);
        // Handle error
      }
    );
  }

  addStudentToGroup(etudiantId: string): void {
    this.moduleService.addStudentToGroup(this.moduleId, etudiantId).subscribe(
      () => {
        console.log('Student added to the group successfully.');
        this.dialogRef.close(); // Close the dialog after adding the student
      },
      (error) => {
        console.error('Error adding student to the group:', error);
        // Handle error
      }
    );
  }

  filterStudents(): Etudiant[] {
    if (!this.searchText.trim()) {
      return this.students; // If search text is empty, return all students
    }

    const searchTextLowerCase = this.searchText.toLowerCase();
    return this.students.filter(student =>
      student.nom.toLowerCase().includes(searchTextLowerCase) ||
      student.prenom.toLowerCase().includes(searchTextLowerCase) 
    );
  }
}
