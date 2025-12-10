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
      const filters = this.searchForm.value;
      console.log('Buscando con filtros:', filters);
      // Aquí llamarías a tu servicio: this.animeService.search(filters)...
    } else {
      this.searchForm.markAllAsTouched();
    }
  }

  // Helper para limpiar el formulario
  resetForm() {
    this.searchForm.reset({ type: '', status: '' });
  }
}
