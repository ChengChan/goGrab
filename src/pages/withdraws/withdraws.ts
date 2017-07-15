import { Component } from '@angular/core';
import { Http } from '@angular/http'
import { IonicPage, NavController, NavParams, AlertController, ToastController } from 'ionic-angular';
import { WithdrawsCreatePage } from '../withdraws-create/withdraws-create';
import 'rxjs/add/operator/map';

@IonicPage()
@Component({
  selector: 'page-withdraws',
  templateUrl: 'withdraws.html',
})
export class WithdrawsPage {
  withdraws = [];

  constructor(public navCtrl: NavController, 
  	public navParams: NavParams, 
  	public http: Http,
    public alertCtrl: AlertController,
    public toastCtrl: ToastController) {

    this.loadData();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad WithdrawsPage');
  }

  loadData() {
  	let data = new FormData();
   	data.append('aut','grabber');

    return this.http.post('https://gocapi.com/mg/business/getAllWithdrawalReq', data)
	  .map(res => res.json())
	  .subscribe(
      withdraw => { this.withdraws = withdraw.data; console.log(withdraw) }, 
      error => { this.showToast(error.statusText); console.log(error); },
      () => console.log('Funds Response Complete')
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

  doInfinite(infiniteScroll) {
    setTimeout(() => {
      infiniteScroll.complete();
    }, 500);
  }

  addNew() {
  	this.navCtrl.push(WithdrawsCreatePage);
  }

}
