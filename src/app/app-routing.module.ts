import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DashboardComponent } from './dashboard/dashboard.component';
import { ProductComponent } from './product/product.component';
import { RawMaterialComponent } from './raw-material/raw-material.component';

const routes: Routes = [
  { path: '', component: DashboardComponent },
  { path: 'product', component: ProductComponent },
  { path: 'raw-material', component: RawMaterialComponent },
  // Adicione mais rotas conforme necessário
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
