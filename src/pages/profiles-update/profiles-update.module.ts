import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ProfilesUpdatePage } from './profiles-update';

@NgModule({
  declarations: [
    ProfilesUpdatePage,
  ],
  imports: [
    IonicPageModule.forChild(ProfilesUpdatePage),
  ],
  exports: [
    ProfilesUpdatePage
  ]
})
export class ProfilesUpdatePageModule {}
