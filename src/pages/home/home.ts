import { Component } from '@angular/core';
import { Http } from '@angular/http'
import { NavController, NavParams, AlertController, ToastController } from 'ionic-angular';
import { DealsUngrabPage } from '../deals-ungrab/deals-ungrab';
import { ProfilesUpdatePage } from '../profiles-update/profiles-update'; 
import { FundsPage } from '../funds/funds';
import { WithdrawsPage } from '../withdraws/withdraws';
import { GrabsPage } from '../grabs/grabs';
import 'rxjs/add/operator/map';

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
    public toastCtrl: ToastController) {

    this.loadData();

  }

  loadData() {
    let data = new FormData();
    data.append('aut','grabber');

    return this.http.post('https://gocapi.com/mg/business/viewProfile', data)
    .map(res => res.json())
    .subscribe(
      profile => { 
        this.profiles = profile.data;
        this.account_name = profile.data.account_name;
        this.cash_wallet = profile.data.cash_wallet;
        
        console.log(this.profiles) }, 
      error => { this.showToast(error.statusText); console.log(error); },
      () => console.log('Profiles Response Complete')
    );
  }

  showToast(msg: string) {
    let toast = this.toastCtrl.create({
      message: msg,
      duration: 3000,
      position: 'top'
    });

    toast.onDidDismiss(() => {
      console.log('Dismissed toast');
    });

    toast.present();
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
}
