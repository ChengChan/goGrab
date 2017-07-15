import { Component } from '@angular/core';
import { Http } from '@angular/http'
import { IonicPage, NavController, NavParams, AlertController, ToastController, ModalController } from 'ionic-angular';
import { FundsCreatePage } from '../funds-create/funds-create';
import 'rxjs/add/operator/map';
import { UtilityService } from '../../app/utility.service';

@IonicPage()
@Component({
  selector: 'page-funds',
  templateUrl: 'funds.html',
})
export class FundsPage {
	funds = [];

  constructor(public navCtrl: NavController, 
  	public navParams: NavParams, 
  	public http: Http,
    public alertCtrl: AlertController,
    public toastCtrl: ToastController,
    public modalCtrl: ModalController,
    public util: UtilityService) {

    this.loadData();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad FundsPage');
  }

  loadData() {
  	let data = new FormData();
   	data.append('aut','grabber');

    return this.http.post('https://gocapi.com/mg/business/getAllFundingReq', data)
	  .map(res => res.json())
	  .subscribe(
      fund => { this.funds = fund.data; console.log(fund) }, 
      error => { this.util.showToast(error.statusText); console.log(error); },
      () => console.log('Funds Response Complete')
    );
  }

  addNew() {
    this.navCtrl.push(FundsCreatePage);
  }

  presentModal() {
    let profileModal = this.modalCtrl.create(FundsCreatePage, { });
    profileModal.onDidDismiss(data => {
     console.log(data);
    });
    profileModal.present();
  }

  doInfinite(infiniteScroll) {
    setTimeout(() => {
      infiniteScroll.complete();
    }, 500);
  }
}
