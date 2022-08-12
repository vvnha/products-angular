import { Component, OnInit } from '@angular/core';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from 'src/app/models';
import { ProductService } from 'src/app/services/product.service';
import _get from 'lodash/get';
import { Location } from '@angular/common';

@Component({
  selector: 'app-add-edit-form',
  templateUrl: './add-edit-form.component.html',
  styleUrls: ['./add-edit-form.component.scss'],
})
export class AddEditFormComponent implements OnInit {
  public productCode: string | null = null;
  public product: Product | null = null;
  public isLoading: boolean = true;

  public formData: FormGroup = this.formBuilder.group({
    name: [_get(this.product, 'name', ''), Validators.required],
    code: [_get(this.product, 'code', ''), Validators.required],
    category: [_get(this.product, 'category', ''), Validators.required],
    brand: [_get(this.product, 'brand', '')],
    type: [_get(this.product, 'type', '')],
    price: [
      _get(this.product, 'price', 0),
      [Validators.min(0), Validators.pattern(/^(?!0\d)\d*(\.\d+)?$/)],
    ],
    description: [_get(this.product, 'description', '')],
  });

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private _productService: ProductService,
    private router: Router,
    private location: Location
  ) {}

  ngOnInit(): void {
    const routeParams = this.route.snapshot.paramMap;
    const productCodeFromRoute = routeParams.get('productCode');

    if (productCodeFromRoute !== null) {
      this.productCode = productCodeFromRoute;
      this.getProductByCode();
    }
  }

  public onSubmit(): void {
    this.handleSaveProduct(this.formData.value);
  }

  public getProductByCode() {
    if (this.productCode !== null)
      this._productService
        .searchProductByCode('products', { search: this.productCode })
        .subscribe((response) => {
          if (response.totalCount > 0) {
            const producDetail = response.data[0];
            this.product = producDetail;

            this.setValue(producDetail);

            this.isLoading = false;
          }
        });
  }

  public setValue(producDetail: Product) {
    this.formData.patchValue({
      name: _get(producDetail, 'name', ''),
      code: _get(producDetail, 'code', ''),
      category: _get(producDetail, 'category', ''),
      brand: _get(producDetail, 'brand', ''),
      type: _get(producDetail, 'type', ''),
      price: _get(producDetail, 'price', 0),
      description: _get(producDetail, 'description', ''),
    });
  }

  public handleSaveProduct(formValues: Partial<Product>) {
    try {
      const isCreated = this.product === null;
      let newProduct: Product | undefined;

      if (isCreated) {
        this._productService
          .addProduct('products', formValues)
          .subscribe((response) => {
            newProduct = response;

            if (newProduct !== undefined)
              this.router.navigate([`detail/${newProduct.code}`]);
          });
      } else {
        this._productService
          .updateProduct('products', { ...formValues, id: this.product?.id })
          .subscribe((response) => {
            newProduct = response;

            if (newProduct !== undefined)
              this.router.navigate([`detail/${newProduct.code}`]);
          });
      }
    } catch (error) {
      console.log(error);
    }
  }

  public onClickBack(event: Event) {
    event.preventDefault();
    this.location.back();
  }
}
