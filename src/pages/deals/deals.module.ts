import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { Deals } from './deals';

@NgModule({
  declarations: [
    Deals,
  ],
  imports: [
    IonicPageModule.forChild(Deals),
  ],
  exports: [
    Deals
  ]
})
export class DealsModule {}
