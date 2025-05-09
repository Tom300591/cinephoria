import { Injectable, inject } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ApiService } from './api.service';
import { User } from '../models/user.model';
import { AppStorageService } from './appStorage.service';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private storage = inject(AppStorageService)
  private isLoggedSubject = new BehaviorSubject<boolean>(false);
  isLoggedIn$ = this.isLoggedSubject.asObservable();

  private userSubject = new BehaviorSubject<User | null>(null);
  user$ = this.userSubject.asObservable();

  constructor(private api: ApiService) {
    if (this.isBrowser() && this.storage.getItem('token')) {
      this.isLoggedSubject.next(true);

      this.api.getProfile().subscribe({
        next: (res) => this.setUser(res.user),
        error: () => this.logout()
      });

    }
  }

  private isBrowser(): boolean {
    return typeof window !== 'undefined' && typeof this.storage !== 'undefined';
  }

  isLoggedIn(): boolean {
    return this.isLoggedSubject.value;
  }

  login(token: string): void {
    if (this.isBrowser()) {
      this.storage.setItem('token', token);
      this.isLoggedSubject.next(true);
    }
  }

  logout(): void {
    if (this.isBrowser()) {
      this.storage.removeItem('token');
      this.isLoggedSubject.next(false);
    }
  }

  setUser(user: User): void {
    console.log('utilisateur stocké :', user)
    return this.userSubject.next(user);
  }

  getUser(): User | null {
    return this.userSubject.value;
  }
}
