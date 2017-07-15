import { Component } from '@angular/core';
import { Http } from '@angular/http'
import { IonicPage, NavController, NavParams, AlertController, ToastController, ViewController } from 'ionic-angular';
import { FormBuilder } from '@angular/forms';
import 'rxjs/add/operator/map';
import { UtilityService } from '../../app/utility.service';

@IonicPage()
@Component({
  selector: 'page-deals-create',
  templateUrl: 'deals-create.html',
})
export class DealsCreatePage {
  deal = {}
  products = [];
	product_id : any;
	color : any;
	tenure : any;
	cost : any;
	margin : any;
	deposit_amount : any;

  constructor(public navCtrl: NavController, 
  	public navParams: NavParams,
  	public http: Http,
    public alertCtrl: AlertController,
    public builder: FormBuilder,
    public toastCtrl: ToastController,
    private viewCtrl: ViewController,
    public util: UtilityService) {

    this.getProducts();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DealsCreatePage');
  }

  onSubmit() {
    let url = '/createSales';
  	let formData = new FormData();

   	formData.append('aut','maker');
   	formData.append('product_id', this.product_id);
   	formData.append('color', this.color);
   	formData.append('tenure', this.tenure);
   	formData.append('cost', this.cost);
   	formData.append('margin', this.margin);
   	formData.append('deposit_amount', this.deposit_amount);

    this.util.httpRequestPostMethod(url, formData)
	  .subscribe(
	  	data => { 
        if(data.status < 1) {
          this.util.showToast(data.msg);
        } else {
          this.util.showToast('Deal was added successfully');
        }
        
        console.log(data) 
      }, 
	  	error => { 
        this.util.showToast(error.statusText); 
        console.log(error)
      }
	  );
  }

  getProducts() {
    let url = '/getProductList';
    let formData = new FormData();
    
    formData.append('aut','maker');

    this.util.httpRequestPostMethod(url, formData)
    .subscribe(
      product => { 
        this.products = product.data; 
        console.log(product)
      }, 
      error => { 
        this.util.showToast(error.statusText); 
        console.log(error)
      }
    );
  }

  backButton() {
    this.viewCtrl.dismiss();
  }s
}