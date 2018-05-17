import { TestBed, inject } from '@angular/core/testing';

import { FetchWaterDispenseDataService } from './fetch-water-dispense-data.service';

describe('FetchWaterDispenseDataService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FetchWaterDispenseDataService]
    });
  });

  it('should be created', inject([FetchWaterDispenseDataService], (service: FetchWaterDispenseDataService) => {
    expect(service).toBeTruthy();
  }));
});
