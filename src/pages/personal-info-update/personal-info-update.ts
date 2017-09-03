import { Component } from '@angular/core';
import { Http } from '@angular/http'
import { IonicPage, NavController, NavParams, AlertController, ToastController, LoadingController, PopoverController, ViewController } from 'ionic-angular';
import { UtilityService } from '../../app/utility.service';
import { MenuSettingsPage } from '../menu-settings/menu-settings';
import 'rxjs/add/operator/map';

@IonicPage()
@Component({
  selector: 'page-personal-info-update',
  templateUrl: 'personal-info-update.html',
})
export class PersonalInfoUpdatePage {

  profiles = [];
  fname: any;
  ic: any;
  mobile: any;
  addressline1: any;
  addressline2: any;
  postcode: any;
  state: any;
  city: any;
  country: any;

 	constructor(public navCtrl: NavController, 
  	public navParams: NavParams, 
  	public http: Http,
    public alertCtrl: AlertController,
    public toastCtrl: ToastController,
    public util: UtilityService,
    public loadingCtrl: LoadingController,
    public popoverCtrl: PopoverController,
    private viewCtrl: ViewController) {

   	this.loadData();
	}

  presentPopover(myEvent) {
    let popover = this.popoverCtrl.create(MenuSettingsPage);

    popover.present({
      ev: myEvent
    });
  }

  backButton() {
    this.viewCtrl.dismiss();
  }

  loadData() {
    let url = '/viewProfile';
    let loading = this.loadingCtrl.create({content: 'Loading Please Wait...'});
  	let formData = new FormData();

   	formData.append('aut', this.util.getUserGrabber());

    loading.present();
  	this.util.httpRequestPostMethod(url, formData)
    .subscribe(
      profile => { 
        this.profiles = profile.data;
        this.fname = profile.data.fname;
        this.ic = profile.data.ic;
        this.mobile = profile.data.mobile;
    		this.addressline1 = profile.data.addressline1;
        this.addressline2 = profile.data.addressline2;
        this.postcode = profile.data.postcode;
        this.state = profile.data.state;
        this.city = profile.data.city;
        this.country = profile.data.country;

        console.log(this.profiles) 
      }, 
      error => { 
        this.util.showToast(error.statusText); 
        console.log(error); },
      () => {
        setTimeout(() => {
          loading.dismiss();
        }, 1000);
      }
    );
  }

  onSubmit() {
    let url = '/updateProfilePersonalInfo';
    let loading = this.loadingCtrl.create({content: 'Loading Please Wait...'});
    let formData = new FormData();
    
    formData.append('aut', this.util.getUserGrabber());
    formData.append('fname', this.fname);
    formData.append('ic', this.ic);
    formData.append('mobile', this.mobile);
    formData.append('addressline1', this.addressline1);
    formData.append('addressline2', this.addressline2);
    formData.append('postcode', this.postcode);
    formData.append('state', this.state);
    formData.append('city', this.city);
    formData.append('country', this.country);

    // loading.present();
    this.util.httpRequestPostMethod(url, formData)
    .subscribe(
      data => { 
        if(data.status < 1) {
          this.util.showToast(data.msg);
        } else {
          this.util.showToast('Personal Info was updated successfully'); 
        }

        console.log(data) 
       }, 
      error => { 
        // this.util.showToast(error.status); 
        console.log(error); 
      },
      () => {
        setTimeout(() => {
          loading.dismiss();
        }, 1000);
      }
    );
  }
}
