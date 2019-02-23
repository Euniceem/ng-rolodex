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
    return this.http.post('/api/register', user).toPromise();
  }

  login(user) {
   return this.http.post('/api/login', user).toPromise();
  }

  logout() {
    return this.http.post('/api/logout', null).toPromise();
  }
}