import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { ProductFormComponent } from './product-form/product-form.component';
import { ProductListComponent } from './product-list/product-list.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common'; // Import de CommonModule
import { RouterModule } from '@angular/router';  // Import du RouterModule
import { routes } from './app.routes';  // Import des routes

@NgModule({
  declarations: [
    AppComponent,
    ProductFormComponent,
    ProductListComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    HttpClientModule,
    CommonModule,
    RouterModule.forRoot(routes)  // Ajoutez RouterModule avec les routes
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }


