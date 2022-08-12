import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { Product } from 'src/app/models';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss'],
})
export class ProductListComponent implements OnInit {
  @Input() productList: Product[] = [];
  @Output() onClickDetail: EventEmitter<string> = new EventEmitter<string>();

  constructor() {}

  ngOnInit(): void {}

  ngOnChanges(changes: SimpleChanges) {
    this.productList = changes['productList'].currentValue;
  }

  public onClickSeeDetail(event: Event, productCode: string) {
    event.preventDefault();

    this.onClickDetail.emit(productCode);
  }
}
