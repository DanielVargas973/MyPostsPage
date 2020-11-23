import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UserModel } from '../models/user.model';
import { map } from 'rxjs/operators';
import { tokenKey } from '@angular/core/src/view';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  userToken: string;
  constructor(private http: HttpClient) {
    this.getToken();
  }

  logOut() {
    localStorage.removeItem('token');
  }

  logIn(user: UserModel) {
    const authData = {
      userNames: user.names,
      userSurnames: user.surnames,
      userEmail: user.email,
      userPassword: user.password
    };
    return this.http.post(`/api/user/validate`, authData).pipe(
      map(response => {
        // tslint:disable-next-line: no-string-literal
        this.saveTokenAndId(response['token'], response['id']);
        return response;
      })
    );
  }
  createUser(user: UserModel) {
    const authData = {
      userNames: user.names,
      userSurnames: user.surnames,
      userEmail: user.email,
      userPassword: user.password
    };
    return this.http.post(`/api/user/new`, authData);
  }
  private saveTokenAndId(token: string, id: number) {
    this.userToken = token;
    localStorage.setItem('token', token);
    localStorage.setItem('idUser', id.toString());
  }
  getIdUser() {
    let idUser = '';
    const dateSesion = new Date();
    if (localStorage.getItem('idUser')) {
      idUser = localStorage.getItem('idUser');
      dateSesion.setSeconds(3600);
      localStorage.setItem('ExpireSessionDate', dateSesion.getTime().toString());
    }
    return Number(idUser);
  }
  getToken() {
    const dateSesion = new Date();
    if (localStorage.getItem('token')) {
      this.userToken = localStorage.getItem('token');
      dateSesion.setSeconds(3600);
      localStorage.setItem('ExpireSessionDate', dateSesion.getTime().toString());
    } else {
      this.userToken = '';
    }
    return this.userToken;
  }
  sessionStatus(): boolean {
    if (this.userToken.length < 2) {
      return false;
    }
    const expirationToken = Number(localStorage.getItem('ExpireSessionDate'));
    const expirationTokenDate = new Date();
    expirationTokenDate.setTime(expirationToken);
    if (expirationTokenDate > new Date()) {
      return true;
    } else {
      return false;
    }
  }
}
