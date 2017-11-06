import { Component, OnInit } from '@angular/core';
import { Http, Response } from '@angular/http';

import { Phone } from '../../model/phone';

import { PhoneService } from '../phone.service';

@Component({
  selector: 'app-phone-filter',
  templateUrl: './phone-filter.component.html',
  styleUrls: ['./phone-filter.component.css']
})
export class PhoneFilterComponent implements OnInit {
  BrandIDList: number[] = [];
  OSList: string[] = [];
  RAMList: string[] = [];
  ROMList: string[] = [];
  CameraList: string[] = [];
  FrontCameraList: string[] = [];

  constructor(
    private phoneService: PhoneService, 
    private http: Http
  ) { }

  ngOnInit() {
  }

  addBrandIDList(e, brandID: number) {
    if (e.target.checked) {
      this.BrandIDList.push(brandID);
    } else {
      let index: number = $.inArray(brandID, this.BrandIDList);
      this.BrandIDList.splice(index, 1);
    }
    this.filter();
  }

  addOSList(e, os: string) {
    if (e.target.checked) {
      this.OSList.push(os);
    } else {
      let index: number = $.inArray(os, this.OSList);
      this.OSList.splice(index, 1);
    }
    this.filter();
  }

  addRAMList(e, ram: string) {
    if (e.target.checked) {
      this.RAMList.push(ram);
    } else {
      let index: number = $.inArray(ram, this.RAMList);
      this.RAMList.splice(index, 1);
    }
    this.filter();
  }

  addROMList(e, rom: string) {
    if (e.target.checked) {
      this.ROMList.push(rom);
    } else {
      let index: number = $.inArray(rom, this.ROMList);
      this.ROMList.splice(index, 1);
    }
    this.filter();
  }

  addCameraList(e, camera: string) {
    if (e.target.checked) {
      this.CameraList.push(camera);
    } else {
      let index: number = $.inArray(camera, this.CameraList);
      this.CameraList.splice(index, 1);
    }
    this.filter();
  }

  addFrontCameraList(e, frontCamera: string) {
    if (e.target.checked) {
      this.FrontCameraList.push(frontCamera);
    } else {
      let index: number = $.inArray(frontCamera, this.FrontCameraList);
      this.FrontCameraList.splice(index, 1);
    }
    this.filter();
  }

  filter() {
    this.phoneService.getByFilter(this.BrandIDList, this.OSList, this.RAMList, this.ROMList, this.CameraList, this.FrontCameraList)
      .then(function () {
        
      })
  }
}
