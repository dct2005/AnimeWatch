import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
@Component({
  selector: 'app-buscador',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './buscador.html',
  styleUrl: './buscador.css',
})
export class Buscador {
  searchForm: FormGroup;
  animelist: any[] = [];
  loadingList: boolean = false;
  // Opciones para los selectores
  types = [
    { value: '', label: 'Cualquiera' },
    { value: 'tv', label: 'TV' },
    { value: 'movie', label: 'Película' },
    { value: 'ova', label: 'OVA' },
    { value: 'special', label: 'Especial' }
  ];

  statuses = [
    { value: '', label: 'Cualquiera' },
    { value: 'airing', label: 'En Emisión' },
    { value: 'complete', label: 'Terminado' },
    { value: 'upcoming', label: 'Próximamente' }
  ];

  constructor(private fb: FormBuilder) {
    this.searchForm = this.fb.group({
      // Validamos que si escribe nombre, tenga al menos 3 letras
      name: ['', [Validators.minLength(3)]],
      type: [''], // Valor por defecto '' (Cualquiera)
      status: [''] // Valor por defecto '' (Cualquiera)
    });
  }

  onSubmit() {
    if (this.searchForm.valid) {
      const nombre = this.searchForm.get('name')?.value;
      const tipo = this.searchForm.get('type')?.value
      const status = this.searchForm.get('status')?.value
      this.loadanimetop(nombre, tipo, status)
    } else {
      this.searchForm.markAllAsTouched();
    }
  }
  async loadanimetop(nombre: string, tipo: string, status: string): Promise<void> {
    this.loadingList = true;



    const response = await fetch(`https://api.jikan.moe/v4/anime?q=${nombre}&type=${tipo}&status=${status}`);
    if (!response.ok) throw new Error('Error al cargar la lista');

    const Data: any = await response.json();
    this.animelist = Object.values(Data.data);


  }
  // Helper para limpiar el formulario
  resetForm() {
    this.searchForm.reset({ type: '', status: '' });
  }
}
