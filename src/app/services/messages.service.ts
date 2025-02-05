import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environment/environment';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MessagesService {
  baseUrl = environment.api_url;
  private receiverEmail: BehaviorSubject<string> = new BehaviorSubject<string>('');
  currentReceiverEmail = this.receiverEmail.asObservable();
  constructor(private _httpClient: HttpClient) { }

  sendMessages(content: string, receiverEmail: string) {
    const senderEmail = localStorage.getItem('email');
    console.log(senderEmail);
    console.log(receiverEmail);
    const token = localStorage.getItem('token');

    return this._httpClient.post(`${this.baseUrl}/message/create`,
      {
        content: content,
        senderEmail: senderEmail,
        receiverEmail: receiverEmail
      },
      {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      }
    )
  }

  loadMessages(receiverEmail: string) {
    const senderEmail = localStorage.getItem('email');
    const token = localStorage.getItem('token');

    return this._httpClient.get(`${this.baseUrl}/message/getByUser?senderEmail=${senderEmail}&receiverEmail=${receiverEmail}`,
      {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      }
    )
  }

  changeReceiverEmail(email: string) {
    this.receiverEmail.next(email);
  }

  getReceiverEmail() {
    return this.currentReceiverEmail;
  }
}
