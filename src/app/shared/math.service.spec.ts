import { TestBed, inject } from '@angular/core/testing';

import { MathService } from './math.service';

describe('MathService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MathService]
    });
  });

  it('should be created', inject([MathService], (service: MathService) => {
    expect(service).toBeTruthy();
  }));

  it('round', () => {
    const mathService = new MathService();
    expect(mathService.round(10.345, 2)).toEqual(10.35);
    expect(mathService.round(10.345, 3)).toEqual(10.345);
    expect(mathService.round(10.3457, 3)).toEqual(10.346);
    expect(mathService.round(10.3455, 3)).toEqual(10.346);
    expect(mathService.round(10.3454, 3)).toEqual(10.345);
  });

});
