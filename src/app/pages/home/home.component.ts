import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  tokenValid = true;

  constructor(private _router: Router, private _authService: AuthService) {}

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.tokenValidTimeout();
  }

  logOut() {
    console.log('Logging out');
    localStorage.removeItem('token');
    localStorage.removeItem('refreshToken');
    this._router.navigate(['/login']);
  }

  isTokenValid() {
    const token = localStorage.getItem('token') || '';
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
  }
}
