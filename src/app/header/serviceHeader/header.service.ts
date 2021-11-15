import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UrlServiceService } from 'src/app/serviceGlobal/url-service.service';

@Injectable({
  providedIn: 'root'
})
export class HeaderService {

  url_listLokersaya = UrlServiceService.apiUrl + "list-daftar-loker-saya";

  constructor(private http:HttpClient) { }

  getList(){

    const httpOptions = {
      headers : new HttpHeaders({
        'token' : `${localStorage.getItem('token')}`
      })
    }
    return this.http.get(this.url_listLokersaya,httpOptions)
  }
}
