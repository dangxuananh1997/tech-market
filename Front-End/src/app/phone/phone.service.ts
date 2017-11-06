import { Injectable, EventEmitter } from '@angular/core';
import { Http, Response } from '@angular/http';

import { Phone } from '../model/phone';

@Injectable()
export class PhoneService {

  getPhonesListLink: string = 'http://localhost:51075/api/Phones/GetInRange/';
  getPhoneByIDLink: string = 'http://localhost:51075/api/Phones/GetPhoneByID/';
  deletePhoneByIDLink: string = 'http://localhost:51075/api/Phones/DeletePhone/';
  getBrandListLink: string = 'http://localhost:51075/api/Brands/GetBrands/';
  getBrandByIDLink: string = 'http://localhost:51075/api/Brands/GetBrandByID/';
  getPhonesByFilterLink: string = 'http://localhost:51075/api/Phones/FilterPhone/';
  searchPhoneLink: string = 'http://localhost:51075/api/Phones/SearchByName?name=';

  public phoneList: Phone[];
  public phoneDetails: Phone;
  public brandList: string[];
  public brand: string;

  onFilterEvent: EventEmitter<Phone[]> = new EventEmitter();

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
      })
      .toPromise()
      .then(response => {
        this.phoneList = response.json() as Phone[];
      })
      .catch(this.alertFail);
  }

  getPhoneDetails(phoneID: number): Promise<Phone> {
    return this.http.get(this.getPhoneByIDLink + phoneID)
      .toPromise()
      .then(response => {
        this.phoneDetails = response.json() as Phone;
      })
      .catch(this.alertFail);
  }

  getBrandList(): Promise<string[]> {
    return this.http.get(this.getBrandListLink)
      .toPromise()
      .then(response => response.json() as string[])
      .catch(this.alertFail);
  }

  getBrandName(brandID: number): Promise<string> {
    return this.http.get(this.getBrandByIDLink + brandID)
      .toPromise()
      .then(response => {
        this.brand = response.json().BrandName as string;
      })
      .catch(this.alertFail);
  }

  getByFilter(
    BrandIDList: number[], 
    OSList: string[],
    RAMList: string[],
    ROMList: string[],
    CameraList: string[],
    FrontCameraList: string[]): Promise<Phone[]> {
      return this.http.post(this.getPhonesByFilterLink,
        {
          filter: {
            BrandIDList: BrandIDList,
            OSList: OSList,
            RAMList: RAMList,
            ROMList: ROMList,
            CameraList: CameraList,
            FrontCameraList: FrontCameraList
          },
          first: 0,
          last: 10
        }).toPromise().then(response => {
          this.phoneList = response.json() as Phone[];
          this.onFilterEvent.emit();
        }).catch(this.alertFail);
  }

  searchPhone(searchValue: string): Promise<Phone[]> {
    return this.http.get(this.searchPhoneLink + searchValue)
      .toPromise().then(response => response.json() as Phone[])
      .catch(this.alertFail);
  }

  deletePhone(id: number): Promise<string> {
    return this.http.post(this.deletePhoneByIDLink + id,{})
      .toPromise().then((response) => response.json())
      .catch(() => {
        alert('FAILED!');
      })
  }

}


