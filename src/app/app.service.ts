import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { User } from './shared/models';
import { environment } from '../environments/environment';
import { ApiService } from './shared/services';
import * as _ from 'lodash';

@Injectable()
export class AppService {
   constructor (private apiService: ApiService) {}

    getUsers(): Observable<any> {
        const path = `${environment.urls.users}`;
        return this.apiService.get(path);
    }

    updateUser(user: User): Observable<any> {
        const path = `${environment.urls.users}`+_.get(user, 'id', '');
        return this.apiService.put(path, user);
    }

    createUser(user: User): Observable<any> {
        const path = `${environment.urls.users}`;
        return this.apiService.post(path, user);
    }

    deleteUser(id: string): Observable<any> {
        const path = `${environment.urls.users}`+id;
        return this.apiService.delete(path);
    }

    private handleError(error: any): Observable<any> {
        return Observable.throw(error || 'Server error');
    }
}
