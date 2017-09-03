import { Component } from '@angular/core';
import { Http } from '@angular/http'
import { IonicPage, NavController, NavParams, AlertController, ToastController, LoadingController, PopoverController, ViewController } from 'ionic-angular';
import { UtilityService } from '../../app/utility.service';
import { MenuSettingsPage } from '../menu-settings/menu-settings';
import 'rxjs/add/operator/map';


@IonicPage()
@Component({
  selector: 'page-settings',
  templateUrl: 'settings.html',
})
export class SettingsPage {

  constructor(public navCtrl: NavController, 
  	public navParams: NavParams, 
  	public http: Http,
    public alertCtrl: AlertController,
    public toastCtrl: ToastController,
    public util: UtilityService,
    public loadingCtrl: LoadingController,
    public popoverCtrl: PopoverController,
    private viewCtrl: ViewController) {

	}

	presentPopover(myEvent) {
    let popover = this.popoverCtrl.create(MenuSettingsPage);

    popover.present({
      ev: myEvent
    });
  }

  backButton() {
    this.viewCtrl.dismiss();
  }

}
