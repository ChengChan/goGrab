import { Component } from '@angular/core';
import { Http } from '@angular/http'
import { IonicPage, NavController, NavParams, AlertController, ToastController, ModalController } from 'ionic-angular';
import 'rxjs/add/operator/map';

@IonicPage()
@Component({
  selector: 'page-deals-ungrab',
  templateUrl: 'deals-ungrab.html',
})
export class DealsUngrabPage {

	deals = [];
  sales_id: any;

  constructor(public navCtrl: NavController, 
  	public navParams: NavParams, 
  	public http: Http,
    public alertCtrl: AlertController,
    public toastCtrl: ToastController,
    public modalCtrl: ModalController) {

    if (this.deals.length > 0) {
      for (let i = 0; i < 30; i++) {
        this.deals.push( this.deals.length );
      }
    }

  	this.loadData();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DealsUngrabPage');
  }

  loadData() {
  	let data = new FormData();
   	data.append('aut','grabber');

    return this.http.post('https://gocapi.com/mg/business/getAllUngrabbedSalesRecord', data)
	  .map(res => res.json())
	  .subscribe(
      deal => { this.deals = deal.data; console.log(deal) }, 
      error => { this.showToast(error.statusText); console.log(error); },
      () => console.log('Deals Ungrab Response Complete')
    );
  }

  loadData2(sales_id) {
    this.sales_id = sales_id;

    let data = new FormData();
    data.append('aut','grabber');
    data.append('sales_id', this.sales_id);

    return this.http.post('https://gocapi.com/mg/business/grabSales', data)
    .map(res => res.json())
    .subscribe(
      data => { 
        if(data.status < 1) {
          this.showToast(data.msg);
        } else {
          this.showToast('Sale was grabbed successfully');
        }
        
        console.log(data) }, 
      error => { this.showToast(error.statusText); console.log(error); },
      () => console.log('Deals Ungrab Response Complete')
    );
  }

  presentConfirm(sales_id) {
    let alert = this.alertCtrl.create({
      title: 'Confirm Sale',
      message: 'Do you want to grab this sale?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Yes',
          handler: () => {
          console.log(sales_id);
            this.loadData2(sales_id);
          }
        }
      ]
    });
    alert.present();
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

}
