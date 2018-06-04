import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot, CanActivateChild, NavigationExtras, CanLoad, Route } from '@angular/router';

import { TokenStorage } from '../services/token.storage';
import { UserProfile } from '../models/profile';

@Injectable()
export class AuthGuardService implements CanActivate, CanActivateChild, CanLoad {
    constructor(private router: Router, private token: TokenStorage) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {

        let url: string = state.url;
        //console.log('canActivate : ' + url);
        return this.checkLogin(url);
    }

    canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        return this.canActivate(route, state);
    }

    canLoad(route: Route): boolean {

        let url = `/${route.path}`;
        return this.checkLogin(url);
    }

    checkLogin(url: string): boolean {
        let retValue = this.token.getLoginStatus(); 
        return retValue;
    }

    isViewOnlyUser(): boolean {
        let profile: UserProfile;
        profile = this.token.getProfile();
        let authorities = profile.authorities;
        console.log('List Authority');
        console.log(authorities);
        for (let i = 0; i < authorities.length; i++) {
            console.log(authorities[i]['authority']);
            if (authorities[i]['authority'] == "ROLE_ADMIN")
                return false;
        }
        return true
    }

}
