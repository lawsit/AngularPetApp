import { Injectable, Inject } from '@angular/core';
import { HttpClient,  HttpHeaders, HttpParams} from '@angular/common/http'; 
import { PetData } from '../models/pet'

import {TokenStorage} from './token.storage';
import { environment } from '../../environments/environment'

import { Observable } from 'rxjs/Observable';
import { Router } from '@angular/router';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

@Injectable()
export class PetService {
    myAppUrl: string = "";

    constructor(private _httpClient: HttpClient, private token: TokenStorage) {
        //this.myAppUrl = "https://petservice.azurewebsites.net/"; 
        //this.myAppUrl = "http://localhost:8080/";
        this.myAppUrl = environment.petServiceUrl;
    }

    getPets() {
        console.log('getPets from ' + this.myAppUrl + 'api/pets/');;
        return this._httpClient.get<PetData[]>(this.myAppUrl + "api/pets/");
    }

    getPersons() {
        /*
        let token = this.token.getToken();
        var custom_header = new Headers({'Content-type': 'application/json', 'Authorization': 'Bearer '+ token});
        const options = new RequestOptions();
        options.headers = custom_header;
        console.log(options.headers);
        */
       return this._httpClient.get("http://localhost:8080/persons");

    }


    getPetById(id: number) {
        console.log('getPetById');
        console.log(id);
        return this._httpClient.get<PetData>(this.myAppUrl + "api/pets/" + id);
    }

    getPetByCategory(cat: String) {
        console.log('getPetByCategory');
        console.log(cat);
        return this._httpClient.get<PetData[]>(this.myAppUrl + "search/pets/" + cat);
    }


    savePet(pet) {
        console.log('savePet');
        console.log(pet);

        const headers = new HttpHeaders().set('content-type', 'application/json');
        var body = {
            name: pet.name,
            status: pet.status,
            categoryName: pet.categoryName,
            photoUrl: pet.photoUrl
        }
        return this._httpClient.post<any>(this.myAppUrl + 'api/pets/', body, {
            headers
        })

    }

    updatePet(pet) {
        console.log('updatePet');
        console.log(pet);
        const params = new HttpParams().set('id', pet.id);
        const headers = new HttpHeaders().set('content-type', 'application/json');
        var body = {
            name: pet.name,
            status: pet.status,
            categoryName: pet.categoryName,
            photoUrl: pet.photoUrl
        }
        return this._httpClient.put<any>(this.myAppUrl + 'api/pets/' + pet.id, body, {
            headers,
            params
        })
    }



    deletePet(id) {
        console.log('deletePet');
        console.log(id);


        let retvalue = this.myAppUrl + "api/pets/" + id;
        console.log(retvalue);

        return this._httpClient.delete<any>(this.myAppUrl + 'api/pets/' + id);

    }

}
/*
interface PetData {
    id: number;
    name: string;
    status: string;
    photoUrl: string;
    categoryName: string;
    createdAt: string;
}
*/