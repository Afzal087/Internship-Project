import { HttpInterceptorFn } from '@angular/common/http';

export const sessionInterceptor: HttpInterceptorFn = (req, next) => {
  const userId = sessionStorage.getItem('userId');
  const role = sessionStorage.getItem('role');

  if (userId && role) {
    req = req.clone({
      setHeaders: {
        userId,
        role
      }
    });
  }

  return next(req);
};
