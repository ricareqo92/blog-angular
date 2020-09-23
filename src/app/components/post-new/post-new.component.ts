import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { CategoryService } from 'src/app/services/category.service';
import { Post } from '../../models/post';
import { global } from '../../services/global';
import { PostService } from 'src/app/services/post.service';

@Component({
  selector: 'app-post-new',
  templateUrl: './post-new.component.html',
  styleUrls: ['./post-new.component.css'],
  providers: [UserService, CategoryService, PostService]
})
export class PostNewComponent implements OnInit {
  public page_title: string;
  public identity;
  public token;
  public post: Post;
  public categories: any;
  public status: string;
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
    this.page_title = 'Crear una entrada';
    this.identity = this._userService.getIdentity();
    this.token = this._userService.getToken();
  }

  ngOnInit() {
    this.getCategories();
    this.post = new Post(1, this.identity.sub, 1, '', '', null, null);
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

  onSubmit(postForm) {
    console.log(this.post);
    this._postService.create(this.token, this.post).subscribe(
      response => {
        if ( response.status == 'success' ) {
          this.post = response.post;
          this.status = 'success';
          this._router.navigate(['/inicio']);
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
