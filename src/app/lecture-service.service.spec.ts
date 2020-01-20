import { TestBed } from '@angular/core/testing';

import { LectureServiceService } from './lecture-service.service';

describe('LectureServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: LectureServiceService = TestBed.get(LectureServiceService);
    expect(service).toBeTruthy();
  });
});
