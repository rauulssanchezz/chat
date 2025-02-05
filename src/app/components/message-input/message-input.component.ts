import { Component, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MessagesService } from '../../services/messages.service';

@Component({
  selector: 'app-message-input',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './message-input.component.html',
  styleUrl: './message-input.component.css'
})
export class MessageInputComponent {
  message = '';
  @Input() receiverEmail = '';

  constructor(private _messageService: MessagesService) {}

  sendMessage() {
    try{
      this._messageService.sendMessages(this.message, this.receiverEmail).subscribe({
        next: (res) => {
          this.message = '';
        },
        error: (err) => {
          console.log(err);
          alert('Error sending message');
        }
      });
    }catch(err){
      console.log(err);
      alert('Error sending message');
    }
  }
}
