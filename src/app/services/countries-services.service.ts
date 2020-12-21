import { Injectable } from '@angular/core';
// @ts-ignore
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';

const httpOptions = {
    headers: new HttpHeaders(
        {
            'Content-Type': 'application/json',
        }
    )
};

@Injectable({
    providedIn: 'root'
})
export class MyService {
    constructor(private http: HttpClient) { }

    getGlobalInfo() {
        return this.http.get('https://api.covid19api.com/world/total');
    }

    get12LastMonths() {
        let today = new Date();
        let year:any = today.getFullYear();
        let day:any = today.getDate();
        let month:any = today.getMonth()+1;

        let last:String = year-1 + '-' + month + '-' + day;
        let now:String = year + '-' + month + '-' + day;        

        console.log('https://api.covid19api.com/world?from=' + last + 'T00:00:00Z&to=' + now + 'T00:00:00Z');
        
        return this.http.get('https://api.covid19api.com/live/country/south-africa/status/confirmed/date/2020-03-21T13:13:30Z');
        //return this.http.get('https://api.covid19api.com/world?from=' + last + 'T00:00:00Z&to=' + now + 'T00:00:00Z');
    }
}
