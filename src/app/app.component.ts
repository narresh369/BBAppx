import { Component, OnInit } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import {  ImageLoaderConfigService } from 'ionic-image-loader';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent implements OnInit {
  public selectedIndex = 0;
  public appPages = [
    {
      title: 'Home',
      url: '/homexshell',
      icon: 'home'
    },
    {
      title: 'Orders',
      url: 'ordersx',
      icon: 'newspaper'
    },
    {
      title: 'About',
      url: 'aboutx',
      icon: 'alert-circle'
    },
    {
      title: 'Exit',
      url: 'exitx',
      icon: 'power'
    }/* ,
    {
      title: 'Login',
      url: 'loginx',
      icon: 'log-in'
    } */
  ];

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private imageLoaderConfig:ImageLoaderConfigService 
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
       //------------------------------------------
       this.imageLoaderConfig.enableDebugMode();
       this.imageLoaderConfig.enableFallbackAsPlaceholder(true);
       this.imageLoaderConfig.setFallbackUrl('assets/imgs/logo.png');
       //this.imageLoaderConfig.maxCacheSize = 2 * 1024 * 1024; // 2 MB
       this.imageLoaderConfig.setMaximumCacheSize(10 * 1024 * 1024);
       this.imageLoaderConfig.setMaximumCacheAge(24 * 60 * 60 * 1000);
       //------------------------------------------
       this.imageLoaderConfig.setSpinnerColor('danger');
       this.imageLoaderConfig.setSpinnerName('bubbles');
       this.imageLoaderConfig.enableSpinner(true);
       //-----------------------------------------
       //this.imageLoaderConfig.useImg = false;
       /* this.imageLoaderConfig.setHeight('70px'); // set default width to 500px
       this.imageLoaderConfig.setWidth('250px'); // set default width to 500px 
       this.imageLoaderConfig.setDisplay('block'); */
       this.imageLoaderConfig.useImageTag(true);
       
       //------------------------------------------
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  ngOnInit() {
  /*   const path = window.location.pathname.split('folder/')[1];
    if (path !== undefined) {
      this.selectedIndex = this.appPages.findIndex(page => page.title.toLowerCase() === path.toLowerCase());
    } */
  }

  getColor(x) { 
   if(x === 'Exit'){
    return 'red';
   }else{
     return 'navy';
   }
  }
}
