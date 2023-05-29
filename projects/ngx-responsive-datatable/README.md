# Angular Responsive Datatable (ngx-responsive-datatable)

Responsive datatable. Easy implementation, beautiful and clean style, powerful search engine and pagination that can handle large data. It was created with Angular16, but it surely works on Angular 8+.

### Install

`npm i ngx-responsive-datatable@latest --save`

### Import

**app.module.ts**

```typescript
import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {AppComponent} from './app.component';
/** IMPORT **/
import { NgxResponsiveDatatableModule } from 'ngx-responsive-datatable'; 👈

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
	NgxResponsiveDatatableModule 👈
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
```

### In your component

HTML

```html
<ngx-responsive-datatable [dataTable]="dataTable | async"></ngx-responsive-datatable>
```

TypeScript

```typescript
import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
})
export class AppComponent implements OnInit {

    dataTable = new Subject<any>();

    // We create a fake array to send to our table
    private users: User[] = [
        {
            id: 1,
            name: 'Andrew Martins',
            age: 20,
            genre: 'male',
            email: 'andrew@mail.com',
        },
        {
            id: 2,
            name: 'Peter Potter',
            age: 21,
            genre: 'male',
            email: 'peter@mail.com',
        },
        {
            id: 3,
            name: 'Jack Stevens',
            age: 20,
            genre: 'male',
            email: 'jack@mail.com',
        },
        {
            id: 4,
            name: 'Martha Willis',
            age: 19,
            genre: 'female',
            email: 'martha@mail.com',
        },
        {
            id: 5,
            name: 'Alice Lance',
            age: 20,
            genre: 'female',
            email: 'alice@mail.com',
        },
        {
            id: 6,
            name: 'Rose Richards',
            age: 20,
            genre: 'female',
            email: 'rose@mail.com',
        },
    ]

     /*Set the data to send to the component*/
    setDataTable() {
        const data = {
            //Set the titles with the same name and the same order than the attributes of each element in the array
            titles: ['Id', 'Name', 'Age', 'Genre', 'Email'],
            rows: this.users;
        }

        // Finally set the variable dataTable with the new data
        this.dataTable.next(data);
    }
}

interface User = {
    id: number;
    name: string;
    age: number;
    genre: string;
    email: string;
}
```
