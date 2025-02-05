import { NgClass } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [NgClass],
  templateUrl: './users.component.html',
  styleUrl: './users.component.css'
})
export class UsersComponent {
@Input() name = '';
@Input() email = '';
@Input() selected = false;
}
