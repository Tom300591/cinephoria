import { Component, Inject, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../core/services/auth.service';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-navbar',
  imports: [CommonModule, RouterModule],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {
  auth = inject(AuthService)
  private router = inject(Router)
  user=signal<any>(null)

  isLoggedIn=signal(false)

  constructor() {
    this.auth.isLoggedIn$.subscribe((val) => {
      this.isLoggedIn.set(val)
    })

    this.auth.user$.subscribe((u) => {
      this.user.set(u)
    })
  }
  logout(): void{
    this.auth.logout()
    this.router.navigateByUrl('/')
  }
}
