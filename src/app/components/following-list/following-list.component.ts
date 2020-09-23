import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FriendService } from 'src/app/services/friendServices';

@Component({
  selector: 'app-following-list',
  templateUrl: './following-list.component.html',
  styleUrls: ['./following-list.component.css'],
  providers: [FriendService]
})
export class FollowingListComponent implements OnInit {
  @Input('following') followingList;
  @Input('token') token;
  @Output() getFollowing: EventEmitter<any> = new EventEmitter();
  
  public page_title: string;

  constructor(
    private _friendService: FriendService,
  ) {
    this.page_title = 'Seguidos';
  }

  ngOnInit() {
  }

  unfollow(following) {
    this._friendService.unfollow(following.id, this.token).subscribe(
      response => {
        if ( response.status == 'success' ) {
          this.getFollowing.emit(following.user_id);
        }
      },
      error => {
        console.log(error);
      }
    );
  }

}
