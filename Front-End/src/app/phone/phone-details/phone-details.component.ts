import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Phone } from '../../model/phone';

import { PhoneService } from '../phone.service';

@Component({
  selector: 'app-phone-details',
  templateUrl: './phone-details.component.html',
  styleUrls: ['./phone-details.component.css']
})
export class PhoneDetailsComponent implements OnInit {
  @Input() PhoneID: number;
  phoneDetails: Phone;
  
  constructor(
    private phoneService: PhoneService,
    private route: ActivatedRoute
  ) { 
    route.params.subscribe(params => this.PhoneID = params['PhoneID']);
  }

  ngOnInit() {
    this.phoneService.getPhoneDetails(this.PhoneID)
      .then((phoneDetails) => this.phoneDetails = phoneDetails);
  }

}
