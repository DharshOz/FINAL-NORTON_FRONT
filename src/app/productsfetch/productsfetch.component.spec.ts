import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductsfetchComponent } from './productsfetch.component';

describe('ProductsfetchComponent', () => {
  let component: ProductsfetchComponent;
  let fixture: ComponentFixture<ProductsfetchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductsfetchComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductsfetchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
