import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UrlServiceService } from 'src/app/serviceGlobal/url-service.service';

@Injectable({
  providedIn: 'root'
})
export class UploadBerkasService {

  url_cv = UrlServiceService.apiUser + "Users/get-cv";
  url_foto = UrlServiceService.apiUser + "Users/get-foto";
  url_pertanyaan = UrlServiceService.apiUrl + "form-pertanyaan";

  constructor(private http : HttpClient) { }

  getCv(test:any){
    const httpOptions:Object = {
      headers :  new HttpHeaders({
        "token" : `${localStorage.getItem("token")}`
      }),
      responseType: 'blob'
    }
      return this.http.post(this.url_cv,test,httpOptions)
  }
  getGambar(test:any){
    const httpOptions:Object = {
      headers :  new HttpHeaders({
        "token" : `${localStorage.getItem("token")}`
      }),
      responseType: 'blob'
    }
    return this.http.post(this.url_foto,test,httpOptions)
 
  }
  getPertanyaan(idLoker:any){
    
    //Setting Header
    const httpOptions = {
      headers :  new HttpHeaders({
        "lokerId" : `${idLoker}`,
        "token" : `${localStorage.getItem("token")}`
      }),
    }
    return this.http.get(this.url_pertanyaan,httpOptions);
  }
}
