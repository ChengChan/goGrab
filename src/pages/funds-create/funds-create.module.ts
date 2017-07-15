import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { FundsCreatePage } from './funds-create';

@NgModule({
  declarations: [
    FundsCreatePage,
  ],
  imports: [
    IonicPageModule.forChild(FundsCreatePage),
  ],
  exports: [
    FundsCreatePage
  ]
})
export class FundsCreatePageModule {}
