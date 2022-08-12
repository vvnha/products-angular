import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Product } from '../models';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private API_BASE_URL = 'https://62e87e11249bb1284eaf44f4.mockapi.io/api/v1';

  private _productList: BehaviorSubject<Product[]> = new BehaviorSubject<
    Product[]
  >([]);
  productList$: Observable<Product[]> = this._productList.asObservable();

  private httpOptions = {
    baseURL: this.API_BASE_URL,
    headers: {
      'Content-Type': 'application/json',
    },
  };

  constructor(private httpClient: HttpClient) {}

  public getProducts(
    resource: string,
    params: { page: number; limit: number }
  ): Observable<any> {
    const url = `${this.API_BASE_URL}/${resource}`;

    return this.httpClient.get<any>(url, {
      ...this.httpOptions,
      params,
    });
  }

  public searchProductByCode(
    resource: string,
    params: { search: string }
  ): Observable<any> {
    const url = `${this.API_BASE_URL}/${resource}`;

    return this.httpClient.get<any>(url, {
      ...this.httpOptions,
      params,
    });
  }

  public updateProduct(
    resource: string,
    data: Partial<Product>
  ): Observable<any> {
    const url = `${this.API_BASE_URL}/${resource}/${data.id}`;

    return this.httpClient.put<any>(url, data, this.httpOptions);
  }

  public addProduct(resource: string, data: Partial<Product>): Observable<any> {
    const url = `${this.API_BASE_URL}/${resource}`;

    return this.httpClient.post<any>(url, data, this.httpOptions);
  }

  public setProductList(list: Product[]) {
    this._productList.next(list);
  }

  public deleteProduct(resource: string, productId: string): Observable<any> {
    const url = `${this.API_BASE_URL}/${resource}/${productId}`;

    return this.httpClient.delete<any>(url, this.httpOptions);
  }
}
