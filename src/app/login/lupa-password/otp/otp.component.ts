import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService, otp } from '../../serviceLogin/login.service';
import notify from 'devextreme/ui/notify'
import { HttpErrorResponse } from '@angular/common/http';


@Component({
  selector: 'app-otp',
  templateUrl: './otp.component.html',
  styleUrls: ['./otp.component.scss']
})
export class OtpComponent implements OnInit {

  otp:any;
  spin:boolean = false;
  formOtp!:FormGroup
  otpSchema = new otp('');

  constructor(
    private router : Router,
    private loginService : LoginService
  ) { }

  ngOnInit(): void {

    this.formOtp = new FormGroup({
      'Otp' : new FormControl(),
    })
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
   
    this.spin = true
    this.otpSchema = this.formOtp.get('Otp')?.value;
    this.loginService.validOtp(this.otpSchema,'').subscribe(
      (resp:any) => {
        this.router.navigate(['../createPassword'])
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
