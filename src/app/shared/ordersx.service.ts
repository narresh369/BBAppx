import { Injectable } from '@angular/core';
import { OrdersxModel } from './OrdersxModel';
import { AngularFireDatabase, AngularFireList, AngularFireObject } from '@angular/fire/database';

@Injectable({
  providedIn: 'root'
})

export class OrdersxService {
  ordersxListRef: AngularFireList<any>;
  ordersxRef: AngularFireObject<any>;

  constructor(private db: AngularFireDatabase) { 
    this.getOrdersxList();
  }
//=================================================================
  // Create
    createOrderx(ord: OrdersxModel[]) {
    //  createOrderx(ord: any[]) {
    console.log('SERVICE createOrderx ord :: '+JSON.stringify(ord));
   /*  return this.ordersxListRef.push({
       name: apt.name,
      email: apt.email,
      mobile: apt.mobile 
      image:ord.image,
      imgFlg:ord.imgFlg,
      rate:ord.rate,
      oldrate:ord.oldrate,
      qty:ord.qty,
      description:ord.description,
      amtx:ord.amtx,
      qtyx:ord.qtyx
    }) */
    console.log('ordersxListRef :: '+this.ordersxListRef);
    return this.ordersxListRef.push(ord);
  }
//=================================================================
  // Get Single
  getBooking(id: string) {
    this.ordersxRef = this.db.object('/ordersx/' + id);
    return this.ordersxRef;
  }
//=================================================================
  // Get List
  //getBookingList() {
    getOrdersxList() {
    this.ordersxListRef = this.db.list('/ordersx');
    return this.ordersxListRef;
  }
//=================================================================
  // Update
  updateBooking(id, ord: OrdersxModel) {
    return this.ordersxRef.update({
     /*  name: apt.name,
      email: apt.email,
      mobile: apt.mobile */
      image:ord.image,
      imgFlg:ord.imgFlg,
      rate:ord.rate,
      oldrate:ord.oldrate,
      qty:ord.qty,
      description:ord.description,
      amtx:ord.amtx,
      qtyx:ord.qtyx
    })
  }
//=================================================================
  // Delete
  deleteBooking(id: string) {
    this.ordersxRef = this.db.object('/ordersx/' + id);
    this.ordersxRef.remove();
  }
//=================================================================
}