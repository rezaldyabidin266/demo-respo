import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UrlServiceService } from 'src/app/serviceGlobal/url-service.service';


export class pengalaman{
  constructor(
      public tempatKerja : string,
      public posisi : string,
      public keterangan : string,
      public nominal : number,
      public tglAkhir : any, 
      public tglAwal : any,
  ){}
}

@Injectable({
  providedIn: 'root'
})

export class PengalamanService {

  url_getPengalaman = UrlServiceService.apiUser + "Users/list-pengalaman";
  url_postPengalaman = UrlServiceService.apiUser + "Users/add-pengalaman";
  url_putPengalaman = UrlServiceService.apiUser + "Users/update-pengalaman"
  url_delete = UrlServiceService.apiUser + "Users/delete-pengalaman";
  constructor( private http: HttpClient) { }

  getPengalaman(){
    const httpOptions = {
      headers : new HttpHeaders({
        "token" : `${localStorage.getItem("token")}`
      })
    }
    return this.http.get(this.url_getPengalaman,httpOptions);
  }

  postPengalaman(pengalaman : pengalaman){
      
    //Setting Header
    const httpOptions:Object = {
      headers :  new HttpHeaders({
        "token" : `${localStorage.getItem("token")}`
      }),
      responseType: 'text'
    }
    return this.http.post(this.url_postPengalaman,pengalaman,httpOptions);
  }

  updatePengalaman(pengalamanValue:any,pengalamanId : any){

       //Setting Header
       const httpOptions:Object = {
        headers :  new HttpHeaders({
          "pengalamanId" : `${pengalamanId}`,
          "token" : `${localStorage.getItem("token")}`
        }),
        responseType: 'text'
      }
      return this.http.post(this.url_putPengalaman,pengalamanValue,httpOptions)
  }

  deletePengalaman(idPengalaman : any){
  //Setting Header
  const httpOptions:Object = {
    headers :  new HttpHeaders({
      "pengalamanId" : `${idPengalaman}`,
      "token" : `${localStorage.getItem("token")}`
    }),
    responseType: 'text'
  }
  return this.http.delete(this.url_delete,httpOptions)
  }
}