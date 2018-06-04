import { TestBed, inject, getTestBed  } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { MockBackend } from '@angular/http/testing';
import {
  HttpModule,
  Http,
  Response,
  ResponseOptions,
  XHRBackend
} from '@angular/http';
import { PetService } from './pet.service';
import { environment } from '../../environments/environment';

describe('Pet Service', () => {
  let injector: TestBed;
  let service: PetService;
  let httpMock: HttpTestingController;
   
  //let myAppUrl : string = "https://petservice.azurewebsites.net/";
  let myAppUrl = environment.petServiceUrl;

  let faked_pet_data =  [ 

    {
      "id": 1,
      "name": "Leanne",
      "status": "pending",
      "photoUrl": "URL-1",
      "categoryName": "Dogs",
      "createdAt" : "29-Jan-2017"
    },
    {
        "id": 2,
        "name": "John",
        "status": "pending",
        "photoUrl": "URL-2",
        "categoryName": "Cats",
        "createdAt" : "29-Jan-2017"
      },
      
    ]

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
         
        HttpClientTestingModule
      ],
      providers: [PetService ]
    });
    injector = getTestBed();
    service = injector.get(PetService);
    httpMock = injector.get(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });
 
    it('Test - getPets() method should return 2 Observable<Pet[]> items', () => {
 
      service.getPets().subscribe(data => {
        expect(data.length).toBe(2);
        expect(data).toEqual(faked_pet_data);
      });
     
      
      const req = httpMock.expectOne( myAppUrl   + 'api/pets/');
      expect(req.request.method).toBe("GET");

      // Respond with mock data, causing Observable to resolve.
      req.flush(faked_pet_data);
    });

    it('Test - savePet() method should save the new pet record ', () => {
 
        let new_pet_data = [{
            "name": "Tom",
            "status": "pending",
            "photoUrl": "URL-3",
            "categoryName": "Dogs",
            "createdAt" : "29-Jan-2017"
          }]


        service.savePet(new_pet_data).subscribe(data => {
          expect(data.length).toBe(1);
          expect(data).toEqual(new_pet_data);
        });
       
        
        const req = httpMock.expectOne( myAppUrl   + 'api/pets/');
        expect(req.request.method).toBe("POST");
        req.flush(new_pet_data);
      });


      it('Test - deletePet() method should delete a pet record ', () => {
  

        service.deletePet(2).subscribe(data => {
          expect(data).toBe(2); 
        });
       
        
        const req = httpMock.expectOne( myAppUrl   + 'api/pets/2');
        expect(req.request.method).toBe("DELETE");
        req.flush(2);
      });



  });



