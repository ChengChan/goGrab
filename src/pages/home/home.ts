import { Component } from '@angular/core';
import { Http } from '@angular/http'
import { NavController, NavParams, AlertController, ToastController, LoadingController, PopoverController } from 'ionic-angular';
import { DealsUngrabPage } from '../deals-ungrab/deals-ungrab';
import { ProfilesUpdatePage } from '../profiles-update/profiles-update';
import { FundsPage } from '../funds/funds';
import { WithdrawsPage } from '../withdraws/withdraws';
import { GrabsPage } from '../grabs/grabs'; 
import { LoginPage } from '../login/login';
import { MenuSettingsPage } from '../menu-settings/menu-settings';
import { UtilityService } from '../../app/utility.service';
import 'rxjs/add/operator/map';
import { Network } from '@ionic-native/network';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  
  profiles = [];
  account_name: any;
  cash_wallet: any;

  constructor(public navCtrl: NavController, 
    public navParams: NavParams, 
    public http: Http,
    public alertCtrl: AlertController,
    public util: UtilityService,
    public loadingCtrl: LoadingController,
    public toastCtrl: ToastController,
    public popoverCtrl: PopoverController,
    private network: Network) {

    this.viewProfile();
  }

  presentPopover(myEvent) {
    let popover = this.popoverCtrl.create(
      MenuSettingsPage, 
      {showBackdrop: true, enableBackdropDismiss: true}
    );

    popover.present({
      ev: myEvent
    });
  }

  ionViewDidEnter() {
    this.network.onConnect().subscribe(data => {
      console.log(data)
      this.displayNetworkUpdate(data.type);
    }, error => console.error(error));
   
    this.network.onDisconnect().subscribe(data => {
      console.log(data)
      this.displayNetworkUpdate(data.type);
    }, error => console.error(error));
  }

  displayNetworkUpdate(connectionState: string){
    let networkType = this.network.type
    this.util.alertConnectionStatus(connectionState);
  }

  viewProfile() {
    let url = "/viewProfile";
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
        this.account_name = profile.data.account_name;
        this.cash_wallet = profile.data.cash_wallet;
        
        console.log(this.profiles) }, 
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

  viewAllDeals() {
  	this.navCtrl.push(DealsUngrabPage);
  }

  topUp() {
  	this.navCtrl.push(FundsPage);
  }
  
  withdraw() {
  	this.navCtrl.push(WithdrawsPage);
  }

  grabbedDeals() {
  	this.navCtrl.push(GrabsPage);
  }

  updateProfile() {
  	this.navCtrl.push(ProfilesUpdatePage);
  }

  backButton() {
    this.navCtrl.setRoot(LoginPage);
  }  
}
