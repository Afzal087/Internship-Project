
import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class UserService {

  private users = [
    { username: 'afzal', password: '1234', email: 'afzal@gmail.com' }]

  private loggedIn = false;

  constructor() { }

  addUser(username: string, password: string, email: string) {
    const user = { username, password, email };
    this.users.push(user)
    alert('User added successfully, you can now login');
  }

  getUsers() {
    return this.users;
  }

  validateUser(email: string, password: string): boolean {
    const user = this.users.find(checkUser => checkUser.email === email && checkUser.password === password);
    if (user) {
      this.loggedIn = true;
      return true;
    }
    return false;
  }

isLoggedIn(): boolean {
    return this.loggedIn;
  }

  logout() {
    this.loggedIn = false;
  }
  }




