import { Injectable } from '@angular/core';
import { Http } from '@angular/http'
import { ToastController, LoadingController, AlertController } from 'ionic-angular';
import 'rxjs/add/operator/map';

@Injectable()
export class UtilityService {
  api_endpoint: string = 'https://gocapi.com/mg/business';
  user_maker: string = "maker";
  user_grabber: string = "grabber";

  data = [];

	constructor(private http: Http,
		private toastCtrl: ToastController,
    public loadingCtrl: LoadingController,
    public alertCtrl: AlertController) { }

  createAuthHeader() {
    // Add token
    let formData = new FormData();
    formData.append('Authorization', window.localStorage.getItem('token')); // How local storage works?
  }

	public httpRequestPostMethod(url: string, formData){
    return this.http.post(this.api_endpoint + url, formData)
    .timeout(2000)
    .map(res => res.json());
	}

  public showToast(message: string) {
    let toast = this.toastCtrl.create({
      message: message,
      duration: 3000,
      position: 'bottom'
    });

    toast.onDidDismiss(() => {
      console.log('Dismissed toast');
    });

    toast.present();
  }

  public showAlert(title: string, message: string) {
    let alert = this.alertCtrl.create({
      title: title,
      message: message,
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Yes',
          handler: () => {
          console.log();
            
          }
        }
      ]
    });
    alert.present();
  }

  getUserMaker() {
    return this.user_maker;
  }

  getUserGrabber() {
    return this.user_grabber;
  }

  

  alertConnectionStatus(connectionStatus: string) {
    let alert = this.alertCtrl.create({
      title: 'You are ' + connectionStatus,
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Yes',
          handler: () => {
          console.log();
            
          }
        }
      ]
    });
    alert.present();
  }
}