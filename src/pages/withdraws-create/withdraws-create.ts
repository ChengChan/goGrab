import { Component } from '@angular/core';
import { Http } from '@angular/http'
import { IonicPage, NavController, NavParams, AlertController, ToastController, ViewController, LoadingController, PopoverController} from 'ionic-angular';
import { FormBuilder } from '@angular/forms';
import 'rxjs/add/operator/map';
import { UtilityService } from '../../app/utility.service';
import { MenuSettingsPage } from '../menu-settings/menu-settings';

@IonicPage()
@Component({
  selector: 'page-withdraws-create',
  templateUrl: 'withdraws-create.html',
})
export class WithdrawsCreatePage {
 	withdraw = {};
  profiles = [];
	cash_wallet: any;
  amount: any;

  constructor(public navCtrl: NavController, 
  	public navParams: NavParams,
  	public http: Http,
    public alertCtrl: AlertController,
    public builder: FormBuilder,
    public toastCtrl: ToastController,
    public util: UtilityService,
    public loadingCtrl: LoadingController,
    private viewCtrl: ViewController,
    public popoverCtrl: PopoverController) {

    this.loadData();
  }

  presentPopover(myEvent) {
    let popover = this.popoverCtrl.create(MenuSettingsPage);

    popover.present({
      ev: myEvent
    });
  }

  loadData() {
    let url = "/viewProfile";
    let loading = this.loadingCtrl.create({
      content: 'Loading Please Wait...'
    });

    let formData = new FormData();
    formData.append('aut', this.util.getUserGrabber());

    this.util.httpRequestPostMethod(url, formData)
    .subscribe(
      profile => {
        this.profiles = profile.data;
        this.cash_wallet = profile.data.cash_wallet;

        console.log(this.profiles) 
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

  onSubmit() {
    let url = "/createWithdrawalRequest";
    let loading = this.loadingCtrl.create({
      content: 'Loading Please Wait...'
    });

  	let formData = new FormData();
   	formData.append('aut', this.util.getUserGrabber());
   	formData.append('amount', this.amount);

    this.util.httpRequestPostMethod(url, formData)
	  .subscribe(
	  	data => {
        if(data.status < 1) {
          this.util.showToast(data.msg);
          console.log(data)
        } else {
          this.util.showToast('Withdrawal was successfully'); 
        }
        
        console.log(data) }, 
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

  logForm() {	
  	console.log(this.withdraw)
  }

  cancelButton() {
    this.viewCtrl.dismiss();
  }

  backButton() {
    this.viewCtrl.dismiss();
  }

}
