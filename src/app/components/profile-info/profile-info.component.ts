import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-profile-info',
  templateUrl: './profile-info.component.html',
  styleUrls: ['./profile-info.component.css']
})
export class ProfileInfoComponent implements OnInit {
  @Input() description;
  
  public page_title: string;

  constructor() {
    this.page_title = 'Información'
  }

  ngOnInit() {
  }

}
