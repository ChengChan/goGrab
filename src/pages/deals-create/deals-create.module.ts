import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DealsCreatePage } from './deals-create';

@NgModule({
  declarations: [
    DealsCreatePage,
  ],
  imports: [
    IonicPageModule.forChild(DealsCreatePage),
  ],
  exports: [
    DealsCreatePage
  ]
})
export class DealsCreatePageModule {}
