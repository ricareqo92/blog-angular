import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.css']
})
export class ErrorComponent implements OnInit {

  public page_title;

  constructor() {
    this.page_title = 'Página no encontrada';
  }

  ngOnInit() {
  }

}
