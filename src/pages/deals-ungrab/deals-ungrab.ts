import { Component } from '@angular/core';
import { Http } from '@angular/http'
import { IonicPage, NavController, NavParams, Platform, AlertController, ToastController, ModalController, LoadingController, PopoverController, ViewController } from 'ionic-angular';
import 'rxjs/add/operator/map';
import { MenuSettingsPage } from '../menu-settings/menu-settings';
import { UtilityService } from '../../app/utility.service';
import { Network } from '@ionic-native/network';

declare var navigator: any;
declare var Connection: any;

@IonicPage()
@Component({
  selector: 'page-deals-ungrab',
  templateUrl: 'deals-ungrab.html',
})
export class DealsUngrabPage {

  allDeals = [];
	deals = [];
  sales_id: any;
  
  constructor(public navCtrl: NavController, 
  	public navParams: NavParams, 
  	public http: Http,
    public alertCtrl: AlertController,
    public toastCtrl: ToastController,
    public loadingCtrl: LoadingController,
    public util: UtilityService,
    public modalCtrl: ModalController,
    public popoverCtrl: PopoverController,
    private viewCtrl: ViewController,
    private platform: Platform,
    private network: Network) {

  	this.getAllUngrabbedSalesRecord();
  }

  ionViewDidEnter() {
    this.network.onConnect().subscribe(data => {
      let networkType = this.network.type

      console.log(data)
      this.util.showAlert('Connection status', this.network.type);
      this.util.showAlert(data.type, '');
    }, error => console.error(error));
   
    this.network.onDisconnect().subscribe(data => {
      console.log(data)
      this.util.showAlert(data.type, '');
    }, error => console.error(error));
  }

  presentPopover(myEvent) {
    let popover = this.popoverCtrl.create(MenuSettingsPage);

    popover.present({
      ev: myEvent
    });
  }

  getAllUngrabbedSalesRecord() {
    let url = '/getAllUngrabbedSalesRecord';
    let loading = this.loadingCtrl.create({
      content: 'Loading Please Wait...'
    });

  	let formData = new FormData();
   	formData.append('aut', this.util.getUserGrabber());

    loading.present();
    this.util.httpRequestPostMethod(url, formData)
	  .subscribe(
      deal => {
        this.allDeals = deal.data;
        console.log("All deals: " + this.allDeals.length);

        for (let i = 0; i < 5; i++) {
          this.deals.push(this.allDeals[i]);
        }
        console.log(this.deals);
      }, 
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

  grabSales(sales_id) {
    let url = '/grabSales';
    let loading = this.loadingCtrl.create({
      content: 'Loading Please Wait...'
    });
    this.sales_id = sales_id;

    let formData = new FormData();
    formData.append('aut', this.util.getUserGrabber());
    formData.append('sales_id', this.sales_id);

    loading.present();
    this.util.httpRequestPostMethod(url, formData)
    .subscribe(
      data => { 
        if(data.status < 1) {
          this.util.showToast(data.msg);
        } else {
          this.util.showToast('Sale was grabbed successfully');
        }
        
        console.log(data) 
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
            this.grabSales(sales_id);
          }
        }
      ]
    });
    alert.present();
  }

  doInfinite(infiniteScroll) {
    console.log("All deals: " + this.allDeals.length);
    console.log("Current deals: " + this.deals.length);
    let startNum = this.deals.length;
    let currentNum = this.deals.length + 5;

    setTimeout(() => {
      if(currentNum > this.allDeals.length) {
        currentNum = this.allDeals.length;
      } else if(currentNum <= this.allDeals.length){
        currentNum = (this.deals.length + 5);
      }

      if(currentNum <= this.allDeals.length) {
        for (let i = startNum; i < currentNum; i++) {
          this.deals.push(this.allDeals[i]);
        }
        console.log(this.deals);
      }

      infiniteScroll.complete();
    }, 500);
  }

  backButton() {
    this.viewCtrl.dismiss();
  }

  checkNetwork() {
    this.platform.ready().then(() => {
      var networkState = navigator.connection.type;
      var states = {};
      states[Connection.UNKNOWN]  = 'Unknown connection';
      states[Connection.ETHERNET] = 'Ethernet connection';
      states[Connection.WIFI]     = 'WiFi connection';
      states[Connection.CELL_2G]  = 'Cell 2G connection';
      states[Connection.CELL_3G]  = 'Cell 3G connection';
      states[Connection.CELL_4G]  = 'Cell 4G connection';
      states[Connection.CELL]     = 'Cell generic connection';
      states[Connection.NONE]     = 'No network connection';

      console.log(states[networkState]);
    });
  }
}
