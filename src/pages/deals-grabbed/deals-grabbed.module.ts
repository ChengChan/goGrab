import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DealsGrabbed } from './deals-grabbed';

@NgModule({
  declarations: [
    DealsGrabbed,
  ],
  imports: [
    IonicPageModule.forChild(DealsGrabbed),
  ],
  exports: [
    DealsGrabbed
  ]
})
export class DealsGrabbedModule {}
