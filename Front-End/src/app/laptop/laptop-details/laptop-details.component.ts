import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { LaptopDetails } from '../../model/laptop-details';

import { LaptopService } from '../laptop.service';

@Component({
  selector: 'app-laptop-details',
  templateUrl: './laptop-details.component.html',
  styleUrls: ['./laptop-details.component.css']
})
export class LaptopDetailsComponent implements OnInit {
  @Input() LaptopID: number;
  laptopDetails: LaptopDetails;

  constructor(
    private laptopService: LaptopService,
    private route: ActivatedRoute
  ) {
    route.params.subscribe(params => this.LaptopID = params['LaptopID']);
  }

  ngOnInit() {
    // this.laptopService.getLaptopDetails(this.LaptopID)
    //   .then((LaptopDetails) => this.LaptopDetails = LaptopDetails);
  }

}
