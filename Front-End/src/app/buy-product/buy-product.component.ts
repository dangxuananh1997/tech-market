import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Http, Response } from '@angular/http';

import { Phone } from '../model/phone';
import { PhoneService } from '../phone/phone.service';

@Component({
  selector: 'app-buy-product',
  templateUrl: './buy-product.component.html',
  styleUrls: ['./buy-product.component.css']
})
export class BuyProductComponent implements OnInit {

  @Input() PhoneID: number;
  phoneDetails: Phone;
  brand: string;

  customerName: string = "";
  customerPhone: string = "";
  customerEmail: string = "";
  customerNote: string = "";
  customerAddress: string = "";
  
  constructor(
    private phoneService: PhoneService,
    private route: ActivatedRoute,
    private http: Http
  ) {
    route.params.subscribe(params => this.PhoneID = params['PhoneID']);
  }

  ngOnInit() {
    this.phoneService.getPhoneDetails(this.PhoneID)
      .then(() => {
        this.phoneDetails = this.phoneService.phoneDetails;
        this.phoneService.getBrandName(this.phoneDetails.BrandID)
          .then(() => {
            this.brand = this.phoneService.brand;
          });
      });
  }

  orderPhone() {
    this.http.post('http://localhost:51075/api/Orders/PostOrder',
      {
        ProductID: this.phoneDetails.PhoneID,
        Price: this.phoneDetails.Price,
        Quantity: 1,
        CustomerEmail: this.customerEmail,
        CustomerName: this.customerName,
        CustomerAddress: this.customerAddress,
        CustomerPhone: this.customerPhone,
        CustomerNote: this.customerNote,
        OrderStatus: 'true'
      }
    ).toPromise().then(() => {
      alert('success');
    }).catch(() => {
      alert('failed');
    })
  }

}
