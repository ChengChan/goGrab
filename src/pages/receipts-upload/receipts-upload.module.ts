import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ReceiptsUploadPage } from './receipts-upload';

@NgModule({
  declarations: [
    ReceiptsUploadPage,
  ],
  imports: [
    IonicPageModule.forChild(ReceiptsUploadPage),
  ],
  exports: [
    ReceiptsUploadPage
  ]
})
export class ReceiptsUploadPageModule {}
