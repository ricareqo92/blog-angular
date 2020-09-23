import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { CategoryService } from 'src/app/services/category.service';
import { Post } from '../../models/post';
import { global } from '../../services/global';
import { PostService } from 'src/app/services/post.service';

@Component({
  selector: 'app-post-edit',
  templateUrl: '../post-new/post-new.component.html',
  styleUrls: ['../post-new/post-new.component.css'],
  providers: [UserService, CategoryService, PostService]
})
export class PostEditComponent implements OnInit {
  public page_title: string;
  public identity;
  public token;
  public post: Post;
  public categories: any;
  public status: string;
  public is_edit: boolean;
  public froala_options: Object = {
    charCounterCount: true,
    lenguage: 'es',
    toolbarButtons: ['bold', 'italic', 'underline', 'paragraphFormat'],
    toolbarButtonsXS: ['bold', 'italic', 'underline', 'paragraphFormat'],
    toolbarButtonsSM: ['bold', 'italic', 'underline', 'paragraphFormat'],
    toolbarButtonsMD: ['bold', 'italic', 'underline', 'paragraphFormat'],
  };
  public afuConfig = {
    multiple: false,
    formatsAllowed: ".jpg, .png, .gif, .jpeg",
    maxSize: "50",
    uploadAPI: {
      url: global.url+'post/upload',
      headers: {
        "Authorization": this._userService.getToken()
      }
    },
    theme: "attachPin",
    hideProgressBar: false,
    hideResetBtn: true,
    hideSelectBtn: false,
    attachPinText: 'Sube tu avatar de usuario'
  };
  
  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _userService: UserService,
    private _categoryService: CategoryService,
    private _postService: PostService
  ) {
    this.page_title = 'Editar una entrada';
    this.identity = this._userService.getIdentity();
    this.token = this._userService.getToken();
    this.is_edit = true;
  }

  ngOnInit() {
    this.getCategories();
    this.post = new Post(1, this.identity.sub, 1, '', '', null, null);
    this.getPost();
  }

  getCategories() {
    this._categoryService.getCategories().subscribe(
      response => {
        if ( response.status == 'success' ) {
          this.categories = response.categories;
        }
      },
      error => {
        console.log(<any>error);
      }
    );
  }
  
  imageUpload(data) {
    let image_data = JSON.parse(data.response);
    this.post.image = image_data.image;
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
              if ( this.post.user_id != this.identity.sub ) {
                this._router.navigate(['/inicio']);
              }
            }
          },
          error => {
            console.log(<any>error);
          }
        );
      }
    );
  }

  onSubmit(postForm) {
    console.log(this.post);
    this._postService.update(this.token, this.post.id, this.post).subscribe(
      response => {
        if ( response.status == 'success' ) {
          this.post = response.post;
          this.status = 'success';
          this._router.navigate(['/entrada', this.post.id]);
        } else {
          this.status = 'error';
        }
      },
      error => {
        console.log(<any>error);
      }
    );
  }
}
