import { Component, OnInit } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Router } from '@angular/router';

import { Laptop } from '../../model/laptop';

import { LaptopService } from '../laptop.service';

@Component({
  selector: 'app-laptop-list',
  templateUrl: './laptop-list.component.html',
  styleUrls: ['./laptop-list.component.css']
})
export class LaptopListComponent implements OnInit {

  laptopList: Laptop[] = [];
  displayQuantity: number = 15;

  constructor(
    private laptopService: LaptopService,
    private router: Router
  ) { }

  ngOnInit() {
    this.laptopService.getLaptopList(this.displayQuantity)
      .then(() => this.laptopList = this.laptopService.laptopList);
  }

  loadMore() {
    this.displayQuantity += 15;
    this.laptopService.getLaptopList(this.displayQuantity)
      .then(() => this.laptopList = this.laptopService.laptopList);
  }

  showDetails(id: number) {
    this.router.navigate(['./laptop/' + id]);
  }

}
