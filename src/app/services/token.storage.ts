import { Injectable } from '@angular/core';
import { UserProfile } from '../models/profile';


const TOKEN_KEY = 'AuthToken';
const PROFILE_KEY = 'UserProfile';

@Injectable()
export class TokenStorage {

  constructor() { }

  signOut() {
    window.sessionStorage.removeItem(TOKEN_KEY);
    window.sessionStorage.clear();
  }

  public saveProfile(profile: UserProfile) {
    window.sessionStorage.removeItem(PROFILE_KEY);
    window.sessionStorage.setItem(PROFILE_KEY, JSON.stringify(profile));
  }

  public getProfile() {
    return JSON.parse(window.sessionStorage.getItem(PROFILE_KEY));
  }


  public saveToken(token: string) {
    window.sessionStorage.removeItem(TOKEN_KEY);
    window.sessionStorage.setItem(TOKEN_KEY, token);
  }

  public getToken(): string {
    return sessionStorage.getItem(TOKEN_KEY);
  }

  public getLoginStatus(): boolean {
    if (sessionStorage.getItem(TOKEN_KEY))
      return true;
    return false;

  }
}
