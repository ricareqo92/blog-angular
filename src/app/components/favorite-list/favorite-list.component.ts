import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-favorite-list',
  templateUrl: './favorite-list.component.html',
  styleUrls: ['./favorite-list.component.css']
})
export class FavoriteListComponent implements OnInit {
  @Input() favorites;

  public page_title: string;

  constructor() {
    this.page_title = 'Artículos Favoritos';
  }

  ngOnInit() {
    console.log(this.favorites);
    
  }

}
