import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { CategoryService } from 'src/app/services/category.service';
import { Category } from 'src/app/models/category';
import { Post } from '../../models/post';
import { UserService } from 'src/app/services/user.service';
import { PostService } from 'src/app/services/post.service';

@Component({
  selector: 'app-category-detail',
  templateUrl: './category-detail.component.html',
  styleUrls: ['./category-detail.component.css'],
  providers: [CategoryService, UserService, PostService]
})
export class CategoryDetailComponent implements OnInit {

  public page_title: string;
  public category: Category;
  public posts: Array<Post>;
  public identity: any;
  public token: string;

  constructor(
    private _route: Router,
    private _router: ActivatedRoute,
    private _categoryService: CategoryService,
    private _userService: UserService,
    private _postService: PostService
  ) {
    this.page_title = 'Categoría Detalle';
    this.identity = this._userService.getIdentity();
    this.token = this._userService.getToken();
  }

  ngOnInit() {
    this.getPostsByCategory();
  }

  getPostsByCategory() {
    this._router.params.subscribe(
      params => {
        let id = +params['id'];
        this._categoryService.getCategory(id).subscribe(
          response => {
            this.category = response.category;
            this._categoryService.getPosts(id).subscribe(
              response => {
                if ( response.status == 'success' ) {
                  this.posts = response.posts; 
                } else {
                  this._route.navigate(['/inicio']);
                }
              },
              error => {
                console.log(<any>error);
              }
            );
          },
          error => {
            console.log(<any>error);
          }
        );
      }
    );
  }

  deletePost(id) {
    this._postService.delete(this.token, id).subscribe(
      response => {
        if ( response.status == 'success' ) {
          this.getPostsByCategory();
        } else {
          console.log('error');
        }
      },
      error => {
        console.log(<any>error);
      }
    );
  }

}
