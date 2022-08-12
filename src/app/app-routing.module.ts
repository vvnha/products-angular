import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddEditFormComponent } from './components/add-edit-form/add-edit-form.component';
import { HomeComponent } from './components/home/home.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { ProductDetailComponent } from './components/product-detail/product-detail.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'detail/:productCode', component: ProductDetailComponent },
  { path: 'add', component: AddEditFormComponent },
  { path: 'edit/:productCode', component: AddEditFormComponent },
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: '**', component: NotFoundComponent }, // Wildcard route for a 404 page
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
