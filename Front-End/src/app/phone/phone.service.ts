import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';

import { Phone } from '../model/phone';

@Injectable()
export class PhoneService {

  getPhonesListLink: string = 'http://10.82.137.174/TechMarket/api/Phones/GetInRange/';
  getPhoneByIDLink: string = 'http://10.82.137.174/TechMarket/api/Phones/GetPhoneByID/';

  public phoneList: Phone[] = [];

  constructor(private http: Http) { }

  alertFail(error: any): Promise<any> {
    console.error('An error occurred', error);
    return Promise.reject(error.message || error);
  }

  getPhoneList(first: number, last: number): Promise<Phone[]> {
    return this.http.get(
      this.getPhonesListLink,
      {
        params: 
        {
          first: first,
          last: last
        }
      }
    ).toPromise()
      .then(response => {
        this.phoneList = response.json() as Phone[];
      })
      .catch(this.alertFail);
  }

  getPhoneDetails(phoneID: number): Promise<Phone> {
    return this.http.get(this.getPhoneByIDLink + phoneID)
      .toPromise()
      .then(response => response.json() as Phone)
      .catch(this.alertFail);
  }

}
