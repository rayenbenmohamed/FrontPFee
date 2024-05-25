import { Component, Input, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { SelectionModel } from '@angular/cdk/collections';
import { ModuleService } from 'src/app/services/module.service';
import { AbsenceService } from 'src/app/services/absence.service';
import { Etudiant } from 'src/app/model/etudiant';

@Component({
  selector: 'app-absence',
  templateUrl: './absence.component.html',
  styleUrls: ['./absence.component.css']
})
export class AbsenceComponent implements OnInit {
  @Input() moduleId?: string;
  currentDate = new Date();
  etudiants = new MatTableDataSource<Etudiant>([]);
  displayedColumns: string[] = ['select', 'nom', 'prenom', 'email']; 
  selection = new SelectionModel<Etudiant>(true, []);

  constructor(private moduleService: ModuleService, private absenceService: AbsenceService) {}

  ngOnInit(): void {
    if (this.moduleId) {
      this.moduleService.getModuleById(this.moduleId).subscribe({
        next: (module) => {
          this.etudiants.data = module.etudiants;
        },
        error: (error) => console.error('Error loading module:', error)
      });
    }
  }

  checkboxLabel(row?: Etudiant): string {
    if (!row) return '';
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.nom}`;
  }

  addAbsence() {
    const etudiantIds = this.selection.selected
                        .map(s => s._id)
                        .filter(id => id !== undefined) as string[]; // Type assertion to satisfy TypeScript
  
    if (this.moduleId && etudiantIds.length > 0) {
      this.absenceService.createAbsence(this.moduleId, etudiantIds, this.currentDate).subscribe({
        next: () => {
          console.log('Absence recorded successfully');
          this.selection.clear();
        },
        error: (error) => console.error('Failed to record absence:', error)
      });
    } else {
      console.error('Module ID is undefined or no students selected');
    }
  }
}
