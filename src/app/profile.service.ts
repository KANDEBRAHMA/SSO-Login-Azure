import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { Profile } from './profile';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class ProfileService {

    constructor(private httpClient: HttpClient) { }

    getProfile(): Observable<Profile> {
        return this.httpClient.get<Profile>('http://localhost:8080/userDetails').pipe(
            tap(data=>console.log(JSON.stringify(data)))
            );
    }
}
