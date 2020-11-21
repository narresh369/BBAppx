import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';

@Component({
  selector: 'app-testx',
  templateUrl: './testx.page.html',
  styleUrls: ['./testx.page.scss'],
})
export class TestxPage implements OnInit {

  cats = [];

  private dbPath = '/categorys';
  categorysRef: AngularFireList<any> = null;

  xxxxx = [{"cover":"https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQwb_ecV1bseo6xkW22xl5UvZb71u5wLGt6kw&usqp=CAU","imgFlg":false,"title":"Grocery"},{"cover":"https://i.ndtvimg.com/i/2016-08/spice_625x350_51471090241.jpg","imgFlg":false,"title":"Spices"},{"cover":"https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcSLSlwS9jACG5xUNAjaav8NNbmC5Vn0cmaxkQ&usqp=CAU","imgFlg":false,"title":"Snacks"},{"cover":"https://cdn.britannica.com/17/196817-050-6A15DAC3/vegetables.jpg","imgFlg":false,"title":"Vegetables"},{"cover":"https://cdn-a.william-reed.com/var/wrbm_gb_food_pharma/storage/images/publications/food-beverage-nutrition/foodnavigator-asia.com/headlines/food-safety/convincing-research-links-increasing-red-meat-intake-with-heightened-risk-of-death/9868511-1-eng-GB/Convincing-research-links-increasing-red-meat-intake-with-heightened-risk-of-death_wrbm_large.jpg","imgFlg":false,"title":"Meat"},{"cover":"https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcS3RZzgouzWuQXwTuepl96--At8E07_OCmtWA&usqp=CAU","imgFlg":false,"title":"Fish"},{"cover":"https://www.onceuponachef.com/images/2013/12/basmati-rice.jpg","imgFlg":false,"title":"Rice"},{"cover":"https://i.ndtvimg.com/i/2016-11/pulses-620_620x350_41479900507.jpg","imgFlg":false,"title":"Lentils"}];


/*    private xx = '{"-MLYINDYDou1_fArxHyw":{"cover":"https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQwb_ecV1bseo6xkW22xl5UvZb71u5wLGt6kw&usqp=CAU","imgFlg":false,"title":"Grocery"},"-MLYIkdqx3HZ99v2_2fb":{"cover":"https://i.ndtvimg.com/i/2016-08/spice_625x350_51471090241.jpg","imgFlg":false,"title":"Spices"},"-MLYJPT002-nd168iYqw":{"cover":"https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcSLSlwS9jACG5xUNAjaav8NNbmC5Vn0cmaxkQ&usqp=CAU","imgFlg":false,"title":"Snacks"},"-MLYJY5-IWj8ZJQt8wwq":{"cover":"https://cdn.britannica.com/17/196817-050-6A15DAC3/vegetables.jpg","imgFlg":false,"title":"Vegetables"},"-MLYJdYdNksNUIeGPQ4g":{"cover":"https://cdn-a.william-reed.com/var/wrbm_gb_food_pharma/storage/images/publications/food-beverage-nutrition/foodnavigator-asia.com/headlines/food-safety/convincing-research-links-increasing-red-meat-intake-with-heightened-risk-of-death/9868511-1-eng-GB/Convincing-research-links-increasing-red-meat-intake-with-heightened-risk-of-death_wrbm_large.jpg","imgFlg":false,"title":"Meat"},"-MLYJjfWMnwHVxblmBcY":{"cover":"https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcS3RZzgouzWuQXwTuepl96--At8E07_OCmtWA&usqp=CAU","imgFlg":false,"title":"Fish"},"-MLYJt0-7BcgV_UYRuo9":{"cover":"https://www.onceuponachef.com/images/2013/12/basmati-rice.jpg","imgFlg":false,"title":"Rice"},"-MLYJyr4jsPYBnSGSZLt":{"cover":"https://i.ndtvimg.com/i/2016-11/pulses-620_620x350_41479900507.jpg","imgFlg":false,"title":"Lentils"}}';
  private obj; */

  itemsBestOffers: any[] = [];
  itemsDiscountsForYou: any[] = [];

  slideOpts = {
    initialSlide: 0,
    speed: 400,
    slidesPerView: 1,
    autoplay:true,pagination: {
      el: '.swiper-pagination',
      clickable: true,
      renderBullet: function (index, className) {      
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

  constructor( private db: AngularFireDatabase) { 

    this.categorysRef = db.list(this.dbPath);

        //--------------------------------
        const dataObservablex = this.categorysRef.valueChanges().subscribe((vals)=>{
          console.log('----->>>> ' + JSON.stringify(vals));
          this.cats = vals;
        })
        //--------------------------------
 /*    this.obj = JSON.parse(this.xx); 
    console.log(this.obj); */

    this.itemsBestOffers = [
      {"icon":"cut-outline","itemname":"Fish","qty":"1kg","rate":"330.00","oldrate":"350.00","label1":"12.5%","label":"Discount 7.5%","color":"green","id": "1","number":this.getRandomNumber(),"vid":"https://i0.wp.com/cdn-prod.medicalnewstoday.com/content/images/articles/325/325990/fish-on-ice.jpg?w=1155&h=1541"},
      {"icon":"book-outline","itemname":"Barley","qty":"1kg","rate":"60.00","oldrate":"55.00","label1":"22%","label":"Discount 12%","color":"red","id": "2","number":this.getRandomNumber(),"vid":"https://akm-img-a-in.tosshub.com/sites/dailyo/fb_feed_images/story_image/201906/facebook_barley_wiki_061519054735.jpg"},
      {"icon":"alarm-outline","itemname":"Mutton","qty":"1kg","rate":"700.00","oldrate":"750.00","label1":"40%","label":"Discount 10%","color":"orange","id": "3","number":this.getRandomNumber(),"vid":"https://kadalunavu.com/wp-content/uploads/2020/06/mutton-curry-cut.jpg"},
      {"icon":"alert-circle-outline","itemname":"Chicken","qty":"1kg","rate":"220.00","oldrate":"255.00","label1":"20%","label":"Discount 8%","color":"brown","id": "4","number":this.getRandomNumber(),"vid":"https://hips.hearstapps.com/hmg-prod/images/delish-190808-baked-drumsticks-0217-landscape-pf-1567089281.jpg"},
      {"icon":"american-football-outline","itemname":"Beef","qty":"1kg","rate":"320.00","oldrate":"350.00","label1":"25%","label":"Discount 5%","color":"navy","id": "5","number":this.getRandomNumber(),"vid":"https://www.motherjones.com/wp-content/uploads/2020/03/GettyImages-901028510.jpg?w=1200&h=630&crop=1"},
      {"icon":"bicycle-outline","itemname":"Parsley","qty":"1pkt","rate":"45.00","oldrate":"60.00","label1":"35%","label":"Discount 15%","color":"magenta","id": "6","number":this.getRandomNumber(),"vid":"https://image.slidesharecdn.com/945parsely-140321092404-phpapp02/95/tech-talk-with-parsely-how-using-data-can-bring-clarity-to-the-newsroom-4-638.jpg?cb=1395393910"},
      {"icon":"alarm-outline","itemname":"Mutton","qty":"1kg","rate":"700.00","oldrate":"750.00","label1":"40%","label":"Discount 10%","color":"orange","id": "3","number":this.getRandomNumber(),"vid":"https://kadalunavu.com/wp-content/uploads/2020/06/mutton-curry-cut.jpg"},
      {"icon":"alert-circle-outline","itemname":"Chicken","qty":"1kg","rate":"220.00","oldrate":"255.00","label1":"20%","label":"Discount 8%","color":"brown","id": "4","number":this.getRandomNumber(),"vid":"https://hips.hearstapps.com/hmg-prod/images/delish-190808-baked-drumsticks-0217-landscape-pf-1567089281.jpg"},
      {"icon":"american-football-outline","itemname":"Beef","qty":"1kg","rate":"320.00","oldrate":"350.00","label1":"25%","label":"Discount 5%","color":"navy","id": "5","number":this.getRandomNumber(),"vid":"https://www.motherjones.com/wp-content/uploads/2020/03/GettyImages-901028510.jpg?w=1200&h=630&crop=1"},
      {"icon":"bicycle-outline","itemname":"Parsley","qty":"1pkt","rate":"45.00","oldrate":"60.00","label1":"35%","label":"Discount 15%","color":"magenta","id": "6","number":this.getRandomNumber(),"vid":"https://image.slidesharecdn.com/945parsely-140321092404-phpapp02/95/tech-talk-with-parsely-how-using-data-can-bring-clarity-to-the-newsroom-4-638.jpg?cb=1395393910"}
    ];

    this.itemsDiscountsForYou = [
      {"icon":"cut-outline","itemname":"Oats","qty":"1kg","rate":"100.00","oldrate":"110.00","label1":"10%","label":"Discount 10%","color":"green","id": "1","number":this.getRandomNumber(),"vid":"https://5.imimg.com/data5/AB/QP/MY-2968665/whole-grain-oats-500x500.jpg"},
      {"icon":"book-outline","itemname":"Meat","qty":"1kg","rate":"550.00","oldrate":"610.00","label1":"15%","label":"Discount 15%","color":"red","id": "2","number":this.getRandomNumber(),"vid":"https://www.incimages.com/uploaded_files/image/1920x1080/getty_80116649_344560.jpg"},
      {"icon":"alarm-outline","itemname":"Wheat","qty":"1kg","rate":"82.00","oldrate":"90.00","label1":"13%","label":"Discount 13%","color":"orange","id": "3","number":this.getRandomNumber(),"vid":"https://5.imimg.com/data5/ST/QW/MY-38700875/fresh-wheat-crop-500x500.jpg"},
      {"icon":"alert-circle-outline","itemname":"Masoor","qty":"1kg","rate":"125.00","oldrate":"135.00","label1":"12%","label":"Discount 12%","color":"brown","id": "4","number":this.getRandomNumber(),"vid":"https://5.imimg.com/data5/MF/XV/MY-17000375/masoor-malka-500x500.jpg"},
      {"icon":"american-football-outline","itemname":"Corn","qty":"1kg","rate":"140.00","oldrate":"155.00","label1":"25%","label":"Discount 25%","color":"navy","id": "5","number":this.getRandomNumber(),"vid":"https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTAn99hty2YRqc0rNJBzLb2fIq0uaNKBIoG6A&usqp=CAU"},
      {"icon":"bicycle-outline","itemname":"Custard","qty":"330ml","rate":"45.00","oldrate":"60.00","label1":"50%","label":"Discount 50%","color":"magenta","id": "6","number":this.getRandomNumber(),"vid":"https://c.ndtvimg.com/2018-10/hu3lnlpo_custrd_625x300_10_October_18.jpg"}
    ];
   
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

  ngOnInit() {
    
  }

}
