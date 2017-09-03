import { Component } from '@angular/core';
import { Http } from '@angular/http'
import { IonicPage, NavController, NavParams, AlertController, ToastController, ModalController, LoadingController, PopoverController } from 'ionic-angular';
import { DealsCreatePage } from '../deals-create/deals-create';
import { MenuSettingsPage } from '../menu-settings/menu-settings';
import { LoginPage } from '../login/login';
import { UtilityService } from '../../app/utility.service';
import 'rxjs/add/operator/map';

@IonicPage()
@Component({
  selector: 'page-deals',
  templateUrl: 'deals.html',
})
export class Deals {

  deals = [];
  
  constructor(public navCtrl: NavController, 
  	public navParams: NavParams, 
  	public http: Http,
    public alertCtrl: AlertController,
    public toastCtrl: ToastController,
    public modalCtrl: ModalController,
    public util: UtilityService,
    public loadingCtrl: LoadingController,
    public popoverCtrl: PopoverController) {

  	this.getSalesRecord();
  }

  presentPopover(myEvent) {
    let popover = this.popoverCtrl.create(MenuSettingsPage);

    popover.present({
      ev: myEvent
    });
  }

  backButton() {
    this.navCtrl.setRoot(LoginPage);
  }

  pushFive() {

  }

  getSalesRecord() {
    let url = '/getSalesRecord';
    let loading = this.loadingCtrl.create({
      content: 'Loading Please Wait...'
    });
    let formData = new FormData();
    formData.append('aut', this.util.getUserMaker());
      
    loading.present();
    this.util.httpRequestPostMethod(url, formData)
    .subscribe(
      deal => {
        this.deals = deal.data;
      },
      error => {
        this.util.showToast(error.statusText);
        console.log(error)
      },
      () => {
        setTimeout(() => {
          loading.dismiss();
        }, 1000);
      }
    );

    console.log(this.deals)
  }

  addNew() {
    this.presentModal();
  }

  presentModal() {
    let profileModal = this.modalCtrl.create(DealsCreatePage, { });
    profileModal.onDidDismiss(data => {
     console.log(data);
    });
    profileModal.present();
  }

  doInfinite(infiniteScroll:any) {
    setTimeout(() => {
      for (let i = 0; i < 5; i++) {
        this.deals.push(this.deals.length);
      }

      infiniteScroll.complete();
    }, 500);
  }

}
