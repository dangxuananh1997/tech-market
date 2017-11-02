import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminViewLatopComponent } from './admin-view-latop.component';

describe('AdminViewLatopComponent', () => {
  let component: AdminViewLatopComponent;
  let fixture: ComponentFixture<AdminViewLatopComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminViewLatopComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminViewLatopComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
