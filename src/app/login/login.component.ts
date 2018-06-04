import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {MatDialog} from '@angular/material';
import {AuthService} from '../services/auth.service';
import {TokenStorage} from '../services/token.storage';
import {ErrorDialogComponent} from "../error/error-dialog.component";
import {UserProfile} from "../models/profile";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  constructor(private router: Router, public dialog: MatDialog, private authService: AuthService, private token: TokenStorage) {
      this.token.signOut();
  }

  username: string;
  password: string;
  

  login(): void {
    this.authService.attemptAuth(this.username, this.password).subscribe(
      data => {
        // Extract the Token returned from Auth Server
        let token = data[0].token;
        console.log(token);

        let profile : UserProfile;
        // Extract the User Profile returned from Auth Server
        profile = data[1];
        console.log(profile.authorities);
        
        this.token.saveToken(token);
        this.token.saveProfile(profile);

        console.log('token = [' + token + ']'); 
        this.router.navigate(["/home"]);
      }
      , error => {
        this.showError("Invalid username or password.");
        console.log(error) }
        
    );
    
  }

  showError(error : string) : void {
    this.dialog.open(ErrorDialogComponent, {
      data: {errorMsg: error} ,width : '250px'
    });
  }


}
