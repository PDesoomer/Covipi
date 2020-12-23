import { Component, OnInit } from '@angular/core';
import {ICountries} from '../Countries';
import {OrderPipe} from 'ngx-order-pipe';
import {MyService} from '../services/countries-services.service';

@Component({
  selector: 'app-table-list',
  templateUrl: './table-list.component.html',
  styleUrls: ['./table-list.component.css']
})
export class TableListComponent implements OnInit {

  order = 'sick';
  reverse = true;


  countries: Array<ICountries> = [];

  private sortedCountries: Array<ICountries> [];
  constructor(private orderPipe: OrderPipe, private myService: MyService) {
    this.sortedCountries = orderPipe.transform(this.countries, 'sick')
    console.log(this.sortedCountries);
  }

  setOrder(value: string) {
    if (this.order === value) {
      this.reverse = !this.reverse;
    }

    this.order = value;
  }

  numberWithCommas(x) {
    const parts = x.toString().split('.');
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
    return parts.join('.');
  }
  ngOnInit() {
    this.myService.getAllCountries().subscribe(data3 => {
      console.log(data3);
      for (let index = 0; index < Object.keys(data3['Countries']).length; index++) {
        this.countries.push(new ICountries(data3['Countries'][index]['Country'],
            data3['Countries'][index]['TotalConfirmed'],
            data3['Countries'][index]['TotalRecovered'],
            data3['Countries'][index]['TotalDeaths'] ))
      }
    });
  }

}
