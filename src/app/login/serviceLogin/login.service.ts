import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UrlServiceService } from 'src/app/serviceGlobal/url-service.service';

export class login{
  constructor(

    public email : string,
    public password : string,
    public ipAddress : string,
    public browser : string,

  ){}
}

export class gantiPassword{
  constructor(

    public passwrodLama : string,
    public passwrodBaru : string,
    public token : string

  ){}
}

export class resetPassword{
  constructor(

    public email : string,
    public noHandphone : string,

  ){}
}

export class otp{
  constructor(

    public otp : string,

  ){}
}

export class createPw{
  constructor(

    public email : string,
    public password : string,

  ){}
}


@Injectable({
  providedIn: 'root'
})
export class LoginService {

  url_login = UrlServiceService.apiUser + "Users/login";
  url_resetPw = UrlServiceService.apiUser + "Users/request-otp-reset-password";
  url_otp = UrlServiceService.apiUser + "Users/reset-password";
  url_create = UrlServiceService.apiUser + "Users/buat-password-baru";
  url_change = UrlServiceService.apiUser + "Users/ganti-password";

  constructor(private http:HttpClient) { }

  postLogin(login: login ){
    return this.http.post(this.url_login,login)
  }

  putPw(resetPw:any,kosong:any){
    const httpOptions:object = {
      headers: new HttpHeaders({
        "email": `${resetPw.email}`,
        "noHandphone": `${resetPw.noHandphone}`
      }),
      responseType: 'text'
    };
    return this.http.put(this.url_resetPw,kosong,httpOptions)
  }

  validOtp(otp:any,kosong:any){
    const httpOptions:object = {
      headers: new HttpHeaders({
        "Otp": `${otp}`,
      }),
      responseType: 'text'
    };
    return this.http.put(this.url_otp,kosong,httpOptions)
  }

  createPw( createPassword:any ){
    return this.http.post(this. url_create,createPassword,{responseType : 'text'})
  }

  postGantiPassword(gantiPassword : gantiPassword){
    return this.http.post(this.url_change,gantiPassword,{responseType : 'text'})
  }
}
