import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/catch';

@Injectable()
export class ApiService {
    private baseUrl: string;

    constructor(
        private http: HttpClient
    ) {
        this.baseUrl = `${environment.apiUrl}${environment.baseApi}`;
    }

    private setHeaders(): HttpHeaders {
        return new HttpHeaders({
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'OPTIONS,GET,POST,PUT,DELETE',
            'Access-Control-Allow-Headers': 'Content-Type, Authorization, X-Requested-With, Pragma, Cache-Control'
        });
    }

    private formatErrors(error: any) {
        return Observable.throw(error.json());
    }

    get(): Observable<any> {
        return this.http.get(`${this.baseUrl}${environment.getJackPot}`, {headers: this.setHeaders()})
                .catch(this.formatErrors);
    }

    public getMocked(): Observable<any> {
        return this.http.get('../assets/mockResults.json');
    }
}
