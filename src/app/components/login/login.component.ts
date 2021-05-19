import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../service/auth.service';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  checkoutForm = this.formBuilder.group({
    password: '',
    email: ''
  });

  constructor(private authService: AuthService, private formBuilder: FormBuilder, private router: Router) { }

  ngOnInit(): void {
    if (localStorage.getItem('currentUser')) {
      this.router.navigate(['/']);
    }
    sessionStorage.removeItem('favorites');
  }

  onSubmitLogin(): void {
    if (this.checkoutForm.valid) {
      this.authService.login(
        this.checkoutForm.value.email,
        this.checkoutForm.value.password
      );
    }
  }

}
