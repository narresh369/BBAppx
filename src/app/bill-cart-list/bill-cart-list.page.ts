import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, NavigationExtras } from '@angular/router';
import { MasterdetailService } from '../services/masterdetail.service';
import { ViewEncapsulation } from '@angular/core';
import { OrdersxService } from '../shared/ordersx.service';
import { OrdersxModel } from '../shared/OrdersxModel';

export interface Data {
  "name":string,
  "image":string,
  "imgFlg":string,
  "rate":string,
  "oldrate":string,
  "qty":string,
  "description":string,
  "amtx":string,
  "qtyx":number
}

@Component({
  selector: 'app-bill-cart-list',
  templateUrl: './bill-cart-list.page.html',
  styleUrls: ['./bill-cart-list.page.scss'],
  encapsulation: ViewEncapsulation.None
})
export class BillCartListPage implements OnInit {

  Ordersx = [];

  public data: Data;
  public columns: any;
  public rows: any;

  public paramsDataSpecial;
  cartItemsToDBx: any[] = [];
  cartItemsToDBxTable: any[] = [];

  totalAmtx:number = 0.00;
  totalQtyx:number = 0;

  roundWithDecimals(value, decimals) {
    //return Number((1.005).toFixed(2));
    return Number((value).toFixed(decimals));
  }

  constructor(
    private masterDetailService:MasterdetailService,
    private router: Router,
    private route: ActivatedRoute,    
    private ordersxService:OrdersxService
  ) { 
    this.columns = [
      { name: 'Name' },
      { name: 'Rate' },
      { name: 'Qtyx' },      
      { name: 'Amtx' },      
    ];

    this.route.queryParams.subscribe(params => {
      if (params && params.special) {
        this.paramsDataSpecial = JSON.parse(params.special);
        console.log('bill cart list ++++++---> ITEMS FROM PARAMS :: ' + JSON.stringify(this.paramsDataSpecial));
         this.cartItemsToDBx = this.paramsDataSpecial.cartitems;   
          }
        //-----------------------------------------
        for(let i=0;i<this.cartItemsToDBx.length;i++){   
          
          console.log('this.cartItemsToDBx[i].discount :::::: '+this.cartItemsToDBx[i].discount);

          //================================ APPLYING DISCOUNT ==================================================
          let amtxx = Number(this.cartItemsToDBx[i].amtx) - (Number(this.cartItemsToDBx[i].amtx) * Number(this.cartItemsToDBx[i].discount)/100);
          console.log('AMOUNT AFTER APPLYING DISCOUNT amtxx :: '+amtxx);
          //================================ APPLYING DISCOUNT ==================================================

          let xx:number = Number(this.cartItemsToDBx[i].rate) - (Number(this.cartItemsToDBx[i].rate) * Number(this.cartItemsToDBx[i].discount)/100);
         console.log('xxxxxxxxxxxxxxxx :: '+xx);
         console.log('this.cartItemsToDBx[i].qtyx :: '+this.cartItemsToDBx[i].qtyx);
         console.log('xxxxxxx RATE TOTAL WITH DISC xxxxxxxxx :: '+xx * Number(this.cartItemsToDBx[i].qtyx));
          this.cartItemsToDBxTable.push({"name":this.cartItemsToDBx[i].name,
          "image":this.cartItemsToDBx[i].image,
          "imgFlg":this.cartItemsToDBx[i].imgFlg,
          "rate":this.cartItemsToDBx[i].rate,
          "oldrate":this.cartItemsToDBx[i].oldrate,
          "qty":this.cartItemsToDBx[i].qty,
          "description":this.cartItemsToDBx[i].description,
          /* "amtx":Number(this.cartItemsToDBx[i].amtx).toFixed(2),//important */
          "amtx":Number(this.cartItemsToDBx[i].amtx).toFixed(2),//important
          //================================ APPLYING DISCOUNT ==================================================
         /*  "amtwithdiscx":Number(this.cartItemsToDBx[i].rate) - (Number(this.cartItemsToDBx[i].rate) * Number(this.cartItemsToDBx[i].discount)/100),//important
          "amtwithdiscxTot":xx * Number(this.cartItemsToDBx[i].qtyx),//important */

          //ROUNDING TO TWO DECIMAL PLACES.................................................
          "amtwithdiscx":Number(Number(this.cartItemsToDBx[i].rate) - (Number(this.cartItemsToDBx[i].rate) * Number(this.cartItemsToDBx[i].discount)/100)).toFixed(2),//important
          "amtwithdiscxTot":Number(xx * Number(this.cartItemsToDBx[i].qtyx)).toFixed(2),//important
          //ROUNDING TO TWO DECIMAL PLACES.................................................

          ////console.log("IN WORDS : "+this.roundWithDecimals(1046.1999999999998,2));
          //================================ APPLYING DISCOUNT ==================================================

          "qtyx":this.cartItemsToDBx[i].qtyx,
          "discount":this.cartItemsToDBx[i].discount
        });
        //raju.....................................
        this.rows = this.cartItemsToDBxTable;
        //this.rows = this.cartItemsToDBx;
        //raju.....................................
        //this.totalAmtx = this.totalAmtx + Number(this.cartItemsToDBx[i].amtx);
        this.totalAmtx = this.totalAmtx + Number(amtxx);
        this.totalQtyx = this.totalQtyx + Number(this.cartItemsToDBx[i].qtyx);
        }     
        //-----------------------------------------
        });                

  }
  //======================== INCREMENT DETAILS =================================
  //---------------------------------------------------------------
  incrementQty(itemdetails){
    console.log('incrementQty itemdetails ::: '+JSON.stringify(itemdetails));
    console.log('incrementQty itemdetails.name ::: '+itemdetails.name);

    for(let i=0;i<this.cartItemsToDBxTable.length;i++){
      if(this.cartItemsToDBxTable[i].qtyx < 1){     
        return;
      }else{
      if(this.cartItemsToDBxTable[i].name === itemdetails.name){
        console.log('incrementQty .... yes....');
        this.cartItemsToDBxTable[i].qtyx = this.cartItemsToDBxTable[i].qtyx + 1;
        this.cartItemsToDBxTable[i].amtx = this.cartItemsToDBxTable[i].rate * this.cartItemsToDBxTable[i].qtyx;
        //this.cartItemsToDBxTable[i].amtx = this.cartItemsToDBxTable[i].amtwithdiscx * this.cartItemsToDBxTable[i].qtyx;
        //--------------------------------------------
        console.log('this.totalAmtx :: '+this.totalAmtx);
        console.log('this.totalQtyx :: '+this.totalQtyx);
        //oneplus
        this.totalAmtx = this.totalAmtx + Number(this.cartItemsToDBxTable[i].amtwithdiscx);       
        this.totalQtyx = this.totalQtyx + 1;
        //--------------------------------------------
        this.rows = this.cartItemsToDBxTable;
        }
      }
    }
   
  }
    //======================== INCREMENT DETAILS =================================
//==================================================================================
  decrementQty(itemdetails){
    
    for(let i=0;i<this.cartItemsToDBxTable.length;i++){
     
        if(itemdetails.qtyx === 1){  //selected item for decrement...      
        //remove item from cart....   
        console.log('decrementQty REMOVING ITEM FROM CART....');
        if(this.cartItemsToDBxTable[i].name === itemdetails.name){
          if(this.cartItemsToDBxTable.length === 1 && itemdetails.qtyx === 1){
            this.totalAmtx = 0.00;
            this.totalQtyx = 0;
          }else{
            //oneplus
            //this.totalAmtx = this.totalAmtx - Number(this.cartItemsToDBxTable[i].rate);
            this.totalAmtx = this.totalAmtx - Number(this.cartItemsToDBxTable[i].amtwithdiscx);
            //this.totalAmtx = this.totalAmtx - Number(this.cartItemsToDBxTable[i].amtwithdiscx);
            this.totalQtyx = this.totalQtyx - 1;
          }      
        this.cartItemsToDBxTable.splice(i,1);       
        //-----------------------
        console.log('AFTER SPLICE :: '+this.cartItemsToDBxTable.length);    
        //-----------------------
        return;
      }
      }else{
      if(this.cartItemsToDBxTable[i].name === itemdetails.name){
        console.log('ELSE......decrementQty ... yes....');
        this.cartItemsToDBxTable[i].qtyx = this.cartItemsToDBxTable[i].qtyx - 1;
        this.cartItemsToDBxTable[i].amtx = this.cartItemsToDBxTable[i].rate * this.cartItemsToDBxTable[i].qtyx;
        //this.cartItemsToDBxTable[i].amtx = this.cartItemsToDBxTable[i].amtwithdiscx * this.cartItemsToDBxTable[i].qtyx;
        //--------------------------------------------
        console.log('this.totalAmtx :: '+this.totalAmtx);
        console.log('this.totalQtyx :: '+this.totalQtyx);
        //this.totalAmtx = this.totalAmtx - Number(this.cartItemsToDBxTable[i].rate);
        this.totalAmtx = this.totalAmtx - Number(this.cartItemsToDBxTable[i].amtwithdiscx);
        this.totalQtyx = this.totalQtyx - 1;
        //--------------------------------------------
        this.rows = this.cartItemsToDBxTable;
        }
      }
    }//for loop ends   
  }
  //======================== DECREMENT DETAILS =================================
  ngOnInit() {  
  }
//-----------------------------------
  fetchBookings() {
    this.ordersxService.getOrdersxList().valueChanges().subscribe(res => {
      console.log(res)
    })
  }
  
  //=================================================================================
  submitBill(cartItemsToDBx){
    console.log('submitBill :: '+ JSON.stringify(cartItemsToDBx));

    let billno = Math.floor(100000 + Math.random() * 900000);
    console.log('billno : '+billno);

    let createdttm = this.getCurrentDtTime();
    console.log('createdttm : '+createdttm);

    //generate bill number and save it for future use...
    //let cartItemsToDBxFB: OrdersxModel[] = [];
    let cartItemsToDBxFB: any[] = [];
    //---------------------------------------
   /*  cartItemsToDBxFB.push({
      "billno":billno.toString(),
      "createdttm":createdttm,
      "totalAmtx":this.totalAmtx,
      "totalQtyx":this.totalQtyx,
    },
      this.paramsDataSpecial); */
      cartItemsToDBxFB.push({
        "billno":billno.toString(),
        "createdttm":createdttm,
        "totalAmtx":this.totalAmtx,
        "totalQtyx":this.totalQtyx,
      },
        /* {"cartitems":this.cartItemsToDBx}); */
        {"cartitems":this.cartItemsToDBxTable});
      //---------------------------------------   
      console.log('>>>>>>>>>> SAVING TO FIREBASE DATABASE >>>>>>>>>>>>>> :: '+JSON.stringify(cartItemsToDBxFB));
      this.ordersxService.createOrderx(cartItemsToDBxFB).then(res => {
        console.log(res);
        //===========================================rocky
        //EMPTY THE CART FOR NEXT ORDER.....
        this.cartItemsToDBx = [];   
        this.masterDetailService.setDestn(this.cartItemsToDBx);   
        //EMPTY THE CART FOR NEXT ORDER.....
        //===========================================
        this.router.navigate(['/ordersx']);
      }).catch(error => console.log(error));    
  }
  //=================================================================================
  
  getCurrentDtTime() {
    ////////////////////
    let d = new Date();
    let curr_date = d.getDate();
    let curr_month = d.getMonth();
    curr_month++;
    let curr_year = d.getFullYear();
    let curr_yearStr = curr_year.toString();

    let curr_dateStr = curr_date.toString();
    if (curr_date.toString().length == 1) {
      curr_dateStr = curr_date.toString();
      curr_dateStr = "0" + curr_date;
    }
    let curr_monthStr = curr_month.toString();;
    if (curr_month.toString().length == 1) {
      curr_monthStr = curr_month.toString();
      curr_monthStr = "0" + curr_month;
    }
    ////////////////////////////////
    let curr_hour = d.getHours();
    let cur_hourStr = curr_hour.toString();
    if (curr_hour.toString().length == 1) {
      cur_hourStr = curr_hour.toString();
      cur_hourStr = "0" + curr_hour;
    }
    let curr_min = d.getMinutes();

    let curr_minStr = curr_min.toString();
    curr_minStr = curr_min + "";

    if (curr_min.toString().length == 1) {
      curr_minStr = "0" + curr_min;
    }
    let curr_sec = d.getSeconds();
    let curr_secStr = curr_sec.toString();
    if (curr_secStr.length == 1) {
      curr_secStr = "0" + curr_sec;
    }
    //let date_time = curr_year + "-" + curr_month + "-" + curr_date + "-" + curr_hour + ":" + curr_min + ":" + curr_sec;
    //let date_time = curr_year + "" + curr_month + "" + curr_date + "" + curr_hour + "" + curr_min + "" + curr_sec;
    //let date_time = curr_yearStr + "-" + curr_monthStr + "-" + curr_dateStr + "-" + cur_hourStr + "-" + curr_minStr + "-" + curr_secStr;

    ////let date_time = curr_yearStr + "" + curr_monthStr + "" + curr_dateStr + "" + cur_hourStr + "" + curr_minStr + "" + curr_secStr;
    let date_time = curr_yearStr + "-" + curr_monthStr + "-" + curr_dateStr + " " + cur_hourStr + ":" + curr_minStr + ":" + curr_secStr;
    //////////////////////////////////////
    //this.showAlertx(date_time);
    return date_time;
  }

  gotoBack(){
    /* this.router.navigate(['/add-item-to-cart']); */
    this.router.navigate(['/homexshell']);
    //cart it empty...notify in home page...
    this.masterDetailService.setDestn({'cartempty':true});
  }

  gotoBillCartList(x){

  }

}
