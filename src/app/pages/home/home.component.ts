import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { BackendService } from '../../services/backend.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {

  contactData = [];
  searchData: {
    stringData: string
  } = {
      stringData: ''
    };

  constructor(
    private backend: BackendService,
    private router: Router
  ) { }

  searchInput() {
    if (this.searchData.stringData) {
      this.backend.searchContacts(this.searchData.stringData)
        .then((list: any) => {
          this.contactData = list
        })
    }
  }
}