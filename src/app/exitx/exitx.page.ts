import { Component, OnInit } from '@angular/core';

import { Platform } from '@ionic/angular';

@Component({
  selector: 'app-exitx',
  templateUrl: './exitx.page.html',
  styleUrls: ['./exitx.page.scss'],
})
export class ExitxPage implements OnInit {

  public exitFlg:boolean = false;


  constructor(public platform:Platform) { }

  ngOnInit() {

    /* navigator['app'].exitApp(); // work for ionic 4 */
    this.closeApp();
  }

  closeApp() { 
   /*  this.platform.backButton.subscribeWithPriority(999999, () => { 
      alert('exiting app....');
    navigator['app'].exitApp();
    // or trigger any action you want to achieve
    }); */

   /*  alert('exiting app....');
    navigator['app'].exitApp(); */

     //-------------------------------------
     this.exitFlg = true;
     console.log('exiting app...');
     let timeoutId = setTimeout(() => {                
     navigator['app'].exitApp(); // work for ionic 4
     }, 5000);
   //-------------------------------------
  }

}
