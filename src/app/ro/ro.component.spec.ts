import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ROComponent } from './ro.component';

describe('ROComponent', () => {
  let component: ROComponent;
  let fixture: ComponentFixture<ROComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ROComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ROComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
