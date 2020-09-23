import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PostService } from 'src/app/services/post.service';
import { Post } from '../../models/post';
import { global } from '../../services/global';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/models/user';
import { FriendService } from 'src/app/services/friendServices';
import { FavoriteService } from 'src/app/services/favorite.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
  providers: [PostService, UserService, FriendService, FavoriteService]
})
export class ProfileComponent implements OnInit {

  public posts: Array<Post>;
  public url: string;
  public identity: any;
  public token: string;
  public user: User;
  public following: boolean;
  public activeTab: string;
  public followersList: any[];
  public followingList: any[];
  public favorites: any[];

  constructor(
    private _route: ActivatedRoute,
    private _postService: PostService,
    private _userService: UserService,
    private _friendService: FriendService,
    private _favoriteService: FavoriteService,
  ) {
    this.activeTab = 'information';
    this.following = false;
    this.url = global.url;
    this.identity = this._userService.getIdentity();
    this.token = this._userService.getToken();    
  }

  ngOnInit() {
    this.getProfile();
  }

  getProfile() {
    // Sacar el id post de la url
    this._route.params.subscribe(
      params => {
        let userId = +params['id'];
        this.getUser(userId);
        this.getPosts(userId);
        this.getFollower(userId);
        this.getFollowers(userId);
        this.getFollowing(userId);
        this.getFavorites(userId);
      });
  }

  getUser(userId) {
    this._userService.getUser(userId).subscribe(
      response => {
        if ( response.status == 'success' ) {
          this.user = response.user;                  
        }
      },
      error => {
        console.log(<any>error);
      }
    );
  }

  getPosts(userId) {
    this._userService.getPosts(userId).subscribe(
      response => {
        if ( response.status == 'success' ) {
          this.posts = response.posts;
        } 
      },
      error => {
        console.log(<any>error);
      }
    );
  }

  deletePost(post_id) {    
    this._postService.delete(this.token, post_id).subscribe(
      response => {
        this.getProfile();        
      },
      error => {
        console.log(<any>error);
        
      }
    );
  }

  getFollower(userId) {
    this._friendService.getFriend(userId, this.token).subscribe(
      response => {
        if ( response.status == 'success' ) {
          this.following = true;
        }
      },
      error => {
        console.log(error);
        
      }
    );
  }

  follow() {
    this._friendService.createFollow(this.user, this.token).subscribe(
      response => {
        if ( response.status == 'success' ) {
          this.following = true;
          this.getFollowers(this.user.id);
        }
      },
      error => {
        console.log(error);
        
      }
    );    
  }

  changeTab(value) {
    this.activeTab = value;
  }

  getFollowers(userId) {
    this._friendService.getFollowersByUser(userId).subscribe(
      response => {        
        if ( response.status == 'success' ) {
          this.followersList = response.followers;
        }
      },
      error => {
        console.log(error);
      }
    );
  }

  getFollowing(userId) {
    this._friendService.getFollowingByUser(userId).subscribe(
      response => {        
        if ( response.status == 'success' ) {
          this.followingList = response.following;
        }
      },
      error => {
        console.log(error);
      }
    );
  }

  getFavorites(userId) {
    this._favoriteService.getFavoritesByUser(userId).subscribe(
      response => {
        console.log("favorites: ", response);
        
        if ( response.status == 'success' ) {
          this.favorites = response.posts;
        }
      },
      error => {
        console.log(error);
      }
    );
  }

}
