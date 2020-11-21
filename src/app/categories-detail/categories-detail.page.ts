import { ChangeDetectorRef, Component, Input, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router, NavigationExtras } from '@angular/router';
import { MasterdetailService } from '../services/masterdetail.service';
import { ImageAttribute, ImageLoaderService } from 'ionic-image-loader';
import { IonImg } from '@ionic/angular';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { map } from 'rxjs/operators';

export interface CategoryItems {
  $key?: string;
  category:string;         
  name: string;
  image: string;
  imgFlg: string;
  rate: string;
  oldrate: string;
  qty: string;
  description: string;      
  }

@Component({
  selector: 'app-categories-detail',
  templateUrl: './categories-detail.page.html',
  styleUrls: ['./categories-detail.page.scss'],
})
export class CategoriesDetailPage implements OnInit {

  CategoryItems: CategoryItems[];                 // Save students data in Student's array.

/*   public paramsDataSpecialCartItems;
  cartItemsToDBx: any[] = [];
  cartItemsToDBxTable: any[] = []; */

  final = [];
  catss;

  public cartempty;
  imageAttributes: ImageAttribute[] = [];

  public paramsDataSpecial;
  itemdetails: any = {
    title: '',
    cover: ''
  }

  //===================== ion-img ===============================
  loadImage(item) {    
    item.imgFlg = "false";
    console.log('item.imgFlg >>> loadImage >>> :: '+item.imgFlg);
    console.log('DONE LOADING IMAGE');
    //this.cdref.detectChanges();  
  }


  errorLoad(item) {
    item.imgFlg = "true";
    console.log('item.imgFlg >>> errorLoad >>> :: '+item.imgFlg);
    item.image = '../../assets/imgs/logo.png';
    //this.cdref.detectChanges();  
  }

 /*  ngAfterContentChecked() {
    console.log('DETECTING CHANGES IN THE DOM');
    this.cdref.detectChanges();  
  } */
  //===================== ion-img ===============================

  displayItems: any[] = [];


  itemsCategoryProducts=[
    {
       "title" : "Grocery",
       "items":
       [
         {
          "name":"Fruit Jam",
          "image":"https://img.webmd.com/dtmcms/live/webmd/consumer_assets/site_images/article_thumbnails/recipes/ew_fresh_fruit_jam_recipe/280x190_ew_fresh_fruit_jam_recipe.jpg",
          //"image":"",
          "imgFlg":"true",
          "rate":"100.00",
          "oldrate":"120.00",
          "qty":"330gms",
          "description":"some description"
        },
        {
          "name":"Garlic Pickle",
          "image":"https://www.mothersrecipe.com/wp-content/uploads/2020/06/Garlic-300x300.jpg",
          "imgFlg":"true",
          "rate":"125.00",
          "oldrate":"130.00",
          "qty":"330gms",
          "discount":"10%",
          "description":"some description"
        },
        {
          "name":"Butter",
          "image":"https://static.toiimg.com/photo/70121659.cms",
          "imgFlg":"true",
          "rate":"200.00",
          "oldrate":"220.00",
          "qty":"330gms",
          "discount":"5%",
          "description":"some description"
        },
        {
          "name":"Olive Pickle",
          "image":"https://i.ytimg.com/vi/Beyw-vf38xU/maxresdefault.jpg",
          "imgFlg":"true",
          "rate":"325.00",
          "oldrate":"350.00",
          "qty":"330gms",
          "discount":"15%",
          "description":"some description"
        },
        {
          "name":"Mango Pickle",
          "image":"https://www.indianhealthyrecipes.com/wp-content/uploads/2015/03/mango-pickle-recipe-9-500x500.jpg",
          "imgFlg":"true",
          "rate":"225.00",
          "oldrate":"250.00",
          "qty":"330gms",
        },
        {
          "name":"Ruchi Mixed Pickle",
          "image":"https://21pickles.com/wp-content/uploads/2017/08/mixed-vegetable-pickle1.jpg",
          "imgFlg":"true",
          "rate":"300.00",
          "oldrate":"320.00",
          "qty":"330gms",
          "discount":"10%",
          "description":"some description"
        }/* ,
        {
          "name":"Olive Pickle",
          "image":"https://i.ytimg.com/vi/Beyw-vf38xU/maxresdefault.jpg",
          "imgFlg":"true",
          "rate":"325.00",
          "oldrate":"350.00",
          "qty":"330gms",
          "discount":"15%",
          "description":"some description"
        },
        {
          "name":"Mango Pickle",
          "image":"https://www.indianhealthyrecipes.com/wp-content/uploads/2015/03/mango-pickle-recipe-9-500x500.jpg",
          "imgFlg":"true",
          "rate":"225.00",
          "oldrate":"250.00",
          "qty":"330gms",
        },
        {
          "name":"Ruchi Mixed Pickle",
          "image":"https://mystore.sashroyi.com/sites/default/files/styles/product_image_360x360/public/sproducts/147110820180008-0.jpg?itok=GBnt6e2u",
          "imgFlg":"true",
          "rate":"300.00",
          "oldrate":"320.00",
          "qty":"330gms",
          "discount":"10%",
          "description":"some description"
        } */
      ]
    },
    {
      "title" : "Spices",
      "items":
      [
        {
         "name":"Red Chilli",
         "image":"https://4.imimg.com/data4/BK/IC/MY-7203985/indian-red-chilli-500x500.jpg",
         "imgFlg":"true",
         "rate":"125.00",
         "oldrate":"150.00",
         "qty":"250gms",
         "description":"some description"
       },
       {
         "name":"Haldi",
         "image":"https://images.indianexpress.com/2020/04/haldi_1200.jpg",
         "imgFlg":"true",
         "rate":"80.00",
         "oldrate":"100.00",
         "qty":"220gms",
         "discount":"10%",
         "description":"some description"
       },
       {
         "name":"Coriander",
         "image":"https://spicemunnar.com/wp-content/uploads/2020/06/coriander.jpg",
         "imgFlg":"true",
         "rate":"125.00",
         "oldrate":"130.00",
         "qty":"200gms",
         "discount":"5%",
         "description":"some description"
       },
       {
         "name":"Dry Masala",
         "image":"https://im.idiva.com/content/2014/Jul/ground_spices1.jpg",
         "imgFlg":"true",
         "rate":"100.00",
         "oldrate":"120.00",
         "qty":"300gms",
         "discount":"15%",
         "description":"some description"
       },
       {
         "name":"Cloves",
         "image":"https://www.thespruceeats.com/thmb/VOfpJY8Km7pWt9wZ-MMSpOUBtng=/2500x1406/smart/filters:no_upscale()/cloves-whole-ground-2500-5886fc7f5f9b58bdb388bf23.jpg",
         "imgFlg":"true",
         "rate":"360.00",
         "oldrate":"400.00",
         "qty":"500gms",
         "description":"some description"
       },
       {
         "name":"Cardemon",
         "image":"https://bl.thgim.com/markets/commodities/cohtzz/article31358427.ece/alternates/LANDSCAPE_435/BL17COMMELAICHI",
         "imgFlg":"true",
         "rate":"320.00",
         "oldrate":"350.00",
         "qty":"330gms",
         "discount":"4%",
         "description":"some description"
       }/* ,
       {
         "name":"Olive Pickle",
         "image":"https://i.ytimg.com/vi/Beyw-vf38xU/maxresdefault.jpg",
         "imgFlg":"true",
         "rate":"325.00",
         "oldrate":"350.00",
         "qty":"330gms",
         "discount":"15%",
         "description":"some description"
       },
       {
         "name":"Mango Pickle",
         "image":"https://www.indianhealthyrecipes.com/wp-content/uploads/2015/03/mango-pickle-recipe-9-500x500.jpg",
         "imgFlg":"true",
         "rate":"225.00",
         "oldrate":"250.00",
         "qty":"330gms",
       },
       {
         "name":"Ruchi Mixed Pickle",
         "image":"https://mystore.sashroyi.com/sites/default/files/styles/product_image_360x360/public/sproducts/147110820180008-0.jpg?itok=GBnt6e2u",
         "imgFlg":"true",
         "rate":"300.00",
         "oldrate":"320.00",
         "qty":"330gms",
         "discount":"10%",
         "description":"some description"
       } */
     ]
   }
  ]

  constructor(
    private masterDetailService:MasterdetailService,
    private router: Router,
    private route: ActivatedRoute,
    private imageLoader:ImageLoaderService,
    private cdref: ChangeDetectorRef, 
    private db:AngularFireDatabase
  ) { 

      
     //---------------------------------------------------------------
     this.imageAttributes.push({
      element: 'class',
      value: 'image-cropper profile-pic'//from assets/css/cachex.css        
    });
    //---------------------------------------------------------------

    this.route.queryParams.subscribe(params => {
      if (params && params.special) {
        //this.data = JSON.parse(params.special);
        this.paramsDataSpecial = JSON.parse(params.special);
        //let data = JSON.parse(params.special);
        //console.log('ITEM DETAILS FROM PARAMS :: ' + JSON.stringify(this.paramsDataSpecial));

         this.itemdetails = this.paramsDataSpecial.item;
        /*  console.log('this.itemdetails :: '+ JSON.stringify(this.itemdetails));
        console.log('title :: ' + this.itemdetails.title); 
        console.log('cover :: ' + this.itemdetails.cover);  */

        //----------------------------------------------------
        for (let i = 0; i < this.itemsCategoryProducts.length; i++) {
          if(this.itemsCategoryProducts[i].title === this.itemdetails.title){
            console.log('YES MATCH FOUND...');
            this.displayItems = this.itemsCategoryProducts[i].items;
          }         
      }
      console.log('this.displayItems :: '+ JSON.stringify(this.displayItems));
      //----------------------------------------------------


      //---------------------------------------------------------      
      /* let dbPath = '/categoriesproducts/'+this.itemdetails.title+'/items';
      let categorysRef: AngularFireList<any>;
      categorysRef = this.db.list(dbPath);
      categorysRef.valueChanges().subscribe((valls)=>{
        console.log('==== categoriesproducts ===='+JSON.stringify(valls));       
      }); */      
        //---------------------------------------------------------
        //let dbPath = '/categoriesproducts';
        let dbPath = '/categorysproduct';
        let categorysRef: AngularFireList<any>;
        categorysRef = this.db.list(dbPath);
        //---------------------------------------------------
        categorysRef.snapshotChanges().subscribe(data => { // Using snapshotChanges() method to retrieve list of data along with metadata($key)
          let CategoryItemsx = [];
          data.forEach(item => {
            let a = item.payload.toJSON(); 
            a['$key'] = item.key;
            CategoryItemsx.push(a as CategoryItems);
          });
          console.log('CategoryItemsx :::: '+JSON.stringify(CategoryItemsx));
          //FILTER THE ARRAY W.R.T. THE SELECTED CATEGORY..........................
          this.CategoryItems = [];
          console.log('this.itemdetails.title :: '+this.itemdetails.title);
          for(let i=0;i<CategoryItemsx.length;i++){
            if(CategoryItemsx[i].category === this.itemdetails.title){//rocky
              this.CategoryItems.push(CategoryItemsx[i]);
            }
          }
          //FILTER THE ARRAY W.R.T. THE SELECTED CATEGORY..........................
        
        })
        
        //---------------------------------------------------
      /*   categorysRef.snapshotChanges().pipe(
          map(changes =>
            changes.map(c =>  
              {                
                const xx = c.payload.val();
                const yy = Object.keys(xx);
                console.log('====================================================='); 
                for(let i=0;i<yy.length;i++){
                  var k = yy[i];
                 if(xx[k].items === undefined){               
                 }else{
                   console.log('TITLE : '+xx[k].items.title+ ' - ' +this.itemdetails.title);
                  if(c.payload.key === this.itemdetails.title){
                  this.final.push({ key: c.payload.key,$key:k, items:xx[k].items});
                  }
                 }             
                }
                console.log('FINAL ITEMS :: '+JSON.stringify(this.final));
                console.log('=====================================================');                      
              }
            )
          )
        ).subscribe(data => { 
          this.catss = this.final.length;          
        }); */
        //----------------------------------------------------------


      }
    });

  }//constructor ends

  ngOnInit() {
      //------------------------------------------
      this.cartempty = this.masterDetailService.getDestn();
      console.log('CATEGORIES-DETAIL PAGE this.cartempty :: '+this.cartempty);
      //------------------------------------------
  }

  //---------------------------------------------
  addToCart(item){
    console.log(item.name);

    let params = { "item": item };
    let navigationExtras: NavigationExtras = {
      queryParams: {
        special: JSON.stringify(params)
      }
    };
    this.router.navigate(['add-item-to-cart'], navigationExtras);
  }
  //---------------------------------------------
  errorLodingImg(e,item){
    console.log('errorLodingImg :: '+e);
    console.log(JSON.stringify(item));
    item.imgFlg = false;
   }

   onImageLoad(evt){   
    console.log('Image Ready!');
 }


gotoNotifications(){
  this.router.navigate(['notifications']);
}

clearCache(){
  this.imageLoader.clearCache();
}

/* ngAfterContentChecked() {
  this.cdref.detectChanges();  
 }  */
}
