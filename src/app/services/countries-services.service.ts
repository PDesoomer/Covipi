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
        const today = new Date();
        const year: number = today.getFullYear();
        const day: number = today.getDate();
        const month: number = today.getMonth() + 1;

        const last: String = year - 1 + '-' + month + '-' + day;
        const now: String = year + '-' + month + '-' + day;

        return this.http.get('https://api.covid19api.com/world?from=' + last + 'T00:00:00Z&to=' + now + 'T00:00:00Z');
    }

    getAllCountries() {
        return this.http.get('https://api.covid19api.com/summary');
    }
}
