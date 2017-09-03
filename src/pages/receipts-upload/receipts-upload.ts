import { Component } from '@angular/core';
import { Http } from '@angular/http'
import { IonicPage, NavController, NavParams, AlertController, ToastController, ViewController, Platform, ActionSheetController, LoadingController, PopoverController } from 'ionic-angular';
import { FormBuilder } from '@angular/forms';

import { UtilityService } from '../../app/utility.service';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { ActionSheet } from '@ionic-native/action-sheet';
import { MenuSettingsPage } from '../menu-settings/menu-settings';
import 'rxjs/add/operator/map';

@IonicPage()
@Component({
  selector: 'page-receipts-upload',
  templateUrl: 'receipts-upload.html',
})
export class ReceiptsUploadPage {

	imageURI: any;

  constructor(public navCtrl: NavController, 
  	public navParams: NavParams,
  	public http: Http,
    public alertCtrl: AlertController,
    public builder: FormBuilder,
    public toastCtrl: ToastController,
    private viewCtrl: ViewController,
    private camera: Camera,
    private actionSheet: ActionSheet,
    public platform: Platform,
    private actionSheetCtrl: ActionSheetController,
    public util: UtilityService,
    public loadingCtrl: LoadingController,
    public popoverCtrl: PopoverController) {
  }

    presentPopover(myEvent) {
    let popover = this.popoverCtrl.create(MenuSettingsPage);

    popover.present({
      ev: myEvent
    });
  }

  backButton() {
    this.viewCtrl.dismiss();
  }

  cancelButton() {
    this.viewCtrl.dismiss();
  }

  public uploadOptions() {
    let actionSheet = this.actionSheetCtrl.create({
      title: 'Select Image Source',
      buttons: [
        {
          text: 'Load from Library',
          handler: () => {
            this.capture(this.camera.PictureSourceType.PHOTOLIBRARY);
          }
        },
        {
          text: 'Use Camera',
          handler: () => {
            this.capture(this.camera.PictureSourceType.CAMERA);
          }
        },
        {
          text: 'Cancel',
          role: 'cancel'
        }
      ]
    });
    actionSheet.present();
  }

  public capture(pictureSourceType) {
    const cameraOptions: CameraOptions = {
      quality: 100,
      sourceType: pictureSourceType,
      destinationType: this.camera.DestinationType.NATIVE_URI,
      encodingType: this.camera.EncodingType.PNG,
      mediaType: this.camera.MediaType.PICTURE,
      saveToPhotoAlbum: true,
      correctOrientation: true
    }

    this.camera.getPicture(cameraOptions).then((imageData) => {
      this.imageURI = imageData;
      alert(this.imageURI)
    }, (err) => {
      this.util.showToast('Error while selecting image.' + err);
    });

    return this.imageURI;
  }

  fileUpload(event) {
    this.imageURI = event.srcElement.files[0];

    console.log(event.srcElement.files[0].name);
    console.log(event.target);
  }

  // public upload() {
  //   const transfer: FileTransferObject = this.fileTransfer.create();
  //   let url = '/uploadReceipt';
  //   let fileUploadOptions: FileUploadOptions = {
  //     fileKey: 'file',
  //     mimeType: 'image/jpeg',
  //     chunkedMode: false,
  //     httpMethod: 'POST',
  //     fileName: this.imageURI.lastIndexOf('/') + 1,
  //     params: { 
  //       'aut': this.util.getUserGrabber(),
  //       'id': '3',
  //       'receipt': this.imageURI
  //     }
  //   }

  //   transfer.upload(this.imageURI, url, fileUploadOptions)
  //   .then((data) => {
  //     this.util.showToast('sucess'+ data);
  //     alert(data);
  //   }, (err) => {
  //      alert(JSON.stringify(err));
  //     // this.util.showToast('error: '+ JSON.stringify(err));

  //   })
    
  // }

  uploadReceipt(id: string) {
    let url = '/uploadReceipt';
    let formData = new FormData();
    let fund_id = this.navParams.data; // Get fund_id from Funds.html

    formData.append('aut', this.util.getUserGrabber());
    formData.append('id', fund_id);
    formData.append('receipt', this.imageURI, this.imageURI.name);

    this.util.httpRequestPostMethod(url, formData)
    .subscribe(
      data => {
        if(data.status < 1) {
          this.util.showToast(data.msg);
          console.log(data)
        } else {
          this.util.showToast('Image was uploaded successfully'); 
        }
        console.log(data);
      }, 
      error => { 
        this.util.showToast(error.statusText); 
        console.log(error); 
      }
    );
  }
}
