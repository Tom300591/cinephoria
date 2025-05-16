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
  filmId: null as number | null,
  salleId: null,
  heureDebut: '',
  heureFin: '',
  qualite: '',
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
  selectedFilmDuration: number = 0

  user: any;

  //Appel API pour récupérer les films et les salles
  ngOnInit(): void {
  console.log('ngOnInit called');

  // Récupération des films
  this.api.getFilms().subscribe((films) => {
    this.films = films;
    if (this.films.length > 0) {
      this.seance.filmId = this.films[0].id;
      this.onFilmChange(this.seance.filmId);
    }
  });

  // Récupération des salles
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
  onFilmChange(filmId: number | null) {
  if (filmId === null) {
    this.selectedFilmDuration = 0;
    this.seance.heureFin = '';
  } else {
    const selectedFilm = this.films.find(film => film.id === filmId);
    if (selectedFilm) {
      this.selectedFilmDuration = selectedFilm.duree || 0;
      this.updateHeureFin();
    }
  }
}

  updateHeureFin() {

  if (this.seance.heureDebut && this.selectedFilmDuration > 0) {
    const dateDebut = new Date(this.seance.heureDebut);

    dateDebut.setMinutes(dateDebut.getMinutes() + this.selectedFilmDuration);

    const year = dateDebut.getFullYear();
    const month = String(dateDebut.getMonth() + 1).padStart(2, '0');
    const day = String(dateDebut.getDate()).padStart(2, '0');
    const hours = String(dateDebut.getHours()).padStart(2, '0');
    const minutes = String(dateDebut.getMinutes()).padStart(2, '0');

    this.seance.heureFin = `${year}-${month}-${day}T${hours}:${minutes}`;
  } else {
    console.error('Erreur : heureDebut ou durée invalide');
  }

}


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
