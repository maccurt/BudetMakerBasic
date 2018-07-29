import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoryListComponent } from './category-list.component';
import { MatDialogModule } from '@angular/material';

describe('CategoryListComponent', () => {
  let component: CategoryListComponent;
  let fixture: ComponentFixture<CategoryListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CategoryListComponent],
      imports: [MatDialogModule]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CategoryListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
