import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchDevicesComponent } from './search-devices.component';

describe('SearchDevicesComponent', () => {
  let component: SearchDevicesComponent;
  let fixture: ComponentFixture<SearchDevicesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchDevicesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchDevicesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
