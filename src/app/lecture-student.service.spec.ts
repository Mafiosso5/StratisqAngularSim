import { TestBed } from '@angular/core/testing';

import { LectureStudentService } from './lecture-student.service';

describe('LectureStudentService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: LectureStudentService = TestBed.get(LectureStudentService);
    expect(service).toBeTruthy();
  });
});
