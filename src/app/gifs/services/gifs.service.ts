import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from "@angular/common/http";
import { SearchGifsResponse, Gif } from '../interfaces/gifs.interface';

@Injectable({ providedIn: 'root' })
export class GifsService {
  private BASE_URL: string = 'https://api.giphy.com/v1/gifs'
  private API_KEY: string = 'ese6yBbpmBgnN1tCMIuULN6IeAmKksDc'
  private _historial: string[] = []
  public resultados: Gif[] = []
  public get historial(): string[] {
    return [...this._historial]
  }
  constructor(private http: HttpClient) {
    this._historial = JSON.parse(localStorage.getItem('historial')!) || []
    this.resultados = JSON.parse(localStorage.getItem('resultados')!) || []
  }
  buscarGifs(query: string) {
    query = query.trim().toLocaleLowerCase()
    if (!this._historial.includes(query)) {
      this._historial.unshift(query)
      this._historial = this._historial.splice(0, 10)
      localStorage.setItem('historial', JSON.stringify(this._historial))
    }
    const params = new HttpParams()
      .set('api_key', this.API_KEY)
      .set('limit', 5)
      .set('q', query)
    this.http.get<SearchGifsResponse>(`${this.BASE_URL}/search`, { params })
      .subscribe((resp: SearchGifsResponse) => {
        this.resultados = resp.data
        localStorage.setItem('resultados', JSON.stringify(this.resultados))
      })
  }
}