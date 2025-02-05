import { Component, Output } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { UserService } from '../../services/user.service';
import { UsersComponent } from "../../components/users/users.component";
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterModule, UsersComponent, NgFor],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  tokenValid = true;
  users: any[] = [];

  constructor(private _router: Router, private _authService: AuthService, private _userService: UserService) {}

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.tokenValidTimeout();
    this.loadUsers();
  }

  logOut() {
    console.log('Logging out');
    localStorage.removeItem('token');
    localStorage.removeItem('refreshToken');
    this._router.navigate(['/login']);
  }

  isTokenValid() {
    const token = localStorage.getItem('token') || '';
    try{
      this._authService.tokenIsValid(token).subscribe({
        next: (res) => {
          console.log('tokenValid',res);
          if (res) {
            this.tokenValid = true;
          } else {
            this.tokenValid = false;
          }
        },
        error: (err) => {
          console.log(err);
          this.tokenValid = false;
        }
      });
    }catch(err){
      console.log(err);
      this.tokenValid = false;
    }
  }

  tokenValidTimeout() {
    setTimeout(() => {
      this.isTokenValid();

      if(!this.tokenValid){
        this.handleRefreshToken();
      }

      this.tokenValidTimeout();
    },60 * 60 * 1000)
  }

  handleRefreshToken() {
    const refreshtoken = localStorage.getItem('refreshToken') || '';
    try{
      this._authService.refreshToken(refreshtoken).subscribe({
        next: (res: any) => {
          localStorage.setItem('token', res.access_token);
          localStorage.setItem('refreshToken', res.refresh_token);
        },
        error: (err) => {
          console.log(err);
          alert('Session expired. Please login again');
          this._router.navigate(['/login']);
        }
      })
    }catch(err){
      console.log(err);
    }
  }

  loadUsers() {
    try{
      this._userService.loadUsers().subscribe({
        next: (response: any) => {
          console.log(response);
          this.users = response;
        },
        error: (err) => {
          console.log(err);
        }
      });
    }catch(err){
      console.log(err);
    }
  }
}
