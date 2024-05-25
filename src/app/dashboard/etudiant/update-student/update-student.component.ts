
import { Component, Inject, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Etudiant } from 'src/app/model/etudiant';
import { EtudiantService } from '../etudiant.service';


@Component({
  selector: 'app-update-student',
  templateUrl: './update-student.component.html',
  styleUrls: ['./update-student.component.css']
})
export class UpdateStudentComponent implements OnInit {
  updateStudentForm: FormGroup = new FormGroup({});
  @Output() studentUpdated: EventEmitter<any> = new EventEmitter();

  constructor(
    private formBuilder: FormBuilder,
    private etudiantService: EtudiantService,
    public dialogRef: MatDialogRef<UpdateStudentComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { etudiant: Etudiant }
  ) { }

  ngOnInit(): void {
    this.updateStudentForm = this.formBuilder.group({
      nom: [this.data.etudiant.nom, Validators.required],
      prenom: [this.data.etudiant.prenom, Validators.required],
      date_naissance: [this.data.etudiant.date_naissance, Validators.required],
      numTel: [this.data.etudiant.numTel],
      email: [this.data.etudiant.email, Validators.email],
      cin: [this.data.etudiant.cin, Validators.required],
      niveauScolaire: [this.data.etudiant.niveauScolaire],
      montantApaye: [this.data.etudiant.montantApaye],
      compte: [this.data.etudiant.compte]
    });
  }

  onSubmit(): void {
    const updatedStudentData = this.updateStudentForm.value;
    const updatedStudent: Etudiant = {
      ...this.data.etudiant,
      ...updatedStudentData
    };
    this.etudiantService.updateEtudiant(updatedStudent._id!, updatedStudent).subscribe({
      next: (updatedEtudiant) => {
        console.log('Etudiant updated:', updatedEtudiant);
        this.studentUpdated.emit(); // Emit event when student is updated
        // Close the dialog
        this.dialogRef.close();
      },
      error: (error) => console.error(error)
    });
  }

  closeModal(): void {
    // Close the dialog without any actions
    this.dialogRef.close();
  }
}
