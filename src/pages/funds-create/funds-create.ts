import { Component } from '@angular/core';
import { Http } from '@angular/http'
import { IonicPage, NavController, NavParams, AlertController, ToastController, ViewController, Platform, ActionSheetController, LoadingController, PopoverController } from 'ionic-angular';
import { FormBuilder } from '@angular/forms';
import { UtilityService } from '../../app/utility.service';
import { ActionSheet } from '@ionic-native/action-sheet';
import { MenuSettingsPage } from '../menu-settings/menu-settings';
import 'rxjs/add/operator/map';

@IonicPage()
@Component({
  selector: 'page-funds-create',
  templateUrl: 'funds-create.html',
})
export class FundsCreatePage {
	amount: any;
  id: any;
  receiptURI: any;
  imageReceipt: any;
  profiles = [];
  cash_wallet: any;
  imageURI: any;

  constructor(public navCtrl: NavController, 
  	public navParams: NavParams,
  	public http: Http,
    public alertCtrl: AlertController,
    public builder: FormBuilder,
    public toastCtrl: ToastController,
    private viewCtrl: ViewController,
    private actionSheet: ActionSheet,
    public platform: Platform, 
    private actionSheetCtrl: ActionSheetController,
    public util: UtilityService,
    public loadingCtrl: LoadingController,
    public popoverCtrl: PopoverController) {

    this.viewProfile();
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

  cancelButton() {
    this.viewCtrl.dismiss();
  }

  viewProfile() {
    let url = '/viewProfile';
    let data = new FormData();

    data.append('aut', this.util.getUserGrabber());

    this.util.httpRequestPostMethod(url, data)
    .subscribe(
      profile => {
        this.profiles = profile.data;
        this.cash_wallet = profile.data.cash_wallet;

        console.log(this.profiles) }, 
      error => { 
        this.util.showToast(error.statusText); 

        console.log(error); },
      () => console.log('Profiles Response Complete')
    );
  }

  createFunding() {
    let url = '/createFunding';
    let formData = new FormData();

    formData.append('aut', this.util.getUserGrabber());
    formData.append('amount', this.amount);

    this.util.httpRequestPostMethod(url, formData)
    .subscribe(
      data => {
        if(data.status < 1) {
          this.util.showToast(data.msg);
          console.log(data)
        } else {
          this.util.showToast('Top Up was successfully'); 
        }
        console.log(formData);
      }, 
      error => { 
        this.util.showToast(error.statusText); 
        console.log(error); 
      }
    );
  }

}