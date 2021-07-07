import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { BackendService } from '../../services/backend.service';

@Component({
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent {

  contactData: object = [];

  constructor(
    private backend: BackendService,
    private router: Router
  ) { }

  deleteContactSubmitForm(id) {
    return this.backend.deleteContact(id)
      .then(() => {
        this.router.navigate(['/contacts'])
      })
  }

  ngOnInit() {
    return this.backend.contacts()
      .then((data) => {
        this.contactData = data;
      })
  }
}