import { Component } from '@angular/core';
import { Http } from '@angular/http'
import { IonicPage, NavController, NavParams, AlertController, ToastController } from 'ionic-angular';
import { FormBuilder } from '@angular/forms';
import 'rxjs/add/operator/map';

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
    public toastCtrl: ToastController) {

    this.loadData();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad WithdrawsCreatePage');
  }

  loadData() {
    let data = new FormData();
    data.append('aut','grabber');

    return this.http.post('https://gocapi.com/mg/business/viewProfile', data)
    .map(res => res.json())
    .subscribe(
      profile => {
        this.profiles = profile.data;
        this.cash_wallet = profile.data.cash_wallet;

        console.log(this.profiles) }, 
      error => { this.showToast(error.statusText); console.log(error); },
      () => console.log('Profiles Response Complete')
    );
  }

  onSubmit() {
  	let data = new FormData();
   	data.append('aut','grabber');
   	data.append('amount', this.amount);

    return this.http.post('https://gocapi.com/mg/business/createWithdrawalRequest', data)
    .map(res => res.json())
	  .subscribe(
	  	data => {
        if(data.status < 1) {
          this.showToast(data.msg);
          console.log(data)
        } else {
          this.showToast('Fund was successfully'); 
        }
        
        console.log(data) }, 
	  	error => { this.showToast(error.statusText); console.log(error); }
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

  logForm() {	
  	console.log(this.withdraw)
  }

}
