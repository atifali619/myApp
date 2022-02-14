import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { LoginService } from '../services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  constructor(
    private formBuilder: FormBuilder,
    private loginService: LoginService,
    private router:Router
  ) { }

  ngOnInit(): void { }

  loginForm = this.formBuilder.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(8)]],
  });

  loginMode: boolean = true;
  authSubscription: Observable<any> | undefined;

  changeAction() {
    this.loginMode = !this.loginMode;
  }

  onLoginSubmit() {
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
    } else {
      if (this.loginMode) {
        this.authSubscription = this.loginService.logIn(
          this.loginForm.controls['email'].value,
          this.loginForm.controls['password'].value
        );
      } else {
        this.authSubscription = this.loginService.signUp(
          this.loginForm.controls['email'].value,
          this.loginForm.controls['password'].value
        );
      }

      this.authSubscription.subscribe((loginResponse) => {
        this.loginSuccess(loginResponse);
      });
      this.loginForm.reset();
    }
  }

  loginSuccess(authObject:any){
    this.router.navigate(['/home']);
    sessionStorage.setItem("authObject", JSON.stringify(authObject));
    this.loginService.isLoggedIn.next(true);
  }

}

