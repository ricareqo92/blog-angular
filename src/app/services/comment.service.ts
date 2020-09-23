import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { global } from './global';

@Injectable()
export class CommentService {
    public url;

    constructor(
        private _http: HttpClient,
    ) {
        this.url = global.url;
    }

    create(comment, token): Observable<any> {
        let json = JSON.stringify(comment);
        let params = 'json=' + json;
        let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
                                      .set('Authorization', token);
        return this._http.post(this.url + 'comment', params, {headers});
    }

    delete(id, token): Observable<any> {
        let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
                                        .set('Authorization', token);
        return this._http.delete(this.url + 'comment/' + id, {headers});
    }

    getCommentsByPost(postId): Observable<any> {
        return this._http.get(this.url + 'comments/post/' + postId);
    }
}
