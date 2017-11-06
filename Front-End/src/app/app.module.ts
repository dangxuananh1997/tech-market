import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule }    from '@angular/http';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';

//navbar
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { HomeComponent } from './home/home.component';
//phone
import { PhoneListComponent } from './phone/phone-list/phone-list.component';
import { PhoneDetailsComponent } from './phone/phone-details/phone-details.component';
import { PhoneFilterComponent } from './phone/phone-filter/phone-filter.component';
//buy product
import { BuyProductComponent } from './buy-product/buy-product.component';
//admin
import { AdminEditPhoneComponent } from './admin/admin-edit-phone/admin-edit-phone.component';
import { AdminAddPhoneComponent } from './admin/admin-add-phone/admin-add-phone.component';
import { AdminViewPhoneComponent } from './admin/admin-view-phone/admin-view-phone.component';
import { AdminViewOrderComponent } from './admin/admin-view-order/admin-view-order.component';
import { AdminHomeComponent } from './admin/admin-home/admin-home.component';

import { PhoneService } from './phone/phone.service';

import * as $ from 'jquery';
import {} from 'jquery.validation';


const appRoutes: Routes = [
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: 'phone/:PhoneID',
    component: PhoneDetailsComponent
  },
  {
    path: 'buy/:PhoneID',
    component: BuyProductComponent
  },
  {
    path: 'admin',
    component: AdminHomeComponent
  },
  {
    path: 'addPhone',
    component: AdminAddPhoneComponent
  },
  {
    path: 'editPhone/:PhoneID',
    component: AdminEditPhoneComponent
  }
];

@NgModule({
  declarations: [
    AppComponent,
    PhoneListComponent,
    NavBarComponent,
    PhoneDetailsComponent,
    BuyProductComponent,
    AdminEditPhoneComponent,
    AdminAddPhoneComponent,
    AdminViewPhoneComponent,
    AdminViewOrderComponent,
    PhoneFilterComponent,
    HomeComponent,
    AdminHomeComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    RouterModule.forRoot(appRoutes),
    FormsModule
  ],
  providers: [
    PhoneService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
