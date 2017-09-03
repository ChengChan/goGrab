import { Component } from '@angular/core';
import { Http } from '@angular/http'
import { IonicPage, NavController, NavParams, AlertController, ToastController, ModalController, LoadingController, PopoverController, ViewController } from 'ionic-angular';
import { FundsCreatePage } from '../funds-create/funds-create';
import { UtilityService } from '../../app/utility.service';
import { MenuSettingsPage } from '../menu-settings/menu-settings';
import { ReceiptsUploadPage } from '../receipts-upload/receipts-upload';
import 'rxjs/add/operator/map';

@IonicPage()
@Component({
  selector: 'page-funds',
  templateUrl: 'funds.html',
})
export class FundsPage {

  allFunds = [];
	funds = [];
  itemsPerPage = 5;

  constructor(public navCtrl: NavController, 
  	public navParams: NavParams, 
  	public http: Http,
    public alertCtrl: AlertController,
    public toastCtrl: ToastController,
    public modalCtrl: ModalController,
    public util: UtilityService,
    public loadingCtrl: LoadingController,
    public popoverCtrl: PopoverController,
    private viewCtrl: ViewController) {

    this.getAllFundingReq();
  }

  /*
   * Present popover for Menu Settings
   * 
  */
  showMenuSettings(myEvent) {
    let popover = this.popoverCtrl.create(MenuSettingsPage);

    popover.present({
      ev: myEvent
    });
  }

  /*
   * Load all funds from api - /getAllFundingReq
   * 
  */
  getAllFundingReq() {
    let url = '/getAllFundingReq';
    let loading = this.loadingCtrl.create({
      content: 'Loading Please Wait...'
    });

  	let formData = new FormData();
   	formData.append('aut', this.util.getUserGrabber());

    loading.present();
    this.util.httpRequestPostMethod(url, formData)
	  .subscribe(
      fund => { 
        this.allFunds = fund.data;
        console.log("All funds: " + this.allFunds.length);

        for (let i = 0; i < this.itemsPerPage; i++) {
          this.funds.push(this.allFunds[i]);
        }
        console.log(this.funds);
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

  /*
   * Refresh page
   * 
  */
  doRefresh() {
    this.getAllFundingReq();
  }

  /*
   * Go to creating fund page
   * 
  */
  addNew() {
    this.navCtrl.push(FundsCreatePage);
  }

  /*
   * Show modal for create fund page
   * 
  */
  showFundsCreate() {
    let profileModal = this.modalCtrl.create(FundsCreatePage, { });
    profileModal.onDidDismiss(data => {
     console.log(data);
    });
    profileModal.present();
  }

  /*
   * Infinite scroll for funds
   * 
  */
  doInfinite(infiniteScroll) {
    console.log("All funds: " + this.allFunds.length);
    console.log("Current Funds: " + this.funds.length);
    let startNum = this.funds.length;
    let currentNum = this.funds.length + this.itemsPerPage;

    setTimeout(() => {
      if(currentNum > this.allFunds.length) {
        currentNum = this.allFunds.length;
      } else if(currentNum <= this.allFunds.length){
        currentNum = (this.funds.length + this.itemsPerPage);
      }

      if(currentNum <= this.allFunds.length) {
        for (let i = startNum; i < currentNum; i++) {
          this.funds.push(this.allFunds[i]);
        }
        console.log(this.funds);
      }

      infiniteScroll.complete();
    }, 500);
  }

  /*
   * Go back to previous page
   * 
  */
  backButton() {
    this.viewCtrl.dismiss();
  }

  /*
   * Go to upload receipt page
   * 
  */
  goToUploadReceipt(fund_id: number) {
    this.navCtrl.push(ReceiptsUploadPage, fund_id);
  }
}
