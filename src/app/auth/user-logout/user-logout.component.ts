import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-logout',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './user-logout.component.html',
  styleUrls: ['./user-logout.component.css']
})
export class UserLogoutComponent implements OnInit {

  constructor(
    private _router: Router
)
{
  
}

   ngOnInit(): void {
     localStorage.removeItem('uid');
     localStorage.removeItem('role')
     this._router.navigateByUrl('/sadmin');
   }
}
