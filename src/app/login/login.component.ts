import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { login, LoginService } from './serviceLogin/login.service';
import notify from 'devextreme/ui/notify'
import { UrlServiceService } from '../serviceGlobal/url-service.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  showSpin:boolean = false;
  ipClient:any;
  loginSchema = new login('','','','')

  constructor(
    private router : Router,
    private loginService : LoginService,
    private serviceGlobal : UrlServiceService
    ) { }

  ngOnInit(): void {
    
    this.serviceGlobal.getIpClient().subscribe
    ( (resp:any) =>{
      this.ipClient = resp.ip
    })

  }

  dataLogin(e:any){
    this.showSpin = true  
    this.loginSchema.email = e.email;
    this.loginSchema.password = e.password;
    this.loginSchema.ipAddress = this.ipClient;
    this.loginSchema.browser = this.myBrowser();
    this.loginService.postLogin(this.loginSchema).subscribe(
      (resp:any) => {
        localStorage.setItem("authStatus", JSON.stringify(true))
        this.router.navigate(['/profile'])
        .then(() => {
          this.showSpin = false;
          let logIn = true;
          window.location.reload();
          localStorage.setItem('token',resp.token)
          localStorage.setItem("logIn", JSON.stringify(logIn));
          notify({
            message: resp.message,
            width:300
         },"success",3000)
        });
      },(error : HttpErrorResponse) =>{
        localStorage.setItem("authStatus", JSON.stringify(false));
        if(error.status === 403){
          this.showSpin = false;
          notify({
            message: error.error.message,
            width:300
         },"error",3000)
        } else{
          this.showSpin = false;
          notify({
            message: error.error.message,
            width:300
         },"error",3000)
        }
      }
    )

  }

  myBrowser() { 

    if((navigator.userAgent.indexOf("Opera") || navigator.userAgent.indexOf('OPR')) != -1 ) {

        return 'Opera';

    }else if(navigator.userAgent.indexOf("Chrome") != -1 ){

        return 'Chrome';

    }else if(navigator.userAgent.indexOf("Safari") != -1){

        return 'Safari';

    }else if(navigator.userAgent.indexOf("Firefox") != -1 ) {

         return 'Firefox';

    }else if((navigator.userAgent.indexOf("MSIE") != -1 ) || (!!document.DOCUMENT_NODE == true )){

      return 'IE'; 

    } else {

       return 'unknown';

    }

}

}
