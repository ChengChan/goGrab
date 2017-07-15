import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
//import { CloudSettings, CloudModule } from '@ionic/cloud-angular';
import { MyApp } from './app.component';

import { AboutPage } from '../pages/about/about';
import { ContactPage } from '../pages/contact/contact';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';
import { LoginPage } from '../pages/login/login';
import { Deals } from  '../pages/deals/deals';
import { DealsUngrabPage } from '../pages/deals-ungrab/deals-ungrab';
import { ProfilesUpdatePage } from '../pages/profiles-update/profiles-update';
import { DealsCreatePage } from  '../pages/deals-create/deals-create'; 
import { FundsPage } from  '../pages/funds/funds';  FundsCreatePage
import { FundsCreatePage } from  '../pages/funds-create/funds-create';
import { WithdrawsPage } from  '../pages/withdraws/withdraws';
import { WithdrawsCreatePage } from  '../pages/withdraws-create/withdraws-create'; 
import { GrabsPage } from  '../pages/grabs/grabs';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Network } from '@ionic-native/network';
import { Camera } from '@ionic-native/camera';

import { HttpModule } from '@angular/http';

import { UtilityService } from './utility.service';

/*const cloudSettings: CloudSettings = {
  'core': {
    'app_id': 'APP_ID'
  },
  'push': {
    'sender_id': 'SENDER_ID',
    'pluginConfig': {
      'ios': {
        'badge': true,
        'sound': true
      },
      'android': {
        'iconColor': '#343434'
      }
    }
  }
};*/

@NgModule({
  declarations: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    TabsPage,
    LoginPage,
    Deals,
    DealsCreatePage,
    DealsUngrabPage,
    ProfilesUpdatePage,
    FundsPage,
    FundsCreatePage,
    WithdrawsPage,
    WithdrawsCreatePage,
    GrabsPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    HttpModule,
    //CloudModule.forRoot(cloudSettings)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    TabsPage,
    LoginPage,
    Deals,
    DealsCreatePage,
    DealsUngrabPage,
    ProfilesUpdatePage,
    FundsPage,
    FundsCreatePage,
    WithdrawsPage,
    WithdrawsCreatePage,
    GrabsPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    UtilityService,
    Network,
    Camera,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
