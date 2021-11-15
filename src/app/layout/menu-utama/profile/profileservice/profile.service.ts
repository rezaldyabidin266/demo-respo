import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UrlServiceService } from 'src/app/serviceGlobal/url-service.service';

export class pelamarUpdate{
  constructor(
      public noTlp : string,
      public nama : string,
      public alamat : string,
      public tempatLahir : string,
      public tglLahir : any, 
  ){}
}


@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  url_getPelamar = UrlServiceService.apiUser + "Users/informasi-pelamar";
  url_putPelamar = UrlServiceService.apiUser + "Users/update-data-pelamar";
  url_foto = UrlServiceService.apiUser + "Users/get-foto";

  constructor(private http : HttpClient) { }

  getPelamar(){
    const httpOptions = {
      headers : new HttpHeaders({
        "token" : `${localStorage.getItem("token")}`
      })
    }
    return this.http.get(this.url_getPelamar,httpOptions);
  }

  putPelamar(profileUpdate :any){
    const httpOptions:Object = {
      headers : new HttpHeaders({
        "token" : `${localStorage.getItem("token")}`
      }),
      responseType : 'text',
   
    }
    return this.http.put(this.url_putPelamar,profileUpdate,httpOptions)
  }

  getGambar(test:any):Observable<any>{
    const httpOptions:Object = {
      headers :  new HttpHeaders({  
        "token" : `${localStorage.getItem("token")}`
      }),
      responseType: 'blob',
      reportProgress: true,
      observe: 'events'
    }
    return this.http.post(this.url_foto,test,httpOptions)
 
  }

}
