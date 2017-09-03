import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { SettingsPage } from '../settings/settings';
import { BankInfoUpdatePage } from '../bank-info-update/bank-info-update';
import { PersonalInfoUpdatePage } from '../personal-info-update/personal-info-update';

@IonicPage()
@Component({
  selector: 'page-menu-settings',
  templateUrl: 'menu-settings.html',
})
export class MenuSettingsPage {

  constructor(public navCtrl: NavController, 
  	public navParams: NavParams) {
  }

  updateBankInfo() {
  	this.navCtrl.push(BankInfoUpdatePage);
  }

  updatePersonalInfo() {
  	this.navCtrl.push(PersonalInfoUpdatePage);
  }

  settings() {
  	this.navCtrl.push(SettingsPage);
  }
}
