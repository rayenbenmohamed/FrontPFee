import { Component, OnInit } from '@angular/core';
import { Emploi } from 'src/app/model/emploi';
import { EmploiService } from 'src/app/services/emploi.service';
import { AddemploiComponent } from './addemploi/addemploi.component';
import { MatDialog } from '@angular/material/dialog';
import { UpdateEmploiComponent } from './update-emploi/update-emploi.component';

@Component({
  selector: 'app-emploi',
  templateUrl: './emploi.component.html',
  styleUrls: ['./emploi.component.css']
})
export class EmploiComponent implements OnInit {
  emplois: Emploi[] = [];
  displayedColumns: string[] = ['nom', 'jour', 'heureDebut', 'heureFin', 'actions'];

  constructor(private emploiService: EmploiService, public dialog: MatDialog) {}

  ngOnInit(): void {
    this.loadEmplois();
  }

  loadEmplois(): void {
    this.emploiService.getAllEmplois().subscribe({
      next: (data) => {
        this.emplois = data;
      },
      error: (error) => {
        console.error('There was an error!', error);
      }
    });
  }

  openAddEmploiDialog(): void {
    const dialogRef = this.dialog.open(AddemploiComponent, {
          width: '100%',
          height:'500px'
       // Set the width as you prefer
      // You can pass data to the dialog as well if needed
    });
  
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.loadEmplois();
      // Handle your result here, e.g., add the new emploi
    });
  }

  openUpdateEmploiModal(emploi: any): void { // Replace `any` with your emploi model type
    if (emploi._id) {
      this.emploiService.getEmploiById(emploi._id).subscribe((completeEmploi) => {
        const dialogRef = this.dialog.open(UpdateEmploiComponent, {
          data: { emploi: completeEmploi },
          width: '100%',
          height:'500px'
          // Additional modal options here
        });
  
        dialogRef.componentInstance.emploiUpdated.subscribe(() => {
          console.log('Emploi updated, refreshing list...');
          this.loadEmplois(); // Method to refresh the emplois list
        });
  
        dialogRef.afterClosed().subscribe(() => {
          console.log('The dialog was closed');
          // Actions after modal is closed
        });
      });
    } else {
      console.error('Emploi ID is undefined');
    }
  }
  
  

  deleteEmploi(id: string): void {
    const confirmDelete = confirm('Are you sure you want to delete this emploi?');
  
    if (confirmDelete) {
      this.emploiService.deleteEmploi(id).subscribe({
        next: () => {
          console.log('Emploi deleted successfully');
          this.loadEmplois(); // Reload the list to reflect the deletion
        },
        error: (error) => {
          console.error('Error deleting emploi:', error);
          // Handle any errors, e.g., show an error message
        }
      });
    }
  }
}
