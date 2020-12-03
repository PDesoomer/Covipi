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

    getItems(url: string) {
        this.http.get(url).subscribe((data) => {console.log(data.Global.TotalConfirmed)});
    }
}
