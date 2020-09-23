import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FavoriteService } from 'src/app/services/favorite.service';
import { Post } from 'src/app/models/post';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css'],
  providers: [FavoriteService]
})
export class PostListComponent implements OnInit {
  @Input() posts;
  @Input() identity;
  @Input() url;
  @Input() token;
  @Output() deletePost: EventEmitter<Event> = new EventEmitter();
  
  constructor(
    private _favoriteService: FavoriteService,
  ) {
  }

  ngOnInit() {
  }

  delete(postId) {
    this.deletePost.emit(postId);
  }

  addFavorite(postId) {
    let post = {'post_id': postId};

    this._favoriteService.add(post, this.token).subscribe(
      response => {
        console.log(response);
        
      },
      error => {
        console.log(error);
      }
    );
  }
}
