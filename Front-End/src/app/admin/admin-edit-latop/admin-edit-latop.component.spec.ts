import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminEditLatopComponent } from './admin-edit-latop.component';

describe('AdminEditLatopComponent', () => {
  let component: AdminEditLatopComponent;
  let fixture: ComponentFixture<AdminEditLatopComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminEditLatopComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminEditLatopComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
