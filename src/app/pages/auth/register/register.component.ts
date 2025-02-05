import { Component } from '@angular/core';
import { FormsModule, NgModel } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [RouterLink, FormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  name = '';
  email = '';
  password = '';
  confirmPassword = '';
  error = '';

  constructor(private _authService: AuthService, private _router: Router) {}

  signUp() {
    if (!this.validation()) {
      return;
    }
    this._authService.createUser(this.name, this.email, this.password).subscribe({
      next: (response: any) => {
        console.log(response.response);
        alert(response.response);

        if (!response.exists){
          this._router.navigate(['/login']);
        }
      },
      error: (error : any) => {
        console.log(error);
        alert(error.response);
        this.error = error.response;
      }
    });
  }

  validation() {
    this.error = '';

    if (this.name === '') {
      this.error = 'Name is required';
      return false;
    }

    if (this.email === '') {
      this.error = 'Email is required';
      return false;
    }

    if (this.password === '') {
      this.error = 'Password is required';
      return false;
    }

    if (this.confirmPassword === '') {
      this.error = 'Confirm Password is required';
      return false;
    }

    if (this.password !== this.confirmPassword) {
      this.error = 'Password and Confirm Password must be the same';
      return false;
    }

    return true;
  }
}
