import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminEditPhoneComponent } from './admin-edit-phone.component';

describe('AdminEditPhoneComponent', () => {
  let component: AdminEditPhoneComponent;
  let fixture: ComponentFixture<AdminEditPhoneComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminEditPhoneComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminEditPhoneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
