import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { RawMaterialService } from '../services/raw-material.service';
import { RawMaterial } from '../models/raw-material.model';

@Component({
  selector: 'app-raw-material',
  templateUrl: './raw-material.component.html',
  styleUrls: ['./raw-material.component.css']
})
export class RawMaterialComponent implements OnInit {
  rawMaterialId: number | null = null;
  isEditMode = false;
  rawMaterialForm: FormGroup;

  constructor(
    private rawMaterialService: RawMaterialService,
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder
  ) {
    this.rawMaterialForm = this.fb.group({
      name: [null, Validators.required],
      description: [null, Validators.required],
      category: [null, Validators.required],
      price: [null, Validators.required],
      unitOfMeasure: [null, Validators.required]
    });
  }

  ngOnInit(): void {
    this.rawMaterialId = this.route.snapshot.params['id'] as number | null;
    this.isEditMode = !!this.rawMaterialId;

    if (this.isEditMode) {
      this.loadRawMaterialData();
    }
  }

  loadRawMaterialData(): void {
    if (this.rawMaterialId) {
      this.rawMaterialService.getRawMaterialById(this.rawMaterialId).subscribe((rawMaterial: RawMaterial) => {
        this.rawMaterialForm.patchValue({
          name: rawMaterial.name,
          description: rawMaterial.description,
          category: rawMaterial.category,
          price: rawMaterial.price,
          unitOfMeasure: rawMaterial.unitOfMeasure
        });
      });
    }
  }

  onSubmit(): void {
    if (this.rawMaterialForm.invalid) {
      return;
    }

    const rawMaterialData: RawMaterial = this.rawMaterialForm.getRawValue();
    if (this.isEditMode && this.rawMaterialId) {
      rawMaterialData.id = this.rawMaterialId;
      this.rawMaterialService.updateRawMaterial(rawMaterialData).subscribe(() => {
        this.router.navigate(['/dashboard']);
      });
    } else {
      this.rawMaterialService.createRawMaterial(rawMaterialData).subscribe(() => {
        this.router.navigate(['/dashboard']);
      });
    }
  }
}
