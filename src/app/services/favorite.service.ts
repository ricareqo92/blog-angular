import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { global } from './global';

@Injectable()
export class FavoriteService {
    
    public url: string;

    constructor(
        private _http: HttpClient,
    ) {
        this.url = global.url;
    }

    add(post, token): Observable<any> {        
        let json = JSON.stringify(post);
        let params = 'json=' + json;
        let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
                                       .set('Authorization', token);
        return this._http.post(this.url + 'favorite', params, {headers});
    }

    getFavoritesByUser(userId): Observable<any> {
        let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');
        return this._http.get(this.url + 'favorite/posts/' + userId, {headers});
    }

    delete(id, token): Observable<any> {
        let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
                                       .set('Authorization', token);
        return this._http.delete(this.url + 'favorite/' + id, {headers});
    }
}