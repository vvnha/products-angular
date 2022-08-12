import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss'],
})
export class PaginationComponent implements OnInit {
  @Input() currentPage: number = 1;
  @Input() totalPage: number = 1;
  @Output() handleClickPagination: EventEmitter<number> =
    new EventEmitter<number>();

  constructor() {}

  public ngOnInit(): void {}
  public onButtonClick(event: Event, page: number) {
    event.preventDefault();
    if (page <= 0 || page > this.totalPage) return;

    this.handleClickPagination.emit(page);
  }
}
