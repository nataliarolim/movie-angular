import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  checkoutForm = this.formBuilder.group({
    password: '',
    email: ''
  });

  constructor(private authService: AuthService, private formBuilder: FormBuilder) { }

  ngOnInit(): void {
  }

  createAccont() {
    if (this.checkoutForm.valid) {
      this.authService.signUp(
        this.checkoutForm.value.email,
        this.checkoutForm.value.password
      );
    }
  }

}
