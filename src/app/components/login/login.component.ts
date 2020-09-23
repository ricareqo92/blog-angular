import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { UserService } from '../../services/user.service';
import { User } from 'src/app/models/user';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [UserService]
})
export class LoginComponent implements OnInit {

  public page_title: string;
  public user: User;
  public status: string;
  public token: string;
  public identity: any;
  
  constructor(
    private _userService: UserService,
    public _route: ActivatedRoute,
    public _router: Router,
  ) {
    this.page_title = "Login";
    this.user = new User(1, '', '', 'ROLE_USER', '', '', '', '');
  }

  ngOnInit() {
    // Se ejecuta siempre y cierra sesión solo cuando le llega el parámetro sure por la url
    this.logout();
  }

  onSubmit(loginForm) {
    //console.log(this.user);
    this._userService.signup(this.user).subscribe(
        response => {
          // TOKEN
          if ( response.status != 'error' ) {
            this.status = 'success';
            this.token = response;

            // OBJETO USUARIO IDENTIFICADO
            this._userService.signup(this.user, true).subscribe(
              response => {
                  this.identity = response;

                  // PERSISTIR DATOS USUARIO IDENTIFICADO
                  localStorage.setItem('token', this.token);
                  localStorage.setItem('identity', JSON.stringify(this.identity));
                  
                  // REDIRECCIÓN A INICIO
                  this._router.navigate(['inicio']);
              },
              error => {
                this.status = 'error';
              }
            );
          } else {
            this.status = 'error';
          }
        },
        error => {
          this.status = 'error';
        }
    );
  }

  logout() {
    this._route.params.subscribe(
      params => {
        let logout = +params['sure'];

        if ( logout == 1 ) {
          localStorage.removeItem('identity');
          localStorage.removeItem('token');

          this.identity = null;
          this.token = null;

          // REDIRECCIÓN A INICIO 
          this._router.navigate(['inicio']);
        }
      }
    );
  }
}
