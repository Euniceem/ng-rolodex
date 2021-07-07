import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { ContactComponent } from './pages/contact/contact.component';
import { AddContactComponent } from './pages/add-contact/addContact.component';
import { EditContactComponent } from './pages/edit-contact/editContact.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { EditProfileComponent } from './pages/edit-profile/editProfile.component';
import { AuthGuard } from './guards/auth.guard.service';

const routes: Routes = [
  { path: '', canActivate: [AuthGuard], component: HomeComponent },
  { path: 'contacts', canActivate: [AuthGuard], component: ContactComponent },
  { path: 'contact/add', canActivate: [AuthGuard], component: AddContactComponent },
  { path: 'contact/edit/:id', canActivate: [AuthGuard], component: EditContactComponent },
  { path: 'profile', canActivate: [AuthGuard], component: ProfileComponent },
  { path: 'profile/edit', canActivate: [AuthGuard], component: EditProfileComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent },
  { path: '**', redirectTo: 'login', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { enableTracing: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
