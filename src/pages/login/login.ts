import { Component } from '@angular/core';
import { NavController, ToastController, AlertController } from 'ionic-angular';
import { HomePage } from '../home/home';
import { FormBuilder, Validators } from '@angular/forms';
import { Deals } from '../deals/deals';

@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {
	
	public loginForm: any;

  constructor(public navCtrl: NavController,
    public toastCtrl: ToastController,
    public alertCtrl: AlertController,
    public formBuilder: FormBuilder) {

    this.loginForm = formBuilder.group({
    	username: ["", Validators.required],
    	password: ["", Validators.required]
    })

  }

  doLogin() {
    this.navCtrl.setRoot(Deals);
  }

  doLogin2() {
    this.navCtrl.setRoot(HomePage);
  }
}
