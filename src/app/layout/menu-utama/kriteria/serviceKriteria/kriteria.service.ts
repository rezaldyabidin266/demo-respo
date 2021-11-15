import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map } from 'rxjs/operators';
import { UrlServiceService } from 'src/app/serviceGlobal/url-service.service';

export class daftarSchema{
  constructor(
    public nama : string,
    public alamat : string,
    public email : string,
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
export class KriteriaService {

  isLogin:boolean = false;
  url_kritetia = UrlServiceService.apiUrl + "get-loker?lokerId=";
  url_list = UrlServiceService.apiUrl + "get-kriteria?lokerId=";
  url_daftar = UrlServiceService.apiUrl + "daftar-no-register";
  url_background = UrlServiceService.apiUrl + "get-image-background?lokerId=";
  url_ilustrasi = UrlServiceService.apiUrl + "get-image-ilustrasi?lokerId=";

  constructor(private http : HttpClient) {

   }

  getKriteria(idKriteria : number){
    return this.http.get(this.url_kritetia + idKriteria);
  }

  getList(idKriteria :number){
    return this.http.get(this.url_list + idKriteria);
  }

  postDaftar(daftarSchema : daftarSchema){
    return this.http.post(this.url_daftar,daftarSchema)
  }

  isAuthGuardStatus(isLogin):void{
    return isLogin;
  }

  logoutUser(): void{
    this.isLogin = false;
}

  getBackground(idLoker:any){
    return this.http.get(this.url_background + idLoker,{ responseType: 'blob'})
  }

  getIlustrasi(idLoker:any){
    return this.http.get(this.url_ilustrasi + idLoker,{ responseType: 'blob'})
  }

}
