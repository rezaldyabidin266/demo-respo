import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UrlServiceService } from 'src/app/serviceGlobal/url-service.service';

@Injectable({
  providedIn: 'root'
})
export class ListLokerService {

  url_listLoker = UrlServiceService.apiUrl + "list-loker";

  constructor(private http : HttpClient) { }

  getLoker(){
    return this.http.get(this.url_listLoker)
  }

}
