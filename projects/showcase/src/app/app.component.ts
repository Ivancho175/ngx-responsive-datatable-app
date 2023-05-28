import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnInit,
} from '@angular/core';
import { AppService } from './app.service';
import { Subject, lastValueFrom } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent implements OnInit {
  title = 'showcase';

  dataTable = new Subject<any>();

  constructor(private service: AppService, private ref: ChangeDetectorRef) {}

  async ngOnInit() {
    const data: any = await lastValueFrom(this.service.getAllPokemons(50));
    this.setDataTable(data.results);
  }

  ngOnDestroy() {}

  async setDataTable(data: any[]) {
    let items: any[] = [];
    items = await this.getPokeData(data);
    const value = {
      titles: ['Image', 'Name', 'Number', 'Types', 'Height', 'Weight'],
      rows: items,
    };
    this.ref.markForCheck();
    this.dataTable.next(value);
  }

  async getPokeData(data: any[]) {
    const pokemons: any[] = [];

    for (const item of data) {
      if (!item) {
        alert('Item Not Found');
      }
      const data: any = await lastValueFrom(
        this.service.getPokemonInfoById(item.url)
      );
      const { name, id, types, height, weight, sprites } = data;
      const typeGroup: string[] = [];

      types.forEach((type: any) => {
        const typeName: string = type.type.name;
        typeName.split('')[0].toUpperCase();
        typeGroup.push(typeName.charAt(0).toUpperCase() + typeName.slice(1));
      });

      const newItem = {
        image: `<img src="${sprites.front_default}"></img>`,
        name: name.charAt(0).toUpperCase() + name.slice(1),
        number: id,
        types: typeGroup.join(', '),
        height,
        weight,
      };
      pokemons.push(newItem);
    }
    return pokemons;
  }
}
