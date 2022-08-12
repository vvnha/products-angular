import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from 'src/app/models';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss'],
})
export class ProductDetailComponent implements OnInit {
  public product: Product | undefined;
  public productCode: string = '';
  public isExisted: boolean = true;
  public isLoading: boolean = true;

  constructor(
    private route: ActivatedRoute,
    private _productService: ProductService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.isLoading = true;
    const routeParams = this.route.snapshot.paramMap;
    const productCodeFromRoute = routeParams.get('productCode');

    if (productCodeFromRoute !== null) this.productCode = productCodeFromRoute;

    this.getProductByCode();
  }

  public getProductByCode() {
    this._productService
      .searchProductByCode('products', { search: this.productCode })
      .subscribe((response) => {
        if (response.totalCount === 0) {
          this.isExisted = false;
          return;
        }

        this.product = response.data[0];
        this.isLoading = false;

        // this._productService.setProductList(this.productList);

        // this._productService.productList$.subscribe((list) => {
        //   this.productList = list;
        // });
      });
  }

  public onClickUpdate(event: Event) {
    event.preventDefault();

    this.router.navigate([`edit/${this.productCode}`]);
  }

  public onClickDelete(event: Event) {
    event.preventDefault();
    this._productService
      .deleteProduct('products', String(this.product?.id))
      .subscribe(() => {
        this.router.navigate(['/']);
      });
  }
}
