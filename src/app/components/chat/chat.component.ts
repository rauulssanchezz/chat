import { Component, Input } from '@angular/core';
import { MessageComponent } from '../message/message.component';
import { MessageInputComponent } from "../message-input/message-input.component";
import { MessagesService } from '../../services/messages.service';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [MessageComponent, MessageInputComponent, NgFor],
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.css'
})
export class ChatComponent {
  receiverEmail = '';
  messages: any[] = [];
  sender: boolean[] = [];
  message = 'mensaje';

  constructor(private _messageService: MessagesService) {}

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.onReceiverChange();
  }

  onReceiverChange() {
    this._messageService.getReceiverEmail().subscribe({
      next: (res: any) => {
        this.receiverEmail = res;
        this.loadMessages();
      },
      error: (err) => {
        console.log(err);
        alert('Error getting receiver email');
      }
    })
  }

  loadMessages() {
    this._messageService.loadMessages(this.receiverEmail).subscribe({
      next: (res: any) => {
        console.log(res);
        this.messages = res;
        console.log(this.messages);
        this.sender.push(res.senderEmail === localStorage.getItem('email'));
      },
      error: (err) => {
        console.log(err);
        alert('Error loading messages');
      }
    });
  }
}
