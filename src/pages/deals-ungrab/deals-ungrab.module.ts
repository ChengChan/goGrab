import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DealsUngrabPage } from './deals-ungrab';

@NgModule({
  declarations: [
    DealsUngrabPage,
  ],
  imports: [
    IonicPageModule.forChild(DealsUngrabPage),
  ],
  exports: [
    DealsUngrabPage
  ]
})
export class DealsUngrabPageModule {}
