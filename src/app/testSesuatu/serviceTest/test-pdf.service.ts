import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TestPdfService {

  url_test = "https://www.api2.loker.bogorstudio.com/api/Users/get-cv";
  url_foto = "https://www.api2.loker.bogorstudio.com/api/Users/get-foto"

  constructor(private http : HttpClient) { }

  testpdf(test:any){
    const httpOptions:Object = {
      headers :  new HttpHeaders({
        // "token" : "Rh0ZlS6C7yQGHrfRehHxfNLmGM5DWBqHtIWGJLRj3PpMnpFwXm0snt/XCzU451sn"
        "token" : `${localStorage.getItem("token")}`
      }),
      responseType: 'blob'
    }
      return this.http.post(this.url_test,test,httpOptions)
  }
  testGambar(test:any){
    const httpOptions:Object = {
      headers :  new HttpHeaders({
        "token" : `${localStorage.getItem("token")}`
      }),
      responseType: 'blob'
    }
    return this.http.post(this.url_foto,test,httpOptions)
 
  }
}
