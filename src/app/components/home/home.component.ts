import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';
import { Product } from 'src/app/models';
import { ActivatedRoute, Router } from '@angular/router';
import { skip } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  public productList: Product[] = [];
  public page: number = 1;
  public limit: number = 6;
  public isLoading: boolean = false;
  public totalPage: number = 1;

  constructor(
    private _productService: ProductService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  public ngOnInit(): void {
    this.isLoading = true;
    this.route.queryParams.pipe().subscribe((params) => {
      const currentPage = params['page'];
      const currentLimit = params['limit'];

      if (currentPage && currentLimit) {
        this.page = Number(currentPage);
        this.limit = Number(currentLimit);
      }

      this.getProductList();
    });
  }

  public getProductList() {
    this._productService
      .getProducts('products', { page: this.page, limit: this.limit })
      .subscribe((response) => {
        this.productList = response.data;
        this.isLoading = false;
        const totalCount = response.totalCount;
        this.totalPage = Math.ceil(totalCount / this.limit);

        // this._productService.setProductList(this.productList);

        // this._productService.productList$.subscribe((list) => {
        //   this.productList = list;
        // });
      });
  }

  public handlePagination(page: number) {
    this.isLoading = true;
    this.router.navigate(['/'], {
      queryParams: {
        page,
        limit: this.limit,
      },
      queryParamsHandling: 'merge',
    });
  }

  public handleClickDetail(productCode: string) {
    console.log(productCode);

    this.router.navigate([`detail/${productCode}`]);
  }
}
