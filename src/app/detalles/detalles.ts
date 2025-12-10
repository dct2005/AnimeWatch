import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
@Component({
  selector: 'app-detalles',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './detalles.html',
  styleUrl: './detalles.css',
})
export class Detalles {
  anime: any = null;
  reviews: any[] = [];
  episodes: any[] = [];
  loading: boolean = true;
  agregado: boolean = false; // Estado del botón
  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    // Detectar el ID de la URL
    this.loadanimeactu()
    this.loadreseñas()
    this.loadepisodes()
  }
  async loadanimeactu(): Promise<void> {



    const id = this.route.snapshot.paramMap.get('id');
    const response = await fetch(`https://api.jikan.moe/v4/anime/${id}`);
    if (!response.ok) throw new Error('Error al cargar la lista');

    const Data: any = await response.json();
    this.anime = Data.data;



  }
  async loadepisodes(): Promise<void> {



    const id = this.route.snapshot.paramMap.get('id');
    const response = await fetch(`https://api.jikan.moe/v4/anime/${id}/episodes`);
    if (!response.ok) throw new Error('Error al cargar la lista');

    const Data: any = await response.json();
    this.episodes = Object.values(Data.data);



  }
  async loadreseñas(): Promise<void> {



    const id = this.route.snapshot.paramMap.get('id');
    const response = await fetch(`https://api.jikan.moe/v4/anime/${id}/reviews`);
    if (!response.ok) throw new Error('Error al cargar la lista');

    const Data: any = await response.json();
    this.reviews = Object.values(Data.data);



  }

}
