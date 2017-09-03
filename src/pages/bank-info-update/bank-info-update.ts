import { Component } from '@angular/core';
import { Http } from '@angular/http'
import { IonicPage, NavController, NavParams, AlertController, ToastController, LoadingController, PopoverController, ViewController } from 'ionic-angular';
import { UtilityService } from '../../app/utility.service';
import 'rxjs/add/operator/map';
import { MenuSettingsPage } from '../menu-settings/menu-settings';

@IonicPage()
@Component({
  selector: 'page-bank-info-update',
  templateUrl: 'bank-info-update.html',
})
export class BankInfoUpdatePage {

  profiles = [];
  bank_name: any;
  bank_account_name: any;
  bank_account_number: any;
  bank_branch_address: any;
  bank_swift_code: any;

 	constructor(public navCtrl: NavController, 
  	public navParams: NavParams, 
  	public http: Http,
    public alertCtrl: AlertController,
    public toastCtrl: ToastController,
    public util: UtilityService,
    public loadingCtrl: LoadingController,
    public popoverCtrl: PopoverController,
    public viewCtrl: ViewController) {

   	this.viewProfile();
	}

  presentPopover(myEvent) {
    let popover = this.popoverCtrl.create(MenuSettingsPage);

    popover.present({
      ev: myEvent
    });
  }

  cancelButton() {
    this.viewCtrl.dismiss();
  }

  viewProfile() {
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
        this.bank_name = profile.data.bank_name;
        this.bank_account_name = profile.data.bank_account_name;
        this.bank_account_number = profile.data.bank_account_number;
    		this.bank_branch_address = profile.data.branch_address;
        this.bank_swift_code = profile.data.bank_swift_code;

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
    let url = '/updateProfileBankInfo';
    let loading = this.loadingCtrl.create({
      content: 'Loading Please Wait...'
    });

    let formData = new FormData();
    formData.append('aut', this.util.getUserGrabber());
    formData.append('bank_name', this.bank_name);
    formData.append('bank_account_name', this.bank_account_name);
    formData.append('bank_account_number', this.bank_account_number);
    formData.append('branch_address', this.bank_branch_address);
    formData.append('bank_swift_code', this.bank_swift_code);

    loading.present();
    this.util.httpRequestPostMethod(url, formData)
    .subscribe(
      data => {
        if(data.status < 1) {
          this.util.showToast(data.msg);
        } else {
          this.util.showToast('Bank Info was updated successfully'); 
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
}
