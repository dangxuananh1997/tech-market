import { Component, OnInit } from '@angular/core';
import { Http, Response } from '@angular/http';

import { Order } from '../../model/order';

@Component({
  selector: 'app-admin-view-order',
  templateUrl: './admin-view-order.component.html',
  styleUrls: ['./admin-view-order.component.css']
})
export class AdminViewOrderComponent implements OnInit {

  public orderList: Order[] = [];
  displayQuantity: number = 15;

  constructor(private http: Http) { }

  ngOnInit() {
    this.getData(0, this.displayQuantity);
  }

  getData(first: number, last: number) {
    this.http.get('http://localhost:51075/api/Orders/GetInRange/',
      {
        params: {
          first: first,
          last: last
        }
      }).toPromise().then(response => {
        this.orderList = response.json();
      });
  }

  checkOrder(orderID: number) {
    this.http.post('http://localhost:51075/api/Orders/DeleteOrder/' + orderID,{})
      .toPromise().then(() => {
        this.getData(0, this.displayQuantity);
      })
  }

  loadMore() {
    this.getData(0, this.displayQuantity += 15);
  }

}
