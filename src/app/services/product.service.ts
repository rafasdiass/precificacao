import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Product } from '../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private API_URL = 'https://your-api-url.com/api';

  constructor(private http: HttpClient) {}

  getProductById(id: number): Observable<Product> {
    return this.http.get<Product>(`${this.API_URL}/products/${id}`);
  }

  updateProduct(product: Product): Observable<Product> {
    return this.http.put<Product>(`${this.API_URL}/products/${product.id}`, product);
  }

  createProduct(product: Product): Observable<Product> {
    return this.http.post<Product>(`${this.API_URL}/products`, product);
  }

  getAllProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.API_URL}/products`);
  }

  deleteProductById(id: number): Observable<void> {
    return this.http.delete<void>(`${this.API_URL}/products/${id}`);
  }
}
