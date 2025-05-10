import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../../core/services/api.service';
import { AppStorageService } from '../../core/services/appStorage.service';

@Component({
  selector: 'app-admin',
  imports: [CommonModule, FormsModule],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.scss',
})
export class AdminComponent {
  private api = inject(ApiService);
  private storage=inject(AppStorageService)

  //Modèle pour film
  film = {
    titre: '',
    resume: '',
    duree: null,
    ageMinimum: null,
    genre: '',
    coupDeCoeur: false,
    affiche: '',
  };

  //Modèle pour salle
  salle = {
    nom: '',
    capacite: null,
  };

  //Modèle pour séance
  seance = {
    filmId: null,
    salleId: null,
    dateHeure: '',
  };

  //Modèle pour employé
  employe = {
    login: '',
    password: '',
    nom: '',
    prenom: '',
    role:'employe'
  }

  //Liste des films et des salles
  films: any[] = [];
  salles: any[] = [];

  user: any;

  //Appel API pour récupérer les films et les salles
  ngOnInit(): void {
    this.api.getFilms().subscribe((films) => (this.films = films));
    this.api.getSalles().subscribe((salles) => (this.salles = salles));
  }

  //Méthode pour ajouter un film
  addFilm() {
    this.api.postFilm(this.film).subscribe({
      next: () => alert('Film ajouté'),
      error: (err) => console.error(`Erreur ajout film`, err),
    });
  }

  //Méthode pour ajouter une salle
  addSalle() {
    this.api.postSalle(this.salle).subscribe({
      next: () => alert('Salle ajoutée !'),
      error: (err) => console.error('Erreur ajout salle', err),
    });
  }

  //Méthode pour ajouter une séance
  addSeance() {
    this.api.postSeance(this.seance).subscribe({
      next: () => alert('Séance ajoutée !'),
      error: (err) => console.error('Erreur ajout séance', err),
    });
  }

  //Méthode pour ajouter un employé
  addEmploye() {
    if (this.employe.login && this.employe.password) {
      this.api.postEmploye(this.employe).subscribe({
        next: () => {
          alert('Employé ajouté avec succès')
          //Réinitialise le formulaire après ajout
          this.employe.login = ''
          this.employe.password=''
        },
        error: (err) => {
          console.error('Erreur ajout employé', err)
          alert(`Une erreur est survenue lors de l'ajout de l'employé`)
        }
      })
    } else {
      alert('Veuillez remplir tous les champs')
    }
  }
}
