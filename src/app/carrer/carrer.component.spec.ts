import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarrerComponent } from './carrer.component';

describe('CarrerComponent', () => {
  let component: CarrerComponent;
  let fixture: ComponentFixture<CarrerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CarrerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CarrerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
