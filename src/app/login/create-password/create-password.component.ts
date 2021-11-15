import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { createPw, LoginService } from '../serviceLogin/login.service';
import notify from 'devextreme/ui/notify'
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-create-password',
  templateUrl: './create-password.component.html',
  styleUrls: ['./create-password.component.scss']
})
export class CreatePasswordComponent implements OnInit {

  //interface
  email:any;
  password:any;
  spin:boolean = false;

  createSchema:any = new createPw('','')

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
    this.createSchema.email = this.email;
    this.createSchema.password = this.password;

    this.loginService.createPw(this.createSchema).subscribe(
      (resp:any) => {
        console.log(resp)
        this.router.navigate(['../login'])
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
