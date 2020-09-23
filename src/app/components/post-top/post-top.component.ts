import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-post-top',
  templateUrl: './post-top.component.html',
  styleUrls: ['./post-top.component.css']
})
export class PostTopComponent implements OnInit {
  @Input('postsTop') posts;

  public page_title: string;

  constructor() {
    this.page_title = 'Artículos más valoradas';
  }

  ngOnInit() {
  }

}
