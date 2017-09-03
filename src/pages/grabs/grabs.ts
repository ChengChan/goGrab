import { Component } from '@angular/core';
import { Http } from '@angular/http'
import { IonicPage, NavController, NavParams, AlertController, ToastController, LoadingController } from 'ionic-angular';
import { UtilityService } from '../../app/utility.service';
import 'rxjs/add/operator/map';

@IonicPage()
@Component({
  selector: 'page-grabs',
  templateUrl: 'grabs.html',
})
export class GrabsPage {

	grabs = [];

  constructor(public navCtrl: NavController, 
  	public navParams: NavParams, 
  	public http: Http,
    public alertCtrl: AlertController,
    public toastCtrl: ToastController,
    public util: UtilityService,
    public loadingCtrl: LoadingController) {

    this.loadData();
  }

  loadData() {
    let url = '/getAllGrabRequest';
    let loading = this.loadingCtrl.create({
      content: 'Loading Please Wait...'
    });

  	let formData = new FormData();
   	formData.append('aut', this.util.getUserGrabber());

    this.util.httpRequestPostMethod(url, formData)
	  .subscribe(
      grab => { 
        this.grabs = grab.formData; 
        console.log(grab);
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
    setTimeout(() => {
      infiniteScroll.complete();
    }, 500);
  }

}
