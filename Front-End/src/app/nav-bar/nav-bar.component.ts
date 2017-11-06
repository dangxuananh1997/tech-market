import { Component, OnInit } from '@angular/core';

import { Phone } from '../model/phone';

import { PhoneService } from '../phone/phone.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {

  searchValue: string;
  phoneList: Phone[] = [];

  constructor(private phoneService: PhoneService) { }

  ngOnInit() {
  }

  search() {
    if (this.searchValue != '' && this.searchValue != null) {
      $('.dropdown-menu').show();
      this.phoneService.searchPhone(this.searchValue)
        .then(response => {
          this.phoneList = response;
        })
    }
    else
      $('.dropdown-menu').hide();
  }

}
