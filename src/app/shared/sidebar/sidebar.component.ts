import { Component } from '@angular/core';
import { GifsService } from '../../gifs/services/gifs.service';
@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html'
})
export class SidebarComponent {
  constructor(private gifsService: GifsService) { }
  public get historial(): string[] {
    return this.gifsService.historial
  }
  buscar(query: string) {
    this.gifsService.buscarGifs(query)
  }
}