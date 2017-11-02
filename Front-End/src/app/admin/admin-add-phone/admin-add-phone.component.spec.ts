import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminAddPhoneComponent } from './admin-add-phone.component';

describe('AdminAddPhoneComponent', () => {
  let component: AdminAddPhoneComponent;
  let fixture: ComponentFixture<AdminAddPhoneComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminAddPhoneComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminAddPhoneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
