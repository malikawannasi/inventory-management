import { Component, OnInit, Input } from '@angular/core';
import { ProductService } from '../services/product.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router'; // Importer Router pour la navigation

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {

  @Input() products: any[] = []; // Propriété pour accepter la liste des produits

  constructor(private productService: ProductService, private router: Router) {}

  ngOnInit(): void {
    if (this.products.length === 0) {
      this.loadProducts();  // Charger les produits si la liste est vide
    }
  }

  loadProducts(): void {
    this.productService.getProducts().subscribe(data => {
      this.products = data;  // Mettre à jour les produits
    });
  }

  deleteProduct(id: string): void {
  // Afficher une fenêtre de confirmation
  const isConfirmed = window.confirm('Êtes-vous sûr de vouloir supprimer ce produit ?');

  if (isConfirmed) {
    // Si l'utilisateur confirme, on appelle la méthode de suppression
    this.productService.deleteProduct(id).subscribe(() => {
      this.loadProducts();  // Recharger la liste après suppression
      alert('Produit supprimé avec succès!');
    }, (error) => {
      alert('Erreur lors de la suppression du produit!');
    });
  } else {
    // Si l'utilisateur annule, on affiche un message (optionnel)
    alert('Suppression annulée');
  }
}


  editProduct(id: string): void {
    // Naviguer vers le formulaire de modification avec l'ID du produit
    this.router.navigate([`/edit-product/${id}`]);  // Utilise la route de modification
  }
}
