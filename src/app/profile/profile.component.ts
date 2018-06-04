import { Component, Inject } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Router, ActivatedRoute } from '@angular/router';
import {UserProfile} from "../models/profile";
import {TokenStorage} from '../services/token.storage';

@Component({
    selector: 'fetchPet',
    templateUrl: './profile.component.html',
    styleUrls: ['./profile.component.css']
})

export class ProfileComponent { 
    profile : string;
    
    constructor(public http: Http, private _router: Router, private token: TokenStorage) { 
    }

    ngOnInit(): void {
 
        
        this.profile = this.token.getProfile();
 
      }
    
}