import { Component } from '@angular/core';
import { Http } from '@angular/http'
import { IonicPage, NavController, NavParams, AlertController, ToastController, LoadingController, PopoverController, ViewController } from 'ionic-angular';
import { WithdrawsCreatePage } from '../withdraws-create/withdraws-create';
import 'rxjs/add/operator/map';
import { UtilityService } from '../../app/utility.service';
import { MenuSettingsPage } from '../menu-settings/menu-settings';

@IonicPage()
@Component({
  selector: 'page-withdraws',
  templateUrl: 'withdraws.html',
})
export class WithdrawsPage {

  allWithdraws = [];
  withdraws = [];

  constructor(public navCtrl: NavController, 
  	public navParams: NavParams, 
  	public http: Http,
    public alertCtrl: AlertController,
    public util: UtilityService,
    public loadingCtrl: LoadingController,
    public toastCtrl: ToastController,
    public popoverCtrl: PopoverController,
    private viewCtrl: ViewController) {

    this.getAllWithdrawalReq();
  }

  presentPopover(myEvent) {
    let popover = this.popoverCtrl.create(MenuSettingsPage);

    popover.present({
      ev: myEvent
    });
  }

  getAllWithdrawalReq() {
    let url = '/getAllWithdrawalReq';
    let loading = this.loadingCtrl.create({
      content: 'Loading Please Wait...'
    });

  	let formData = new FormData();
   	formData.append('aut', this.util.getUserGrabber());

    loading.present();
    this.util.httpRequestPostMethod(url, formData)
	  .subscribe(
      withdraw => { 
        this.allWithdraws = withdraw.data;
        console.log(this.allWithdraws);
        console.log("All withdrawals: " + this.allWithdraws.length);

        for (let i = 0; i < 5; i++) {
          this.withdraws.push(this.allWithdraws[i]);
        }
        console.log(this.withdraws);
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

  doInfinite(infiniteScroll) {
    console.log("All withdrawals: " + this.allWithdraws.length);
    console.log("Current withdrawals: " + this.withdraws.length);
    let startNum = this.withdraws.length;
    let currentNum = this.withdraws.length + 5;

    setTimeout(() => {
      if(currentNum > this.allWithdraws.length) {
        currentNum = this.allWithdraws.length;
      } else if(currentNum <= this.allWithdraws.length){
        currentNum = (this.withdraws.length + 5);
      }

      if(currentNum <= this.allWithdraws.length) {
        for (let i = startNum; i < currentNum; i++) {
          this.withdraws.push(this.allWithdraws[i]);
        }
        console.log(this.withdraws);
      }

      infiniteScroll.complete();
    }, 500);
  }

  addNew() {
  	this.navCtrl.push(WithdrawsCreatePage);
  }

  backButton() {
    this.viewCtrl.dismiss();
  }
}