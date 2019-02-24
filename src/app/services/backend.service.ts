import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SessionService } from '../services/session.service';

@Injectable({
  providedIn: 'root'
})
export class BackendService {
  constructor(
    private http: HttpClient,
    private session: SessionService
  ) { }

  contacts() {
    return this.http.get('/').toPromise();
  }

  addContact(card) {
    return this.http.post('/', card).toPromise();
  }

  profile() {
    const user = this.session.getSession();
    return this.http.get(`/api/profile?user=${user.id}`).toPromise();
  }

  editProfile(profileData) {
    return this.http.put('/api/edit-profile', profileData).toPromise();
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