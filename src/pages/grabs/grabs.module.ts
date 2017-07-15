import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { GrabsPage } from './grabs';

@NgModule({
  declarations: [
    GrabsPage,
  ],
  imports: [
    IonicPageModule.forChild(GrabsPage),
  ],
  exports: [
    GrabsPage
  ]
})
export class GrabsPageModule {}
