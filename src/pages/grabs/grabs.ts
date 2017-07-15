import { Component } from '@angular/core';
import { Http } from '@angular/http'
import { IonicPage, NavController, NavParams, AlertController, ToastController } from 'ionic-angular';
import 'rxjs/add/operator/map';


/**
 * Generated class for the GrabsPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
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
    public toastCtrl: ToastController) {

    this.loadData();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad GrabsPage');
  }

  loadData() {
  	let data = new FormData();
   	data.append('aut','grabber');

    return this.http.post('https://gocapi.com/mg/business/getAllGrabRequest', data)
	  .map(res => res.json())
	  .subscribe(
      grab => { this.grabs = grab.data; console.log(grab) }, 
      error => { this.showToast(error.statusText); console.log(error); },
      () => console.log('Grabs Response Complete')
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

  doInfinite(infiniteScroll) {
    setTimeout(() => {
      infiniteScroll.complete();
    }, 500);
  }

}
