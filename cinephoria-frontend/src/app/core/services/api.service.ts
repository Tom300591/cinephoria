import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../models/user.model';
import { environment } from '../../../environments/environment';
import { AppStorageService } from './appStorage.service';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private storage=inject(AppStorageService)
  private baseUrl = environment.apiUrl

  constructor(private http: HttpClient) { }

  getFilms(): Observable<any> {
    return this.http.get(`${this.baseUrl}/films`)
  }

  login(email: string, password: string) {
    return this.http.post<{ token: string }>(`${this.baseUrl}/users-rel/login`, {
      login: email, password: password
    })
  }

  register(data: any){
    return this.http.post(`${this.baseUrl}/users-rel/register`, data)
  }

  getProfile() {
    return this.http.get<{ message: string; user: User }>(`${this.baseUrl}/users-rel/profile`)
  }

  getCinemas() {
    return this.http.get<any[]>(`${this.baseUrl}/cinemas`)
  }

  getFilmsByCinema(cinemaId: string) {
    return this.http.get<any[]>(`${this.baseUrl}/cinemas/${cinemaId}/films`)
  }

  getSeances(cinemaId: string, filmId:string) {
    return this.http.get<any>(`${this.baseUrl}/cinemas/${cinemaId}/films/${filmId}/seances`)
  }

  getSiegesDispos(seanceId: string) {
    return this.http.get<number[]>(`${this.baseUrl}/seances/${seanceId}/sieges-disponible`)
  }

  postReservation(data: any) {
    return this.http.post(`${this.baseUrl}/reservations`, data, {
      headers: {
        Authorization:`Bearer ${this.storage.getItem('token')}`
      }
    })
  }
}
