import { Component } from '@angular/core';
import { Http } from '@angular/http'
import { IonicPage, NavController, NavParams, AlertController, ToastController, LoadingController, PopoverController, ViewController } from 'ionic-angular';
import { UtilityService } from '../../app/utility.service';
import { MenuSettingsPage } from '../menu-settings/menu-settings';
import 'rxjs/add/operator/map';

@IonicPage()
@Component({
  selector: 'page-profiles-update',
  templateUrl: 'profiles-update.html',
})
export class ProfilesUpdatePage {
  profiles = [];
  fname: any;
  bank_account_name: any;
  bank_account_number: any;
  bank_name: any;

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

  loadData() {
    let url = '/viewProfile';
    let loading = this.loadingCtrl.create({
      content: 'Loading Please Wait...'
    });

  	let formData = new FormData();
   	formData.append('aut', this.util.getUserGrabber());

    loading.present();
  	this.util.httpRequestPostMethod(url, formData)
    .subscribe(
      profile => { 
        this.profiles = profile.data;
        this.fname = profile.data.fname;
        this.bank_account_name = profile.data.bank_account_name;
        this.bank_account_number = profile.data.bank_account_number;
        this.bank_name = profile.data.bank_name;

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
    let url = '/updateProfile';
    let loading = this.loadingCtrl.create({
      content: 'Loading Please Wait...'
    });

    let formData = new FormData();
    formData.append('aut', this.util.getUserGrabber());
    formData.append('fname', this.fname);
    formData.append('bank_account_name', this.bank_account_name);
    formData.append('bank_account_number', this.bank_account_number);
    formData.append('bank_name', this.bank_name);

    loading.present();
    this.util.httpRequestPostMethod(url, formData)
    .subscribe(
      data => {
        if(data.status < 1) {
          this.util.showToast(data.msg);
        } else {
          this.util.showToast('Profile was update successfully'); 
        }

        console.log(data) }, 
      error => { 
        this.util.showToast(error.statusText); 
        console.log(error); 
      },
      () => {
        setTimeout(() => {
          loading.dismiss();
        }, 1000);
      }
    );
  }

  backButton() {
    this.viewCtrl.dismiss();
  }

}