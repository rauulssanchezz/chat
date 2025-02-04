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
  constructor(private _router: Router, private _authService: AuthService) {}

  logOut() {
    console.log('Logging out');
    localStorage.removeItem('token');
    this._router.navigate(['/login']);
  }
}
