import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Post } from '../../models/post';
import { PostService } from 'src/app/services/post.service';
import { UserService } from 'src/app/services/user.service';
import { RatingService } from 'src/app/services/rating.service';
import { CommentService } from 'src/app/services/comment.service';
import { Comment } from '../../models/comment';

@Component({
  selector: 'app-post-detail',
  templateUrl: './post-detail.component.html',
  styleUrls: ['./post-detail.component.css'],
  providers: [PostService, UserService, RatingService, CommentService]
})
export class PostDetailComponent implements OnInit {
  public page_title: string;
  public post: Post;
  public status: string;
  public identity: any;
  public starsRatingOne: object;
  public token;
  public comments;
  public comment: Comment;

  constructor(
    private _route: ActivatedRoute,
    private _postService: PostService,
    private _userService: UserService,
    private _ratingService: RatingService,
    private _commentService: CommentService,
  ) {
    this.page_title = 'Detalle de la entrada';
    this.identity = this._userService.getIdentity();
    this.token = this._userService.getToken();

    this.starsRatingOne = {'title': '', 'value': 0, 'stars': [
      {'id': 0, 'status': false, 'image': 'start2.png'},
      {'id': 1, 'status': false, 'image': 'start2.png'},
      {'id': 2, 'status': false, 'image': 'start2.png'},
      {'id': 3, 'status': false, 'image': 'start2.png'},
      {'id': 4, 'status': false, 'image': 'start2.png'},
    ]
  };
  }

  ngOnInit() {
    this.comment = new Comment(1, 1, '');
    this.getPost();

  }

  getPost() {
    // Sacar el id post de la url
    this._route.params.subscribe(
      params => {
        let id = +params['id'];
        // Petición ajax para sacar los datos del post
        this._postService.getPost(id).subscribe(
          response => {            
            if ( response.status == 'success' ) {
              this.post = response.post;
              this.getRating(id, this.token);
              this.getComments(id);
              
              this.status = 'success';
            } else {
              this.status = 'error';
            }
          },
          error => {
            console.log(<any>error);
          }
        );
      }
    );
  }

  getComments(postId) {
    this._commentService.getCommentsByPost(postId).subscribe(
      response => {
        if ( response.status == 'success' ) {
          this.comments = response.comments;
        }
      },
      error => {
        console.log(error);
      }
    );
  }

  getRating(postId, token) {
    this._ratingService.getRating(postId, token).subscribe(
      response => {
        if ( response.status == 'success' ) {
          this.status = 'success';
        } else {
          this.status = 'error';
        }
      },
      error => {
        this.status = 'error';
        console.log(error);
      }
    );
  }

  saveComment(commentForm) {
    this.comment.post_id = this.post.id;
    this._commentService.create(this.comment, this.token).subscribe(
      response => {            
        if ( response.status == 'success' ) {
          this.getComments(this.post.id);
        }
        commentForm.reset();
      },
      error => {
        console.log(error);
      }
    );
  }

  deleteComment(commentId) {
    this._commentService.delete(commentId, this.token).subscribe(
      response => {
        if ( response.status == 'success' ) {
          this._route.params.subscribe(
            params => {
              let id = +params['id'];
              this.getComments(id);
          });
        }
      },
      error => {
        console.log(error);
      }
    );
  }
}
