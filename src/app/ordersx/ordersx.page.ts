import { Component, OnInit } from '@angular/core';
import {  ViewChild, ElementRef } from '@angular/core';
import swal from 'sweetalert2';
import { HttpClient } from '@angular/common/http';
import { ImageAttribute, ImageLoaderService } from 'ionic-image-loader';
//import { PDFGenerator } from '@ionic-native/pdf-generator/ngx';
import { File } from '@ionic-native/file/ngx';
//import { Base64 } from '@ionic-native/base64/ngx';
import { SafeUrl, DomSanitizer } from '@angular/platform-browser';
//import domtoimage from 'dom-to-image';
import { FileOpener } from '@ionic-native/file-opener/ngx';
import  { IWriteOptions}  from '@ionic-native/file/ngx';
//import * as jsPDF1 from 'jspdf'
import { LoadingController } from '@ionic/angular';
import { OrdersxService } from '../shared/ordersx.service';
import { OrdersxModel } from '../shared/OrdersxModel';
import { Toast } from '@ionic-native/toast/ngx';

//-------- pdf ------
declare var jsPDF: any;
//-------- pdf ------
declare var cordova: any;

@Component({
  selector: 'app-ordersx',
  templateUrl: './ordersx.page.html',
  styleUrls: ['./ordersx.page.scss'],
  //providers:[PDFGenerator]
})
export class OrdersxPage implements OnInit {

  @ViewChild('htmlData') htmlData:ElementRef;
  @ViewChild('invoiceTemplate') invoiceTemplate:ElementRef;

  refreshFlg:boolean = false;

  //Ordersx = [];
  Ordersx: any[] = [];
  OrdersxDisp: any[] = [];
  public imgDataa;

  USERS = [
    {
      "sno": "1.",
      "item": "Butter",
      "qty": "6",
      "unitprice": "50.00",
      "total": "300.00"
    },
    {
      "sno": "2.",
      "item": "Milk Bread",
      "qty": "2",
      "unitprice": "25.00",
      "total": "50.00"
    },
    {
      "sno": "3.",
      "item": "Fruit Jam",
      "qty": "2",
      "unitprice": "110.00",
      "total": "220.00"
    },
    {
      "sno": "4.",
      "item": "Mango Pickle",
      "qty": "3",
      "unitprice": "80.00",
      "total": "240.00"
    },
    {
      "sno": "5.",
      "item": "Mustard Paste",
      "qty": "2",
      "unitprice": "150.00",
      "total": "300.00"
    },
    {
      "sno": "6.",
      "item": "Butter Milk",
      "qty": "1",
      "unitprice": "60.00",
      "total": "60.00"
    },
  ];

  USERS1 = [
    {
      "id": 1,
      "name": "Leanne Graham",
      "email": "sincere@april.biz",
      "phone": "1-770-736-8031 x56442"
    },
    {
      "id": 2,
      "name": "Ervin Howell",
      "email": "shanna@melissa.tv",
      "phone": "010-692-6593 x09125"
    },
    {
      "id": 3,
      "name": "Clementine Bauch",
      "email": "nathan@yesenia.net",
      "phone": "1-463-123-4447",
    },
    {
      "id": 4,
      "name": "Patricia Lebsack",
      "email": "julianne@kory.org",
      "phone": "493-170-9623 x156"
    },
    {
      "id": 5,
      "name": "Chelsey Dietrich",
      "email": "lucio@annie.ca",
      "phone": "(254)954-1289"
    },
    {
      "id": 6,
      "name": "Mrs. Dennis",
      "email": "karley@jasper.info",
      "phone": "1-477-935-8478 x6430"
    }
  ];

  //-------- pdf ------
  pdfObj: any;
  //-------- pdf ------
  //------------ testing image loader -----------------
  users = [];
  jsonData = null;
  imageAttributes: ImageAttribute[] = [];
  //------------ testing image loader -----------------

  itemsDiscounts: any[] = [];

  itemsx=[
    {
       "title" : "Battle",
       "cover" : "http://masteringionic.com/project-examples/virtual-scrolla/imgs/battle.png",
       "chevFlg":"false"
    },
    {
       "title" : "Commando",
       "cover" : "http://masteringionic.com/project-examples/virtual-scrolla/imgs/commando.png",
       "chevFlg":"false"
    },
    {
       "title" : "Warlord",
       "cover" : "http://masteringionic.com/project-examples/virtual-scrolla/imgs/warlord.png",
       "chevFlg":"false"
    },
    {
       "title" : "Victor",
       "cover" : "http://masteringionic.com/project-examples/virtual-scrolla/imgs/victor.png",
       "chevFlg":"false"
    },
    {
       "title" : "Action",
       "cover" : "http://masteringionic.com/project-examples/virtual-scrolla/imgs/action.png",
       "chevFlg":"false"
    },
    {
       "title" : "Hotspur",
       "cover" : "http://masteringionic.com/project-examples/virtual-scrolla/imgs/hotspur.png",
       "chevFlg":"false"
    },
    {
       "title" : "Hornet",
       "cover" : "http://masteringionic.com/project-examples/virtual-scrolla/imgs/hornet.png",
       "chevFlg":"false"
    },
    {
       "title" : "Tornado",
       "cover" : "http://masteringionic.com/project-examples/virtual-scrolla/imgs/tornado.png",
       "chevFlg":"false"
    },
    {
       "title" : "War Picture library",
       "cover" : "http://masteringionic.com/project-examples/virtual-scrolla/imgs/war-picture-library.png",
       "chevFlg":"false"
    },
    {
       "title" : "Bullet",
       "cover" : "http://masteringionic.com/project-examples/virtual-scrolla/imgs/bullet.png",
       "chevFlg":"false"
    },
    {
       "title" : "Eagle",
       "cover" : "http://masteringionic.com/project-examples/virtual-scrolla/imgs/eagle.png",
       "chevFlg":"false"
    },
    {
       "title" : "Vulcan",
       "cover" : "http://masteringionic.com/project-examples/virtual-scrolla/imgs/vulcan.png",
       "chevFlg":"false"
    },
    {
       "title" : "2000AD",
       "cover" : "http://masteringionic.com/project-examples/virtual-scrolla/imgs/2000ad.png",
       "chevFlg":"false"
    },
    {
       "title" : "Starblazer",
       "cover" : "http://masteringionic.com/project-examples/virtual-scrolla/imgs/starblazer.png",
       "chevFlg":"false"
    }];

  constructor(
      private httpClient:HttpClient,
      private imgLoader:ImageLoaderService,
      //public pdfGenerator: PDFGenerator,
      //private base64: Base64,
      private http:HttpClient,
      private domSanitizer:DomSanitizer,
      public loadingCtrl: LoadingController,
      private file: File,
      private fileOpener: FileOpener,
      private ordersxService:OrdersxService,
      private toast: Toast
      ) { 
        //this.imgDataa = this.getBase64Img();
    
      //-----------------------------------------
  for (let i = 0; i < 9; i++) {
    this.itemsDiscounts.push(
      {title:this.itemsx[i].title,
        cover:this.itemsx[i].cover,
        datetime:this.getCurrentDtTime()
      })
}
//console.log('itemsDiscounts ARRAY :: '+JSON.stringify(this.itemsDiscounts));
//-----------------------------------------
  }//constructor ends

  itemsFinal = [];
  ngOnInit() {
   
    let bookingRes = this.ordersxService.getOrdersxList();
    //console.log('==== bookingRes ====> :: '+JSON.stringify(bookingRes));
    bookingRes.snapshotChanges().subscribe(res => {
      //console.log('==== res ====> :: '+JSON.stringify(res));
      let cnt = 0;
      res.forEach(item => {
        //console.log('item.payload.val(); :: '+JSON.stringify(item.payload.val()));        
        this.itemsFinal.push({"itemz":item.payload.val()});
      });
      //console.log('********************'+JSON.stringify(this.itemsFinal));   
    })     
  }

  makeSampleFile(){
    this.file.checkDir(this.file.dataDirectory, 'mydir').then(_ => 
      {
        console.log('Directory exists')
      }).catch(err =>
        {
      console.log('Directory doesn\'t exist')
    });    
  }

  getCurrDateTimeOther() {
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
    let date_time = curr_yearStr + "" + curr_monthStr + "" + curr_dateStr + "" + cur_hourStr + "" + curr_minStr + "" + curr_secStr;
    //////////////////////////////////////
    //this.showAlertx(date_time);
    return date_time;
  }

  //=======================================================================================

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
  
//-----------------------------------------------
callSuccess(){
swal(
  {
    title: 'Success',
    //text: "File Uploaded Successfully...",
    html: "Email Sent Successfully...",
    animation: true,
    type: "success",
    confirmButtonColor: '#ffffff',
    confirmButtonText: '<span style="color:#4e4e4e">OK</span>'
  }).catch(swal.noop);
//------------------------------------------------
}

callError(){
  swal(
    'Sorry...',
    'Already Created Receipt for this Tenant.Please use "My Receipts" to send Acknowledgment to Tenant.',
    'error'
  );
}

notifications(){
  swal(
    {
      title: 'Success',
      html: "Notifications Successfully...",
      animation: true,
      type: "success",
      confirmButtonColor: '#ffffff',
      confirmButtonText: '<span style="color:#4e4e4e">OK</span>'
    }).catch(swal.noop);
}

  //------------ testing image loader -----------------

  //rambo
  onImageLoad(evt){   
    console.log('Image Ready!');
 }
loadData(){

  //rambo

  let xx = {"results":[{"gender":"male","imgFlg":"true","name":{"title":"Mr","first":"Ian","last":"Byrd"},"location":{"street":{"number":2883,"name":"College St"},"city":"Toledo","state":"New Hampshire","country":"United States","postcode":21776,"coordinates":{"latitude":"82.2004","longitude":"-132.2315"},"timezone":{"offset":"+4:00","description":"Abu Dhabi, Muscat, Baku, Tbilisi"}},"email":"ian.byrd@example.com","login":{"uuid":"61a41e82-fed7-4e5d-8197-bccefbfdaf33","username":"purplekoala758","password":"america","salt":"76YB5uZV","md5":"be61bcb0256c9a117a09014cbf3cc618","sha1":"7120ddae6f630deb8cc50f8d07aa5ce61bc221a4","sha256":"e9e28c878eb790142f3640d24a1dd39c53b2b3e46537443d444903cbeda9e322"},"dob":{"date":"1985-03-25T06:10:44.063Z","age":35},"registered":{"date":"2015-09-28T21:57:28.497Z","age":5},"phone":"(979)-869-1176","cell":"(322)-768-2306","id":{"name":"SSN","value":"871-70-8871"},"picture":{"large":"https://randomuser.me/api/portraits/men/91.jpg","medium":"https://randomuser.me/api/portraits/med/men/91.jpg","thumbnail":"https://randomuser.me/api/portraits/thumb/men/91.jpg"},"nat":"US"}]};

  let x = {"results":[{"gender":"male","name":{"title":"Mr","first":"Ian","last":"Byrd"},"location":{"street":{"number":2883,"name":"College St"},"city":"Toledo","state":"New Hampshire","country":"United States","postcode":21776,"coordinates":{"latitude":"82.2004","longitude":"-132.2315"},"timezone":{"offset":"+4:00","description":"Abu Dhabi, Muscat, Baku, Tbilisi"}},"email":"ian.byrd@example.com","login":{"uuid":"61a41e82-fed7-4e5d-8197-bccefbfdaf33","username":"purplekoala758","password":"america","salt":"76YB5uZV","md5":"be61bcb0256c9a117a09014cbf3cc618","sha1":"7120ddae6f630deb8cc50f8d07aa5ce61bc221a4","sha256":"e9e28c878eb790142f3640d24a1dd39c53b2b3e46537443d444903cbeda9e322"},"dob":{"date":"1985-03-25T06:10:44.063Z","age":35},"registered":{"date":"2015-09-28T21:57:28.497Z","age":5},"phone":"(979)-869-1176","cell":"(322)-768-2306","id":{"name":"SSN","value":"871-70-8871"},"picture":{"large":"https://randomuser.me/api/portraits/men/91.jpg","medium":"https://randomuser.me/api/portraits/med/men/91.jpg","thumbnail":"https://randomuser.me/api/portraits/thumb/men/91.jpg"},"nat":"US"},{"gender":"female","name":{"title":"Miss","first":"Beverly","last":"Marshall"},"location":{"street":{"number":8989,"name":"Timber Wolf Trail"},"city":"Hartford","state":"Alabama","country":"United States","postcode":76360,"coordinates":{"latitude":"40.2467","longitude":"71.2789"},"timezone":{"offset":"-11:00","description":"Midway Island, Samoa"}},"email":"beverly.marshall@example.com","login":{"uuid":"544cae36-09cc-42b0-9dc1-fa1840ed60b1","username":"bigduck688","password":"birdie","salt":"f2BfeRZT","md5":"2f096d34791b37e387861e01a169b775","sha1":"107c847ef9f5fcafd70bd1d7a0be2c0f202866f0","sha256":"b03146c06b7f1a7b4ba62cdee1725b16b2d4669b410e5bee8af8c1e2d90481f0"},"dob":{"date":"1993-02-27T02:43:11.079Z","age":27},"registered":{"date":"2009-07-12T17:48:32.916Z","age":11},"phone":"(826)-351-0904","cell":"(432)-110-0440","id":{"name":"SSN","value":"599-13-9268"},"picture":{"large":"https://randomuser.me/api/portraits/women/23.jpg","medium":"https://randomuser.me/api/portraits/med/women/23.jpg","thumbnail":"https://randomuser.me/api/portraits/thumb/women/23.jpg"},"nat":"US"},{"gender":"male","name":{"title":"Mr","first":"Adam","last":"Mortensen"},"location":{"street":{"number":2157,"name":"Østervænget"},"city":"Sommersted","state":"Syddanmark","country":"Denmark","postcode":12050,"coordinates":{"latitude":"64.8596","longitude":"-22.6679"},"timezone":{"offset":"+10:00","description":"Eastern Australia, Guam, Vladivostok"}},"email":"adam.mortensen@example.com","login":{"uuid":"11bdb213-ae63-4d49-9821-f07753220067","username":"crazykoala155","password":"maker","salt":"Eq1r9KoU","md5":"32c601e870fcf6a16c8d81d3a7881dc8","sha1":"a99fab8c7031857cf36bfb4eac6ddfff427a3f48","sha256":"d9533ab3a300ca0974c076ed399ca0398fa7ee3e9f9d7d593921d8bf42316810"},"dob":{"date":"1982-10-03T20:26:05.452Z","age":38},"registered":{"date":"2009-10-28T11:36:13.702Z","age":11},"phone":"00011572","cell":"79350002","id":{"name":"CPR","value":"031082-5247"},"picture":{"large":"https://randomuser.me/api/portraits/men/8.jpg","medium":"https://randomuser.me/api/portraits/med/men/8.jpg","thumbnail":"https://randomuser.me/api/portraits/thumb/men/8.jpg"},"nat":"DK"},{"gender":"female","name":{"title":"Ms","first":"Brooklyn","last":"Roberts"},"location":{"street":{"number":7809,"name":"Aldwins Road"},"city":"New Plymouth","state":"Manawatu-Wanganui","country":"New Zealand","postcode":32097,"coordinates":{"latitude":"-76.1116","longitude":"10.6925"},"timezone":{"offset":"-3:30","description":"Newfoundland"}},"email":"brooklyn.roberts@example.com","login":{"uuid":"ef36e4bd-4208-4f3f-8f07-4d4f93b9470b","username":"goldenbutterfly688","password":"hogtied","salt":"dTkbRxXP","md5":"918f8bd34cc2bf5b224f29d9e2e3dd9c","sha1":"eb1cfab1675c2bf77e44dabe2c663656e790c0c9","sha256":"ccd8107c43dac7d852421ee1b54d3d911afcc56fa86c844f16f3d98b1a3db9be"},"dob":{"date":"1979-07-06T17:50:53.839Z","age":41},"registered":{"date":"2005-11-16T03:03:04.262Z","age":15},"phone":"(396)-687-8642","cell":"(830)-591-6583","id":{"name":"","value":null},"picture":{"large":"https://randomuser.me/api/portraits/women/65.jpg","medium":"https://randomuser.me/api/portraits/med/women/65.jpg","thumbnail":"https://randomuser.me/api/portraits/thumb/women/65.jpg"},"nat":"NZ"},{"gender":"male","name":{"title":"Mr","first":"كيان","last":"سلطانی نژاد"},"location":{"street":{"number":2814,"name":"میدان رسالت"},"city":"دزفول","state":"گلستان","country":"Iran","postcode":31508,"coordinates":{"latitude":"-11.8334","longitude":"-151.0403"},"timezone":{"offset":"+4:30","description":"Kabul"}},"email":"kyn.sltnynjd@example.com","login":{"uuid":"101129b3-cf59-4001-b837-cd929f5c0953","username":"orangerabbit535","password":"beast","salt":"3gInEyLm","md5":"5714982525b87a48aaa565366f8758ef","sha1":"55250e36e5535a486a60b1ae508a39a377a11f56","sha256":"7092ca04720df64a0e56ae05487912f81624b757316fe693464182d372a38589"},"dob":{"date":"1944-12-23T13:41:55.552Z","age":76},"registered":{"date":"2005-04-25T13:50:30.822Z","age":15},"phone":"035-07918923","cell":"0918-154-4943","id":{"name":"","value":null},"picture":{"large":"https://randomuser.me/api/portraits/men/56.jpg","medium":"https://randomuser.me/api/portraits/med/men/56.jpg","thumbnail":"https://randomuser.me/api/portraits/thumb/men/56.jpg"},"nat":"IR"},{"gender":"male","name":{"title":"Monsieur","first":"Fabien","last":"Gauthier"},"location":{"street":{"number":4477,"name":"Rue de L'Abbé-Carton"},"city":"La Baroche","state":"Bern","country":"Switzerland","postcode":2727,"coordinates":{"latitude":"-79.0358","longitude":"84.4125"},"timezone":{"offset":"-10:00","description":"Hawaii"}},"email":"fabien.gauthier@example.com","login":{"uuid":"20b5ca75-1aa3-4a6e-a9cc-d974e508e298","username":"yellowzebra489","password":"icu812","salt":"qqA4WeoH","md5":"8f74671741c4171d23956cccedf757c5","sha1":"7ec6f589324c1c9af2229699fe55afb87b84df48","sha256":"7f042906fb264a80e7a5a21ad809b9a396ec9311a0771827b659a36f60621746"},"dob":{"date":"1954-12-08T01:39:47.579Z","age":66},"registered":{"date":"2017-03-24T18:29:59.097Z","age":3},"phone":"075 127 50 47","cell":"079 504 08 07","id":{"name":"AVS","value":"756.7107.7051.66"},"picture":{"large":"https://randomuser.me/api/portraits/men/68.jpg","medium":"https://randomuser.me/api/portraits/med/men/68.jpg","thumbnail":"https://randomuser.me/api/portraits/thumb/men/68.jpg"},"nat":"CH"},{"gender":"female","name":{"title":"Miss","first":"Deann","last":"Mills"},"location":{"street":{"number":4539,"name":"Washington Ave"},"city":"Shepparton","state":"Northern Territory","country":"Australia","postcode":4528,"coordinates":{"latitude":"61.5187","longitude":"-50.5298"},"timezone":{"offset":"-5:00","description":"Eastern Time (US & Canada), Bogota, Lima"}},"email":"deann.mills@example.com","login":{"uuid":"a4a5a4b6-e3e1-4937-a931-8c7029681be1","username":"greenlion945","password":"tropical","salt":"epBYeZKW","md5":"84b0fb95f4b59926b2f41212539b4db1","sha1":"dad75eeca24f42839e8577baac0422a88deabea7","sha256":"1f38abb8cf7a7428f968b319acdc92804eb9b498c1799a748c96647a91e2fe9a"},"dob":{"date":"1985-06-26T03:29:07.649Z","age":35},"registered":{"date":"2014-10-15T15:40:37.621Z","age":6},"phone":"04-4092-3972","cell":"0423-570-203","id":{"name":"TFN","value":"360775162"},"picture":{"large":"https://randomuser.me/api/portraits/women/30.jpg","medium":"https://randomuser.me/api/portraits/med/women/30.jpg","thumbnail":"https://randomuser.me/api/portraits/thumb/women/30.jpg"},"nat":"AU"},{"gender":"male","name":{"title":"Mr","first":"آدرین","last":"قاسمی"},"location":{"street":{"number":2279,"name":"فاطمی"},"city":"کاشان","state":"کردستان","country":"Iran","postcode":70612,"coordinates":{"latitude":"60.4243","longitude":"144.9612"},"timezone":{"offset":"+3:30","description":"Tehran"}},"email":"adryn.qsmy@example.com","login":{"uuid":"352c2867-f653-4145-9787-3b446ec1387f","username":"beautifulbird112","password":"1012","salt":"khv9BltU","md5":"f4f16b7a34c4ab6285c2094fd30b1679","sha1":"826062d09df8a6b518845fc7514043e78dd5f749","sha256":"376f89ab8625b6541d44787aca8703dd8b16d754525761d2c5e57ad33930013c"},"dob":{"date":"1955-08-15T02:32:29.306Z","age":65},"registered":{"date":"2016-06-06T10:14:27.344Z","age":4},"phone":"032-66985125","cell":"0980-982-8408","id":{"name":"","value":null},"picture":{"large":"https://randomuser.me/api/portraits/men/10.jpg","medium":"https://randomuser.me/api/portraits/med/men/10.jpg","thumbnail":"https://randomuser.me/api/portraits/thumb/men/10.jpg"},"nat":"IR"},{"gender":"female","name":{"title":"Ms","first":"Susanne","last":"Peschke"},"location":{"street":{"number":5087,"name":"Neue Straße"},"city":"Wurzen","state":"Hamburg","country":"Germany","postcode":31485,"coordinates":{"latitude":"83.7284","longitude":"-24.1171"},"timezone":{"offset":"+5:00","description":"Ekaterinburg, Islamabad, Karachi, Tashkent"}},"email":"susanne.peschke@example.com","login":{"uuid":"3da3124b-807b-4f91-b0d0-cb31cc182a90","username":"ticklishbutterfly874","password":"acer","salt":"zufbnQQ1","md5":"5c9eece9b66c3a12716b8394bf494761","sha1":"d9951921b46ceecee1e2c1d2bc8dc5476e8f5aa8","sha256":"2375655661aa0e5667a62e54cc2ff8dbbcf7e8b93147eae00f647953fbc67ebd"},"dob":{"date":"1951-04-20T15:09:00.381Z","age":69},"registered":{"date":"2017-01-17T10:30:30.039Z","age":3},"phone":"0162-7667230","cell":"0170-0847688","id":{"name":"","value":null},"picture":{"large":"https://randomuser.me/api/portraits/women/33.jpg","medium":"https://randomuser.me/api/portraits/med/women/33.jpg","thumbnail":"https://randomuser.me/api/portraits/thumb/women/33.jpg"},"nat":"DE"},{"gender":"female","name":{"title":"Ms","first":"Delphine","last":"Ouellet"},"location":{"street":{"number":1170,"name":"Concession Road 6"},"city":"Lumsden","state":"Northwest Territories","country":"Canada","postcode":"G8B 7Z6","coordinates":{"latitude":"55.5327","longitude":"-92.1833"},"timezone":{"offset":"+10:00","description":"Eastern Australia, Guam, Vladivostok"}},"email":"delphine.ouellet@example.com","login":{"uuid":"9047fc51-137c-41d9-8e58-fcb4770f35fc","username":"heavylion110","password":"12121212","salt":"fK2ZoeA1","md5":"0767c1ffb1864ca3606daa6a4a5cad74","sha1":"7b2efd5ae6231e62da83de157ee90e47b9954c0a","sha256":"73c661ce61d36971b4191e48ca88fdb7d5e7b17f8c8356ea0f11bafae5da10ff"},"dob":{"date":"1984-12-28T16:18:03.891Z","age":36},"registered":{"date":"2019-03-22T10:20:21.603Z","age":1},"phone":"990-861-1470","cell":"113-509-5255","id":{"name":"","value":null},"picture":{"large":"https://randomuser.me/api/portraits/women/6.jpg","medium":"https://randomuser.me/api/portraits/med/women/6.jpg","thumbnail":"https://randomuser.me/api/portraits/thumb/women/6.jpg"},"nat":"CA"},{"gender":"male","name":{"title":"Mr","first":"Jaco","last":"Van den Ende"},"location":{"street":{"number":9534,"name":"Hemingwayplaats"},"city":"Oene","state":"Noord-Holland","country":"Netherlands","postcode":79486,"coordinates":{"latitude":"-39.3213","longitude":"-85.8794"},"timezone":{"offset":"-11:00","description":"Midway Island, Samoa"}},"email":"jaco.vandenende@example.com","login":{"uuid":"59b13045-90cc-493b-b7a7-07938dca215f","username":"crazyladybug813","password":"polopolo","salt":"e37FJHuK","md5":"0b5908fb51cb3419bedab086ed4e8ccc","sha1":"2abbe410e1abc27154550c355f1a161f2876991e","sha256":"f5e5b7f92232d31d3df5f91b21241ea5592959740dd5700e1124e15704b63e7e"},"dob":{"date":"1984-06-15T18:24:22.719Z","age":36},"registered":{"date":"2006-02-13T21:29:14.634Z","age":14},"phone":"(378)-949-6081","cell":"(751)-249-7446","id":{"name":"BSN","value":"44350927"},"picture":{"large":"https://randomuser.me/api/portraits/men/7.jpg","medium":"https://randomuser.me/api/portraits/med/men/7.jpg","thumbnail":"https://randomuser.me/api/portraits/thumb/men/7.jpg"},"nat":"NL"},{"gender":"female","name":{"title":"Mrs","first":"Pietra","last":"Cardoso"},"location":{"street":{"number":1232,"name":"Rua Dom Pedro Ii "},"city":"Parnamirim","state":"Piauí","country":"Brazil","postcode":87702,"coordinates":{"latitude":"-9.1621","longitude":"-115.1421"},"timezone":{"offset":"-2:00","description":"Mid-Atlantic"}},"email":"pietra.cardoso@example.com","login":{"uuid":"5c01003c-153a-49fd-8239-d0ed4e60d4be","username":"happywolf987","password":"gotcha","salt":"DFl40lEd","md5":"59437556ad0c7cc617808321437904aa","sha1":"7c88ce5b1f973b85b19a185ee6c4d4a72041174f","sha256":"9e06e63dc83a17270dd71f012f148041d71f0de5ce4b81f7cbcbcde0f9724a7b"},"dob":{"date":"1991-07-06T10:46:28.686Z","age":29},"registered":{"date":"2015-04-10T18:37:28.819Z","age":5},"phone":"(11) 5406-3876","cell":"(33) 5276-9152","id":{"name":"","value":null},"picture":{"large":"https://randomuser.me/api/portraits/women/90.jpg","medium":"https://randomuser.me/api/portraits/med/women/90.jpg","thumbnail":"https://randomuser.me/api/portraits/thumb/women/90.jpg"},"nat":"BR"},{"gender":"female","name":{"title":"Mrs","first":"Donna","last":"Jacobs"},"location":{"street":{"number":174,"name":"The Drive"},"city":"Lisburn","state":"West Yorkshire","country":"United Kingdom","postcode":"HY18 8RR","coordinates":{"latitude":"27.0184","longitude":"157.9921"},"timezone":{"offset":"+7:00","description":"Bangkok, Hanoi, Jakarta"}},"email":"donna.jacobs@example.com","login":{"uuid":"b8bf5365-103a-4bd1-91d1-d52b3caab361","username":"redswan297","password":"angelina","salt":"VA6jIQdA","md5":"306f3ddac5c5e3952a54894cfd5d94a4","sha1":"7d1553c0c1974a23743fae4bd1fcfff2aca9a903","sha256":"3bb6888915231e208b917e8be8ad0d3f62709f9857b9406f1e7f4f377ac07123"},"dob":{"date":"1989-05-27T13:06:56.863Z","age":31},"registered":{"date":"2011-02-23T14:10:01.855Z","age":9},"phone":"015396 49173","cell":"0790-868-305","id":{"name":"NINO","value":"EJ 54 34 22 U"},"picture":{"large":"https://randomuser.me/api/portraits/women/72.jpg","medium":"https://randomuser.me/api/portraits/med/women/72.jpg","thumbnail":"https://randomuser.me/api/portraits/thumb/women/72.jpg"},"nat":"GB"},{"gender":"female","name":{"title":"Ms","first":"Lorraine","last":"Gonzalez"},"location":{"street":{"number":8850,"name":"Bollinger Rd"},"city":"Provo","state":"Iowa","country":"United States","postcode":54450,"coordinates":{"latitude":"-76.0838","longitude":"-177.6198"},"timezone":{"offset":"+9:00","description":"Tokyo, Seoul, Osaka, Sapporo, Yakutsk"}},"email":"lorraine.gonzalez@example.com","login":{"uuid":"d6bade2e-5bcf-4158-a019-dd316d0780bf","username":"blackbutterfly181","password":"paramedi","salt":"uQP2OiEC","md5":"8ae6b0f8662ee1dcf1f9059fda78b1ce","sha1":"b9b10780fa1347ef0a91c809ee30d4755ea6be20","sha256":"2f26e45dfbf1190c45fba88566379674107e88a879ecfd832e98abc5e5e6871e"},"dob":{"date":"1954-10-11T12:39:15.956Z","age":66},"registered":{"date":"2009-03-02T08:11:46.642Z","age":11},"phone":"(856)-362-8638","cell":"(609)-979-7818","id":{"name":"SSN","value":"203-83-0157"},"picture":{"large":"https://randomuser.me/api/portraits/women/52.jpg","medium":"https://randomuser.me/api/portraits/med/women/52.jpg","thumbnail":"https://randomuser.me/api/portraits/thumb/women/52.jpg"},"nat":"US"},{"gender":"male","name":{"title":"Mr","first":"Noe","last":"Lemoine"},"location":{"street":{"number":1273,"name":"Rue Courbet"},"city":"Angers","state":"Haute-Savoie","country":"France","postcode":50180,"coordinates":{"latitude":"-77.5571","longitude":"153.1088"},"timezone":{"offset":"+5:00","description":"Ekaterinburg, Islamabad, Karachi, Tashkent"}},"email":"noe.lemoine@example.com","login":{"uuid":"f1d9237b-0225-481f-8389-3d0bfab26c0f","username":"silverkoala685","password":"1969","salt":"vNnh2xdL","md5":"79eca1cf87ff45c7f0b4deebf4865d3a","sha1":"4d588f57e255cf5a979153d2dabf9df0f615591c","sha256":"a66a4e5a9cfbb733870d473a03ecf06a58a6359817112782a296e5b3206a51d0"},"dob":{"date":"1947-12-05T04:17:23.665Z","age":73},"registered":{"date":"2014-05-30T02:36:54.852Z","age":6},"phone":"03-66-06-58-16","cell":"06-02-19-98-51","id":{"name":"INSEE","value":"1NNaN03369656 44"},"picture":{"large":"https://randomuser.me/api/portraits/men/53.jpg","medium":"https://randomuser.me/api/portraits/med/men/53.jpg","thumbnail":"https://randomuser.me/api/portraits/thumb/men/53.jpg"},"nat":"FR"},{"gender":"male","name":{"title":"Mr","first":"Anton","last":"Huotari"},"location":{"street":{"number":7031,"name":"Rotuaari"},"city":"Salla","state":"Central Finland","country":"Finland","postcode":97654,"coordinates":{"latitude":"35.2951","longitude":"44.7600"},"timezone":{"offset":"+1:00","description":"Brussels, Copenhagen, Madrid, Paris"}},"email":"anton.huotari@example.com","login":{"uuid":"9c1ef898-59b4-47cb-b15b-ef7fb1d2b913","username":"heavyzebra334","password":"mankind","salt":"vcuH1SBV","md5":"81602280a10c4d6e19c8aa9e879ea2c7","sha1":"8c234cf2a2c38a87b1b9d3e2349c617d3447b20c","sha256":"e35545bafe3fbd2da5ddc28cef08f05bcc1146c783524f8295abe19d53fc780a"},"dob":{"date":"1994-04-20T02:53:03.181Z","age":26},"registered":{"date":"2016-08-11T03:42:18.508Z","age":4},"phone":"06-994-775","cell":"041-998-40-37","id":{"name":"HETU","value":"NaNNA103undefined"},"picture":{"large":"https://randomuser.me/api/portraits/men/15.jpg","medium":"https://randomuser.me/api/portraits/med/men/15.jpg","thumbnail":"https://randomuser.me/api/portraits/thumb/men/15.jpg"},"nat":"FI"},{"gender":"female","name":{"title":"Ms","first":"Roxane","last":"David"},"location":{"street":{"number":3427,"name":"Avenue Paul Eluard"},"city":"Courbevoie","state":"Ain","country":"France","postcode":42399,"coordinates":{"latitude":"-4.9613","longitude":"158.6258"},"timezone":{"offset":"+3:00","description":"Baghdad, Riyadh, Moscow, St. Petersburg"}},"email":"roxane.david@example.com","login":{"uuid":"c66a7658-0f3b-41bc-a961-4aad783ef270","username":"redcat408","password":"hector","salt":"9tiuR92i","md5":"f0cde9620ab422e70938a173995600ad","sha1":"8ab0eb1b285dc956b2ff09cee4ca61cdb24ed98e","sha256":"bebdf415b9cfec6e70ab74dd15e62377b4b22cbb290b396edc8a6e11740620c8"},"dob":{"date":"1982-02-08T13:16:30.235Z","age":38},"registered":{"date":"2009-11-20T18:35:08.648Z","age":11},"phone":"01-61-88-22-23","cell":"06-53-31-00-63","id":{"name":"INSEE","value":"2NNaN51818140 96"},"picture":{"large":"https://randomuser.me/api/portraits/women/86.jpg","medium":"https://randomuser.me/api/portraits/med/women/86.jpg","thumbnail":"https://randomuser.me/api/portraits/thumb/women/86.jpg"},"nat":"FR"},{"gender":"female","name":{"title":"Miss","first":"Leonara","last":"Ribeiro"},"location":{"street":{"number":4149,"name":"Rua Santa Maria "},"city":"Crato","state":"Minas Gerais","country":"Brazil","postcode":24674,"coordinates":{"latitude":"-17.3613","longitude":"-28.1239"},"timezone":{"offset":"+5:00","description":"Ekaterinburg, Islamabad, Karachi, Tashkent"}},"email":"leonara.ribeiro@example.com","login":{"uuid":"ffdbe239-70a6-4dba-a684-cbe29398475d","username":"sadgoose232","password":"escort","salt":"F9nJshrj","md5":"16d847c25a16c5f9a8c9d3df09482adf","sha1":"7e4b6d970472184e8c161cb17dd9b3180a431fa1","sha256":"16880b5f284cb95eb385d6e4b6355535219531544539d8e32dc739ef5e6e1a75"},"dob":{"date":"1961-08-16T06:48:47.825Z","age":59},"registered":{"date":"2019-08-12T17:59:06.334Z","age":1},"phone":"(99) 9983-1149","cell":"(47) 6086-3605","id":{"name":"","value":null},"picture":{"large":"https://randomuser.me/api/portraits/women/51.jpg","medium":"https://randomuser.me/api/portraits/med/women/51.jpg","thumbnail":"https://randomuser.me/api/portraits/thumb/women/51.jpg"},"nat":"BR"},{"gender":"female","name":{"title":"Miss","first":"یسنا","last":"حسینی"},"location":{"street":{"number":3278,"name":"شهید ثانی"},"city":"زنجان","state":"گلستان","country":"Iran","postcode":98282,"coordinates":{"latitude":"-86.8754","longitude":"129.2222"},"timezone":{"offset":"+3:00","description":"Baghdad, Riyadh, Moscow, St. Petersburg"}},"email":"ysn.hsyny@example.com","login":{"uuid":"7fec6e28-b061-4ad3-98c1-7fa050bbd649","username":"orangetiger170","password":"2626","salt":"tgZ8hzHf","md5":"a039d9698c6f26745613b5d6f0c83b17","sha1":"4fd6498a6eb07fe36b6468084f305427b25b4f28","sha256":"b21acb219516aa9d645c5f35bdb54dc13a0942c095bfce653fcd41df8ba0441c"},"dob":{"date":"1968-08-11T09:42:18.938Z","age":52},"registered":{"date":"2015-10-22T18:26:41.169Z","age":5},"phone":"023-46871196","cell":"0991-445-8518","id":{"name":"","value":null},"picture":{"large":"https://randomuser.me/api/portraits/women/45.jpg","medium":"https://randomuser.me/api/portraits/med/women/45.jpg","thumbnail":"https://randomuser.me/api/portraits/thumb/women/45.jpg"},"nat":"IR"},{"gender":"female","name":{"title":"Ms","first":"Ann","last":"Kindler"},"location":{"street":{"number":4117,"name":"Schulweg"},"city":"Rietberg","state":"Hessen","country":"Germany","postcode":18176,"coordinates":{"latitude":"-88.3516","longitude":"-29.1520"},"timezone":{"offset":"+10:00","description":"Eastern Australia, Guam, Vladivostok"}},"email":"ann.kindler@example.com","login":{"uuid":"33c62e29-ca28-47ef-b810-3111d83b4d6b","username":"angrymouse934","password":"jackson","salt":"a2MOJ4JU","md5":"122c7bc60af7761cf28d9ce7b3660f4a","sha1":"8399bddffbb775216e4ad87e818dea5a32541355","sha256":"4448c282dd815e72d0f98592ac337f777d1baee79c9c65b5dc4c68f292178f82"},"dob":{"date":"1957-10-03T07:49:03.647Z","age":63},"registered":{"date":"2003-07-13T23:09:40.992Z","age":17},"phone":"0163-5952979","cell":"0174-5015333","id":{"name":"","value":null},"picture":{"large":"https://randomuser.me/api/portraits/women/22.jpg","medium":"https://randomuser.me/api/portraits/med/women/22.jpg","thumbnail":"https://randomuser.me/api/portraits/thumb/women/22.jpg"},"nat":"DE"}],"info":{"seed":"f628b04f936708f3","results":20,"page":1,"version":"1.3"}};
 
 this.jsonData = x['results'];
  /*  this.nativeStorage.remove('userdata');
  alert('local storage cleared...'); */
  if(!this.jsonData){
    alert('IF');
    this.httpClient.get('https://randomuser.me/api/?results=100').subscribe(res=>{
      this.users = res['results'];
      this.jsonData = res['results'];      
    })
  }else{
    //alert('ELSE');
    this.users = [];
    setTimeout(() => {
      this.users = this.jsonData;        
    }, 1000);
  }
  //============================
  //const imageAttributes: ImageAttribute[] = [];
  this.imageAttributes.push({
    element: 'class',
    /* value: 'circle-photo animated infinite flipInY' */
    value: 'circle-photo'
  });
      //============================

}
  //------------ testing image loader -----------------

/* generatePDF_1(){
  let options = {
    documentSize: 'A4',
    type: 'base64'
  }
  this.pdfGenerator.fromData('<html><h1>Hello World</h1></html>', options)
    .then((base64)=>{
      alert('ok');
    })   // it will
    .catch((err)=>{
      //console.error(err)
      alert(err);
    });
} */
//===================================================
generatePDF_WORKING(){

  //XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
    //https://parall.ax/products/jspdf
       // Only pt supported (not mm or in)
       this.pdfObj = new jsPDF('p', 'pt');
       //this.pdfObj = new jsPDF('landscape');
       //this.pdfObj.setFontSize(12);
       this.pdfObj.setFontSize(8);
       this.pdfObj.setFont("courier");
       ////this.pdfObj.autoTable(columns, rows);
       //let curdtDisp = this.getCurrDateTimeOtherDisp();
 
       let curdtDisp = this.getCurrentDate();
       this.pdfObj.setFont("times");
       this.pdfObj.setFontType("italic");
 
       this.pdfObj.text(230, 20, 'Rental App');
       this.pdfObj.text(200, 30, curdtDisp);
       this.pdfObj.text(140, 40, 'Report - Amount Earned - ( Tenant:VILLA,Property:ABC)');
  //XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX

     //=========================== CHECK AND CREATE THE apps FOLDER ====================================

     this.file.checkDir(cordova.file.externalRootDirectory, "XXXX").then((result) => {
      //console.log("apps directory exists...");  
      alert("XXXX directory exists...");    
    }).catch((error) => {
      //console.log("33333333333 error :: " + JSON.stringify(error));  
      //------------------------------------------
      this.file.createDir(cordova.file.externalRootDirectory, "XXXX", false).then((result) => {
        //console.log("apps directory created...");      
        alert("XXXX directory created...");  
      }).catch((error) => {
        //console.log("6666 error could not create apps directory :: " + JSON.stringify(error));  
        alert("6666 error could not create apps directory :: " + JSON.stringify(error));  
      });
      //------------------------------------------
    });
  
    //=========================== CHECK AND CREATE THE apps FOLDER ====================================

  var fileName = "myPdfFile.pdf";
    
var options = {
    documentSize: 'A4',
    type: 'base64'                
};
 
var pdfhtml = '<html><body style="font-size:120%">This is the pdf content</body></html>';

let firstnamePdf = 'XXX';
let propertyName = '123';
let curdt = '22-09-2020';

////this.file.createFile(cordova.file.externalRootDirectory + "RentalApp",  this.firstnamePdf+"-"+this.propertyName +"Rpt-" + curdt + ".pdf", true).then((result) => {

this.file.createFile(cordova.file.externalRootDirectory + "XXXX",  firstnamePdf+"-"+propertyName +"Rpt-" + curdt + ".pdf", true).then((result) => {

  let pdfOutput = this.pdfObj.output();

  //============================================================================
  this.file.writeExistingFile(cordova.file.externalRootDirectory + "XXXX", firstnamePdf+"-"+propertyName +"Rpt-" + curdt + ".pdf", pdfOutput).then((result) => {
    alert('DONE...');
    this.callSuccess();
  }).catch((error) => {
    alert('error 5555555555555555555 :: ' + JSON.stringify(error));
  })
  //-----------------------------------------------------------
  //============================================================================
  

/* this.pdfGenerator.fromData(pdfhtml , options)
    .then(function(base64){               
        // To define the type of the Blob
        var contentType = "application/pdf";
            
        // if cordova.file is not available use instead :
        // var folderpath = "file:///storage/emulated/0/Download/";
      //   var folderpath = cordova.file.externalRootDirectory + "Download/"; //you can select other folders
       // this.savebase64AsPDF(folderpath, fileName, base64, contentType);        
        //var DataBlob = this.b64toBlob(base64,contentType,512);
                alert('base64 :: '+base64);    

    })  
    .catch((err)=>console.error(err)); */

    //---------------------------------------------
  }).catch((error) => {
    //console.log('error 666666666666666 : '+JSON.stringify(error));
    alert('Please hit PDF Icon Again!');
  })
}
//-----------------------------------------------------------
/* savebase64AsPDF(folderpath,filename,content,contentType){
  // Convert the base64 string in a Blob
  var DataBlob = this.b64toBlob(content,contentType,512);
  
  console.log("Starting to write the file :3");
  
  window.resolveLocalFileSystemURL(folderpath, function(dir) {
      console.log("Access to the directory granted succesfully");
      
      dir.getFile(filename, {create:true}, function(file) {

          console.log("File created succesfully.");
          file.createWriter(function(fileWriter) {
              console.log("Writing content to file");
              fileWriter.write(DataBlob);
          }, function(){
              alert('Unable to save file in path '+ folderpath);
          });
      });
  });
} */
//-------------------------------------------------------
b64toBlob(b64Data, contentType, sliceSize) {
  contentType = contentType || '';
  sliceSize = sliceSize || 512;

  var byteCharacters = atob(b64Data);
  var byteArrays = [];

  for (var offset = 0; offset < byteCharacters.length; offset += sliceSize) {
      var slice = byteCharacters.slice(offset, offset + sliceSize);

      var byteNumbers = new Array(slice.length);
      for (var i = 0; i < slice.length; i++) {
          byteNumbers[i] = slice.charCodeAt(i);
      }

      var byteArray = new Uint8Array(byteNumbers);

      byteArrays.push(byteArray);
  }

var blob = new Blob(byteArrays, {type: contentType});
return blob;
}
//--------------------------------------------------

//--------------------------------------------------------------------------------------------------------    
getCurrentDate() {

  var d_names = new Array("Sun", "Mon", "Tue",
    "Wed", "Thur", "Fri", "Sat");

  var m_names = new Array("Jan", "Feb", "Mar",
    "Apr", "May", "Jun", "Jul", "Aug", "Sept",
    "Oct", "Nov", "Dec");

  var d = new Date();
  var curr_day = d.getDay();
  var curr_date = d.getDate();
  var sup = "";
  if (curr_date == 1 || curr_date == 21 || curr_date == 31) {
    sup = "st";
  }
  else if (curr_date == 2 || curr_date == 22) {
    sup = "nd";
  }
  else if (curr_date == 3 || curr_date == 23) {
    sup = "rd";
  }
  else {
    sup = "th";
  }
  var curr_month = d.getMonth();
  var curr_year = d.getFullYear();

  var a_p = "";

  var curr_hour = d.getHours();
  if (curr_hour < 12) {
    a_p = "AM";
  }
  else {
    a_p = "PM";
  }
  if (curr_hour == 0) {
    curr_hour = 12;
  }
  if (curr_hour > 12) {
    curr_hour = curr_hour - 12;
  }

  let curr_min: any;
  curr_min = d.getMinutes();

  curr_min = curr_min + "";

  if (curr_min.length == 1) {
    curr_min = "0" + curr_min;
  }
  let curr_sec: any
  curr_sec = d.getSeconds();
  if (curr_sec.length == 1) {
    curr_sec = "0" + curr_sec;
  }


  //alert(d_names[curr_day] + ", " + m_names[curr_month] + " " + curr_date + ", " + curr_year + " " + curr_hour + ":" + curr_min + ":" + curr_sec + " " + a_p);
  return d_names[curr_day] + "," + m_names[curr_month] + " " + curr_date + "," + curr_year + " " + curr_hour + ":" + curr_min + ":" + curr_sec + " " + a_p;
}


//------------------------------------------ PDF RELATED ------------------------------------------------    


/* 
generatePDF(){


    //=========================== CHECK AND CREATE THE apps FOLDER ====================================

    this.file.checkDir(cordova.file.externalRootDirectory, "XXXX").then((result) => {
      //console.log("apps directory exists...");  
      alert("XXXX directory exists...");    
    }).catch((error) => {
      //console.log("33333333333 error :: " + JSON.stringify(error));  
      //------------------------------------------
      this.file.createDir(cordova.file.externalRootDirectory, "XXXX", false).then((result) => {
        //console.log("apps directory created...");      
        alert("XXXX directory created...");  
      }).catch((error) => {
        //console.log("6666 error could not create apps directory :: " + JSON.stringify(error));  
        alert("6666 error could not create apps directory :: " + JSON.stringify(error));  
      });
      //------------------------------------------
    });
  
    //=========================== CHECK AND CREATE THE apps FOLDER ====================================
  //XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
    //https://parall.ax/products/jspdf
       // Only pt supported (not mm or in)
       this.pdfObj = new jsPDF('p', 'pt');
       //this.pdfObj = new jsPDF('landscape');
       //this.pdfObj.setFontSize(12);
       this.pdfObj.setFontSize(8);
       this.pdfObj.setFont("courier");
       ////this.pdfObj.autoTable(columns, rows);
       //let curdtDisp = this.getCurrDateTimeOtherDisp();
 
       let curdtDisp = this.getCurrentDate();
       this.pdfObj.setFont("times");
       this.pdfObj.setFontType("italic");
 
       this.pdfObj.text(230, 20, 'Rental App');
       this.pdfObj.text(200, 30, curdtDisp);
       this.pdfObj.text(140, 40, 'Report - Amount Earned - ( Tenant:VILLA,Property:ABC)');

        var img = new Image()
        img.src = 'assets/logos/bb.jpg'
        this.pdfObj.addImage(img, 'png', 10, 78, 12, 15)

       var options = {
        documentSize: 'A4',
        type: 'base64'                
    };

      //++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
                
      let firstnamePdf = 'XXX';
      let propertyName = '222';
      let curdt = '22-09-2020';

      ////this.file.createFile(cordova.file.externalRootDirectory + "RentalApp",  this.firstnamePdf+"-"+this.propertyName +"Rpt-" + curdt + ".pdf", true).then((result) => {

      this.file.createFile(cordova.file.externalRootDirectory + "XXXX",  firstnamePdf+"-"+propertyName +"Rpt-" + curdt + ".pdf", true).then((result) => {

        let pdfOutput = this.pdfObj.output();

        //============================================================================
        this.file.writeExistingFile(cordova.file.externalRootDirectory + "XXXX", firstnamePdf+"-"+propertyName +"Rpt-" + curdt + ".pdf", pdfOutput).then((result) => {
          alert('DONE...');
          this.callSuccess();
        }).catch((error) => {
          alert('error 5555555555555555555 :: ' + JSON.stringify(error));
        })
        //-----------------------------------------------------------
        //============================================================================


    //---------------------------------------------
  }).catch((error) => {
    //console.log('error 666666666666666 : '+JSON.stringify(error));
    alert('Please hit PDF Icon Again!');
  })
}
//-----------------------------------------------------
public openPDF():void {
  let DATA = this.htmlData.nativeElement;
  let doc = new jsPDF('p','pt', 'a4');
  doc.fromHTML(DATA.innerHTML,15,15);
  doc.output('dataurlnewwindow');
} */






public downloadPDF_1():void {
  let DATA = this.htmlData.nativeElement;
  let doc = new jsPDF('p','pt', 'a4');

  var img = new Image()
  img.src = 'assets/logos/bb.jpg'
  //doc.addImage(img, 'png', 10, 78, 12, 15)
  doc.addImage(img, 'png', 150, 20, 50, 50)


 

//var doc = new jsPDF();
/* doc.setFontSize(40);
doc.text(30, 20, 'Hello world!');
doc.addImage(imgData, 'PNG', 15, 40, 200, 114);
doc.output('datauri'); */

doc.setFont("times");
doc.setFontType("italic");
doc.setFontSize(15);

doc.text(210, 40, 'Shopping App');
doc.setFontSize(10);

doc.text(210, 55, this.getCurrentDtTime());
doc.text(210, 65, 'Bill No: 2358745, Marina Mall,Vizag.');


  let handleElement = {
    '#editor':function(element,renderer){
      return true;
    }
  };
  doc.fromHTML(DATA.innerHTML,80,70,{
    'width': 200,
    'elementHandlers': handleElement
  });

  doc.save('demo-bill.pdf');
}
//----------------------------------------

public downloadPDF():void {

 

  let columns = [
    { title: "#.", dataKey: "sno" },
    { title: "Item Name", dataKey: "item" },
    { title: "Qty", dataKey: "qty" },
    { title: "Unit Price", dataKey: "unitprice" },
    { title: "Total", dataKey: "total" }  
  ];

  let rows = this.USERS;

  // Only pt supported (not mm or in)
  this.pdfObj = new jsPDF('p', 'pt');
  //this.pdfObj = new jsPDF('landscape');
  //this.pdfObj.setFontSize(12);
  this.pdfObj.setFontSize(8);
  this.pdfObj.setFont("courier");
  ////this.pdfObj.autoTable(columns, rows);
  //let curdtDisp = this.getCurrDateTimeOtherDisp();

  //------------------------------------------------------
  var img = new Image()
  img.src = 'assets/logos/bb.jpg'
  //doc.addImage(img, 'png', 10, 78, 12, 15)
  this.pdfObj.addImage(img, 'png', 40, 10, 50, 50);
  //------------------------------------------------------

  let curdtDisp = this.getCurrentDate();
  this.pdfObj.setFont("times");
  this.pdfObj.setFontType("italic");

  this.pdfObj.text(230, 30, 'Shopping App');
  this.pdfObj.text(200, 40, curdtDisp);
  this.pdfObj.text(140, 50, 'Bill No: - 15632552 - ( Location:Jagadamba Jn.,City: Vizag )');

  this.pdfObj.autoTable(columns, rows, {
    ////startY: 100,
    //startY: 50,
    startY: 65,
    //startY: this.pdfObj.autoTableEndPosY() + 30,
    styles: {//fillColor: [100, 255, 255],
      fontSize: 6,
      tableWidth: 'auto', // 'auto', 'wrap' or a numbe
      //columnWidth: 'wrap' // 'auto', 'wrap' or a number
      columnWidth: 'auto' // 'auto', 'wrap' or a number
      //    columnWidth: 'auto' // 'auto', 'wrap' or a number
    },
  });

  let pdfOutput = this.pdfObj.output();

  this.pdfObj.save('demo-bill.pdf');
}
//=============================================================

public downloadPDF_Mobile_1():void {

 

  let columns = [
    { title: "#.", dataKey: "sno" },
    { title: "Item Name", dataKey: "item" },
    { title: "Qty", dataKey: "qty" },
    { title: "Unit Price", dataKey: "unitprice" },
    { title: "Total", dataKey: "total" }  
  ];

  let rows = this.USERS;

  // Only pt supported (not mm or in)
  this.pdfObj = new jsPDF('p', 'pt');
  //this.pdfObj = new jsPDF('landscape');
  //this.pdfObj.setFontSize(12);
  this.pdfObj.setFontSize(8);
  this.pdfObj.setFont("courier");
  ////this.pdfObj.autoTable(columns, rows);
  //let curdtDisp = this.getCurrDateTimeOtherDisp();

  //------------------------------------------------------
  var img = new Image()
  img.src = 'assets/logos/bb.jpg'
  //doc.addImage(img, 'png', 10, 78, 12, 15)
  this.pdfObj.addImage(img, 'png', 40, 10, 50, 50);
  //------------------------------------------------------

  let curdtDisp = this.getCurrentDate();
  this.pdfObj.setFont("times");
  this.pdfObj.setFontType("italic");

  this.pdfObj.text(230, 30, 'Shopping App');
  this.pdfObj.text(200, 40, curdtDisp);
  this.pdfObj.text(140, 50, 'Bill No: - 15632552 - ( Location:Jagadamba Jn.,City: Vizag )');

  this.pdfObj.autoTable(columns, rows, {
    ////startY: 100,
    //startY: 50,
    startY: 65,
    //startY: this.pdfObj.autoTableEndPosY() + 30,
    styles: {//fillColor: [100, 255, 255],
      fontSize: 6,
      tableWidth: 'auto', // 'auto', 'wrap' or a numbe
      //columnWidth: 'wrap' // 'auto', 'wrap' or a number
      columnWidth: 'auto' // 'auto', 'wrap' or a number
      //    columnWidth: 'auto' // 'auto', 'wrap' or a number
    },
  });

  let pdfOutput = this.pdfObj.output();

  let firstnamePdf = 'Narresh';
  let propertyName = 'Villa';
  let curdt = '22-09-2020';

  this.file.writeExistingFile(cordova.file.externalRootDirectory + "ShoppingApp", firstnamePdf+"-"+
  propertyName +"Rpt-" + curdt + ".pdf", pdfOutput).then((result) => {
  
    //wasim
    //this.pdfOpenFilePath = cordova.file.externalRootDirectory + "RentalApp/"+firstnamePdf + "-" + propertyName + "Rpt-" + curdt + ".pdf";

    //alert('this.pdfOpenFilePath ::: ' + this.pdfOpenFilePath);
    //this.showPdf = false;

    this.callSuccess();
  }).catch((error) => {
    alert('error 5555555555555555555 :: ' + JSON.stringify(error));
  })
  //-----------------------------------------------------------

  //this.pdfObj.save('demo-bill.pdf');
}
//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
public downloadPDF_Mobile():void {

  let columns = [
    { title: "#.", dataKey: "sno" },
    { title: "Item Name", dataKey: "item" },
    { title: "Qty", dataKey: "qty" },
    { title: "Unit Price", dataKey: "unitprice" },
    { title: "Total", dataKey: "total" }  
  ];

  let rows = this.USERS;

  // Only pt supported (not mm or in)
  this.pdfObj = new jsPDF('p', 'pt');
  //this.pdfObj = new jsPDF('landscape');
  //this.pdfObj.setFontSize(12);
  this.pdfObj.setFontSize(8);
  this.pdfObj.setFont("courier");
  ////this.pdfObj.autoTable(columns, rows);
  //let curdtDisp = this.getCurrDateTimeOtherDisp();

  //------------------------------------------------------
 /*  var img = new Image();
  img.src = 'assets/logos/bb.jpg';
  //doc.addImage(img, 'png', 10, 78, 12, 15)
  this.pdfObj.addImage(img, 'png', 40, 10, 50, 50); */
  //------------------------------------------------------
  //this.pdfObj.addImage(this.getBase64Img(), 'png', 40, 10, 50, 50);   

  //var doc = new jsPDF();
  //var imgData = this.getBase64Img();
  //var imgData = path.resolve('sample.jpg');

  //console.log(this.imgDataa);
  //this.pdfObj.setFontSize(40);
  //this.pdfObj.text(30, 20, 'Hello world!');
  //this.pdfObj.addImage(this.imgDataa, 'JPG', 15, 40, 180, 160);

  //var source = document.getElementById('invoiceTemplate');
/*   let DATA = this.invoiceTemplate.nativeElement;
  alert( DATA.innerHTML);  */ 

  //this.pdfObj.addImage(this.imgDataa, 'JPEG', 15, 40, 180, 180);
  
  //this.pdfObj.addImage(source , 'JPEG', 40, 10, 50, 50);
  ////this.pdfObj.addImage(this.imgDataa , 'JPEG', 40, 10, 50, 50);


  //-------------------------------------------------------------
  //let filePath: string = 'file:///...';
  //let filePath: string = "../../assets/logos/bb.jpg";
  //let imagePath = 'https://upload.wikimedia.org/wikipedia/commons/5/5a/Flower_11.jpg';
  //let imagePath = '../../assets/logos/bb.jpg';

 /*  this.base64.encodeFile(imagePath).then((base64File: string) => {
    this.imgDataa = this.domSanitizer.bypassSecurityTrustUrl(base64File);
    alert('++++++++++++ '+this.imgDataa);

    }).catch(error=>{
      console.log(error);
    }); */
    

    /* var img = new Image();
    var src = "https://www.jeffld.com/img/so/testimage001.png";
    //var src = "../../assets/logos/bb.jpg";
    img.src = src;
  
    console.log("Create jsPDF object");
    //var pdf = new jsPDF("p", "pt", "letter");
  
    console.log("Add Image");
    this.pdfObj.addImage(img, "png", 10, 10, 150, 150);
    //this.pdfObj.addImage(img, "jpeg", 10, 10, 150, 150);
  
     */

 /*  this.base64.encodeFile(filePath).then((base64File: string) => {
    console.log('base64File :::: '+base64File);
    this.imgDataa = base64File;
  }, (err) => {
    console.log(err);
  }); */
  //-------------------------------------------------------------
  //this.pdfObj.addImage(this.imgDataa , 'JPEG', 40, 10, 50, 50);   

  this.pdfObj.addImage('data:image/jpeg;base64,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' , 'JPEG', 40, 10, 50, 50);   

  //this.pdfObj.addImage("/assets/logos/bb.jpg", "JPEG", 15, 40, 180, 180);
  //doc.output('datauri');
  //this.pdfObj.output('blob');
  this.pdfObj.output('datauri');
  //------------------------------------------------------

  let curdtDisp = this.getCurrentDate();
  this.pdfObj.setFont("times");
  this.pdfObj.setFontType("italic");

  this.pdfObj.text(230, 30, 'Shopping App');
  this.pdfObj.text(200, 40, curdtDisp);
  this.pdfObj.text(140, 50, 'Bill No: - 15632552 - ( Location:Jagadamba Jn.,City: Vizag )');

  this.pdfObj.autoTable(columns, rows, {
    ////startY: 100,
    //startY: 50,
    startY: 65,
    //startY: this.pdfObj.autoTableEndPosY() + 30,
    styles: {//fillColor: [100, 255, 255],
      fontSize: 6,
      tableWidth: 'auto', // 'auto', 'wrap' or a numbe
      //columnWidth: 'wrap' // 'auto', 'wrap' or a number
      columnWidth: 'auto' // 'auto', 'wrap' or a number
      //    columnWidth: 'auto' // 'auto', 'wrap' or a number
    },
  });

  let pdfOutput = this.pdfObj.output();

  let firstnamePdf = 'Narresh';
  let propertyName = 'Villa';
  let curdt = '22-09-2020';

  this.file.writeExistingFile(cordova.file.externalRootDirectory + "ShoppingApp", firstnamePdf+"-"+
  propertyName +"Rpt-" + curdt + ".pdf", pdfOutput).then((result) => {
    this.callSuccessPDF();
  }).catch((error) => {
    alert('error 5555555555555555555 :: ' + JSON.stringify(error));
  })
  //-----------------------------------------------------------  
}
//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++
callSuccessPDF(){
  swal(
    {
      title: 'Success',
      //text: "File Uploaded Successfully...",
      html: "PDF Generated Successfully...",
      animation: true,
      type: "success",
      confirmButtonColor: '#ffffff',
      confirmButtonText: '<span style="color:#4e4e4e">OK</span>'
    }).catch(swal.noop);
  //------------------------------------------------
  }

  //-----------------------------------------------
 /*  getBase64Img(){
    var xhr = new XMLHttpRequest();       
  xhr.open("GET", "/assets/logos/bb.jpg", true); 
  xhr.responseType = "blob";
  xhr.onload = function (e) {
          console.log(this.response);
          var reader = new FileReader();
          reader.onload = function(event) {
             var res = event.target.result;
             //alert(res);       
             //console.log(res);      
          }
          var file = this.response;
          reader.readAsDataURL(file)
  };
  xhr.send();
  } */
  //-----------------------------------------------
  //=========================================================
async presentLoading(msg) {
  const loading = await this.loadingCtrl.create({
    message: msg
  });
  return await loading.present();
}
//==========================================================
/* exportPdf() {
  this.presentLoading('Creating PDF file...');
  const div = document.getElementById("printable-area");
  //const options = { background: "white", height: div.clientWidth, width: div.clientHeight };
  const options = { background: "white", height: "540px", width: "595px" };
  domtoimage.toPng(div, options).then((dataUrl)=> {
    //Initialize JSPDF
    var doc = new jsPDF("p","mm","a4");
    //Add image Url to PDF
    
    dataUrl = 'data:image/jpeg;base64,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';
    
    console.log(dataUrl);

    //doc.addImage(dataUrl, 'PNG', 20, 20, 240, 180);
    doc.addImage(dataUrl, 'JPEG', 20, 20, 240, 180);

    let pdfOutput = doc.output();
    // using ArrayBuffer will allow you to put image inside PDF
    let buffer = new ArrayBuffer(pdfOutput.length);
    let array = new Uint8Array(buffer);
    for (var i = 0; i < pdfOutput.length; i++) {
        array[i] = pdfOutput.charCodeAt(i);
    }


    //This is where the PDF file will stored , you can change it as you like
    // for more information please visit https://ionicframework.com/docs/native/file/
    const directory = this.file.dataDirectory ;
    const fileName = "invoice.pdf";
    let options: IWriteOptions = { replace: true };

    this.file.checkFile(directory, fileName).then((success)=> {
      //Writing File to Device
      this.file.writeFile(directory,fileName,buffer, options)
      .then((success)=> {
        this.loadingCtrl.dismiss();
        console.log("File created Succesfully" + JSON.stringify(success));
        this.fileOpener.open(this.file.dataDirectory + fileName, 'application/pdf')
          .then(() => console.log('File is opened'))
          .catch(e => console.log('Error opening file', e));
      })
      .catch((error)=> {
        this.loadingCtrl.dismiss();
        console.log("Cannot Create File " +JSON.stringify(error));
      });
    })
    .catch((error)=> {
      //Writing File to Device
      this.file.writeFile(directory,fileName,buffer)
      .then((success)=> {
        this.loadingCtrl.dismiss();
        console.log("File created Succesfully" + JSON.stringify(success));
        this.fileOpener.open(this.file.dataDirectory + fileName, 'application/pdf')
          .then(() => console.log('File is opened'))
          .catch(e => console.log('Error opening file', e));
      })
      .catch((error)=> {
        this.loadingCtrl.dismiss();
        console.log("Cannot Create File " +JSON.stringify(error));
      });
    });
  })
  .catch(function (error) {
    //this.loadingCtrl.dismiss();
    console.error('oops, something went wrong!', error);
  });
} */

//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
roundWithDecimals(value, decimals) {
  //return Number(Math.round(value+'e'+decimals)+'e-'+decimals);
  //return Number((1.005).toFixed(2));
  return Number((value).toFixed(decimals));
}

public downloadPDF_Mobile_ImpGood(billno,createdttm,qty,amt,cartitems):void {

console.log('amt :: '+amt);
  //console.log("IN WORDS : "+this.numToWordsWithDecimal(Math.round(1046.1999999999998)));
  console.log("IN WORDS : "+this.roundWithDecimals(1046.1999999999998,2));
  console.log("IN WORDS : "+this.numToWordsWithDecimal(this.roundWithDecimals(1046.1999999999998,2)));

  console.log('billno :: '+billno);
  console.log('createdttm :: '+createdttm);
  console.log('qty :: '+qty);
  console.log('amt :: '+amt);
  for(let i=0;i<cartitems.length;i++){
    console.log('name :: '+cartitems[i].name);
    console.log('qty :: '+cartitems[i].qty);
    console.log('rate :: '+cartitems[i].rate);
    console.log('oldrate :: '+cartitems[i].oldrate);
    console.log('qtyx :: '+cartitems[i].qtyx);
    console.log('amtx :: '+cartitems[i].amtx);
    console.log('discount :: '+cartitems[i].discount);
    console.log('amtwithdiscx :: '+cartitems[i].amtwithdiscx);
    console.log('amtwithdiscxTot :: '+cartitems[i].amtwithdiscxTot);
    console.log('description :: '+cartitems[i].description);
  }

    //=========================== CHECK AND CREATE THE apps FOLDER ====================================
  //https://cordova.apache.org/docs/en/latest/reference/cordova-plugin-file/
    //sdcard
    ////this.file.checkDir(cordova.file.externalRootDirectory, "BBAppxPdfs").then((result) => {
      //dataDirectory
      this.file.checkDir(cordova.file.dataDirectory, "BBAppxPdfs").then((result) => {


      //console.log("apps directory exists..."); 
      ////alert("BBAppxPdfs directory exists...");    
      
      this.presentLoading('Creating PDF file...');
    }).catch((error) => {
      //console.log("33333333333 error :: " + JSON.stringify(error));  
      //------------------------------------------
      //sdcard
      ////this.file.createDir(cordova.file.externalRootDirectory, "BBAppxPdfs", false).then((result) => {
        //dataDirectory
        this.file.createDir(cordova.file.dataDirectory, "BBAppxPdfs", false).then((result) => {


        //console.log("apps directory created...");      
        ////alert("BBAppxPdfs directory created...Please hit pdf icon again.");
        this.showToastx('Please click PDF Icon again!');

        this.loadingCtrl.dismiss();
        return;  
        //XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
        //XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
      }).catch((error) => {
        //console.log("6666 error could not create apps directory :: " + JSON.stringify(error));  
        this.loadingCtrl.dismiss();
        ////alert("6666 error could not create apps directory :: " + JSON.stringify(error));  
      });
      //------------------------------------------
    });
  
    //=========================== CHECK AND CREATE THE apps FOLDER ====================================

    console.log('billno :: '+billno);
    console.log('createdttm :: '+createdttm);
    console.log('qty :: '+qty);
    console.log('amt :: '+amt);
    for(let i=0;i<cartitems.length;i++){
      console.log('name :: '+cartitems[i].name);
      console.log('qty :: '+cartitems[i].qty);
      console.log('rate :: '+cartitems[i].rate);
      console.log('oldrate :: '+cartitems[i].oldrate);
      console.log('qtyx :: '+cartitems[i].qtyx);
      console.log('amtx :: '+cartitems[i].amtx);
      console.log('discount :: '+cartitems[i].discount);
      console.log('amtwithdiscx :: '+cartitems[i].amtwithdiscx);
      console.log('amtwithdiscxTot :: '+cartitems[i].amtwithdiscxTot);
      console.log('description :: '+cartitems[i].description);
    }
  
    //this.presentLoading('Creating PDF file...');
  
    let columns = [
      /* { title: "#.", dataKey: "sno" }, */
      { title: "Item", dataKey: "name" },
      { title: "Qty", dataKey: "qty" },
      { title: "Unit Price", dataKey: "rate" },
      { title: "Units", dataKey: "qtyx" },
      { title: "Disc%", dataKey: "discount" },
      { title: "Rate w/Disc%", dataKey: "amtwithdiscx" },
      /* { title: "Total", dataKey: "amtx" }   */ 
      { title: "Total", dataKey: "amtwithdiscxTot" }  
    ];
  
    let rows = cartitems;
  
    // Only pt supported (not mm or in)
    this.pdfObj = new jsPDF('p', 'pt');
    //this.pdfObj = new jsPDF('landscape');
    //this.pdfObj.setFontSize(12);
    this.pdfObj.setFontSize(8);
    this.pdfObj.setFont("courier");
  
     let dataUrl = 'data:image/jpeg;base64,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';
    this.pdfObj.addImage(dataUrl, 'JPEG', 40, 10, 50, 50);
  
    let curdtDisp = this.getCurrentDate();
    this.pdfObj.setFont("times");
    this.pdfObj.setFontType("italic");
  
    this.pdfObj.text(230, 30, 'Shopping App');
    this.pdfObj.text(200, 40, curdtDisp);
  
    //billno,createdttm,qty,amt
  
    //this.pdfObj.text(140, 50, 'Bill No: '+billno+' [ '+createdttm+' ] - ( '+qty+' | '+amt+' )');
    this.pdfObj.text(160, 50, 'Bill No: '+billno+' [ '+createdttm+' ] - ( '+qty+' | '+amt.toFixed(2)+' )');//ramu
  
    this.pdfObj.autoTable(columns, rows, {
      ////startY: 100,
      //startY: 50,
      startY: 65,
      //startY: this.pdfObj.autoTableEndPosY() + 30,
      styles: {//fillColor: [100, 255, 255],
        fontSize: 6,
        tableWidth: 'auto', // 'auto', 'wrap' or a numbe
        //columnWidth: 'wrap' // 'auto', 'wrap' or a number
        columnWidth: 'auto' // 'auto', 'wrap' or a number
        //    columnWidth: 'auto' // 'auto', 'wrap' or a number
      },
    });
  
    //=====================================================
    let columnsTotal = [
      { title: "Grand Total", dataKey: "grdamt" },
      { title: "Units", dataKey: "grdunits" }    
    ];
  
    let rowsTotal = [{"grdamt":amt.toFixed(2),"grdunits":qty}];
  
    this.pdfObj.autoTable(columnsTotal, rowsTotal, {
      startY: this.pdfObj.autoTableEndPosY() + 30,
      styles: {//fillColor: [100, 255, 255],
        fontSize: 6,
        tableWidth: 'auto', // 'auto', 'wrap' or a numbe
        //columnWidth: 'wrap' // 'auto', 'wrap' or a number
        columnWidth: 'auto' // 'auto', 'wrap' or a number
        //    columnWidth: 'auto' // 'auto', 'wrap' or a number
      },
    });
    //=====================================================
    /* let columnsBillNo = [
      { title: "Bill No.", dataKey: "billno" }
    ];
  
    let rowsBillNo = [{"billno":billno}];
  
    this.pdfObj.autoTable(columnsBillNo, rowsBillNo, {
      startY: this.pdfObj.autoTableEndPosY() + 30,
      theme: 'striped',
      styles: {//fillColor: [100, 255, 255],
        fontSize: 6,
        tableWidth: 'auto', // 'auto', 'wrap' or a numbe
        //columnWidth: 'wrap' // 'auto', 'wrap' or a number
        columnWidth: 'auto' // 'auto', 'wrap' or a number
        //    columnWidth: 'auto' // 'auto', 'wrap' or a number
      },
    }); */
    //=====================================================
  
     //=====================================================
     let columnsAmtWords = [
      { title: "Amount.", dataKey: "amount" }
    ];
  
/*  let rowsAmtWords = [{"amount":this.numToWords(amt)}];
    console.log("IN WORDS : "+this.numToWords(amt)); */
    ////console.log("IN WORDS : "+this.numToWordsWithDecimal(this.roundWithDecimals(1046.1999999999998,2)));
   /*  
   let rowsAmtWords = [{"amount":this.numToWordsWithDecimal(Math.round(amt))}];
   console.log("IN WORDS : "+this.numToWordsWithDecimal(Math.round(amt)));
 */

let rowsAmtWords = [{"amount":this.numToWordsWithDecimal(this.roundWithDecimals(amt,2))}];
console.log("ROUNDED AMOUNT ---->>> : "+this.roundWithDecimals(amt,2));
console.log("IN WORDS ---->>> : "+this.numToWordsWithDecimal(this.roundWithDecimals(amt,2)));

    
  
    this.pdfObj.autoTable(columnsAmtWords, rowsAmtWords, {
      startY: this.pdfObj.autoTableEndPosY() + 30,
      theme: 'grid',
      styles: {//fillColor: [100, 255, 255],
        fontSize: 6,
        tableWidth: 'auto', // 'auto', 'wrap' or a numbe
        //columnWidth: 'wrap' // 'auto', 'wrap' or a number
        columnWidth: 'auto', // 'auto', 'wrap' or a number
        //    columnWidth: 'auto' // 'auto', 'wrap' or a number
      },
    });
    //=====================================================
    
    let pdfOutput = this.pdfObj.output();
  
     //-----------------------------------------------------------  
    let firstnamePdf = billno;
    let propertyName = 'Villa';
    let curdt = this.getCurrentDtTimeForFileName();
  
    //------------------------------------------
    // using ArrayBuffer will allow you to put image inside PDF
    let buffer = new ArrayBuffer(pdfOutput.length);
    let array = new Uint8Array(buffer);
    for (var i = 0; i < pdfOutput.length; i++) {
        array[i] = pdfOutput.charCodeAt(i);
    }
    //------------------------------------------
  
    //sdcard
    ////this.file.writeFile(cordova.file.externalRootDirectory + "BBAppxPdfs", firstnamePdf+"-"+
    //dataDirectory
    this.file.writeFile(cordova.file.dataDirectory + "BBAppxPdfs", firstnamePdf+"-"+


    "Rpt-" + curdt + ".pdf", buffer).then((result) => {
  
      this.callSuccessPDF();
      this.loadingCtrl.dismiss();
      //===============================================================
      //sdcard
      ////this.fileOpener.open(cordova.file.externalRootDirectory + "/BBAppxPdfs/"+ firstnamePdf+"-"+
      //dataDirectory
      this.fileOpener.open(cordova.file.dataDirectory + "/BBAppxPdfs/"+ firstnamePdf+"-"+

      "Rpt-" + curdt + ".pdf", 'application/pdf')
      .then(() => {
        console.log('File is opened');
        this.loadingCtrl.dismiss();
      })
      .catch(e => {
        console.log('Error opening file', e);
        this.loadingCtrl.dismiss();
      });
      //===============================================================
  
    }).catch((error) => {
      ////alert('error 5555555555555555555 :: ' + JSON.stringify(error));
      this.loadingCtrl.dismiss();
    })
    //-----------------------------------------------------------   
}

getCurrentDtTimeForFileName() {
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

  //let date_time = curr_yearStr + "-" + curr_monthStr + "-" + curr_dateStr + " " + cur_hourStr + ":" + curr_minStr + ":" + curr_secStr;
  let date_time = curr_yearStr + "-" + curr_monthStr + "-" + curr_dateStr + "-" + cur_hourStr + "" + curr_minStr + "" + curr_secStr;
  //////////////////////////////////////
  return date_time;
}

showChevronDetails(item,itemsDiscounts,selectedIndx){
 /*  console.log(JSON.stringify(item));
  console.log(item.chevFlg);  */

  

 /*  //-------------------------------------
  for(let i=0;i<itemsDiscounts.length;i++){
    console.log(i + " -- " + selectedIndx);
    if(i === selectedIndx){
    }else{
      itemsDiscounts[i].chevFlg = "True";
    }
  }
  //----------------------------------- */
  item.chevFlg = !item.chevFlg;  
    
}
//----------------------------------------------------
//-----------------------------------
/* fetchBookings() {
  this.ordersxService.getOrdersxList().valueChanges().subscribe(res => {
    console.log('ORDERS LIST :: '+JSON.stringify(res));
  })
} */
//-----------------------------------

numToWords(value){
  let a = [
    '',
    'one ',
    'two ',
    'three ',
    'four ',
    'five ',
    'six ',
    'seven ',
    'eight ',
    'nine ',
    'ten ',
    'eleven ',
    'twelve ',
    'thirteen ',
    'fourteen ',
    'fifteen ',
    'sixteen ',
    'seventeen ',
    'eighteen ',
    'nineteen '];

  let b = [
    '',
    '',
    'twenty',
    'thirty',
    'forty',
    'fifty',
    'sixty',
    'seventy',
    'eighty',
    'ninety'];
  let num: any = Number(value);
  if (num) {
    if ((num = num.toString()).length > 9)  { return 'We are not the Iron Bank, you can lower down the stakes :)'; }
    const n = ('000000000' + num).substr(-9).match(/^(\d{2})(\d{2})(\d{2})(\d{1})(\d{2})$/);
    if (!n) {return ''; }
    let str = '';
    str += (Number(n[1]) !== 0) ? (a[Number(n[1])] || b[n[1][0]] + ' ' + a[n[1][1]]) + 'crore ' : '';
    str += (Number(n[2]) !== 0) ? (a[Number(n[2])] || b[n[2][0]] + ' ' + a[n[2][1]]) + 'lakh ' : '';
    str += (Number(n[3]) !== 0) ? (a[Number(n[3])] || b[n[3][0]] + ' ' + a[n[3][1]]) + 'thousand ' : '';
    str += (Number(n[4]) !== 0) ? (a[Number(n[4])] || b[n[4][0]] + ' ' + a[n[4][1]]) + 'hundred ' : '';
    str += (Number(n[5]) !== 0) ? ((str !== '') ? 'and ' : '') +
    (a[Number(n[5])] || b[n[5][0]] + ' ' +
    a[n[5][1]]) + 'rupee' : '';
    console.log(this.capitalizeWords(str));
    return this.capitalizeWords(str);
  }else{
    return '';
  }

}
//===============================================
 capitalizeWords(string) {
  return string.replace(/(?:^|\s)\S/g, function(a) { return a.toUpperCase(); });
};
//-------------------------------------
refreshDB(){
  this.refreshFlg = true;
  this.itemsFinal = [];
  let bookingRes = this.ordersxService.getOrdersxList();
  //setTimeout(() => {
    bookingRes.snapshotChanges().subscribe(res => {
      res.forEach(item => {
        this.itemsFinal.push({"itemz":item.payload.val()});
      });
      this.refreshFlg = false;
    })
  //}, 3000);
}
//============================================
showToastx(msg){
  //this.toast.show(`I'm a toast`, '5000', 'center').subscribe(
    this.toast.show(msg, '5000', 'center').subscribe(
    toast => {
      console.log(toast);
    }
  );
}
//============================================


numToWordsWithDecimal(s){
  var th = ['', 'thousand', 'million', 'billion', 'trillion'];

var dg = ['zero', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine'];
var tn = ['ten', 'eleven', 'twelve', 'thirteen', 'fourteen', 'fifteen', 'sixteen', 'seventeen', 'eighteen', 'nineteen'];
var tw = ['twenty', 'thirty', 'forty', 'fifty', 'sixty', 'seventy', 'eighty', 'ninety'];
//function toWords(s) {
    s = s.toString();
    s = s.replace(/[\, ]/g, '');
    if (s != parseFloat(s)) return 'not a number';
    var x = s.indexOf('.');
    if (x == -1) x = s.length;
    if (x > 15) return 'too big';
    var n = s.split('');
    var str = '';
    var sk = 0;
    for (var i = 0; i < x; i++) {
        if ((x - i) % 3 == 2) {
            if (n[i] == '1') {
                str += tn[Number(n[i + 1])] + ' ';
                i++;
                sk = 1;
            } else if (n[i] != 0) {
                str += tw[n[i] - 2] + ' ';
                sk = 1;
            }
        } else if (n[i] != 0) {
            str += dg[n[i]] + ' ';
            if ((x - i) % 3 == 0) str += 'hundred ';
            sk = 1;
        }
        if ((x - i) % 3 == 1) {
            if (sk) str += th[(x - i - 1) / 3] + ' ';
            sk = 0;
        }
    }
    if (x != s.length) {
        var y = s.length;
        str += 'point ';
        for (let i = x + 1; i < y; i++) str += dg[n[i]] + ' ';
    }
    return str.replace(/\s+/g, ' ');
}
//}

getFormattedTotal(amtwithdiscx , qtyx){
  return Number(amtwithdiscx * qtyx).toFixed(2);
}
 
}
