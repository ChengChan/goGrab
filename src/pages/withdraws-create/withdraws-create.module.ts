import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { WithdrawsCreatePage } from './withdraws-create';

@NgModule({
  declarations: [
    WithdrawsCreatePage,
  ],
  imports: [
    IonicPageModule.forChild(WithdrawsCreatePage),
  ],
  exports: [
    WithdrawsCreatePage
  ]
})
export class WithdrawsCreatePageModule {}
