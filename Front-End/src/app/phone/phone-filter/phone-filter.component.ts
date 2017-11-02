import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-phone-filter',
  templateUrl: './phone-filter.component.html',
  styleUrls: ['./phone-filter.component.css']
})
export class PhoneFilterComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  test(e) {
    if (e.target.checked) {
      alert('check');
    } else {
      alert('uncheck')
    }
  }
}
