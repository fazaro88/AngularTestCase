import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Response, URLSearchParams } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class ApiService {
    private baseUrl: string;

    constructor(
        private http: HttpClient
    ) {
        this.baseUrl = `${environment.urls.API}/${environment.urls.baseAPI}`;
    }

    private setHeaders(): HttpHeaders {
        return new HttpHeaders({
            'Content-Type':  'application/json',
            'Authorization': `${environment.urls.token}`
          });
    }

    private formatErrors(error: any) {
        return Observable.throw(error.json());
    }

    get(path: string, query: object = {}): Observable<any> {
        let httpParams = new HttpParams();

        Object.keys(query).forEach(function (key) {
            if (Array.isArray(query[key])) {
            query[key].forEach((o) => {
                httpParams = httpParams.append(key, o);
            });
            } else {
            httpParams = httpParams.append(key, query[key]);
            }
        });

        return this.http.get(
            `${this.baseUrl}/${path}`,
            {
                headers: this.setHeaders(),
                params: httpParams
            }
            )
            .catch(this.formatErrors);
    }

    put(path: string, body: Object = {}, query: object = {}): Observable<any> {
        let httpParams = new HttpParams();
        Object.keys(query).forEach(function (key) {
            httpParams = httpParams.append(key, query[key]);
        });

        return this.http.put(
            `${this.baseUrl}/${path}`,
            JSON.stringify(body),
            {
            headers: this.setHeaders(),
            params: httpParams
            }
        )
        .catch(this.formatErrors);
    }

    post(path: string, body: Object = {}, query: object = {}): Observable<any> {
        let httpParams = new HttpParams();
        Object.keys(query).forEach(function (key) {
            httpParams = httpParams.append(key, query[key]);
        });

        return this.http.post(
            `${this.baseUrl}/${path}`,
            JSON.stringify(body),
            {
            headers: this.setHeaders(),
            params: httpParams
            }
        )
        .catch(this.formatErrors);
    }

    delete(path): Observable<any> {
        return this.http.delete(
            `${this.baseUrl}${path}`,
            { headers: this.setHeaders() }
        )
        .catch(this.formatErrors)
        .map((res: Response) => res.json());
    }
}
