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
  isMobileNumberInvalid: boolean = true;
  isHomeNumberInvalid: boolean = true;
  isWorkNumberInvalid: boolean = true;
  isEmailInvalid: boolean = true;

  constructor(
    private backend: BackendService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.contactId = Number(this.route.snapshot.paramMap.get('id'));
  }

  validateMobileNumber() {
    const { mobile } = this.editContactData;

    if (mobile.length <= 11) { this.isMobileNumberInvalid = true }
    else if (!mobile.includes('-')) { this.isMobileNumberInvalid = true }
    else { this.isMobileNumberInvalid = false }
  }

  validateWorkNumber() {
    const { work } = this.editContactData;

    if (work.length <= 11) { this.isWorkNumberInvalid = true }
    else if (!work.includes('-')) { this.isWorkNumberInvalid = true }
    else { this.isWorkNumberInvalid = false }
  }

  validateHomeNumber() {
    const { home } = this.editContactData;

    if (home.length <= 11) { this.isHomeNumberInvalid = true }
    else if (!home.includes('-')) { this.isHomeNumberInvalid = true }
    else { this.isHomeNumberInvalid = false }
  }

  validateEmail() {
    const { email } = this.editContactData;

    if (!email) { this.isEmailInvalid = true; }
    else if (!email.includes('@')) { this.isEmailInvalid = true; }
    else if (!email.includes('.')) { this.isEmailInvalid = true; }
    else { this.isEmailInvalid = false; }
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
    this.backend.getContact(this.contactId)
      .then((data) => {
        for (var key in data) {
          if (this.editContactData.hasOwnProperty(key)) {
            this.editContactData[key] = data[key]
          }
        }
      });
  }
}