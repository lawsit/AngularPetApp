import { Component, OnInit } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { NgForm, FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { FetchPetComponent } from '../fetchPet/fetchpet.component';
import { PetService } from '../services/pet.service';

@Component({
    selector: 'createpet',
    templateUrl: './AddPet.component.html',
    styleUrls: ['./AddPet.component.css']
})

export class AddPetComponent implements OnInit {
    petForm: FormGroup;
    title: string = "Create";
    id: number;
    errorMessage: any;

    constructor(private _fb: FormBuilder, private _avRoute: ActivatedRoute,
        private _petService: PetService, private _router: Router) {
        console.log('ActivatedRoute');
        console.log(this._avRoute);
        if (this._avRoute.snapshot.params["id"]) {
            this.id = this._avRoute.snapshot.params["id"];
        }

        this.petForm = this._fb.group({
            id: 0,
            name: ['', [Validators.required]],
            status: ['', [Validators.required]],
            photoUrl: ['', [Validators.required]],
            categoryName: ['', [Validators.required]]
        })
    }

    ngOnInit() {
        if (this.id > 0) {
            this.title = "Edit";
            console.log('ngOnInit');
            console.log(this.id);
            this._petService.getPetById(this.id)
                .subscribe(resp => {
                    console.log(resp);
                    this.petForm.controls.id.setValue(resp.id);
                    this.petForm.controls.name.setValue(resp.name);
                    this.petForm.controls.status.setValue(resp.status);
                    this.petForm.controls.photoUrl.setValue(resp.photoUrl);
                    this.petForm.controls.categoryName.setValue(resp.categoryName);
                    //this.petForm.setValue(resp);

                }
                    , error => this.errorMessage = error)
        }
    }

    save() {

        console.log('save()');
        if (!this.petForm.valid) {
            return;
        }

        if (this.title == "Create") {
            console.log('Create Pet');
            this._petService.savePet(this.petForm.value)
                .subscribe((data) => {
                    this._router.navigate(['/fetch-pet']);
                }, error => this.errorMessage = error)
        }
        else if (this.title == "Edit") {
            console.log('edit');
            console.log(this.petForm.value);
            this._petService.updatePet(this.petForm.value)
                .subscribe((data) => {
                    this._router.navigate(['/fetch-pet']);
                }, error => this.errorMessage = error)
        }
    }

    cancel() {
        this._router.navigate(['/fetch-pet']);
    }

    //get id()   {return this.petForm.get('id');}
    get name() { return this.petForm.get('name'); }

    get status() { return this.petForm.get('status'); }
    get photoUrl() { return this.petForm.get('photoUrl'); }
    get categoryName() { return this.petForm.get('categoryName'); }
}
