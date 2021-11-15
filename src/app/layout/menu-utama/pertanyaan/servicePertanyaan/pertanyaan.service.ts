import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UrlServiceService } from 'src/app/serviceGlobal/url-service.service';
import { Router, CanActivate, ActivatedRouteSnapshot,RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

export class saveJawaban{
  constructor(
      public id : number,
      public pertanyaan : string,
      public jawaban : string,
      public jawabanTambahan : string,  
      public nominal : number,
      public tanggal : string,
      public filePendukung : string,
  ){}
}

@Injectable({
  providedIn: 'root'
})
export class PertanyaanService implements CanActivate{

  url_pertanyaan = UrlServiceService.apiUrl + "form-pertanyaan";
  url_saveJawaban = UrlServiceService.apiUrl + "form-save-list-jawaban";

  constructor(
    private http:HttpClient,
    private _router : Router, 
    ) {

   }

  getPertanyaan(){
    
    //Setting Header
    const httpOptions = {
      headers :  new HttpHeaders({
        "lokerId" : `${localStorage.getItem("lokerId")}`,
        "token" : `${localStorage.getItem("token")}`
      }),
    }
    return this.http.get(this.url_pertanyaan,httpOptions);
  }

  saveJawaban(saveJawaban:any){
    return this.http.post(this.url_saveJawaban,saveJawaban,{responseType: 'text' })
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {

      if (localStorage.getItem("authStatus") === "false")  {
        alert('Anda tidak diizinkan untuk melihat halaman ini. Anda dialihkan ke Halaman Login'); 
        this._router.navigate(["../login"]);             
        return false;  
    } 
    return true

  }

}

