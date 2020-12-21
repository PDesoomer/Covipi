import { Component, OnInit } from '@angular/core';
import {ICountries} from '../Countries';
import {OrderPipe} from 'ngx-order-pipe';

@Component({
  selector: 'app-table-list',
  templateUrl: './table-list.component.html',
  styleUrls: ['./table-list.component.css']
})
export class TableListComponent implements OnInit {

  order = 'sick';
  reverse = false;

  countries: Array<ICountries> = [
    {id: 1, name: 'France', sick: 200, healed: 123, dead: 125},
    {id: 2, name: 'Espagne', sick: 324, healed: 324, dead: 7654},
    {id: 3, name: 'Chili', sick: 432, healed: 2345, dead: 132},
    {id: 4, name: 'Guatemala', sick: 552, healed: 232, dead: 4524},
  ];

  private sortedCountries: Array<ICountries> [];
  constructor(private orderPipe: OrderPipe) {
    this.sortedCountries = orderPipe.transform(this.countries, 'sick')
    console.log(this.sortedCountries);
  }

  setOrder(value: string) {
    if (this.order === value) {
      this.reverse = !this.reverse;
    }

    this.order = value;
  }

  ngOnInit() {
  }

}
