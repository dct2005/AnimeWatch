import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

interface Anime {
  title: string;
  genre: string;
  rating: number;
  image: string;
  color: string;
}

@Component({
  selector: 'app-principal',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './principal.html',
  styleUrls: ['./principal.css']
})
export class Principal {

  loadingList: boolean = false;

  animetop: any[] = [];
  animeactu: any[] = [];
  animeprox: any[] = [];
  filteredanime: any[] = [];
  ngOnInit(): void {
    this.loadanimetop();
    this.loadanimeactu();
    this.loadanimeprox();
  }
  agregarAFavoritos(anime: any, event: Event) {

    event.stopPropagation();
    event.preventDefault();


    const listaActual = JSON.parse(localStorage.getItem('myAnimeList') || '[]');


    const yaExiste = listaActual.some((a: any) => a.id === anime.mal_id);

    if (yaExiste) {
      alert(`⚠️ ${anime.title} ya está en tu lista.`);
      return;
    }


    const nuevoItem = {
      id: anime.mal_id,
      title: anime.title,
      image: anime.images.jpg.image_url,
      score: anime.score,
      episodes: anime.episodes,

    };


    listaActual.push(nuevoItem);
    localStorage.setItem('myAnimeList', JSON.stringify(listaActual));

    alert(` ¡${anime.title} añadido a favoritos!`);
  }

  async loadanimetop(): Promise<void> {
    this.loadingList = true;



    const response = await fetch(`https://api.jikan.moe/v4/seasons/now`);
    if (!response.ok) throw new Error('Error al cargar la lista');

    const Data: any = await response.json();
    this.animeactu = Object.values(Data.data);


    this.filteredanime = [...this.animeactu];
  }
  async loadanimeactu(): Promise<void> {
    this.loadingList = true;



    const response = await fetch(`https://api.jikan.moe/v4/seasons/upcoming`);
    if (!response.ok) throw new Error('Error al cargar la lista');

    const Data: any = await response.json();
    this.animeprox = Object.values(Data.data);


    this.filteredanime = [...this.animeprox];
  }
  async loadanimeprox(): Promise<void> {
    this.loadingList = true;



    const response = await fetch(`https://api.jikan.moe/v4/top/anime`);
    if (!response.ok) throw new Error('Error al cargar la lista');

    const Data: any = await response.json();
    this.animetop = Object.values(Data.data);


    this.filteredanime = [...this.animetop];
  }
}
