import { Component } from '@angular/core';
import { ProductFormComponent } from './product-form/product-form.component';
import { ProductListComponent } from './product-list/product-list.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ProductService } from './services/product.service';  // Assurez-vous d'avoir le service ProductService

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    ProductFormComponent,
    ProductListComponent,
    ReactiveFormsModule,
    HttpClientModule,
    CommonModule,
    RouterModule
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'inventory-management';
  products: any[] = [];  // Pour stocker les produits
  selectedProduct: any = null;  // Pour le produit sélectionné

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.loadProducts();
  }

  // Charger les produits depuis le service
  loadProducts(): void {
    this.productService.getProducts().subscribe(data => {
      this.products = data;
    });
  }

  // Gérer la sélection d'un produit à éditer
  onProductEdited(product: any): void {
    this.selectedProduct = product;  // Définir le produit sélectionné
  }

  // Gérer la mise à jour d'un produit
  onProductUpdated(updatedProduct: any): void {
    const index = this.products.findIndex(product => product._id === updatedProduct._id);
    if (index !== -1) {
      this.products[index] = updatedProduct;  // Mettre à jour le produit dans la liste
    }
    this.selectedProduct = updatedProduct;  // Mettre à jour le produit sélectionné
  }
}
