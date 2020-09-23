import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { global } from './global';

@Injectable()
export class RatingService {
    public url;

    constructor(
        private _http: HttpClient
    ) {
        this.url = global.url;
    }

    create(rating, token): Observable<any> {
        let json = JSON.stringify(rating);
        let params = 'json=' + json;

        let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
                                       .set('Authorization', token);
        return this._http.post(this.url + 'rating', params, {headers});
    }

    getRating(postId, token): Observable<any> {
        let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
                                       .set('Authorization', token);

        return this._http.get(this.url + 'rating/post/' + postId, {headers});
    }

    getTotalRatingByPost(postId, token): Observable<any>  {
        let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
                                       .set('Authorization', token);

        return this._http.get(this.url + 'post/rating/' + postId, {headers});
    }

}