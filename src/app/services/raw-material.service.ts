import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { RawMaterial } from '../models/raw-material.model';

@Injectable({
  providedIn: 'root'
})
export class RawMaterialService {
  private API_URL = 'https://your-api-url.com/api';

  constructor(private http: HttpClient) {}

  getRawMaterialById(id: number): Observable<RawMaterial> {
    return this.http.get<RawMaterial>(`${this.API_URL}/raw-materials/${id}`);
  }

  getAllRawMaterials(): Observable<RawMaterial[]> {
    return this.http.get<RawMaterial[]>(`${this.API_URL}/raw-materials`);
  }

  updateRawMaterial(rawMaterial: RawMaterial): Observable<RawMaterial> {
    return this.http.put<RawMaterial>(`${this.API_URL}/raw-materials/${rawMaterial.id}`, rawMaterial);
  }

  createRawMaterial(rawMaterial: RawMaterial): Observable<RawMaterial> {
    return this.http.post<RawMaterial>(`${this.API_URL}/raw-materials`, rawMaterial);
  }

  deleteRawMaterialById(id: number): Observable<void> {
    return this.http.delete<void>(`${this.API_URL}/raw-materials/${id}`);
  }
}
