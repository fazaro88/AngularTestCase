import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { environment } from '../environments/environment';
import { ApiService } from '../shared/services';

@Injectable()
export class AppService {
   constructor (private apiService: ApiService) {}

    getJackpot(): Observable<any> {
        return this.apiService.get();
    }

    getMockedJackpot(): Observable<any> {
        return this.apiService.getMocked();
    }

    private handleError(error: any): Observable<any> {
        return Observable.throw(error || 'Server error');
    }
}
