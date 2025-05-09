import { inject, Inject } from "@angular/core";
import { CanActivateFn, Router } from "@angular/router";
import { AppStorageService } from '../services/appStorage.service'


export const authGuard: CanActivateFn = (route, state) => {

  const router = Inject(Router)
  const storage=inject(AppStorageService)
  const token = storage.getItem('token')

  return token ? true : router.createUrlTree('/login')
}
