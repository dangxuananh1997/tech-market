import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private http: Http
  ) {
    activatedRoute.params.subscribe(params => this.PhoneID = params['PhoneID']);
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

    $.validator.setDefaults({
      errorClass: 'help-block',
      highlight: function (element) {
        $(element).closest('.form-group').addClass('has-danger');
      },
      unhighlight: function (element) {
        $(element).closest('.form-group').removeClass('has-danger');
      }
    });

    $('#orderForm').validate({
      rules: {
        name: {
          required: true
        },
        email: {
          email: true,
          required: true
        },
        phone: {
          number: true,
          required: true
        },
        address: {
          required: true
        }
      }
    });
  }

  orderPhone() {
    if ($('#orderForm').valid()) {
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
          OrderStatus: 1
        }).toPromise().then(() => {
          alert('SUCCESS!');
          this.router.navigate(['/home']);
        }).catch(() => {
          alert('FAILED');
        });
    }
  }
}
