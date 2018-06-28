import { Component, OnInit, Input } from '@angular/core';
import { Category } from './category.type';

@Component({
  selector: 'category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.less']
})
export class CategoryListComponent implements OnInit {

  @Input() categoryList: Category[]
  @Input() total: number;
  constructor() { }

  ngOnInit() { }

}