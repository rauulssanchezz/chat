import { Component } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { Router, RouterLink } from '@angular/router';
import { NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterLink, NgIf, FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  email = '';
  password = '';
  error = '';

  constructor(private _authService: AuthService, private router: Router) { }

  login() {
    this.error = '';
    if(this.validateForm()){
      this._authService.login(this.email, this.password)
      .subscribe({
        next: (response: any) => {
          console.log(response);
          localStorage.setItem('token', response.access_token);
          localStorage.setItem('refreshToken', response.refresh_token);
          this.router.navigate(['/home']);
        },
        error: (error) => {
          console.log(error);
          this.error = error.error.message;
        }
      });
    }else{
      console.log('Invalid form');
      this.error = 'Invalid form validation';
    }
  }

  validateForm() {
    console.log(this.email)
    console.log(this.password)
    return this.email !== '' && this.password !== '';
  }
}
