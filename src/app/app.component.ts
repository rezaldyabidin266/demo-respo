import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { fadeAnimation } from './animations';
import { fadeInAnimation } from './animations/fadeAnimations';
import notify from 'devextreme/ui/notify'
import { settingClient, UrlServiceService } from './serviceGlobal/url-service.service';
import { Location } from '@angular/common';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [fadeInAnimation],
  host : {'[@fadeInAnimation]': ''}
})
export class AppComponent implements OnInit {
  title = 'lokerV11';

  experted:any;
  auth:boolean = false;
  settingClient:any = new settingClient('','','','','','','',false,'',false);
  ipClient:any;

  constructor(
  private router : Router,
  private serviceGlobal :UrlServiceService,
  private location : Location
  ){

    if(localStorage.getItem("authStatus") === "true"){
      localStorage.setItem("authStatus", JSON.stringify(true))
    }else{
      localStorage.setItem("authStatus", JSON.stringify(this.auth))
    }

  }

  ngOnInit(){
    
    let ip
    let durasi = 1000 * 60 * 60;//2jam
    this.experted = setInterval(() =>{
        localStorage.clear()
        this.router.navigate(['/login']);
        notify({
          message:"Durasi Habis, Harap Login Ulang",
          width:300
       },"error",30000)
      },durasi)

  
      let resource = navigator.userAgent;
      let startIndex = resource.indexOf('(');
      let stopIndex = resource.indexOf(')');
      let Hasil = resource.substring(startIndex,stopIndex)
    

    this.serviceGlobal.getIpClient().subscribe(
      (resp:any) =>{
        ip = resp.ip
        this.serviceGlobal.getSettingIp(resp.ip).subscribe(
          (resp:any) =>{
            console.log(resp)
            this.ipClient = resp
            this.settingClient.browser = this.myBrowser();
            this.settingClient.ipAddress = resp.ip;
            this.settingClient.platform = Hasil + ')';
            this.settingClient.computerScreen = this.computerScreen();
            this.settingClient.page = this.location.path();
            this.settingClient.location = `${resp.city}, ${resp.country_name}`;
            this.settingClient.isp = resp.org;
            this.settingClient.referred = document.referrer;
            this.settingClient.isDoNotTrack = this.doNotTrack()
            this.serviceGlobal.postSettingClient(this.settingClient).subscribe(
              (resp:any) =>{
                console.log(resp)
              },error => console.log(error)
            )
          },error =>{
            this.settingClient.browser = this.myBrowser();
            this.settingClient.ipAddress = ip;
            this.settingClient.platform = Hasil + ')';
            this.settingClient.computerScreen = this.computerScreen();
            this.settingClient.page = this.location.path();
            this.settingClient.location = `Nothing`;
            this.settingClient.isp = `Nothing`;
            this.settingClient.referred = document.referrer;
            this.settingClient.isDoNotTrack = this.doNotTrack()
            this.serviceGlobal.postSettingClient(this.settingClient).subscribe(
              (resp:any) =>{
                console.log(resp)
              },error => console.log(error)
            )
          }
        )
      },error =>{
        this.settingClient.browser = this.myBrowser();
        this.settingClient.ipAddress = `Nothing`;
        this.settingClient.platform = Hasil + ')';
        this.settingClient.computerScreen = this.computerScreen();
        this.settingClient.page = this.location.path();
        this.settingClient.location = `Nothing`;
        this.settingClient.isp = `Nothing`;
        this.settingClient.referred = document.referrer;
        this.settingClient.isDoNotTrack = this.doNotTrack()
        this.serviceGlobal.postSettingClient(this.settingClient).subscribe(
          (resp:any) =>{
            console.log(resp)
          },error => console.log(error)
        )
      }
    )



    
  }


  //OS
  getMobileOperatingSystem() {
      var userAgent = navigator.userAgent || navigator.vendor;

    // Windows Phone must come first because its UA also contains "Android"
    if (/windows phone/i.test(userAgent)) {
          return "Windows Phone";
    }

    if (/Windows/i.test(userAgent)) {
        return "Windows Os";
    }

    if (/Ubuntu/i.test(userAgent)) {
          return "Ubuntu";
    }

    if (/android/i.test(userAgent)) {
          return "Android";
    }

    if(/linux/i.test(userAgent)){
      return "Linux"
    }

    // iOS detection from: http://stackoverflow.com/a/9039885/177710
    if (/iPad|iPhone|iPod/.test(userAgent) && !window.MSStream) {
          return "iOS";
    }

      return "unknown";
  }

  

   //Get Browser
   myBrowser() { 

        if ( navigator.userAgent.indexOf("Edge") > -1 && navigator.appVersion.indexOf('Edge') > -1 ) {
          return 'Edge';
      }
      else if( navigator.userAgent.indexOf("Opera") != -1 || navigator.userAgent.indexOf('OPR') != -1 )
      {
          return 'Opera';
      }
      else if( navigator.userAgent.indexOf("Chrome") != -1 )
      {
          return 'Chrome';
      }
      else if( navigator.userAgent.indexOf("Safari") != -1)
      {
          return 'Safari';
      }
      else if( navigator.userAgent.indexOf("Firefox") != -1 ) 
      {
          return 'Firefox';
      }
      else if( ( navigator.userAgent.indexOf("MSIE") != -1 ) || (!!document.DOCUMENT_NODE == true ) ) //IF IE > 10
      {
          return 'IE';
      }  
      else 
      {
          return 'unknown';
      }
   }

   computerScreen():string{
    let witdhScreen = screen.width;
    let heightScreen = screen.height;
    let colorDefth = screen.colorDepth;

    return `${witdhScreen} x ${heightScreen} Pixels / ColorDepth ${colorDefth} bit `;
   }

   getPage():string{
     let page = window.location.pathname;
     return `URL : ${page}`
   }

   doNotTrack():boolean{
    if (window.doNotTrack || navigator.doNotTrack || window.doNotTrack) {

      // The browser supports Do Not Track!
  
      if (window.doNotTrack == "1" || navigator.doNotTrack == "yes" || navigator.doNotTrack == "1" || window.doNotTrack == "1") {
  
        // Do Not Track is enabled!
        return true

      } else {

        // Do Not Track is disabled!
        return false

      }
    } else {
    
      // Do Not Track is not supported
      return false

    }
  }

  browserTor(){

    

  }


}
