import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { BrowserModule, By } from '@angular/platform-browser';
import { FetchPetComponent } from './fetchpet.component';
import { Component } from "@angular/core";
import { DebugElement } from '@angular/core';
import { RouterTestingModule } from '@angular/router/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { PetService } from '../services/pet.service';
import { AuthGuardService } from '../services/auth-guard.service';
import { TokenStorage } from '../services/token.storage';
import { PetData } from '../models/pet';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import { HttpClient, HttpClientModule } from '@angular/common/http';

@Component({
  template: ''
})
class DummyComponent {
}


let faked_pet_data = [

  {
    "id": 1,
    "name": "Leanne",
    "status": "pending",
    "photoUrl": "URL-1",
    "categoryName": "Dogs",
    "createdAt": "29-Jan-2017"
  },
  {
    "id": 2,
    "name": "John",
    "status": "pending",
    "photoUrl": "URL-2",
    "categoryName": "Cats",
    "createdAt": "29-Jan-2017"
  },

]


class MockPetService extends PetService {

  getPets(): Observable<PetData[]> {
    return Observable.of(faked_pet_data);
  }
}

class MockAuthGuardService extends AuthGuardService {

  isViewOnlyUser() {
    return true;
  }
}




describe('Pet Component - View only', () => {

  let component: FetchPetComponent;
  let fixture: ComponentFixture<FetchPetComponent>;
  let debugElement: DebugElement;
  let el: HTMLElement;
  let petService: PetService;
  let authService: AuthGuardService;
  let viewOnly: boolean;



  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        FetchPetComponent,
        DummyComponent
      ],
      imports: [
        BrowserModule,
        HttpClientModule,
        RouterTestingModule.withRoutes([
          { path: 'pet/edit/:id', component: DummyComponent }
        ])
      ],
      providers: [
        { provide: PetService, useClass: MockPetService },
        { provide: AuthGuardService, useClass: MockAuthGuardService },
        TokenStorage
      ],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();
  }));

  beforeEach(() => {

    fixture = TestBed.createComponent(FetchPetComponent);
    petService = TestBed.get(PetService);
    authService = TestBed.get(AuthGuardService);
    component = fixture.componentInstance;
    debugElement = fixture.debugElement;

    //spyOn<any>(PetService.prototype, 'getPets').and.returnValue(Observable.of(faked_pet_data));

  });

  it('Test - FetchPet component should be created', () => {
    expect(component).toBeTruthy();
  });


  it('Test - FetPet component should receive exactly all faked Pet data on startup', async(() => {
    // given
    const compiled = fixture.debugElement.nativeElement;


    fixture.whenStable().then(() => {
      fixture.detectChanges(); 
      // then
      expect(component.petList).toEqual(faked_pet_data);

    }); 
  }));

  it('Test - Create Button is invisible', async(() => {
    // given
    const compiled = fixture.debugElement.nativeElement;


    fixture.whenStable().then(() => {
      fixture.detectChanges(); 
      let de = fixture.debugElement.query(By.css('.top-container'));
      let element = de.nativeElement;

      expect(element.innerText).not.toContain("Create");

    });

  }));

  it('Test - Edit Button is invisible', async(() => {
    // given
    const compiled = fixture.debugElement.nativeElement;


    fixture.whenStable().then(() => {
      fixture.detectChanges(); 

      let de = fixture.debugElement.query(By.css('.top-container'));
      let element = de.nativeElement; 
      expect(element.innerText).not.toContain("Edit");
 
    });

  }));





});
