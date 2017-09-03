import { Component } from '@angular/core';
import { Network } from '@ionic-native/network';
import { Platform, AlertController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { LoginPage } from '../pages/login/login';
import {Push, PushObject, PushOptions} from "@ionic-native/push";

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  // Set landing page, previosuly is TabsPage
  rootPage:any = LoginPage;

  constructor(public platform: Platform, 
    public statusBar: StatusBar, 
    public splashScreen: SplashScreen,
    public network: Network,
    public push: Push,
    public alertCtrl: AlertController) {

    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.overlaysWebView(false);
      statusBar.styleDefault();
      splashScreen.hide();
    });
  }

  initPushNotification() {
    if (!this.platform.is('cordova')) {
      console.warn("Push notifications not initialized. Cordova is not available - Run in physical device");
      return;
    }
    const options: PushOptions = {
      android: {
        senderID: "883847118563"
      }
    };
    const pushObject: PushObject = this.push.init(options);

    pushObject.on('registration').subscribe((data: any) => {
      console.log("device token ->", data.registrationId);

      let alert = this.alertCtrl.create({
                  title: 'device token',
                  subTitle: data.registrationId,
                  buttons: ['OK']
                });
                alert.present();

    });

    pushObject.on('notification').subscribe((data: any) => {
      console.log('message', data.message);
      //if user using app and push notification comes
      if (data.additionalData.foreground) {
        // if application open, show popup
        let confirmAlert = this.alertCtrl.create({
          title: 'New Notification',
          message: data.message,
          buttons: [{
            text: 'Ignore',
            role: 'cancel'
          }, {
            text: 'View',
            handler: () => {
              //TODO: Your logic here
            //  this.nav.push(DetailsPage, {message: data.message});
            }
          }]
        });
        confirmAlert.present();
      } else {
        //if user NOT using app and push notification comes
        //TODO: Your logic on click of push notification directly
      //  this.nav.push(DetailsPage, {message: data.message})
      let alert = this.alertCtrl.create({
                  title: 'clicked on',
                  subTitle: "you clicked on the notification!",
                 buttons: ['OK']
                });
                alert.present();
        console.log("Push notification clicked");
      }
    });

    pushObject.on('error').subscribe(error => console.error('Error with Push plugin', error));
  }
}
