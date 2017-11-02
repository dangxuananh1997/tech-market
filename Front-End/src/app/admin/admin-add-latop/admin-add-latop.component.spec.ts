import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminAddLatopComponent } from './admin-add-latop.component';

describe('AdminAddLatopComponent', () => {
  let component: AdminAddLatopComponent;
  let fixture: ComponentFixture<AdminAddLatopComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminAddLatopComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminAddLatopComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
