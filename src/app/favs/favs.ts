import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
interface Anime {
  id: number;
  title: string;
  image: string;
  status: 'watching' | 'completed' | 'favorites' | 'dropped'; // Estados posibles
  episodes: string; // Ej: "12/24" o "Finalizado"
  score: number;
  cardColor: string; // Color para el borde neón
}
@Component({
  selector: 'app-favs',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './favs.html',
  styleUrl: './favs.css',
})
export class Favs {
  selectedCategory: string = 'watching';

  // Base de datos simulada (Aquí cargarías desde tu servicio)
  allAnimes: Anime[] = [
    { id: 1, title: 'Chainsaw Man', image: 'https://picsum.photos/300/400?random=1', status: 'watching', episodes: '8/12', score: 9.5, cardColor: '#FF0055' },
    { id: 2, title: 'Spy x Family', image: 'https://picsum.photos/300/400?random=2', status: 'favorites', episodes: 'Al día', score: 9.8, cardColor: '#00E5FF' },
    { id: 3, title: 'One Piece', image: 'https://picsum.photos/300/400?random=3', status: 'watching', episodes: '1070/?', score: 9.2, cardColor: '#76FF03' },
    { id: 4, title: 'Naruto', image: 'https://picsum.photos/300/400?random=4', status: 'completed', episodes: 'Completo', score: 8.5, cardColor: '#FFD600' },
    { id: 5, title: 'Bleach', image: 'https://picsum.photos/300/400?random=5', status: 'completed', episodes: 'Completo', score: 9.0, cardColor: '#D500F9' },
    { id: 6, title: 'Tokyo Ghoul', image: 'https://picsum.photos/300/400?random=6', status: 'dropped', episodes: 'Temp 2', score: 6.5, cardColor: '#ff00cc' },
  ];

  // Métodos para obtener conteos dinámicos
  get countWatching() { return this.allAnimes.filter(a => a.status === 'watching').length; }
  get countFavorites() { return this.allAnimes.filter(a => a.status === 'favorites').length; }
  get countCompleted() { return this.allAnimes.filter(a => a.status === 'completed').length; }
  get countDropped() { return this.allAnimes.filter(a => a.status === 'dropped').length; }

  // Obtener la lista filtrada para mostrar en el HTML
  get filteredAnimes() {
    return this.allAnimes.filter(anime => anime.status === this.selectedCategory);
  }

  // Función para cambiar de pestaña
  selectCategory(category: string) {
    this.selectedCategory = category;
  }
}
