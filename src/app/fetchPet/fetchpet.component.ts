import { Component, Inject } from '@angular/core';
//import { Http, Headers } from '@angular/http';
import { Router, ActivatedRoute } from '@angular/router';
import { PetService } from '../services/pet.service'
import { PetData } from '../models/pet'
import { AuthGuardService } from '../services/auth-guard.service';

@Component({
    selector: 'fetchPet',
    templateUrl: './fetchPet.component.html',
    styleUrls: ['./fetchPet.component.css']
})


export class FetchPetComponent {
    petList: PetData[];
    viewOnly: boolean;


    CategoryList: Category[] = [
        { id: 0, name: 'ALL' },
        { id: 1, name: 'Dogs' },
        { id: 2, name: 'Cats' },
        { id: 3, name: 'Rats' },
        { id: 4, name: 'Rabbits' },
        { id: 5, name: 'Snakes' },
        { id: 6, name: 'Turtles' },
    ];
    curCategory: Category = this.CategoryList[0];

    constructor(private _PetService: PetService, private _authGuardService: AuthGuardService) {

        this.viewOnly = _authGuardService.isViewOnlyUser();
        if (this.viewOnly) console.log('View only');
        else console.log('allow modify');
        this.getPets();
    }




    getPets() {
/*
        this._PetService.getPersons().subscribe(data => {
            console.log('http : getPersons');
            console.log(data); 
        });
  */

        this._PetService.getPets().subscribe(data => {
            console.log('http : getpets');
            console.log(data);
            this.petList = data; 
        });

    }

    delete(PetID) {
        var ans = confirm("Do you want to delete customer with Id: " + PetID);
        if (ans) {
            this._PetService.deletePet(PetID).subscribe((data) => {
                this.getPets();

            }, error => console.error(error))
        }
    }
    searchByCategory() {
        console.log('Search by category : ' + this.curCategory.name);
        if (this.curCategory.name == "ALL")
            this.getPets();
        else {

            this._PetService.getPetByCategory(this.curCategory.name).subscribe(data => { 
                this.petList = data; 
            });
        }

    }

    selectCategory(cat: Category): void { 
        this.curCategory = cat;
        console.log("selectCategory = " + this.curCategory.name);
    }
}


interface Category {
    id: number;
    name: string;
}