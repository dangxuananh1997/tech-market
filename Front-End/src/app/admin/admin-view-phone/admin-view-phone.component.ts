import { Component, OnInit } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Router } from '@angular/router';

import { Phone } from '../../model/phone';

import { PhoneService } from '../../phone/phone.service';

@Component({
  selector: 'app-admin-view-phone',
  templateUrl: './admin-view-phone.component.html',
  styleUrls: ['./admin-view-phone.component.css']
})
export class AdminViewPhoneComponent implements OnInit {

  phoneList: Phone[] = [];
  tempList: Phone[] = [];

  displayQuantity: number = 15;

  constructor(
    private phoneService: PhoneService,
    private router: Router
  ) { }

  ngOnInit() {
    this.phoneService.getPhoneList(0, this.displayQuantity)
      .then(() => this.phoneList = this.phoneService.phoneList);
  }

  loadMore() {
    this.phoneService.getPhoneList(this.displayQuantity, this.displayQuantity += 15)
      .then(() => this.phoneList = this.phoneList.concat(this.phoneService.phoneList));
  }

  showDetails(id: number) {
    this.router.navigate(['./editPhone/' + id]);
  }

}
