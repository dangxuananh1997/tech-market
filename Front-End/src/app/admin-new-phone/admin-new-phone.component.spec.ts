import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminNewPhoneComponent } from './admin-new-phone.component';

describe('AdminNewPhoneComponent', () => {
  let component: AdminNewPhoneComponent;
  let fixture: ComponentFixture<AdminNewPhoneComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminNewPhoneComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminNewPhoneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
