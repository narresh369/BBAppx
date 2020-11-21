import { ChangeDetectorRef, Component, OnInit } from '@angular/core';

import { ActivatedRoute } from '@angular/router';
import { SampleShellListingModel } from './sample-shell.model';
import { SampleShellListingModel2 } from './sample-shell.model2';
import { SampleShellListingModel3 } from './sample-shell.model3';
import { NavigationExtras, Router } from '@angular/router';
import { AlertController, LoadingController, ToastController } from '@ionic/angular';
import { MasterdetailService } from '../services/masterdetail.service';
import { Network } from '@ionic-native/network/ngx';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-homexshell',
  templateUrl: './homexshell.page.html',
  styleUrls: ['./homexshell.page.scss',
  './shell-elements.scss'],
})
export class HomexshellPage implements OnInit {

  itemsDiscountsForYou: any[] = [];
  itemsBestOffers: any[] = [];

  articles: any[] = [
    { title: 'Grails 4 Tutorial: Spring Security Core Login Example', image: './assets/imgsx/article1.png',lbl:"10%","itemname":"Oats","qty":"1kg","rate":"100.00","oldrate":"110.00", },
    { title: 'Angular Material Form Controls, Form Field and Input Examples', image: './assets/imgsx/article2.png',lbl:"20%" ,"itemname":"Oats","qty":"1kg","rate":"100.00","oldrate":"110.00",},
    { title: 'Angular 8 Tutorial: Observable and RXJS Examples', image: './assets/imgsx/article3.png',lbl:"10%","itemname":"Oats","qty":"1kg","rate":"100.00","oldrate":"110.00", },
    { title: 'React Native Tutorial: Facebook Login Example', image: './assets/imgsx/article4.png',lbl:"5%" ,"itemname":"Oats","qty":"1kg","rate":"100.00","oldrate":"110.00",},
    { title: 'Spring Boot Tutorial: Build an MVC Java Web App using Netbeans', image: './assets/imgsx/article5.png',lbl:"15%","itemname":"Oats","qty":"1kg","rate":"100.00","oldrate":"110.00", },
    { title: 'Ionic 4 Tutorial: Facebook Login Example', image: './assets/imgsx/article6.png',lbl:"8%","itemname":"Oats","qty":"1kg","rate":"100.00","oldrate":"110.00", },
    { title: 'View Google Maps in HTML Page', image: './assets/imgsx/article7.png',lbl:"12%","itemname":"Oats","qty":"1kg","rate":"100.00","oldrate":"110.00", },
    { title: 'Angular 8 Tutorial: REST API and HttpClient Examples', image: './assets/imgsx/article8.png',lbl:"10%" ,"itemname":"Oats","qty":"1kg","rate":"100.00","oldrate":"110.00",},
    { title: 'MEAN Stack (Angular 8) Tutorial: Build a Simple Blog CMS', image: './assets/imgsx/article9.png',lbl:"12.5%" ,"itemname":"Oats","qty":"1kg","rate":"100.00","oldrate":"110.00",},
    { title: 'MongoDB Tutorial: Aggregate Method Example', image: './assets/imgsx/article10.png',lbl:"30%" ,"itemname":"Oats","qty":"1kg","rate":"100.00","oldrate":"110.00",},
    { title: 'Ionic 4 Tutorial: Angular 8 Multilevel Accordion Menu Example', image: './assets/imgsx/article11.png',lbl:"15%","itemname":"Oats","qty":"1kg","rate":"100.00","oldrate":"110.00", },
    { title: 'React Native Firebase Cloud Messaging (FCM) Push Notification', image: './assets/imgsx/article12.png',lbl:"45%","itemname":"Oats","qty":"1kg","rate":"100.00","oldrate":"110.00", }
  ];
  
  slideOpts = {
    initialSlide: 0,
    speed: 400,
    slidesPerView: 1,
    autoplay:true,pagination: {
      el: '.swiper-pagination',
      clickable: true,
      renderBullet: function (index, className) {
        /* return '<span class="' + className + '">' + (index + 1) + '</span>'; */
        /* return '<span class="' + className + '">' + (index + 1) + '</span>'; */
        return '<span class="' + className + '"></span>';
      },
    }
 };
  iconLblsRand = [
  {"icon":"cut-outline","label1":"10%","label":"Discount 10%","color":"green","id": "1","number":this.getRandomNumber(),"vid":"http://techslides.com/demos/sample-videos/small.mp4"},
  {"icon":"book-outline","label1":"15%","label":"Discount 15%","color":"red","id": "2","number":this.getRandomNumber(),"vid":"http://img.mobiscroll.com/demos/trailer_iphone.m4v"},
  {"icon":"alarm-outline","label1":"13%","label":"Discount 13%","color":"orange","id": "3","number":this.getRandomNumber(),"vid":"http://techslides.com/demos/sample-videos/small.mp4"},
  {"icon":"alert-circle-outline","label1":"12%","label":"Discount 12%","color":"brown","id": "4","number":this.getRandomNumber(),"vid":"http://img.mobiscroll.com/demos/trailer_iphone.m4v"},
  {"icon":"american-football-outline","label1":"25%","label":"Discount 25%","color":"navy","id": "5","number":this.getRandomNumber(),"vid":"http://techslides.com/demos/sample-videos/small.mp4"},
  {"icon":"bicycle-outline","label1":"50%","label":"Discount 50%","color":"magenta","id": "6","number":this.getRandomNumber(),"vid":"http://img.mobiscroll.com/demos/trailer_iphone.m4v"},

  {"icon":"bicycle-outline","label1":"50%","label":"Discount 50%","color":"magenta","id": "7","number":this.getRandomNumber(),"vid":"http://img.mobiscroll.com/demos/trailer_iphone.m4v"},
  {"icon":"bicycle-outline","label1":"50%","label":"Discount 50%","color":"magenta","id": "8","number":this.getRandomNumber(),"vid":"http://img.mobiscroll.com/demos/trailer_iphone.m4v"}
  
];
  //----------------------------------------------------------

  // We will assign data coming from the Route Resolver to this property
  routeResolveData1: SampleShellListingModel;
  routeResolveData2: SampleShellListingModel2;
  routeResolveData3: SampleShellListingModel3;

  constructor(
    private route: ActivatedRoute,
    private loadingCtrl: LoadingController,
    private router:Router,
    private masterDetailService: MasterdetailService,
    private network: Network,
    private toastCtrl: ToastController,
    public alertController: AlertController,
    //private imageLoader:ImageLoaderService,
    private httpClient:HttpClient,
    private cdref: ChangeDetectorRef
  ) {
    this.itemsDiscountsForYou = [
      {"icon":"cut-outline","itemname":"Oats","qty":"1kg","rate":"100.00","oldrate":"110.00","label1":"10%","label":"Discount 10%","color":"green","id": "1","number":this.getRandomNumber(),"vid":"https://5.imimg.com/data5/AB/QP/MY-2968665/whole-grain-oats-500x500.jpg"},
      {"icon":"book-outline","itemname":"Meat","qty":"1kg","rate":"550.00","oldrate":"610.00","label1":"15%","label":"Discount 15%","color":"red","id": "2","number":this.getRandomNumber(),"vid":"https://www.incimages.com/uploaded_files/image/1920x1080/getty_80116649_344560.jpg"},
      {"icon":"alarm-outline","itemname":"Wheat","qty":"1kg","rate":"82.00","oldrate":"90.00","label1":"13%","label":"Discount 13%","color":"orange","id": "3","number":this.getRandomNumber(),"vid":"https://5.imimg.com/data5/ST/QW/MY-38700875/fresh-wheat-crop-500x500.jpg"},
      {"icon":"alert-circle-outline","itemname":"Masoor","qty":"1kg","rate":"125.00","oldrate":"135.00","label1":"12%","label":"Discount 12%","color":"brown","id": "4","number":this.getRandomNumber(),"vid":"https://5.imimg.com/data5/MF/XV/MY-17000375/masoor-malka-500x500.jpg"},
      {"icon":"american-football-outline","itemname":"Corn","qty":"1kg","rate":"140.00","oldrate":"155.00","label1":"25%","label":"Discount 25%","color":"navy","id": "5","number":this.getRandomNumber(),"vid":"https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTAn99hty2YRqc0rNJBzLb2fIq0uaNKBIoG6A&usqp=CAU"},
      {"icon":"bicycle-outline","itemname":"Custard","qty":"330ml","rate":"45.00","oldrate":"60.00","label1":"50%","label":"Discount 50%","color":"magenta","id": "6","number":this.getRandomNumber(),"vid":"https://c.ndtvimg.com/2018-10/hu3lnlpo_custrd_625x300_10_October_18.jpg"}
    ];

    this.itemsBestOffers = [
      {"icon":"cut-outline","itemname":"Fish","qty":"1kg","rate":"330.00","oldrate":"350.00","label1":"12.5%","label":"Discount 7.5%","color":"green","id": "1","number":this.getRandomNumber(),"vid":"https://i0.wp.com/cdn-prod.medicalnewstoday.com/content/images/articles/325/325990/fish-on-ice.jpg?w=1155&h=1541"},
      {"icon":"book-outline","itemname":"Barley","qty":"1kg","rate":"60.00","oldrate":"55.00","label1":"22%","label":"Discount 12%","color":"red","id": "2","number":this.getRandomNumber(),"vid":"https://akm-img-a-in.tosshub.com/sites/dailyo/fb_feed_images/story_image/201906/facebook_barley_wiki_061519054735.jpg"},
      {"icon":"alarm-outline","itemname":"Mutton","qty":"1kg","rate":"700.00","oldrate":"750.00","label1":"40%","label":"Discount 10%","color":"orange","id": "3","number":this.getRandomNumber(),"vid":"https://kadalunavu.com/wp-content/uploads/2020/06/mutton-curry-cut.jpg"},
      {"icon":"alert-circle-outline","itemname":"Chicken","qty":"1kg","rate":"220.00","oldrate":"255.00","label1":"20%","label":"Discount 8%","color":"brown","id": "4","number":this.getRandomNumber(),"vid":"https://hips.hearstapps.com/hmg-prod/images/delish-190808-baked-drumsticks-0217-landscape-pf-1567089281.jpg"},
      {"icon":"american-football-outline","itemname":"Beef","qty":"1kg","rate":"320.00","oldrate":"350.00","label1":"25%","label":"Discount 5%","color":"navy","id": "5","number":this.getRandomNumber(),"vid":"https://www.motherjones.com/wp-content/uploads/2020/03/GettyImages-901028510.jpg?w=1200&h=630&crop=1"},
      {"icon":"bicycle-outline","itemname":"Parsley","qty":"1pkt","rate":"45.00","oldrate":"60.00","label1":"35%","label":"Discount 15%","color":"magenta","id": "6","number":this.getRandomNumber(),"vid":"https://image.slidesharecdn.com/945parsely-140321092404-phpapp02/95/tech-talk-with-parsely-how-using-data-can-bring-clarity-to-the-newsroom-4-638.jpg?cb=1395393910"}
    ];
   }

  ngOnInit(): void {
    console.log('Progressive Shell Resovlers - ngOnInit()');

    if (this.route && this.route.data) {
      // We resolved a promise for the data Observable
      const promiseObservable = this.route.data;
      console.log('Progressive Shell Resovlers - Route Resolve Observable => promiseObservable: ', promiseObservable);

      if (promiseObservable) {
        promiseObservable.subscribe(promiseValue => {

          //------------------------------------------------------------------------
          const dataObservable = promiseValue['data1'];
          console.log('Progressive Shell Resovlers - Subscribe to promiseObservable => dataObservable: ', dataObservable);

          if (dataObservable) {
            dataObservable.subscribe(observableValue => {
              const pageData: SampleShellListingModel = observableValue;
              // tslint:disable-next-line:max-line-length
              console.log('Progressive Shell Resovlers - Subscribe to dataObservable (can emmit multiple values) => PageData (' + ((pageData && pageData.isShell) ? 'SHELL' : 'REAL') + '): ', pageData);
              // As we are implementing an App Shell architecture, pageData will be firstly an empty shell model,
              // and the real remote data once it gets fetched
              if (pageData) {
                this.routeResolveData1 = pageData;
              }
            });
          } else {
            console.warn('No dataObservable coming from Route Resolver promiseObservable');
          }
          //------------------------------------------------------------------------
            //------------------------------------------------------------------------
            const dataObservable2 = promiseValue['data2'];
            console.log('Progressive Shell Resovlers - Subscribe to promiseObservable => dataObservable: ', dataObservable2);
  
            if (dataObservable2) {
              dataObservable2.subscribe(observableValue2 => {
                const pageData2: SampleShellListingModel2 = observableValue2;
                // tslint:disable-next-line:max-line-length
                console.log('Progressive Shell Resovlers - Subscribe to dataObservable2 (can emmit multiple values) => PageData (' + ((pageData2 && pageData2.isShell) ? 'SHELL' : 'REAL') + '): ', pageData2);
                // As we are implementing an App Shell architecture, pageData will be firstly an empty shell model,
                // and the real remote data once it gets fetched
                if (pageData2) {
                  this.routeResolveData2 = pageData2;
                }
              });
            } else {
              console.warn('No dataObservable coming from Route Resolver promiseObservable');
            }
            //------------------------------------------------------------------------

             //------------------------------------------------------------------------
             const dataObservable3 = promiseValue['data3'];
             console.log('33333 Progressive Shell Resovlers - Subscribe to promiseObservable => dataObservable: ', dataObservable3);
   
             if (dataObservable3) {
              dataObservable3.subscribe(observableValue3 => {
                 const pageData3: SampleShellListingModel3 = observableValue3;
                 // tslint:disable-next-line:max-line-length
                 console.log('33333 Progressive Shell Resovlers - Subscribe to dataObservable3 (can emmit multiple values) => PageData (' + ((pageData3 && pageData3.isShell) ? 'SHELL' : 'REAL') + '): ', pageData3);
                 // As we are implementing an App Shell architecture, pageData will be firstly an empty shell model,
                 // and the real remote data once it gets fetched
                 if (pageData3) {
                   this.routeResolveData3 = pageData3;
                 }
               });
             } else {
               console.warn('No dataObservable coming from Route Resolver promiseObservable');
             }
             //------------------------------------------------------------------------


          //------------------------------------------------------------------------
        });
      } else {
        console.warn('No promiseObservable coming from Route Resolver data');
      }
    } else {
      console.warn('No data coming from Route Resolver');
    }
  }
  //---------------------------------------------------
  getRandomNumber() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }
  //---------------------------------------------------
  categoriesDetail(item){
    console.log(item.title);
 
    let params = { "item": item };
    let navigationExtras: NavigationExtras = {
      queryParams: {
        special: JSON.stringify(params)
      }
    };
    this.router.navigate(['categories-detail'], navigationExtras);
   }

   gotoNotifications(){
     
   }
   //-------------------------------------------
   gotoConstruction(item){
    console.log(JSON.stringify(item));
    this.router.navigate(['testx']);
   }

}
