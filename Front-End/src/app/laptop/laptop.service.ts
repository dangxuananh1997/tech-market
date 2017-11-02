import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';

import { Laptop } from '../model/laptop';
import { LaptopDetails } from '../model/laptop-details';

@Injectable()
export class LaptopService {

  getAllLaptopsLink: string = 'http://10.82.137.174/TechMarket/api/Laptops/GetLaptops/';
  getLaptopByIDLink: string = 'http://10.82.137.174/TechMarket/api/Laptops/GetLaptopByID/';

  public laptopList: Laptop[] = [];

  constructor(private http: Http) { }
  
  alertFail(error: any): Promise<any> {
    console.error('An error occurred', error);
    return Promise.reject(error.message || error);
  }

  getLaptopList(quantity: number): Promise<Laptop[]> {
    return this.http.get(this.getAllLaptopsLink)
      .toPromise()
      .then(response => {
        this.laptopList = response.json().slice(0, quantity) as Laptop[];
      })
      .catch(this.alertFail);
  }

  getLaptopDetails(LaptopID: number): Promise<LaptopDetails> {
    return this.http.get(this.getLaptopByIDLink + LaptopID)
      .toPromise()
      .then(response => response.json() as LaptopDetails)
      .catch(this.alertFail);
  }

}
