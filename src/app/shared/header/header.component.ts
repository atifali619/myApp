import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { LoginService } from 'src/app/auth/services/login.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(private router:Router, private loginService:LoginService) {

    this.isLogin = this.loginService.isLoggedIn.subscribe(loginStatus => {
      this.isLoggedIn = loginStatus;
  });

   }

  ngOnInit(): void {
    this.authObject = sessionStorage.getItem('authObject');
    if(this.authObject){
      this.loginService.isLoggedIn.next(true);
    }
  }

  ngOnDestroy() {
    this.isLogin.unsubscribe();
}

  private authObject: any;
  isLogin: Subscription;
  isLoggedIn:boolean = false;

  logout(){
    this.router.navigate(['/']);
    sessionStorage.removeItem('authObject');
    this.loginService.isLoggedIn.next(false);
  }

}
