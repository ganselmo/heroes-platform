import { HttpClient, HttpErrorResponse, provideHttpClient, withInterceptors } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { NotificationService } from '../services/notification/notification.service';
import { errorInterceptor } from './error.interceptor';

describe('errorInterceptor', () => {
  let http: HttpClient;
  let httpTesting: HttpTestingController;

  const mockNotificationService = {
    showError: vi.fn(),
  };

  beforeEach(() => {
    mockNotificationService.showError.mockReset();

    TestBed.configureTestingModule({
      providers: [
        { provide: NotificationService, useValue: mockNotificationService },
        provideHttpClient(withInterceptors([errorInterceptor])),
        provideHttpClientTesting(),
      ],
    });
    http = TestBed.inject(HttpClient);
    httpTesting = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTesting.verify();
  });

  describe('Successful Requests', () => {
    it('should not show notification on successful request', () => {
      http.get('/test').subscribe();
      httpTesting.expectOne('/test').flush({ data: 'ok' });

      expect(mockNotificationService.showError).not.toHaveBeenCalled();
    });
  });

  describe('Error Handling By Status', () => {
    it('should show connection error message for status 0', () => {
      http.get('/test').subscribe({ error: () => {} });
      httpTesting.expectOne('/test').error(new ProgressEvent('error'), { status: 0 });

      expect(mockNotificationService.showError).toHaveBeenCalledWith('Could not connect to the server');
    });

    it('should show not found message for status 404', () => {
      http.get('/test').subscribe({ error: () => {} });
      httpTesting.expectOne('/test').flush('Not Found', { status: 404, statusText: 'Not Found' });

      expect(mockNotificationService.showError).toHaveBeenCalledWith('The requested resource was not found');
    });

    it('should show server error message for status 500', () => {
      http.get('/test').subscribe({ error: () => {} });
      httpTesting.expectOne('/test').flush('Server Error', { status: 500, statusText: 'Internal Server Error' });

      expect(mockNotificationService.showError).toHaveBeenCalledWith('Internal server error');
    });

    it('should show generic message with status code for unknown errors', () => {
      http.get('/test').subscribe({ error: () => {} });
      httpTesting.expectOne('/test').flush('Forbidden', { status: 403, statusText: 'Forbidden' });

      expect(mockNotificationService.showError).toHaveBeenCalledWith('An unexpected error occurred (code: 403)');
    });
  });

  describe('Error Re-throwing', () => {
    it('should re-throw the error so subscribers can handle it', () => {
      let caughtError: HttpErrorResponse | undefined;

      http.get('/test').subscribe({ error: (err) => (caughtError = err) });
      httpTesting.expectOne('/test').flush('Server Error', { status: 500, statusText: 'Internal Server Error' });

      expect(caughtError).toBeDefined();
      expect(caughtError!.status).toBe(500);
    });
  });
});
