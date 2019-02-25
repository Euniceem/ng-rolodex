import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { BackendService } from '../../services/backend.service';

@Component({
  templateUrl: './editContact.component.html',
  styleUrls: ['./editContact.component.scss']
})
export class EditContactComponent implements OnInit {

  contactId: number = null;

  editContactData: {
    name: string,
    address: string,
    mobile: string,
    work: string,
    home: string,
    email: string,
    twitter: string,
    instagram: string,
    github: string
  } = {
      name: '',
      address: '',
      mobile: '',
      work: '',
      home: '',
      email: '',
      twitter: '',
      instagram: '',
      github: ''
    }

  invalidEditContact: boolean = false;

  constructor(
    private backend: BackendService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.contactId = Number(this.route.snapshot.paramMap.get('id'));
  }

  editSubmit() {
    this.backend.editContact(this.contactId, this.editContactData)
      .then(() => {
        this.router.navigate(['/contacts']);
      })
      .catch((err) => {
        return this.invalidEditContact = true;
      });
  }

  ngOnInit() {
    this.backend.contactId(this.contactId, this.editContactData)
      .then((data) => {
        for (var key in data) {
          if (this.editContactData.hasOwnProperty(key)) {
            this.editContactData[key] = data[key]
          }
        }
      });
  }
}