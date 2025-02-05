import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environment/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  baseUrl = environment.api_url;

  constructor(private _httpClient: HttpClient) { }

  createUser(name: string, email: string, password: string) {
    try{
      return this._httpClient.post(`${this.baseUrl}/users/create`,
        {
          name: name,
          email: email,
          password: password
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
    }catch(err){
      console.log(err);
      throw new Error('Error while creating user');
    }
  }

  login(email: string, password: string) {
    console.log('Logging in service');
    try{
      return this._httpClient.post(`${this.baseUrl}/auth/login`,
        {
          email: email,
          password: password
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
    }catch(err){
      console.log(err);
      throw new Error('Error while logging in');
    }
  }

  tokenIsValid(token: string) {
    try{
      return this._httpClient.post(`${this.baseUrl}/auth/tokenIsValid`,
        {
          token: token
        }
      )
    }catch(err){
      console.log(err);
      throw new Error('Error while checking token validity');
    }
  }

  refreshToken(refreshToken: string){
    try{
      return this._httpClient.post(`${this.baseUrl}/auth/refresh`,
        {
          refreshToken: refreshToken
        }
      )
    }catch(err) {
      console.log(err);
      throw new Error('Error while refreshing token');
    }
  }
}
