import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environment/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private baseUrl = environment.api_url;

  constructor(private _httpClient: HttpClient) { }

  loadUsers() {
    try{
      const token = localStorage.getItem('token');
      const headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      })
      return this._httpClient.get(`${this.baseUrl}/users/get?token=${token}`, { headers })
    }catch(err){
      console.log(err);
      throw new Error('Error while loading users');
    }
  }
}
