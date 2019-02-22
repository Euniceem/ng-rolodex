import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { ContactComponent } from './pages/contact/contact.component';
import { AddContactComponent } from './pages/add-contact/addContact.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { LoginComponent } from './pages/login/login.component';
import { LoginGuard } from './guards/login-guard.service';

const routes: Routes = [
  { path: '', canActivate: [LoginGuard], component: HomeComponent },
  { path: 'contact', canActivate: [LoginGuard], component: ContactComponent },
  { path: 'add-contact', canActivate: [LoginGuard], component: AddContactComponent },
  { path: 'profile', canActivate: [LoginGuard], component: ProfileComponent },
  { path: 'login', component: LoginComponent },
  { path: '**', redirectTo: '/login', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { enableTracing: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
