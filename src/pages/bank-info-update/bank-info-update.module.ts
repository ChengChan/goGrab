import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { BankInfoUpdatePage } from './bank-info-update';

@NgModule({
  declarations: [
    BankInfoUpdatePage,
  ],
  imports: [
    IonicPageModule.forChild(BankInfoUpdatePage),
  ],
  exports: [
    BankInfoUpdatePage
  ]
})
export class BankInfoUpdatePageModule {}
