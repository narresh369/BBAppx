import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-splashx',
  templateUrl: './splashx.page.html',
  styleUrls: ['./splashx.page.scss'],
})
export class SplashxPage implements OnInit {

  flg:boolean = true;
  splash = true;
  constructor(private router:Router) { 
    console.log('11111111111111');      
    setTimeout(()=>{
      this.splash = false;   
      console.log('going to login page');   
      this.flg = false;   
      this.router.navigate(["/homexshell"]);
    },5000);
  }

  ngOnInit() {
  }

  ionViewDidLoad(){
    /* console.log('11111111111111');      
    setTimeout(()=>{
      this.splash = false;   
      console.log('going to login page');      
      this.router.navigate(["/login"]);
    },4000); */
  }

}
