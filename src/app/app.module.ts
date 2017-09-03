import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { CloudSettings, CloudModule } from '@ionic/cloud-angular';
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { LoginPage } from '../pages/login/login';
import { Deals } from  '../pages/deals/deals';
import { DealsUngrabPage } from '../pages/deals-ungrab/deals-ungrab';
import { ProfilesUpdatePage } from '../pages/profiles-update/profiles-update';
import { DealsCreatePage } from  '../pages/deals-create/deals-create'; 
import { FundsPage } from  '../pages/funds/funds';
import { FundsCreatePage } from  '../pages/funds-create/funds-create';
import { WithdrawsPage } from  '../pages/withdraws/withdraws';
import { WithdrawsCreatePage } from  '../pages/withdraws-create/withdraws-create'; 
import { GrabsPage } from  '../pages/grabs/grabs';
import { MenuSettingsPage } from '../pages/menu-settings/menu-settings';
import { SettingsPage } from '../pages/settings/settings';
import { BankInfoUpdatePage } from '../pages/bank-info-update/bank-info-update';
import { PersonalInfoUpdatePage } from '../pages/personal-info-update/personal-info-update';
import { ReceiptsUploadPage } from '../pages/receipts-upload/receipts-upload';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Network } from '@ionic-native/network';
import { File } from '@ionic-native/file';
import { FileTransfer } from '@ionic-native/file-transfer';
import { FilePath } from '@ionic-native/file-path';
import { Camera } from '@ionic-native/camera';
import { ActionSheet } from '@ionic-native/action-sheet';
import { HttpModule } from '@angular/http';
import { UtilityService } from './utility.service';
import { SampleServiceProvider } from '../providers/sample-service/sample-service';
import {Push, PushObject, PushOptions} from "@ionic-native/push";

const cloudSettings: CloudSettings = {
  'core': {
    'app_id': '8fb63bc4'
  },
  'push': {
    'sender_id': '372525186047',
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
};

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    LoginPage,
    Deals,
    DealsCreatePage,
    DealsUngrabPage,
    ProfilesUpdatePage,
    FundsPage,
    FundsCreatePage,
    WithdrawsPage,
    WithdrawsCreatePage,
    GrabsPage,
    MenuSettingsPage,
    SettingsPage,
    BankInfoUpdatePage,
    PersonalInfoUpdatePage,
    ReceiptsUploadPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp, {
      mode: 'ios'
    }),
    CloudModule.forRoot(cloudSettings),
    HttpModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    LoginPage,
    Deals,
    DealsCreatePage,
    DealsUngrabPage,
    ProfilesUpdatePage,
    FundsPage,
    FundsCreatePage,
    WithdrawsPage,
    WithdrawsCreatePage,
    GrabsPage,
    MenuSettingsPage,
    SettingsPage,
    BankInfoUpdatePage,
    PersonalInfoUpdatePage,
    ReceiptsUploadPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    UtilityService,
    Network,
    File,
    Push,
    FileTransfer,
    Camera,
    FilePath,
    ActionSheet,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    SampleServiceProvider
  ]
})
export class AppModule {}
