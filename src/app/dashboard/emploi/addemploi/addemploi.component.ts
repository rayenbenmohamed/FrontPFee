import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog'; // Import MatDialogRef
import { EmploiService } from 'src/app/services/emploi.service';
import { Emploi, PlageHoraire } from 'src/app/model/emploi'; // Adjust the path as necessary

@Component({
  selector: 'app-addemploi',
  templateUrl: './addemploi.component.html',
  styleUrls: ['./addemploi.component.css']
})
export class AddemploiComponent implements OnInit {
  @Output() emploiCreated: EventEmitter<string> = new EventEmitter<string>(); // EventEmitter to emit emploi ID

  emploiForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private emploiService: EmploiService,
    private dialogRef: MatDialogRef<AddemploiComponent> // Inject MatDialogRef
  ) {
    this.emploiForm = this.formBuilder.group({
      nom: [''], // No Validators.required here
      lundi_heureDebut: [''],
      lundi_heureFin: [''],
      mardi_heureDebut: [''],
      mardi_heureFin: [''],
      mercredi_heureDebut: [''],
      mercredi_heureFin: [''],
      jeudi_heureDebut: [''],
      jeudi_heureFin: [''],
      vendredi_heureDebut: [''],
      vendredi_heureFin: [''],
      samedi_heureDebut: [''],
      samedi_heureFin: [''],
      dimanche_heureDebut: [''],
      dimanche_heureFin: [''],
    });
  }

  ngOnInit(): void {
  }

  onSubmit(): void {
    if (this.emploiForm.valid) {
      const emploiData: Emploi = {
        nom: this.emploiForm.get('nom')?.value,
        lundi: [{
          heureDebut: this.emploiForm.get('lundi_heureDebut')?.value,
          heureFin: this.emploiForm.get('lundi_heureFin')?.value,
        }],
        mardi: [{
          heureDebut: this.emploiForm.get('mardi_heureDebut')?.value,
          heureFin: this.emploiForm.get('mardi_heureFin')?.value,
        }],
        mercredi: [{
          heureDebut: this.emploiForm.get('mercredi_heureDebut')?.value,
          heureFin: this.emploiForm.get('mercredi_heureFin')?.value,
        }],
        jeudi: [{
          heureDebut: this.emploiForm.get('jeudi_heureDebut')?.value,
          heureFin: this.emploiForm.get('jeudi_heureFin')?.value,
        }],
        vendredi: [{
          heureDebut: this.emploiForm.get('vendredi_heureDebut')?.value,
          heureFin: this.emploiForm.get('vendredi_heureFin')?.value,
        }],
        samedi: [{
          heureDebut: this.emploiForm.get('samedi_heureDebut')?.value,
          heureFin: this.emploiForm.get('samedi_heureFin')?.value,
        }],
        dimanche: [{
          heureDebut: this.emploiForm.get('dimanche_heureDebut')?.value,
          heureFin: this.emploiForm.get('dimanche_heureFin')?.value,
        }]
      };

      this.emploiService.createEmploi(emploiData).subscribe(
        (response) => {
          console.log('Emploi added successfully:', response);
          // Emit the _id of the created emploi
          this.emploiCreated.emit(response._id);
          // Close the modal
          this.dialogRef.close();
          // Optionally, reset the form here
          this.emploiForm.reset();
        },
        (error) => {
          console.error('Error adding emploi:', error);
          // Handle error appropriately, e.g., show error message to user
        }
      );
    }
  }
}
