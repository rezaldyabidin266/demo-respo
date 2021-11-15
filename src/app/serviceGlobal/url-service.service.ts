import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';


export class settingClient{
  constructor(
      public page : string,
      public browser : string,
      public platform : string,
      public location : string,  
      public isp : string,
      public computerScreen : string,
      public ipAddress : string,
      public isDoNotTrack : boolean,
      public referred : string,
      public isTor : boolean,
  ){}
}

@Injectable({
  providedIn: 'root'
})
export class UrlServiceService {

  public static apiUrl: string = "https://api.loker.esbrasilonline.com/api/lokers/";
  public static apiUser: string = "https://api.loker.esbrasilonline.com/api/";
  
  apiSetting = UrlServiceService.apiUser + "Settings/counter";


  constructor(private http: HttpClient) { }

  getIpClient(){
    return this.http.get('https://jsonip.com')
  }

  postSettingClient(setting:any){
    return this.http.post(this.apiSetting,setting,{responseType: 'text'});
  }

  getSettingIp(ipClient){
    //let url = "https://api.ipgeolocation.io/ipgeo?apiKey=42f1ccc23e7c4ce78a7c532f64673b96&ip="+ipClient; 
    let UrlIP = `https://ipapi.co/${ipClient}/json/`
    return this.http.get(UrlIP)
  }
}
