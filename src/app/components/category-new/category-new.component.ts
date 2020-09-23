import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Category } from 'src/app/models/category';
import { UserService } from 'src/app/services/user.service';
import { CategoryService } from 'src/app/services/category.service';

@Component({
  selector: 'app-category-new',
  templateUrl: './category-new.component.html',
  styleUrls: ['./category-new.component.css'],
  providers: [UserService, CategoryService]
})
export class CategoryNewComponent implements OnInit {

  public page_title: string;
  public category: Category;
  public identity: any;
  public token: string;
  public status: string;

  constructor(
    private router: Router,
    private routes: ActivatedRoute,
    private _userService: UserService,
    private _categoryService: CategoryService
  ) {
    this.page_title = 'Crear nueva Categoría';
    this.category = new Category(1, '');
    this.identity = this._userService.getIdentity();
    this.token = this._userService.getToken();
  }

  ngOnInit() {
  }

  onSubmit(categoryForm) {
    this._categoryService.create(this.token, this.category).subscribe(
      response => {        
        if ( response.status == 'success' ) {
          this.category = response.category;
          this.status = 'success';
          this.router.navigate(['/inicio']);
        } else {
          this.status = 'error';
        }
      },
      error => {
        this.status = 'error';
        console.log(<any>error);
      }
    );
  }

}
