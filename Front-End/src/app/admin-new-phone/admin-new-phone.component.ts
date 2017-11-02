import { Component, OnInit } from '@angular/core';
import { Http, Response, RequestOptions, Headers } from '@angular/http';

import { Brand } from '../model/brand';
import { Phone } from '../model/phone';

@Component({
  selector: 'app-admin-new-phone',
  templateUrl: './admin-new-phone.component.html',
  styleUrls: ['./admin-new-phone.component.css']
})
export class AdminNewPhoneComponent implements OnInit {

  brandList: Brand[];
  phone: Phone;

  constructor(private http: Http) { }

  ngOnInit() {
    this.http.get('http://localhost:51075/api/Brands/GetBrands')
      .subscribe(response => {
        this.brandList = response.json();
      });

    this.phone = new Phone(0, "", "", "", "", "", "", 
                        "", "", "", "", "", "", "", "",
                        "", "", 0, 0, 0, 0, "", "",
                        "", "", "");
  }

  addNewPhone() {
    console.log(this.phone);
    let headers = new Headers(
      {
        'Content-Type': 'multipart/form-data'
      }
    );
    let options = new RequestOptions(
      { 
        headers: headers 
      }
    );
    this.http.post(
      'http://localhost:51075/api/Phones/PostPhone',
      {
        phone: this.phone
      }
    )
    .toPromise()
    .then(
      function () {
        alert('yasss');
      }
    )
    .catch(
      function () {
        alert('noooo');
      }
    )

    // this.http.post(
    //   'http://192.168.150.155/TechMarket/api/Phones/PostNew',
    //   {
        
    //   },
    //   options
    // )
    // .toPromise()
    // .then(
    //   function () {
    //     alert('yasss');
    //   }
    // )
    // .catch(
    //   function () {
    //     alert('noooo');
    //   }
    // )

  }

}
