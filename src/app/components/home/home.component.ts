import { Component, OnInit } from '@angular/core';
import { PostService } from 'src/app/services/post.service';
import { Post } from '../../models/post';
import { global } from '../../services/global';
import { UserService } from 'src/app/services/user.service';
import { FavoriteService } from 'src/app/services/favorite.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers: [PostService, UserService, FavoriteService]
})
export class HomeComponent implements OnInit {
  public page_title;
  public status: string;
  public posts: Array<Post>;
  public url: string;
  public identity: any;
  public token: string;
  public postsTop: Array<Post>;

  constructor(
    private _postService: PostService,
    private _userService: UserService,
    private _favoriteService: FavoriteService,
  ) {
    this.page_title = 'Home';
    this.url = global.url;
  }

  ngOnInit() {
    this.getPosts();
    this.identity = this._userService.getIdentity();
    this.token = this._userService.getToken();
    this.getPostsTop();
  }

  getPosts() {
    this._postService.getPosts().subscribe(
      response => {
        if ( response.status == 'success' ) {
          this.posts = response.posts;
          this.status = 'success';
          this.getFavorites(this.posts);
        } else {
          this.status = 'error';
        }
      },
      error => {
        console.log(<any>error);
      }
    );
  }

  deletePost(id) {
    this._postService.delete(this.token, id).subscribe(
      response => {
        this.getPosts();
      },
      error => {
        console.log(<any>error);
        
      }
    );
  }

  getPostsTop() {
    this._postService.getPostsTopRanking().subscribe(
      response => {        
        if ( response.status == 'success' ) {
          this.postsTop = response.posts;
        }
      },
      error => {
        console.log(error);
        
      }
    );
  }

  getFavorites(posts) {
    this._favoriteService.getFavoritesByUser(this.identity.sub).subscribe(
      response => {
        console.log(response);
        var favorites = response.favorites;

        /*if ( response.status == 'success' ) {
            this.posts.forEach((post) => {
              var i = 0;
              var n = 3;
              var encontrado = false;

              while ( !encontrado && ( i < n ) ) {
                if ( post.id ==  favorites[i].post.id ) {
                  encontrado = true;
                }
                i++;
              }
            });
        }*/
      },
      error => {
        console.log(error);
      }
    );
  }

}
