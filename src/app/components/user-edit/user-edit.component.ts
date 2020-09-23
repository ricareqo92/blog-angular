import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';
import { global } from '../../services/global';
@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.css'],
  providers: [UserService]
})
export class UserEditComponent implements OnInit {

  public title_page: string;
  public user: User;
  public identity;
  public token;
  public status;
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
    private _userService: UserService
  ) {
    this.title_page = 'Ajustes de Usuario';
    this.user = new User(1, '', '', 'ROLE_USER', '', '', '', '');
    this.identity = this._userService.getIdentity();
    this.token = this._userService.getToken();
    // RELLENAR OBJETO DE USUARIO
    this.user = new User(
      this.identity.sub,
      this.identity.name,
      this.identity.surname,
      this.identity.role,
      this.identity.email, '',
      this.identity.description,
      this.identity.image);
  }

  ngOnInit() {
  }

  onSubmit(userEditForm) {
    this._userService.update(this.token, this.user).subscribe(
      response => {
        if ( response && response.status ) {
          if ( response.status != 'error' ) {
            this.status = 'success';

            // ACTUALIZAR USUARIO EN SESIÓN
            this.identity = response.changes;
            localStorage.setItem('identity', JSON.stringify(this.identity));
          } else {
            this.status = 'error';
          }
        }
      },
      error => {
        this.status = 'error';
        console.log(<any>error);
      }
    );
  }

  avatarUpload(datos) {
    let data = JSON.parse(datos.response);
    this.user.image = data.image;
  }

}
