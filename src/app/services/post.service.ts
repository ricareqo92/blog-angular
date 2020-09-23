import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { global } from './global';
import { Post } from '../models/post';

@Injectable()
export class PostService {
    public url: string;
    public identity: any;
    public token: string;

    constructor(
        public _http: HttpClient) {
            this.url = global.url;
    }

    create(token, post): Observable<any> {
        // limpiar campo content (editor texto enriquecido) htmlEntities > utf8
        post.content = global.htmlEntities(post.content);
        let json = JSON.stringify(post);
        let params = 'json=' + json;
        let headers = new HttpHeaders().set('Content-type', 'application/x-www-form-urlencoded')
                                       .set('Authorization', token);
        return this._http.post(this.url + 'post', params, {headers});
    }

    getPosts(): Observable<any> {
        let headers = new HttpHeaders().set('Content-type', 'application/x-www-form-urlencoded');
        
        return this._http.get(this.url + 'post', {headers});
    }

    getPost(post): Observable<any> {
        let headers = new HttpHeaders().set('Content-type', 'application/x-www-form-urlencoded');
        
        return this._http.get(this.url + 'post/' + post, {headers});
    }

    update(token, id, post): Observable<any> {
        // limpiar campo content (editor texto enriquecido) htmlEntities > utf8
        post.content = global.htmlEntities(post.content);
        let json = JSON.stringify(post);
        let params = 'json=' + json;
        let headers = new HttpHeaders().set('Content-type', 'application/x-www-form-urlencoded')
                                       .set('Authorization', token);
        return this._http.put(this.url + 'post/' + id, params, {headers});
    }

    delete(token, id): Observable<any> {
        let headers = new HttpHeaders().set('Content-type', 'application/x-www-form-urlencoded')
                                       .set('Authorization', token);
        return this._http.delete(this.url + 'post/' + id, {headers});
    }
    
    getPostsTopRanking(): Observable<any> {
        return this._http.get(this.url + 'post/postTopRaking/' + 1);
    }
}