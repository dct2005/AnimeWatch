import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
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
  imports: [CommonModule, RouterLink],
  templateUrl: './favs.html',
  styleUrl: './favs.css',
})
export class Favs {
  favoritos: any[] = [];
  loading: boolean = true;

  // Colores neón aleatorios para decoración si no se guardó el color
  neonColors = ['#FF0055', '#00E5FF', '#76FF03', '#FFD600', '#D500F9'];

  ngOnInit(): void {
    this.cargarFavoritos();
  }

  cargarFavoritos() {
    this.loading = true;

    // 1. Leemos del LocalStorage
    const data = localStorage.getItem('myAnimeList');

    if (data) {
      // 2. Parseamos el JSON
      this.favoritos = JSON.parse(data);

      // (Opcional) Aseguramos que tengan color para el diseño neón
      this.favoritos = this.favoritos.map(anime => ({
        ...anime,
        // Si no guardamos el color antes, le ponemos uno ahora
        color: anime.color || this.neonColors[Math.floor(Math.random() * this.neonColors.length)]
      }));
    } else {
      this.favoritos = [];
    }

    this.loading = false;
  }

  eliminarDeLista(id: number, event: Event) {
    // Evitamos que el click navegue al detalle del anime
    event.stopPropagation();
    event.preventDefault();

    if (confirm('¿Seguro que quieres eliminar este anime de favoritos?')) {
      // Filtramos la lista para quitar el ID seleccionado
      this.favoritos = this.favoritos.filter(anime => anime.id !== id);

      // Guardamos la nueva lista en LocalStorage
      localStorage.setItem('myAnimeList', JSON.stringify(this.favoritos));
    }
  }
}
