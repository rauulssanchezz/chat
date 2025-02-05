import { NgClass } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MessagesService } from '../../services/messages.service';

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
  receiverEmail = '';
  @Input() selected = false;

  constructor(private _messageService: MessagesService) {}

  onSelect() {
    this._messageService.changeReceiverEmail(this.email);
  }
}
