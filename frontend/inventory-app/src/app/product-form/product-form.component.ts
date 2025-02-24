import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProductService } from '../services/product.service';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-product-form',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.scss']
})
export class ProductFormComponent {
  productForm: FormGroup;

  constructor(private fb: FormBuilder, private productService: ProductService) {
    this.productForm = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      price: [0, [Validators.required, Validators.min(0)]],
      stock: [0, [Validators.required, Validators.min(0)]],
      category: ['', Validators.required]
    });
  }

  submitForm(): void {
    if (this.productForm.valid) {

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
