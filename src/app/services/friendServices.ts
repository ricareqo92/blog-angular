import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { global } from './global';

@Injectable()
export class FriendService {
    public url: string;

    constructor(private _http: HttpClient) {
        this.url = global.url;
    }

    createFollow(user, token): Observable<any> {
        let json = JSON.stringify(user);
        let params = 'json=' + json;
        
        let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
                                       .set('Authorization', token);
        
        return this._http.post(this.url + 'friend', params, {headers}); 
    }

    getFriend(userId, token): Observable<any> {
        let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-unlercoded')
                                       .set('Authorization', token);
        return this._http.get(this.url + 'friend/getFriend/' + userId, {headers});
    }

    getFollowersByUser(userId): Observable<any> {
        let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-unlercoded')

        return this._http.get(this.url + 'friend/getFollowers/' + userId, {headers});
    }

    getFollowingByUser(userId): Observable<any> {
        let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-unlercoded')

        return this._http.get(this.url + 'friend/getFollowing/' + userId, {headers});
    }

    unfollow(userId, token): Observable<any> {
        let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
                                       .set('Authorization', token);
        return this._http.delete(this.url + 'friend/' + userId, {headers});
    }
}