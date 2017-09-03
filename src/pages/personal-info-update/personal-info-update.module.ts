import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PersonalInfoUpdatePage } from './personal-info-update';

@NgModule({
  declarations: [
    PersonalInfoUpdatePage,
  ],
  imports: [
    IonicPageModule.forChild(PersonalInfoUpdatePage),
  ],
  exports: [
    PersonalInfoUpdatePage
  ]
})
export class PersonalInfoUpdatePageModule {}
