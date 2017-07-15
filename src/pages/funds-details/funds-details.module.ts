import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { FundsDetailsPage } from './funds-details';

@NgModule({
  declarations: [
    FundsDetailsPage,
  ],
  imports: [
    IonicPageModule.forChild(FundsDetailsPage),
  ],
  exports: [
    FundsDetailsPage
  ]
})
export class FundsDetailsPageModule {}
