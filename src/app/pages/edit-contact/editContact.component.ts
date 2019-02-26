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
  isMobileNumberInValid: boolean = true;
  isHomeNumberInValid: boolean = true;
  isWorkNumberInValid: boolean = true;
  isEmailInValid: boolean = true;

  constructor(
    private backend: BackendService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.contactId = Number(this.route.snapshot.paramMap.get('id'));
  }

  validateMobileNumber() {
    const { mobile } = this.editContactData;

    if (mobile.length <= 11) { this.isMobileNumberInValid = true }
    else if (!mobile.includes('-')) { this.isMobileNumberInValid = true }
    else { this.isMobileNumberInValid = false }
  }

  validateWorkNumber() {
    const { work } = this.editContactData;

    if (work.length <= 11) { this.isWorkNumberInValid = true }
    else if (!work.includes('-')) { this.isWorkNumberInValid = true }
    else { this.isWorkNumberInValid = false }
  }

  validateHomeNumber() {
    const { home } = this.editContactData;

    if (home.length <= 11) { this.isHomeNumberInValid = true }
    else if (!home.includes('-')) { this.isHomeNumberInValid = true }
    else { this.isHomeNumberInValid = false }
  }

  validateEmail() {
    const { email } = this.editContactData;

    if (!email) { this.isEmailInValid = true; }
    else if (!email.includes('@')) { this.isEmailInValid = true; }
    else if (!email.includes('.')) { this.isEmailInValid = true; }
    else { this.isEmailInValid = false; }
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
    this.backend.getContact(this.contactId, this.editContactData)
      .then((data) => {
        for (var key in data) {
          if (this.editContactData.hasOwnProperty(key)) {
            this.editContactData[key] = data[key]
          }
        }
      });
  }
}