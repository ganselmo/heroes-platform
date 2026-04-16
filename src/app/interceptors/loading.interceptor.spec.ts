import { HttpClient, provideHttpClient, withInterceptors } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { LoadingService } from '../services/loading/loading.service';
import { loadingInterceptor } from './loading.interceptor';
describe('loadingInterceptor', () => {
  let http: HttpClient;
  let httpTesting: HttpTestingController;
  let loadingService: LoadingService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        LoadingService,
        provideHttpClient(withInterceptors([loadingInterceptor])),
        provideHttpClientTesting(),
      ],
    });
    http = TestBed.inject(HttpClient);
    httpTesting = TestBed.inject(HttpTestingController);
    loadingService = TestBed.inject(LoadingService);
  });

  afterEach(() => {
    httpTesting.verify();
  });

  it('should call show() when a request starts', () => {
    vi.spyOn(loadingService, 'show');
    http.get('/test').subscribe();
    expect(loadingService.show).toHaveBeenCalled();
    httpTesting.expectOne('/test').flush({});
  });

  it('should call hide() when a request completes', () => {
    vi.spyOn(loadingService, 'hide');
    http.get('/test').subscribe();
    const req = httpTesting.expectOne('/test');
    expect(loadingService.hide).not.toHaveBeenCalled();
    req.flush({});
    expect(loadingService.hide).toHaveBeenCalled();
  });

  it('should call hide() when a request errors', () => {
    vi.spyOn(loadingService, 'hide');
    http.get('/test').subscribe({ error: () => {} });
    httpTesting.expectOne('/test').error(new ProgressEvent('error'));
    expect(loadingService.hide).toHaveBeenCalled();
  });
});
