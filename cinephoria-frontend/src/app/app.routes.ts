import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { ReservationComponent } from './pages/reservation/reservation.component';
import { FilmsComponent } from './pages/films/films.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { ContactComponent } from './pages/contact/contact.component';
import { MonEspaceComponent } from './pages/mon-espace/mon-espace.component';
import { AdminComponent } from './pages/admin/admin.component';
import { IntranetComponent } from './pages/intranet/intranet.component';
import { authGuard } from './core/guards/auth.guard';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'films', component: FilmsComponent },
  { path: 'reservation', component: ReservationComponent, canActivate:[authGuard]},
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'contact', component: ContactComponent },
  { path: 'mon-espace', component: MonEspaceComponent, canActivate:[authGuard]},
  { path: 'admin', component: AdminComponent, canActivate:[authGuard]},
  { path: 'intranet', component: IntranetComponent },
  { path: '**', redirectTo:'' }
];
