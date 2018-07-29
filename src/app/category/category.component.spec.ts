import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CategoryComponent } from './category.component';
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';


describe('CategoryComponent', () => {
  let component: CategoryComponent;
  let fixture: ComponentFixture<CategoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CategoryComponent],
      imports: [MatDialogModule, FormsModule, HttpClientModule],
      providers: [{ provide: MAT_DIALOG_DATA, useValue: { budget: { id: 1 } } }, {
        provide: MatDialogRef,
        useValue: {
          close: (dialogResult: any) => { }
        }

      }]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
