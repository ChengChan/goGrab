import { Component } from '@angular/core';
import { Http } from '@angular/http'
import { IonicPage, NavController, NavParams, AlertController, ToastController, ViewController } from 'ionic-angular';
import { FormBuilder } from '@angular/forms';
import { UtilityService } from '../../app/utility.service';
import { Camera, CameraOptions } from '@ionic-native/camera';

import 'rxjs/add/operator/map';

@IonicPage()
@Component({
  selector: 'page-funds-create',
  templateUrl: 'funds-create.html',
})
export class FundsCreatePage {
	fund = {};
  funds = [];
	amount : any;
  profiles = [];
  cash_wallet: any;

  constructor(public navCtrl: NavController, 
  	public navParams: NavParams,
  	public http: Http,
    public alertCtrl: AlertController,
    public builder: FormBuilder,
    public toastCtrl: ToastController,
    private viewCtrl: ViewController,
    private camera: Camera,
    public util: UtilityService) {

    this.loadData();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad FundsCreatePage');
  }

  loadData() {
    let url = '/viewProfile';
    let data = new FormData();

    data.append('aut','grabber');

    this.util.httpRequestPostMethod(url, data)
    .subscribe(
      profile => {
        this.profiles = profile.data;
        this.cash_wallet = profile.data.cash_wallet;

        console.log(this.profiles) }, 
      error => { 
        this.util.showToast(error.statusText); 

        console.log(error); },
      () => console.log('Profiles Response Complete')
    );
  }

  onSubmit() {
    let url = '/createFunding';
  	let data = new FormData();

   	data.append('aut','grabber');
   	data.append('amount', this.amount);

    return this.http.post(url, data)
	  .subscribe(
	  	data => {
        console.log(data) }, 
	  	error => { 
        this.util.showToast(error.statusText); 

        console.log(error); }
	  );
  }

  cancelButton() {
    this.viewCtrl.dismiss();
  }

  add() {
    let prompt = this.alertCtrl.create({
      title: 'Fund',
      message: "A",
      inputs: [
        {
          name: 'title',
          placeholder: 'Title'
        },
      ],
      buttons: [
        {
          text: 'Cancel',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Save',
          handler: data => {
            'ads'
          }
        }
      ]
    });
    prompt.present();
  }

  logForm() {	
  	console.log(this.fund)
  }

}
