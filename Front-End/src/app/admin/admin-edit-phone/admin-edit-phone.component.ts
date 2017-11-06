import { Component, OnInit, Input } from '@angular/core';
import { Http, Response } from '@angular/http';
import { ActivatedRoute, Router } from '@angular/router';

import { Brand } from '../../model/brand';
import { Phone } from '../../model/phone';
import { PhoneService } from '../../phone/phone.service';

@Component({
  selector: 'app-admin-edit-phone',
  templateUrl: './admin-edit-phone.component.html',
  styleUrls: ['./admin-edit-phone.component.css']
})
export class AdminEditPhoneComponent implements OnInit {
  
  @Input() PhoneID: number;
  phone: Phone;
  brandList: Brand[];

  constructor(
    private http: Http,
    private phoneService: PhoneService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {
    activatedRoute.params.subscribe(params => this.PhoneID = params['PhoneID']);
  }

  ngOnInit() {
    this.http.get('http://localhost:51075/api/Brands/GetBrands')
      .subscribe(response => this.brandList = response.json());

    this.phone = new Phone(0, "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", 0, 0, 0, "a", "a", "a", "", "");

    this.phoneService.getPhoneDetails(this.PhoneID)
    .then(() => {
      this.phone = this.phoneService.phoneDetails;
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

    $('#editPhoneForm').validate({
      rules: {
        Name: { required: true },
        OS: { required: true },
        ScreenWidth: { required: true },
        CPU: { required: true },
        RAM: { required: true },
        ROM: { required: true },
        Camera: { required: true },
        FrontCamera: { required: true },
        Battery: { required: true },
        ScreenResolution: { required: true },
        Wifi: { required: true },
        HeadphoneJack: { required: true },
        NFC: { required: true },
        Sim: { required: true },
        Special: { required: true },
        ProductName: { required: true },
        Price: { required: true },
        Quantity: { required: true },
        BrandID: { required: true }
      }
    });

    $('input[type="file"].feature-picture-upload').change(function (e) {
      var fileName = $(e.target).prop('files')[0].name;
      $(e.target.parentNode).children('label').text(fileName);
    });
  }

  updatePhone() {
    if ($('#editPhoneForm').valid()) {
      var thumbnailPromise = this.getBase64($('input[name=thumbnail]').prop('files')[0])
      var pic1Promise = this.getBase64($('input[name=pic1]').prop('files')[0])
      var pic2Promise = this.getBase64($('input[name=pic2]').prop('files')[0])
      var pic3Promise = this.getBase64($('input[name=pic3]').prop('files')[0])
      var pic4Promise = this.getBase64($('input[name=pic4]').prop('files')[0])

      thumbnailPromise.then(result => {
        this.phone.Thumbnail = result;
        pic1Promise.then(result => {
          this.phone.Pic1 = result;
          pic2Promise.then(result => {
            this.phone.Pic2 = result;
            pic3Promise.then(result => {
              this.phone.Pic3 = result;
              pic4Promise.then(result => {
                this.phone.Pic4 = result;
                this.http.post('http://localhost:51075/api/Phones/PutPhone',
                  {
                    id: this.phone.PhoneID,
                    phone: {
                      PhoneID: this.phone.PhoneID,
                      OS: this.phone.OS,
                      ScreenWidth: this.phone.ScreenWidth,
                      CPU: this.phone.CPU,
                      RAM: this.phone.RAM,
                      ROM: this.phone.ROM,
                      Camera: this.phone.Camera,
                      FrontCamera: this.phone.FrontCamera,
                      Battery: this.phone.Battery,
                      ScreenResolution: this.phone.ScreenResolution,
                      Wifi: this.phone.Wifi,
                      HeadphoneJack: this.phone.HeadphoneJack,
                      NFC: this.phone.NFC,
                      Sim: this.phone.Sim,
                      Special: this.phone.Special,
                      Product: {
                        ProductID: this.phone.PhoneID,
                        ProductName: this.phone.ProductName,
                        Price: this.phone.Price,
                        Quantity: this.phone.Quantity,
                        BrandID: this.phone.BrandID,
                        Thumbnail: this.phone.Thumbnail,
                        Pic1: this.phone.Pic1,
                        Pic2: this.phone.Pic2,
                        Pic3: this.phone.Pic3,
                        Pic4: this.phone.Pic4
                      }
                    }
                  }).toPromise().then(() => {
                    alert('SUCCESS!');
                    this.router.navigate(['/admin']);
                  }).catch(() => {
                    alert('FAILED!');
                  });
              });
            });
          });
        });
      });
    }
  }

  getBase64(file): Promise<string> {
    return new Promise<string>((resolve, reject) => {
      let reader = new FileReader();
      if (file != null) {
        reader.readAsDataURL(file);
        reader.onload = function () {
          resolve(reader.result);
        };
        reader.onerror = function (error) {
          console.log('Error: ', error);
          reject();
        }
      } else
        resolve('');
    });
  }

}
