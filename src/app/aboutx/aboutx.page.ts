import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-aboutx',
  templateUrl: './aboutx.page.html',
  styleUrls: ['./aboutx.page.scss'],
})
export class AboutxPage implements OnInit {

  constructor(
    private router:Router
    ) { }

  ngOnInit() {
  }

  gotoNotifications(){
    console.log('about page gotoNotifications');
    this.router.navigate(['notifications']);
 }

}
