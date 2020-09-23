import { BrowserModule} from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { FroalaEditorModule, FroalaViewModule } from 'angular-froala-wysiwyg';
import { MomentModule } from 'angular2-moment';

import { routing, appRoutingProviders } from './app.routing';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { HomeComponent } from './components/home/home.component';
import { ErrorComponent } from './components/error/error.component';
import { UserEditComponent } from './components/user-edit/user-edit.component';
import { CategoryNewComponent } from './components/category-new/category-new.component';
import { PostNewComponent } from './components/post-new/post-new.component';
import { AngularFileUploaderModule } from "angular-file-uploader";
import { PostDetailComponent } from './components/post-detail/post-detail.component';
import { PostEditComponent } from './components/post-edit/post-edit.component';
import { CategoryDetailComponent } from './components/category-detail/category-detail.component';
import { IdentityGuard } from './services/identity.guard';
import { UserService } from './services/user.service';
import { ProfileComponent } from './components/profile/profile.component';
import { PostListComponent } from './components/post-list/post-list.component';
import { RatingModalComponent } from './components/rating-modal/rating-modal.component';
import { PostTopComponent } from './components/post-top/post-top.component';
import { ProfileInfoComponent } from './components/profile-info/profile-info.component';
import { FollowerListComponent } from './components/follower-list/follower-list.component';
import { FollowingListComponent } from './components/following-list/following-list.component';
import { FavoriteListComponent } from './components/favorite-list/favorite-list.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    ErrorComponent,
    UserEditComponent,
    CategoryNewComponent,
    PostNewComponent,
    PostDetailComponent,
    PostEditComponent,
    CategoryDetailComponent,
    ProfileComponent,
    PostListComponent,
    RatingModalComponent,
    PostTopComponent,
    ProfileInfoComponent,
    FollowerListComponent,
    FollowingListComponent,
    FavoriteListComponent
  ],
  imports: [
    BrowserModule,
    routing,
    FormsModule,
    HttpClientModule,
    FroalaEditorModule.forRoot(),
    FroalaViewModule.forRoot(),
    AngularFileUploaderModule,
    MomentModule
  ],
  providers: [
    appRoutingProviders,
    IdentityGuard,
    UserService
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
