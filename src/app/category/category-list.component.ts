import { Component, OnInit, Input } from '@angular/core';
import { Category } from './category.type';
import { MatDialog } from '@angular/material/dialog';
import { CategoryComponent } from './category.component';

@Component({
  selector: 'category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.less']
})
export class CategoryListComponent implements OnInit {

  @Input() categoryList: Category[];
  @Input() total: number;
  constructor(private modal: MatDialog) { }

  ngOnInit() {

  }

  addCategory = () => {
    let modalRef = this.modal.open(CategoryComponent, {
      width: '450px'
    })

    modalRef.afterClosed().subscribe((data: any) => {
      console.log('after close', data);
    })
  }

}