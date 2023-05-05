import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { ProductService } from '../services/product.service';
import { Product } from '../models/product.model';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {
  productId: number;
  isEditMode: boolean;
  productForm: FormGroup;

  constructor(
    private productService: ProductService,
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder
  ) {
    this.productId = this.route.snapshot.params['id'];
    this.isEditMode = !!this.productId;

    this.productForm = this.fb.group({
      name: [null, Validators.required],
      description: [null, Validators.required],
      productionCost: [null, Validators.required],
      profitMargin: [null, Validators.required],
      suggestedSalePrice: [{ value: null, disabled: true }, Validators.required],
      category: [null, Validators.required]
    });
  }

  ngOnInit(): void {
    if (this.isEditMode) {
      this.loadProductData();
    }
  }

  loadProductData(): void {
    this.productService.getProductById(this.productId).subscribe((product: Product) => {
      if (this.productForm) {
        this.productForm.patchValue({
          name: product.name,
          description: product.description,
          productionCost: product.productionCost,
          profitMargin: product.profitMargin,
          suggestedPrice: product.suggestedPrice,
          category: product.category
        });
      }
    });
  }

  onSubmit(): void {
    if (this.productForm && this.productForm.invalid) {
      return;
    }

    const productData: Product = this.productForm.getRawValue();
    if (this.isEditMode) {
      productData.id = this.productId;
      this.productService.updateProduct(productData).subscribe(() => {
        this.router.navigate(['/dashboard']);
      });
    } else {
      this.productService.createProduct(productData).subscribe(() => {
        this.router.navigate(['/dashboard']);
      });
    }
  }

  calculateSuggestedSalePrice(): void {
    if (!this.productForm) {
      return;
    }

    const productionCost = this.productForm.get('productionCost')?.value;
    const profitMargin = this.productForm.get('profitMargin')?.value;

    if (productionCost !== null && profitMargin !== null) {
      const suggestedSalePrice = productionCost * (1 + profitMargin / 100);
      this.productForm.patchValue({
        suggestedSalePrice: suggestedSalePrice.toFixed(2)
      });
    }
  }
}
