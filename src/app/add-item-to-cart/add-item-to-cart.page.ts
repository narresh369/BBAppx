import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, NavigationExtras } from '@angular/router';
import { MasterdetailService } from '../services/masterdetail.service';
import { LoadingController, AlertController, Platform, ToastController } from '@ionic/angular';
import { Toast } from '@ionic-native/toast/ngx';

@Component({
  selector: 'app-add-item-to-cart',
  templateUrl: './add-item-to-cart.page.html',
  styleUrls: ['./add-item-to-cart.page.scss'],
})
export class AddItemToCartPage implements OnInit {

  dispTotalAmt:number;
  public cartempty;
  qtyx:number = 1;
  amtx:number = 0;
  cartItemsx: any[] = [];
  cartItemsToDBx: any[] = [];

  public paramsDataSpecial;
  itemdetails: any = {
    title: '',
    cover: ''
  }
  displayItems: any[] = [];

  constructor(
    private masterDetailService:MasterdetailService,
    private router: Router,
    private route: ActivatedRoute,
    private toastCtrl: ToastController,
    private toast: Toast
  ) { 
    
    this.route.queryParams.subscribe(params => {
      if (params && params.special) {
        this.paramsDataSpecial = JSON.parse(params.special);
        //console.log('add to cart ---> ITEM DETAILS FROM PARAMS :: ' + JSON.stringify(this.paramsDataSpecial));
         this.itemdetails = this.paramsDataSpecial.item;     
          if(this.qtyx === 1){
            this.amtx = this.itemdetails.rate;
            //this.dispTotalAmt = Number(this.itemdetails.rate) - (Number(this.itemdetails.rate) * Number(this.itemdetails.discount)/100);
            //----------------------------------------------------------------------------
            let aa = Number(this.itemdetails.rate) * Number(this.itemdetails.discount)/100;
            let bb = Number(this.itemdetails.rate) - (aa);
            this.dispTotalAmt = bb * this.qtyx;
            //----------------------------------------------------------------------------
            }
          }
        });        
       
        //----------------------------------------------
        this.cartItemsToDBx = this.masterDetailService.getDestn();
        if(this.cartItemsToDBx === undefined){
          this.cartItemsToDBx = [];
          this.qtyx = 1;
        }
        console.log('----- constructor value from masterDetailService SERVICE -------->' + JSON.stringify(this.cartItemsToDBx));
        //----------------------------------------------
  }//constructor ends

  ngOnInit() {     
  }

  ionViewDidEnter(){
     //------------------------------------------
     this.cartempty = this.masterDetailService.getDestn();
     if(this.cartempty != undefined){
      console.log('ADD-ITEM-TO-CART PAGE this.cartempty :: '+this.cartempty.cartempty);
      if(this.cartempty.cartempty){
       this.cartItemsToDBx = [];
       this.qtyx = 1;
      }
     }
   
     
     //------------------------------------------
  }

  incrementQty(itemdetails){
    if(this.qtyx < 1){     
      return;
    }else{
      this.qtyx = this.qtyx + 1;
      this.amtx = this.itemdetails.rate * this.qtyx;
      //this.dispTotalAmt = Number(this.itemdetails.rate) + (Number(this.itemdetails.rate) * Number(this.itemdetails.discount)/100);
        //----------------------------------------------------------------------------
        let aa = Number(this.itemdetails.rate) * Number(this.itemdetails.discount)/100;
        let bb = Number(this.itemdetails.rate) - (aa);
        this.dispTotalAmt = bb * this.qtyx;
        //----------------------------------------------------------------------------
      //-----------------------------------------------
      this.cartItemsx = [];
      this.cartItemsx.push({"name":this.itemdetails.name,
      "image":this.itemdetails.image,
      "imgFlg":this.itemdetails.imgFlg,
      "rate":this.itemdetails.rate,
      "oldrate":this.itemdetails.oldrate,
      "qty":this.itemdetails.qty,
      "description":this.itemdetails.description,
      "amtx":this.amtx,
      "qtyx":this.qtyx
      });
      //-----------------------------------------------
      //console.log('incrementQty cartItemsx :: '+ JSON.stringify(this.cartItemsx));
    }    
  }

  decrementQty(itemdetails){
    if(this.qtyx === 1){     
        //-----------------------------------------------
        this.cartItemsx = [];
        this.cartItemsx.push({"name":this.itemdetails.name,
        "image":this.itemdetails.image,
        "imgFlg":this.itemdetails.imgFlg,
        "rate":this.itemdetails.rate,
        "oldrate":this.itemdetails.oldrate,
        "qty":this.itemdetails.qty,
        "description":this.itemdetails.description,
        "amtx":this.itemdetails.rate,
        "qtyx":1
        });
        //-----------------------------------------------
        //console.log('decrementQty cartItemsx :: '+ JSON.stringify(this.cartItemsx));
      return;
    }else{
      this.qtyx = this.qtyx - 1;
      this.amtx = this.itemdetails.rate * this.qtyx;
      //----------------------------------------------------------------------------
      let aa = Number(this.itemdetails.rate) * Number(this.itemdetails.discount)/100;
      let bb = Number(this.itemdetails.rate) - (aa);
      //this.dispTotalAmt = bb * this.qtyx;
      this.dispTotalAmt = bb * this.qtyx;
      //----------------------------------------------------------------------------
      //-----------------------------------------------
       this.cartItemsx = [];
       this.cartItemsx.push({"name":this.itemdetails.name,
       "image":this.itemdetails.image,
       "imgFlg":this.itemdetails.imgFlg,
       "rate":this.itemdetails.rate,
       "oldrate":this.itemdetails.oldrate,
       "qty":this.itemdetails.qty,
       "description":this.itemdetails.description,
       "amtx":this.amtx,
       "qtyx":this.qtyx
       });
       //-----------------------------------------------   
       //console.log('decrementQty cartItemsx :: '+ JSON.stringify(this.cartItemsx));    
    }    
  }


  addToCart(itemdetails){    
    //----------------------------------------
    //before pushing the item..check if it is available in the setDest value...if there ...remove it and then add this value...
    console.log('this.cartItemsToDBx LENGTH BEFORE....'+ this.cartItemsToDBx.length);
    if(this.cartItemsToDBx === undefined || this.cartItemsToDBx.length === 0){
        console.log('ARRAY IS EMPTY...');
    }else{
      for(let i=0;i<this.cartItemsToDBx.length;i++){
        console.log(this.cartItemsToDBx[i].name);
        if(this.cartItemsToDBx[i].name === this.itemdetails.name){
          console.log('REMOVING ITEM :: '+this.cartItemsToDBx[i].name);
          this.cartItemsToDBx.splice(i);
          break;
        }
      }
      console.log('this.cartItemsToDBx LENGTH AFTER....'+ this.cartItemsToDBx.length);
    }
    //----------------------------------------

    this.cartItemsToDBx.push({"name":this.itemdetails.name,
    "image":this.itemdetails.image,
    "imgFlg":this.itemdetails.imgFlg,
    "rate":this.itemdetails.rate,
    "oldrate":this.itemdetails.oldrate,
    "qty":this.itemdetails.qty,
    "description":this.itemdetails.description,
    "amtx":this.amtx,
    "qtyx":this.qtyx,
    "discount":this.itemdetails.discount
    });    
    this.masterDetailService.setDestn(this.cartItemsToDBx);        
  }

  gotoBillCartList(cartItemsToDBx){
    if(cartItemsToDBx.length === 0){
      console.log('CART EMPTY');
      //this.showToast(`You are now ${connectionState}`);
      this.showToastx('Cart cannot be Empty!');

      return;
    }
    console.log('gotoBillCartList -----------> cartItemsToDBx :: '+JSON.stringify(cartItemsToDBx));
    let params = { "cartitems": cartItemsToDBx };
    let navigationExtras: NavigationExtras = {
      queryParams: {
        special: JSON.stringify(params)
      }
    };
    this.router.navigate(['bill-cart-list'], navigationExtras);
  }

  showToast(msg) {
    this.toastCtrl.create({
      message: msg,
      duration: 2000
    }).then(toast => toast.present());
  }

  showToastx(msg){
    //this.toast.show(`I'm a toast`, '5000', 'center').subscribe(
      this.toast.show(msg, '5000', 'center').subscribe(
      toast => {
        console.log(toast);
      }
    );
  }

}
