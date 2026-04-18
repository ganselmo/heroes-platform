import { HttpErrorResponse, HttpHandlerFn, HttpInterceptorFn, HttpRequest } from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError, throwError } from 'rxjs';
import { NotificationService } from '../services/notification/notification.service';

const ERROR_MESSAGES: Record<number, string> = {
  0: 'Could not connect to the server',
  404: 'The requested resource was not found',
  500: 'Internal server error',
};

export const errorInterceptor: HttpInterceptorFn = (
  req: HttpRequest<unknown>,
  next: HttpHandlerFn,
) => {
  const notificationService = inject(NotificationService);

  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      const message = ERROR_MESSAGES[error.status] ?? `An unexpected error occurred (code: ${error.status})`;
      notificationService.showError(message);
      return throwError(() => error);
    }),
  );
};
