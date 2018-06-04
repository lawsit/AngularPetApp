import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { ErrorDialogComponent } from './error/error-dialog.component';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { AddPetComponent } from './addPet/AddPet.component';
import { FetchPetComponent } from './fetchPet/fetchpet.component';
import { ProfileComponent } from './profile/profile.component';


import { AuthGuardService } from './services/auth-guard.service';
import { PetService } from './services/pet.service';
import { AuthService } from './services/auth.service';
import { TokenStorage } from './services/token.storage';
import { Interceptor } from './services/interceptor';

import {routes} from './app.routes';

import { MaterialModule } from './modules/material.module';
import {
  MatButtonModule, MatDialogModule, MatIconModule, MatInputModule, MatPaginatorModule, MatSortModule,
  MatTableModule, MatToolbarModule, MatFormFieldModule
} from '@angular/material';



@NgModule({
  declarations: [
    AppComponent,
    ErrorDialogComponent,
    LoginComponent,
    NavMenuComponent,
    HomeComponent,
    AddPetComponent,
    FetchPetComponent,
    ProfileComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    BrowserAnimationsModule,
    HttpClientModule,
    HttpModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    RouterModule.forRoot(routes)
  ],
  entryComponents: [ErrorDialogComponent],
  providers: [PetService, AuthGuardService, ErrorDialogComponent, AuthService, TokenStorage, TokenStorage,
     
    {
      provide: HTTP_INTERCEPTORS,
      useClass: Interceptor,
      multi: true
    }
    
  ],


  bootstrap: [AppComponent]
})
export class AppModule { }
