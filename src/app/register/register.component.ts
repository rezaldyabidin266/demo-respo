import { DatePipe } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { DxDateBoxComponent } from 'devextreme-angular';
import { register, RegisterService } from './serviceRegister/register.service';
import notify from 'devextreme/ui/notify'
import { UrlServiceService } from '../serviceGlobal/url-service.service';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit,AfterViewInit {
  @ViewChild(DxDateBoxComponent) dateBox!: DxDateBoxComponent;
  
  nama:any = "";
  email:any;
  password:any;
  alamat:any;
  tempatLahir:any;
  tglLahir:any;
  noTlp :any;
  dateCustom:boolean = false;
  registerSchema:any = new register('','','','','','','');
  spin:boolean = false;
  bindingProperty: string = "";
  halo:any = "";
  ipClient: any;

  constructor(
    private router:Router,
    private serviceRegister : RegisterService,
    private serviceGlobal : UrlServiceService
  ) { }

  ngOnInit(): void {

    this.serviceGlobal.getIpClient().subscribe(
      (resp:any) =>{
        this.ipClient = resp.ip;
      }
    )
   
  }

  ngAfterViewInit(){
 
    this.dateBox.instance.option("calendarOptions",
    {
      firstDayOfWeek:1,
      cellTemplate : (itemData) => {
        let markupCustom = "";
        let dayOfWeek = itemData.date.getDay()
        let isWeekend = (dayOfWeek === 6) || (dayOfWeek  === 0);
          if (isWeekend)
          markupCustom = "<div style='color: #3030FF'>" + itemData.text + "</div>"
          else
          markupCustom = itemData.text;
          return markupCustom;
      }
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

  onSubmit(e:any){
    let DateFormat = new DatePipe('en-US').transform(this.tglLahir,'yyyy-MM-dd');
    this.registerSchema.nama = this.nama;
    this.registerSchema.alamat = this.alamat;
    this.registerSchema.email = this.email;
    this.registerSchema.noTlp = String(this.noTlp);
    this.registerSchema.tempatLahir  = this.tempatLahir;
    this.registerSchema.tglLahir = DateFormat;
    this.registerSchema.password = this.password;
    this.registerSchema.note =  this.myBrowser() + ' ' + `Ip ${this.ipClient}`

    this.serviceRegister.postRegister(this.registerSchema).subscribe(
        (resp:any) => {
          this.router.navigate(['../login'])
          notify({
            message: resp,
            width:300
        },"success",3000)
        },(error: HttpErrorResponse) => {
          notify({
            message: error.error,
            width:300
          },"error",3000)
        }
      )

    e.preventDefault();
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
