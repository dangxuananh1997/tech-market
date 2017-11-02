import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LaptopFilterComponent } from './laptop-filter.component';

describe('LaptopFilterComponent', () => {
  let component: LaptopFilterComponent;
  let fixture: ComponentFixture<LaptopFilterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LaptopFilterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LaptopFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
