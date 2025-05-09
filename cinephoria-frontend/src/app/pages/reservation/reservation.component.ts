import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../../core/services/api.service';
import { Router } from '@angular/router';
import { AppStorageService } from '../../core/services/appStorage.service';

@Component({
  selector: 'app-reservation',
  imports: [CommonModule, FormsModule],
  templateUrl: './reservation.component.html',
  styleUrl: './reservation.component.scss'
})
export class ReservationComponent {
  constructor(private storage: AppStorageService) {}
  private api = inject(ApiService)
  private router = inject(Router)

  cinemas: any[] = []
  films: any[] = []
  seances: any[] = []

  selectedCinema = ''
  selectedFilm = ''

  ngOnInit(): void {



    this.api.getCinemas().subscribe(c => this.cinemas = c)
  }

  onCinemaSelected(): void {
    this.api.getFilmsByCinema(this.selectedCinema).subscribe(f => this.films = f)
  }

  onFilmSelected(): void{
    this.api.getSeances(this.selectedCinema, this.selectedFilm).subscribe(s => this.seances = s)
  }

  nombrePlaces = 1
  siegesDisponibles: number[] = []
  siegesSelectionnes: number[] = []
  prixParQualite: { [qualite: string]: number } = {
    'HD': 10,
    '3D': 12,
    '4DX': 15,
    '4K': 14
  }
  selectedSeance: string = ''

  get prixTotal(): number { //Déclare la fonction getPrixTotal comme une variable "prixTotal" pour qu'elle soit calculée de façon dynamique
    const qualite = this.seances.find(s => s.id === this.selectedSeance)?.qualilte || 'HD'
    const prixUnitaire = this.prixParQualite[qualite] || 10
    return prixUnitaire*this.siegesSelectionnes.length
  }

  onSeanceSelected(seance: any) {
    this.selectedSeance = seance.id
    this.nombrePlaces = 1
    this.siegesSelectionnes = []

    this.api.getSiegesDispos(seance.id).subscribe(dispo => {
      this.siegesDisponibles = dispo
    })
  }

  toggleSiege(numero: number) {
    if (this.siegesSelectionnes.includes(numero)) {
      this.siegesSelectionnes = this.siegesSelectionnes.filter(n => n !== numero)
    } else if (this.siegesSelectionnes.length < this.nombrePlaces) {
      this.siegesSelectionnes.push(numero)
    }
  }

  validerReservation(): void{
    const token = this.storage.getItem('token')
    if (!token) {
      alert('Vous devez être connecté pour réserver')
      this.router.navigateByUrl('/login')
      return
    }

    const reservation = {
      seanceId: this.selectedSeance,
      sieges: this.siegesSelectionnes,
      prixTotal:this.prixTotal
    }

    this.api.postReservation(reservation).subscribe({
      next: () => {
        alert('Réservation confirmée')
        this.router.navigateByUrl('/mon-espace')
      },
      error: (err) => {
        console.error(err)
        alert('Erreur lors de la réservation')
      }
    })
  }

}
