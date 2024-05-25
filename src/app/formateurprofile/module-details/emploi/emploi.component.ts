import { Component, Input, OnInit } from '@angular/core';
import { Emploi, PlageHoraire } from 'src/app/model/emploi';
import { EmploiService } from 'src/app/services/emploi.service';

@Component({
  selector: 'app-emploi',
  templateUrl: './emploi.component.html',
  styleUrls: ['./emploi.component.css']
})
export class EmploiComponent implements OnInit {
  @Input() emploiId?: string;
  emploi?: Emploi;
  days = ['lundi', 'mardi', 'mercredi', 'jeudi', 'vendredi', 'samedi', 'dimanche'];

  constructor(private emploiService: EmploiService) {}

  ngOnInit(): void {
    if (this.emploiId) {
      this.emploiService.getEmploiById(this.emploiId).subscribe({
        next: (emploi) => this.emploi = emploi,
        error: (error) => console.error('Error loading emploi:', error)
      });
    }
  }

  getDayPlages(day: string): PlageHoraire[] {
    return this.emploi ? this.emploi[day as keyof Emploi] as PlageHoraire[] : [];
  }

  printEmploi(): void {
    window.print();
  }
}
