import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.page.html',
  styleUrls: ['./landing.page.scss'],
})
export class LandingPage implements OnInit,OnDestroy {

  public exitFlg:boolean = false;
  myDate = '';
  id;

  constructor(
    private router:Router,
    public alertController: AlertController
    ) {
   }

  /* ngOnInit() {
    this.id = setInterval(() => {         //replaced function() by ()=>
      this.myDate = new Date();
      console.log(this.myDate); // just testing if it is working
      this.myDate = this.getCurrentDtTime();
      console.log(this.myDate);
    }, 1000);
  } */

  ngOnInit() {
    this.myDate = this.getCurrentDtTime();
    this.id = setInterval(() => {
      this.myDate = this.getCurrentDtTime(); 
      console.log(this.id + ' = ' + this.myDate);
    }, 1000);
  }
  
  

  gotoHomePage(){
    console.log('clearing setinterval :: '+this.id);
    if (this.id) {
      clearInterval(this.id);
    }
    this.router.navigate(['/homexshell']);
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
  
  //=================================================================
  ngOnDestroy() {
    console.log('ngOnDestroy :: '+this.id);
    if (this.id) {
      clearInterval(this.id);
    }
  }

  //----------------------------------------------------------------
  goExit(){    
    this.presentAlertConfirm();
  }
  //---------------------------------------------------------------
    //---------------------------------------------------------
    async presentAlertConfirm() {
      const alert = await this.alertController.create({
        header: 'Confirm!',
        message: 'Are you sure you want to Exit?',
        buttons: [
          {
            text: 'Cancel',
            role: 'cancel',
            cssClass: 'secondary',
            handler: (blah) => {
              console.log('Confirm Cancel: blah');
            }
          }, {
            text: 'Okay',
            handler: () => {
              console.log('Confirm Okay');
              
              this.exitFlg = true;
              //navigator['app'].exitApp(); // work for ionic 4
              //this.router.navigate(['/exit/']);
              //-------------------------------------
                console.log('exiting app...');
                let timeoutId = setTimeout(() => {                
                navigator['app'].exitApp(); // work for ionic 4
                }, 5000);
              //-------------------------------------
            }
          }
        ]
      });
  
      await alert.present();
    }
//------------------------------------------------------------------  

  

}
