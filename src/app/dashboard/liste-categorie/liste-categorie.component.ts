import { Component, OnInit } from '@angular/core';
import { Categorie } from 'src/app/model/categorie';
import { CategorieService } from 'src/app/services/categorie.service';
import { AddcategorieComponent } from './addcategorie/addcategorie.component';
import { MatDialog } from '@angular/material/dialog';
import { UpdateCategorieComponent } from './update-categorie/update-categorie.component';
@Component({
  selector: 'app-liste-categorie',
  templateUrl: './liste-categorie.component.html',
  styleUrls: ['./liste-categorie.component.css']
})
export class ListeCategorieComponent implements OnInit {
  categories: Categorie[] = [];
  displayedColumns: string[] = ['nom', 'description', 'actions'];

  constructor(private categorieService: CategorieService,public dialog: MatDialog) { }

  ngOnInit(): void {
    this.loadCategories();
  }

  loadCategories() {
    this.categorieService.getAllCategories().subscribe(
      data => {
        this.categories = data;
      },
      error => {
        console.log(error);
      }
    );
  }
  openAddCategoryDialog(): void {
    const dialogRef = this.dialog.open(AddcategorieComponent, {
      // You can pass data to the dialog as well if needed
    });
  
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.loadCategories();
      // Handle your result here, e.g., add the new category
    });
  }
  openUpdateCategorieDialog(categorie: Categorie): void {
    const dialogRef = this.dialog.open(UpdateCategorieComponent, {

      data: { categorie }
    });
  
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.loadCategories(); // Reload categories to reflect the update immediately
      }
    });
  }
  deleteCategorie(id: string): void {
    const confirmDelete = confirm('Are you sure you want to delete this category?');
  
    if (confirmDelete) {
      this.categorieService.deleteCategorie(id).subscribe({
        next: () => {
          console.log('Category deleted successfully');
          this.loadCategories(); // Reload the list to reflect the deletion
        },
        error: (error) => {
          console.error('Error deleting category:', error);
          // Handle any errors, e.g., show an error message
        }
      });
    }
  }
    
}
