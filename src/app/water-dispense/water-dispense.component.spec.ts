import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WaterDispenseComponent } from './water-dispense.component';

describe('WaterDispenseComponent', () => {
  let component: WaterDispenseComponent;
  let fixture: ComponentFixture<WaterDispenseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WaterDispenseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WaterDispenseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
