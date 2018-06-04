import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { AddPetComponent } from './addPet/AddPet.component';
import { FetchPetComponent } from './fetchPet/fetchpet.component';
import { ProfileComponent } from './profile/profile.component';
import { AuthGuardService } from './services/auth-guard.service';

export const routes: Routes = [

    { path: '', component: LoginComponent, pathMatch: 'full' },
    { path: 'home', component: HomeComponent, canActivate: [AuthGuardService] },
    { path: 'fetch-pet', component: FetchPetComponent, canActivate: [AuthGuardService] },
    { path: 'register-pet', component: AddPetComponent, canActivate: [AuthGuardService] },
    { path: 'pet/edit/:id', component: AddPetComponent, canActivate: [AuthGuardService] },
    { path: 'profile', component: ProfileComponent, canActivate: [AuthGuardService] },
    { path: 'logout', component: LoginComponent },


];