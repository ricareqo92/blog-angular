import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-follower-list',
  templateUrl: './follower-list.component.html',
  styleUrls: ['./follower-list.component.css']
})
export class FollowerListComponent implements OnInit {
  @Input() followers;
  
  public page_title: string;

  constructor() {
    this.page_title = 'Seguidores';
  }

  ngOnInit() {
  }

}
