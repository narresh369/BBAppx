import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { HttpClient } from '@angular/common/http';

import {  Observable } from 'rxjs';
import { tap, delay, finalize } from 'rxjs/operators';

import { SampleShellListingModel3 } from './sample-shell.model3';
import { ShellProvider } from './shell.provider';

//GET DATA FROM FIREBASE....................................................................
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import Category from 'src/models/category';
import { map } from 'rxjs/operators';
//GET DATA FROM FIREBASE....................................................................
import * as firebase from 'firebase';



@Injectable()
export class HomexshellShellResolver3 implements Resolve<any> {

  //GET DATA FROM FIREBASE....................................................................
  //categorysRef: AngularFireList<any>;    // Reference to Student data list, its an Observable

  cats = [];
  categorys: any;
  private dbPath = '/categorys';
  //categorysRef: AngularFireList<Category> = null;
  categorysRef: AngularFireList<any> = null;
  //GET DATA FROM FIREBASE....................................................................

  //xxxxx = [{"cover":"https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQwb_ecV1bseo6xkW22xl5UvZb71u5wLGt6kw&usqp=CAU","imgFlg":false,"title":"Grocery"},{"cover":"https://i.ndtvimg.com/i/2016-08/spice_625x350_51471090241.jpg","imgFlg":false,"title":"Spices"},{"cover":"https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcSLSlwS9jACG5xUNAjaav8NNbmC5Vn0cmaxkQ&usqp=CAU","imgFlg":false,"title":"Snacks"},{"cover":"https://cdn.britannica.com/17/196817-050-6A15DAC3/vegetables.jpg","imgFlg":false,"title":"Vegetables"},{"cover":"https://cdn-a.william-reed.com/var/wrbm_gb_food_pharma/storage/images/publications/food-beverage-nutrition/foodnavigator-asia.com/headlines/food-safety/convincing-research-links-increasing-red-meat-intake-with-heightened-risk-of-death/9868511-1-eng-GB/Convincing-research-links-increasing-red-meat-intake-with-heightened-risk-of-death_wrbm_large.jpg","imgFlg":false,"title":"Meat"},{"cover":"https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcS3RZzgouzWuQXwTuepl96--At8E07_OCmtWA&usqp=CAU","imgFlg":false,"title":"Fish"},{"cover":"https://www.onceuponachef.com/images/2013/12/basmati-rice.jpg","imgFlg":false,"title":"Rice"},{"cover":"https://i.ndtvimg.com/i/2016-11/pulses-620_620x350_41479900507.jpg","imgFlg":false,"title":"Lentils"}];

  cnt = 15;
  constructor(
    private http: HttpClient,
    //GET DATA FROM FIREBASE....................................................................
    private db: AngularFireDatabase
    //GET DATA FROM FIREBASE....................................................................
  ) {
    //GET DATA FROM FIREBASE....................................................................
    this.categorysRef = db.list(this.dbPath);
    //GET DATA FROM FIREBASE....................................................................

    /*   //--------------------------------
      const dataObservablex = this.categorysRef.valueChanges().subscribe((vals)=>{
        console.log('-----+++++++>>>> ' + JSON.stringify(vals));
        this.cats = vals;
      })
      //-------------------------------- */
  }

  // These should be in a separate service
  private getData3(): Observable<any> {      
    const dataObservable = this.http.get<any>('./assets/sample-data/categories-data.json').pipe(

      tap(val => {
        console.log('getData STARTED 33333');
      }),
      delay(100),
      finalize(() => {
        console.log('getData COMPLETED 3333');
      })
    );

    return dataObservable;
  }
    //GET DATA FROM FIREBASE....................................................................
    private getData3_OOLLDD(): Observable<any> {      
    //const dataObservable = this.http.get<any>('./assets/sample-data/categories-data.json').pipe(
      const dataObservable = this.http.get<any>('https://bbapp-a4a47.firebaseio.com/categorys.json').pipe(

      tap(val => {       
        //console.log('=== == ' + JSON.stringify(val));     
      }),
      delay(100),
      finalize(() => {
        console.log('getData COMPLETED 3333 val ');
      })     
    );    

    return dataObservable;
  }
      //GET DATA FROM FIREBASE....................................................................

      //GET DATA FROM FIREBASE....................................................................
    private getData3_XXXXXXXXXX(): Observable<any> {   
      
        //--------------------------------
       /*  const dataObservablex = this.categorysRef.valueChanges().subscribe((vals)=>{
          console.log('=== == ' + JSON.stringify(vals));
          this.cats = vals;
        }) */
        //--------------------------------

      //const dataObservable = this.http.get<any>('./assets/sample-data/categories-data.json').pipe(
        //const dataObservable = this.http.get<any>('https://bbapp-a4a47.firebaseio.com/categorys.json').pipe(

          const dataObservable = this.categorysRef.valueChanges();

      /*   tap(val => {       
          console.log('----++++ ' + JSON.stringify(val));
        
        }),
        delay(100),
        finalize(() => {
          console.log('getData COMPLETED 3333 val ');
        })
      
      );    */ 
 
      return dataObservable;
    }
        //GET DATA FROM FIREBASE....................................................................


  private getDataWithShell3(): Observable<SampleShellListingModel3> {
    // Initialize the model specifying that it is a shell model
    //const shellModel: SampleShellListingModel3 = new SampleShellListingModel3(true,this.cnt);
    const shellModel: SampleShellListingModel3 = new SampleShellListingModel3(true);
    const dataObservable = this.getData3();

    const shellProvider = new ShellProvider(
      shellModel,
      dataObservable
    );

    return shellProvider.observable;
  }
  resolve() {
    // Get the Shell Provider from the service
    //const shellProviderObservable = this.getDataWithShell3();

      //--------------------------------
      const shellProviderObservable = this.categorysRef.valueChanges();/* .subscribe((vals)=>{
        console.log('-----+++++++>>>> ' + JSON.stringify(vals));
        this.cats = vals;
      }) */
      //--------------------------------

    // Resolve with Shell Provider
    const observablePromise = new Promise((resolve, reject) => {
      resolve(shellProviderObservable);
    });
    return observablePromise;
  }

  //GET DATA FROM FIREBASE....................................................................
  /* retrieveCategorys(): void {
    this.getAllCategories().snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          ({ key: c.payload.key, ...c.payload.val() })
        )
      )
    ).subscribe(data => {
      this.categorys = data;
    });
  } */
  //-------------------------------------
  /* retrieveCategorys(): Observable<any> {
    this.getAllCategories().snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          ({ key: c.payload.key, ...c.payload.val() })
        )
      )
    ).subscribe(data => {
      this.categorys = data;
      const Observable = new Promise((resolve, reject) => {
        resolve(data);
      });
      return Observable;
    });
   
  } */
  //----------------------------------------
  getAllCategories(): AngularFireList<Category> {
    return this.categorysRef;
  }
  //GET DATA FROM FIREBASE....................................................................

}
