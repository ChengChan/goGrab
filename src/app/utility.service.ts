import { Injectable } from '@angular/core';
import { Http } from '@angular/http'
import { ToastController, LoadingController } from 'ionic-angular';
import 'rxjs/add/operator/map';

@Injectable()
export class UtilityService {

  data = [];

	constructor(private http: Http,
		private toastCtrl: ToastController,
    public loadingCtrl: LoadingController) {

  }

	httpRequestPostMethod(url, formData){
		let base_url = 'https://gocapi.com/mg/business';

    return this.http.post(base_url + url, formData)
    .map(res => res.json());
	}

  showToast(msg: string) {
    let toast = this.toastCtrl.create({
      message: msg,
      duration: 3000,
      position: 'bottom'
    });

    toast.onDidDismiss(() => {
      console.log('Dismissed toast');
    });

    toast.present();
  }
  
}