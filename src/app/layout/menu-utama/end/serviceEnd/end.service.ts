import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UrlServiceService } from 'src/app/serviceGlobal/url-service.service';

@Injectable({
  providedIn: 'root'
})
export class EndService {

  url_foto = UrlServiceService.apiUser + "Users/get-foto";
  url_pelamar = UrlServiceService.apiUser +"Users/informasi-pelamar";
  url_pengalaman = UrlServiceService.apiUser + "Users/list-pengalaman"

  constructor(private http : HttpClient) { }

  getGambar(test:any){
    const httpOptions:Object = {
      headers :  new HttpHeaders({
        "token" : `${localStorage.getItem("token")}`
      }),
      responseType: 'blob',
      reportProgress: true,
      observe: 'events', 
    }
    return this.http.post(this.url_foto,test,httpOptions)
 
  }

  getPelamar(){
    const httpOptions = {
      headers :  new HttpHeaders({
        "token" : `${localStorage.getItem("token")}`
      }),
    }
    return this.http.get(this.url_pelamar,httpOptions);
  }


  getPengalaman(){
    const httpOptions = {
      headers :  new HttpHeaders({
        "token" : `${localStorage.getItem("token")}`
      }),
    }
    return this.http.get(this.url_pengalaman,httpOptions);
  }

}
