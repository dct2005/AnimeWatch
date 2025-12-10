import { Component } from '@angular/core';
import { CommonModule } from '@angular/common'; // Necesario si usas Standalone Components
import { RouterLink } from '@angular/router';
// Interfaz para definir la estructura de un Anime
interface Anime {
  title: string;
  genre: string;
  rating: number;
  image: string;
  color: string; // El color neón específico
}

@Component({
  selector: 'app-principal',
  standalone: true, // Si usas módulos, quita esto y 'imports'
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
