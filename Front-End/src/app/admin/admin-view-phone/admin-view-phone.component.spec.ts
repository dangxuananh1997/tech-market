import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminViewPhoneComponent } from './admin-view-phone.component';

describe('AdminViewPhoneComponent', () => {
  let component: AdminViewPhoneComponent;
  let fixture: ComponentFixture<AdminViewPhoneComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminViewPhoneComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminViewPhoneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
