import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProductService } from '../services/product.service';
import { ActivatedRoute, Router } from '@angular/router'; // Importer ActivatedRoute pour récupérer l'ID du produit
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router'; // Importez RouterModule

@Component({
  selector: 'app-product-form',
  standalone: true,
  imports: [ReactiveFormsModule, RouterModule],
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.scss']
})
export class ProductFormComponent implements OnInit {
  @Input() product: any;  // Ajout du décorateur @Input() pour recevoir un produit depuis le parent
  productForm: FormGroup;
  productId: string | null = null;

  constructor(
    private fb: FormBuilder,
    private productService: ProductService,
    private route: ActivatedRoute,
    private router: Router  // Injecter Router pour la navigation
  ) {
    this.productForm = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      price: [0, [Validators.required, Validators.min(0)]],
      stock: [0, [Validators.required, Validators.min(0)]],
      category: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    // Si un produit est passé en entrée, préremplir le formulaire
    if (this.product) {
      this.productForm.patchValue(this.product);
    }

    // Si un ID de produit est présent dans l'URL, récupère les informations du produit
    this.route.paramMap.subscribe((params) => {
      this.productId = params.get('id'); // Récupérer l'ID du produit dans l'URL
      if (this.productId) {
        this.productService.getProductById(this.productId).subscribe((product) => {
          this.productForm.patchValue(product);  // Préreplir le formulaire avec les données du produit
        });
      }
    });
  }

  submitForm(): void {
    if (this.productForm.valid) {
      if (this.productId) {
        this.productService.updateProduct(this.productId, this.productForm.value).subscribe({
          next: () => {
            alert('Product updated successfully!');
            this.router.navigate(['/']); // Rediriger vers la liste des produits après modification
          },
          error: (err) => {
            console.error('Error updating product:', err);
            alert(`Error updating product: ${err.status} - ${err.error.message}`);
          }
        });
      } else {
        this.productService.createProduct(this.productForm.value).subscribe({
          next: () => {
            alert('Product added successfully!');
            this.productForm.reset();
          },
          error: (err) => {
            console.error('Error adding product:', err);
            alert(`Error adding product: ${err.status} - ${err.error.message}`);
          }
        });
      }
    }
  }
}
