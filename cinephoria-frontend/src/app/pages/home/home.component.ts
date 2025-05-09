import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiService } from '../../core/services/api.service';

interface Film {
  id: number
  titre: string
  description: string
  ageMinimum: number
  coupDeCoeur: boolean
  note: number
  afficheUrl: string
  dateAjout:string
}

@Component({
  selector: 'app-home',
  imports: [CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit{

  private api = inject(ApiService)

  derniersFilms: Film[] = []

  constructor() { }

  ngOnInit(): void {
    this.api.getFilms().subscribe({
      next: (data) => this.derniersFilms = data,
      error:(err)=>console.error('Erreur API films', err)
    })

  }
}
