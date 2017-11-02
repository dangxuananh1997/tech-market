import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule }    from '@angular/http';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { PhoneListComponent } from './phone/phone-list/phone-list.component';
import { PhoneDetailsComponent } from './phone/phone-details/phone-details.component';
import { PhoneFilterComponent } from './phone/phone-filter/phone-filter.component';
import { LaptopListComponent } from './laptop/laptop-list/laptop-list.component';
import { LaptopDetailsComponent } from './laptop/laptop-details/laptop-details.component';
import { LaptopFilterComponent } from './laptop/laptop-filter/laptop-filter.component';
import { BuyProductComponent } from './buy-product/buy-product.component';
import { AdminEditPhoneComponent } from './admin/admin-edit-phone/admin-edit-phone.component';
import { AdminAddPhoneComponent } from './admin/admin-add-phone/admin-add-phone.component';
import { AdminAddLatopComponent } from './admin/admin-add-latop/admin-add-latop.component';
import { AdminEditLatopComponent } from './admin/admin-edit-latop/admin-edit-latop.component';
import { AdminViewLatopComponent } from './admin/admin-view-latop/admin-view-latop.component';
import { AdminViewPhoneComponent } from './admin/admin-view-phone/admin-view-phone.component';
import { AdminViewOrderComponent } from './admin/admin-view-order/admin-view-order.component';
import { AdminHomeComponent } from './admin/admin-home/admin-home.component';

import { PhoneService } from './phone/phone.service';
import { LaptopService } from './laptop/laptop.service';

import * as $ from 'jquery';
import { HomeComponent } from './home/home.component';
import { AdminNewPhoneComponent } from './admin-new-phone/admin-new-phone.component';

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
    path: 'phone/:LaptopID',
    component: LaptopDetailsComponent
  },
  {
    path: 'buy/:ProductID',
    component: BuyProductComponent
  },
  {
    path: 'admin',
    component: AdminHomeComponent
  },
  {
    path: 'newPhone',
    component: AdminNewPhoneComponent
  }
];

@NgModule({
  declarations: [
    AppComponent,
    PhoneListComponent,
    NavBarComponent,
    PhoneDetailsComponent,
    LaptopDetailsComponent,
    BuyProductComponent,
    AdminEditPhoneComponent,
    AdminAddPhoneComponent,
    AdminAddLatopComponent,
    AdminEditLatopComponent,
    AdminViewLatopComponent,
    AdminViewPhoneComponent,
    AdminViewOrderComponent,
    LaptopListComponent,
    PhoneFilterComponent,
    LaptopFilterComponent,
    HomeComponent,
    AdminHomeComponent,
    AdminNewPhoneComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    RouterModule.forRoot(appRoutes),
    FormsModule
  ],
  providers: [
    PhoneService,
    LaptopService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
