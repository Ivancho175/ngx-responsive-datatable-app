import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class AppService {
  private pokeUrl: string = 'https://pokeapi.co/api/v2/pokemon';
  constructor(private http: HttpClient) {}

  getAllPokemons(limit?: number, offset?: number) {
    return this.http.get(this.pokeUrl + `?limit=${limit}&offset=${offset}`);
  }
  getPokemonInfoById(url: string) {
    return this.http.get(url);
  }
}
