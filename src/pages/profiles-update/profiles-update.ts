import { Component } from '@angular/core';
import { Http } from '@angular/http'
import { IonicPage, NavController, NavParams, AlertController, ToastController } from 'ionic-angular';
import 'rxjs/add/operator/map';

@IonicPage()
@Component({
  selector: 'page-profiles-update',
  templateUrl: 'profiles-update.html',
})
export class ProfilesUpdatePage {
  profiles = [];
  fname: any;
  bank_account_name: any;
  bank_account_number: any;
  bank_name: any;

 	constructor(public navCtrl: NavController, 
  	public navParams: NavParams, 
  	public http: Http,
    public alertCtrl: AlertController,
    public toastCtrl: ToastController) {

   	this.loadData();
	}

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProfileUpdatePage');
  }

  loadData() {
  	let data = new FormData();
   	data.append('aut','grabber');

  	return this.http.post('https://gocapi.com/mg/business/viewProfile', data)
  	.map(res => res.json())
    .subscribe(
      profile => { 
        this.profiles = profile.data;
        this.fname = profile.data.fname;
        this.bank_account_name = profile.data.bank_account_name;
        this.bank_account_number = profile.data.bank_account_number;
        this.bank_name = profile.data.bank_name;

        console.log(this.profiles) }, 
      error => { this.showToast(error.statusText); console.log(error); },
      () => console.log('Profiles Response Complete')
    );
  }

  onSubmit() {
    let data = new FormData();
    data.append('aut','grabber');
    data.append('fname', this.fname);
    data.append('bank_account_name', this.bank_account_name);
    data.append('bank_account_number', this.bank_account_number);
    data.append('bank_name', this.bank_name);

    return this.http.post('https://gocapi.com/mg/business/updateProfile', data)
    .map(res => res.json())
    .subscribe(
      data => {
        if(data.status < 1) {
          this.showToast(data.msg);
        } else {
          this.showToast('Profile was update successfully'); 
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

}