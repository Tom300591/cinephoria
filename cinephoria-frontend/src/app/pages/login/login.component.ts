import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';
import { ApiService } from '../../core/services/api.service';
import { User } from '../../core/models/user.model';

@Component({
  selector: 'app-login',
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  email = ''
  password = ''
  errorMessage = ''

  private api = inject(ApiService)
  private router = inject(Router)
  private authService = inject(AuthService)

  onLogin(): void {
    this.api.login(this.email, this.password).subscribe({
      next: (res) => {
        this.authService.login(res.token)
        this.api.getProfile().subscribe({
          next: (profilRes) => {
            console.log('profil reçu',profilRes.user)
            const user: User = profilRes.user
            this.authService.setUser(profilRes.user)
          },
          error: () => {
            console.warn('Impossible de récupérer le profil')
          }
        })
        this.router.navigateByUrl('/')
      },
      error: () => {
        this.errorMessage = 'Identifiants incorrect'
      }
    })
  }
}
