import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Phone } from '../../model/phone';

import { PhoneService } from '../phone.service';

@Component({
  selector: 'app-phone-list',
  templateUrl: './phone-list.component.html',
  styleUrls: ['./phone-list.component.css']
})
export class PhoneListComponent implements OnInit {
  
  public phoneList: Phone[] = [];
  displayQuantity: number = 15;

  constructor(
    private phoneService: PhoneService,
    private router: Router
  ) { }

  ngOnInit() {
    this.phoneService.getPhoneList(0, this.displayQuantity)
      .then(() => this.phoneList = this.phoneService.phoneList);
    
      this.phoneService.onFilterEvent.subscribe(() => {
        this.phoneList = this.phoneService.phoneList;
      })
  }

  loadMore() {
    this.phoneService.getPhoneList(this.displayQuantity, this.displayQuantity += 15)
      .then(() => this.phoneList = this.phoneList.concat(this.phoneService.phoneList));
  }

  showDetails(id: number) {
    this.router.navigate(['./phone/' + id]);
  }
  
}
