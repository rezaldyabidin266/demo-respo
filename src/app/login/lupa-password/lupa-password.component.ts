import { not } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService, resetPassword } from '../serviceLogin/login.service';
import notify from 'devextreme/ui/notify'
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-lupa-password',
  templateUrl: './lupa-password.component.html',
  styleUrls: ['./lupa-password.component.scss']
})
export class LupaPasswordComponent implements OnInit {

  //interface
  email:any;
  noTlp:any;
  spin:boolean = false;

  resetSchema:any = new resetPassword('','')

  constructor(
    private router : Router,
    private loginService : LoginService
  ) { }

  ngOnInit(): void {
  }

  validasi(params:any){
    const validasi = (value:any) =>{
      const valid = "%$#@!";
      return new Promise((resolve) => {
          setTimeout(() => {
              resolve(value !== valid);
          }, 1000);
      });    
    }
    return validasi(params.value);
  }

  onSubmit(){
    this.spin = true;
    this.resetSchema.email = this.email;
    this.resetSchema.noHandphone = String("0" + this.noTlp);
  
    this.loginService.putPw(this.resetSchema,'').subscribe(
      (resp:any) => {
        console.log(resp)
        this.router.navigate(['/otp'])
        notify({
          message: resp,
          width:300
       },"success",4000)
       this.spin = false;
      },(error: HttpErrorResponse) => {
        this.spin = false;
        notify({
          message: error.error,
          width:300
        },"error",3000)
       }
    )
  }

}
