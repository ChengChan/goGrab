import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { WithdrawsPage } from './withdraws';

@NgModule({
  declarations: [
    WithdrawsPage,
  ],
  imports: [
    IonicPageModule.forChild(WithdrawsPage),
  ],
  exports: [
    WithdrawsPage
  ]
})
export class WithdrawsPageModule {}
