import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class BackendService {
  constructor(private http: HttpClient) { }

  profile(user) {
    return this.http.get('/api/profile', user).toPromise();
  }

  editProfile(user) {
    return this.http.put('/api/users', user).toPromise();
  }

  register(user) {
    return Promise.resolve({});
  }

  login(user) {
    return Promise.resolve({
      id: 1,
      username: user.username
    })
  }

  logout() {
    return Promise.resolve({});
  }
}