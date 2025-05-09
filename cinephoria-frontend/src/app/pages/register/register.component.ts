import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from '../../core/services/api.service';

@Component({
  selector: 'app-register',
  imports: [CommonModule, FormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {
  user = {
    email: '',
    password: '',
    confirmPassword: '',
    prenom: '',
    nom: '',
    pseudo:''
  }

  errorMessage = ''
  successMessage = ''

  private api = inject(ApiService)
  private router = inject(Router)

  onRegister(): void{
    if (this.user.password !== this.user.confirmPassword) {
      this.errorMessage = 'Les mots de passe ne correspondent pas'
      return
    }

    this.api.register(this.user).subscribe({
      next: () => {
        this.successMessage = 'Compte créé ! Vous allez être redirigé...'
        setTimeout(()=>this.router.navigateByUrl('/login'), 2000)
      },
      error: () => {
        this.errorMessage=`Erreur lors de l'inscription. Veuillez réessayer.`
      }
    })
  }
}
