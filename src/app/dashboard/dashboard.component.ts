import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { ProductService } from '../services/product.service';
import { RawMaterialService } from '../services/raw-material.service';
import { Product } from '../models/product.model';
import { RawMaterial } from '../models/raw-material.model';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  products: Product[] = [];
  rawMaterials: RawMaterial[] = [];

  constructor(
    private productService: ProductService,
    private rawMaterialService: RawMaterialService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadProducts();
    this.loadRawMaterials();
  }

  loadProducts(): void {
    this.productService.getAllProducts().subscribe((products: Product[]) => {
      this.products = products;
    });
  }

  loadRawMaterials(): void {
    this.rawMaterialService.getAllRawMaterials().subscribe((rawMaterials: RawMaterial[]) => {
      this.rawMaterials = rawMaterials;
    });
  }

  onAddProduct(): void {
    this.router.navigate(['/product/create']);
  }

  onEditProduct(productId: number): void {
    this.router.navigate(['/product/edit', productId]);
  }

  onDeleteProduct(productId: number): void {
    this.productService.deleteProductById(productId).subscribe(() => {
      this.loadProducts();
    });
  }

  onAddRawMaterial(): void {
    this.router.navigate(['/raw-material/create']);
  }

  onEditRawMaterial(rawMaterialId: number): void {
    this.router.navigate(['/raw-material/edit', rawMaterialId]);
  }

  onDeleteRawMaterial(rawMaterialId: number): void {
    this.rawMaterialService.deleteRawMaterialById(rawMaterialId).subscribe(() => {
      this.loadRawMaterials();
    });
  }
}
