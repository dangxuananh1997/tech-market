import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {

  SearchValue: string;

  constructor() { }

  ngOnInit() {
  }

  search() {
    console.log(this.SearchValue);
    if (this.SearchValue != '' && this.SearchValue != null)
      $('.dropdown-menu').show();
    else
      $('.dropdown-menu').hide();
  }

}
