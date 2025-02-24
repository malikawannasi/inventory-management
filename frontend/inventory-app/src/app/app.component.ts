import { Component } from '@angular/core';
import { ProductFormComponent } from './product-form/product-form.component';
import { ProductListComponent } from './product-list/product-list.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http'; // <-- Import ici
import { CommonModule } from '@angular/common'; // Import de CommonModule

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    ProductFormComponent,
    ProductListComponent,
    ReactiveFormsModule,
    HttpClientModule,
  CommonModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'inventory-management';
}
