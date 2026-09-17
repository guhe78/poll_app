import { TestBed } from '@angular/core/testing';

import { Answers } from './answers';

describe('Answers', () => {
  let service: Answers;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Answers);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
