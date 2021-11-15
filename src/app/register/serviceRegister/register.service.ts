import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UrlServiceService } from 'src/app/serviceGlobal/url-service.service';

export class register{
  constructor(
      public nama : string,
      public alamat : string,
      public noTlp : string,
      public tempatLahir : string,
      public tglLahir : string,
      public password : string,
      public note : any
  ){}
}

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  url_register = UrlServiceService.apiUser + "Users/register"

  constructor(private http:HttpClient) { }

  postRegister(register : register){
    return this.http.post(this.url_register,register,{responseType: "text"})
  }
}
