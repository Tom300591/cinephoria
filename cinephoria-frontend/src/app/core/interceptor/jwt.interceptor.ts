import { HttpInterceptorFn } from '@angular/common/http';
import { AppStorageService } from '../services/appStorage.service';
import { inject } from '@angular/core';

export const jwtInterceptor: HttpInterceptorFn = (req, next) => {
  const storage=inject(AppStorageService)
  const token = storage.getItem('token')

  if (token) {
    const cloned = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    })
    return next(cloned)
  }
  return next(req)
};
