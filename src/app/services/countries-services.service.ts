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
}
