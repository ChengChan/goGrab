import { Component } from '@angular/core';
import { Http } from '@angular/http'
import { IonicPage, NavController, NavParams, AlertController, ToastController, ModalController, LoadingController } from 'ionic-angular';
import { DealsCreatePage } from '../deals-create/deals-create';
import 'rxjs/add/operator/map';
import { UtilityService } from '../../app/utility.service';

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
    public loadingCtrl: LoadingController) {

  	this.loadData();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Deals');
  }

  loadData() {
    let url = '/getSalesRecord';
    let loading = this.loadingCtrl.create({
      content: 'Loading Please Wait...'
    });
      
  	let formData = new FormData();
    formData.append('aut','maker');

    loading.present();
    this.util.httpRequestPostMethod(url, formData)
    .subscribe(
      deal => {
        this.deals = deal.data; 
        console.log(deal)
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
  }

  presentModal() {
    let profileModal = this.modalCtrl.create(DealsCreatePage, { });
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

  addNew() {
  	this.presentModal();
  }
  
}
