import { TestBed } from '@angular/core/testing';
import { LoadingService } from './loading.service';

describe('LoadingService', () => {
  let service: LoadingService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LoadingService],
    });

    service = TestBed.inject(LoadingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
  describe('Starting boolean Value', () => {
    it('should emit false as initial loading state', () => {
      let currentValue: boolean | undefined;

      service.loading$.subscribe((value) => {
        currentValue = value;
      });

      expect(currentValue).toBe(false);
    });
  });

  describe('Execute show', () => {
    it('should emit true when show() is called', () => {
      let currentValue: boolean | undefined;

      service.loading$.subscribe((value) => {
        currentValue = value;
      });

      service.show();

      expect(currentValue).toBe(true);
    });
  });

  describe('Execute hide', () => {
    it('should emit false when hide() is called', () => {
      let currentValue: boolean | undefined;

      service.loading$.subscribe((value) => {
        currentValue = value;
      });

      service.hide();

      expect(currentValue).toBe(false);
    });
  });
});
