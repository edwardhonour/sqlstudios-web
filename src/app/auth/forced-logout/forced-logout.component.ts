import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-forced-logout',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './forced-logout.component.html',
  styleUrls: ['./forced-logout.component.css']
})
export class ForcedLogoutComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    setTimeout(() => {
      location.replace("/#/sign-in")
    }, 500);
  }
  
  redirect() {
//    location.replace("https://mynuaxess.com/#/sign-in")
      location.replace("/#/sign-in")
  }

}
