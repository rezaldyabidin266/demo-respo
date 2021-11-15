import { Component, OnInit } from '@angular/core';
import { gantiPassword, LoginService } from '../serviceLogin/login.service';
import notify from 'devextreme/ui/notify'
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
@Component({
  selector: 'app-update-password',
  templateUrl: './update-password.component.html',
  styleUrls: ['./update-password.component.scss']
})
export class UpdatePasswordComponent implements OnInit {

  //interface
  passwrodLama:any;
  passwrodBaru:any;
  passwrodConfirm:any;
  spin:boolean = false;

  changeSchema = new gantiPassword('','','')

  constructor(
    private loginService : LoginService,
    private router: Router
  ) { }

  ngOnInit(): void {
 
  }

  validasi(params:any){
    const validasi = (value:any) =>{
      const valid = "%$#@!";
      console.log(this.passwrodBaru)
      return new Promise((resolve) => {
          setTimeout(() => {
              resolve(value !== valid);
          }, 1000);
      });    
    }
    return validasi(params.value);
  }

  passwordComparison = () => {
    return this.passwrodBaru;
};

  onSubmit(){

    let value = this.passwordComparison()
    
    if(this.passwrodBaru === this.passwrodConfirm){
      this.changeSchema.passwrodLama = this.passwrodLama;
      this.changeSchema.passwrodBaru = value;
      this.changeSchema.token = `${localStorage.getItem("token")}`;

      this.loginService.postGantiPassword(this.changeSchema).subscribe(
        (resp:any) =>{
          console.log(resp)
          this.router.navigate(['/login'])
          .then(() => {
            window.location.reload();
            localStorage.clear();
            notify({
              message: resp,
              width:300
           },"success",4000)
          });
        },(error :HttpErrorResponse) =>{
          notify({
            message: error.error,
            width:300
         },"error",4000)
        }
      )
    }

 
    console.log(this.changeSchema)
  }

}
