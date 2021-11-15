import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UrlServiceService } from 'src/app/serviceGlobal/url-service.service';


@Injectable({
  providedIn: 'root'
})
export class MotivasiService {

  url_gambarFtp = UrlServiceService.apiUser + "Motivations/show-gambar-motivasiftp";
  url_kalimat = UrlServiceService.apiUser + "Motivations/list-kalimat";

  constructor(private http : HttpClient) { }

  getGambar(){
    return this.http.get(this.url_gambarFtp, {responseType: "blob"})
  }

  getKalimat(){
    return this.http.get(this.url_kalimat);
  }

}
