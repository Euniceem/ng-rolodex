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
    return this.http.get('api/contacts').toPromise();
  }

  addContact(card) {
    return this.http.post('api/contacts', card).toPromise();
  }

  contactId(id, contact) {
    return this.http.get(`api/contacts/${id}`).toPromise();
  }

  editContact(id, contact) {
    return this.http.put(`api/contacts/${id}`, contact).toPromise();
  }

  deleteContact(id) {
    return this.http.delete(`api/contacts/${id}`).toPromise();
  }

  profile() {
    const user = this.session.getSession();
    return this.http.get(`/api/profile?user=${user.id}`).toPromise();
  }

  editProfile(profileData) {
    return this.http.put('/api/users', profileData).toPromise();
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