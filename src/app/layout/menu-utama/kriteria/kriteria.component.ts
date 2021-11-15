import { DatePipe } from '@angular/common';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { DxDateBoxComponent, DxTextBoxComponent } from 'devextreme-angular';
import { daftarSchema, KriteriaService } from './serviceKriteria/kriteria.service';
import notify from 'devextreme/ui/notify'
import { HttpErrorResponse, HttpEvent } from '@angular/common/http';
import { DomSanitizer } from '@angular/platform-browser';
import { UrlServiceService } from 'src/app/serviceGlobal/url-service.service';


export interface daftarInter{
   nama?: string;
   alamat? : string,
   email? : string,
   noTlp? : string,
   tempatLahir? : string,
   tglLahir? : string,
   password? : string
}

@Component({
  selector: 'app-kriteria',
  templateUrl: './kriteria.component.html',
  styleUrls: ['./kriteria.component.scss']
})
export class KriteriaComponent implements OnInit,AfterViewInit {

  //GetBox
  @ViewChild(DxDateBoxComponent) dateBox!: DxDateBoxComponent;
  @ViewChild(DxTextBoxComponent, { static: false }) textBox!: DxTextBoxComponent;
  idKriteria!: number;
  kriteria:any = [];
  list:any = [];

  logIn:boolean = false;
  authGuard:boolean = false;

  imageKritea = [
    {
    id : 1,
    imgIcon : '/assets/image/motorisIcon.png',
    img:"/assets/image/motoris.png",
  },
  {
    id : 2,
    imgIcon : '/assets/image/helperIcon.png',
    img:"/assets/image/helper.png",
  },
  {
    id : 3,
    imgIcon : '/assets/image/adminIcon.png',
    img:"/assets/image/admin.png",
  },
]

  kriteriaBackground:any;
  kriteriaIcon:any;

  daftarSchema:any = new daftarSchema('','','','','','','','');
  daftar:daftarInter[] = [];

  stylingMode = "outlined"
  spin:boolean = false;
  dateCustom:boolean = false;
  //Class Daftar
  nama:any;
  email:any;
  password:any;
  alamat:any;
  tempatLahir:any;
  tglLahir:any;
  noTlp :any;
  phonePattern: any = /^[0-9]+$ /;

  ipClient:any;
  rules:any;


  constructor(
    private route : ActivatedRoute,
    private router : Router,
    private getKriteria :  KriteriaService,
    private sanitizer : DomSanitizer,
    private serviceGlobal : UrlServiceService
  ) { 

    this.rules = { 
      "X": /[02-9]/,   
    };
    this.route.params.subscribe(
      (params : Params) =>{
        this.idKriteria = +params['id'];
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

  ngOnInit(): void {

    if(localStorage.getItem("logIn") === "true"){
      this.logIn = true;
    }else{
      this.logIn = false;;
    }

    //getIdKriteria
    this.route.params.subscribe(
      (params : Params) =>{
        this.idKriteria = +params['id'];
        localStorage.setItem("lokerId",String(this.idKriteria))
      }
    )

    //getKriteria
    this.getKriteria.getKriteria(this.idKriteria).subscribe(
      (resp :any ) =>{
        this.kriteria = resp;
      }
    )

    //getKriteria
    this.getKriteria.getList(this.idKriteria).subscribe(
      (resp:any) =>{
        this.list = resp;
      }
    )

    this.getKriteria.getBackground(this.idKriteria).subscribe(
      (blobBackground :any ) =>{
       
        const objectURL = URL.createObjectURL(blobBackground);
        const IMG = this.sanitizer.bypassSecurityTrustStyle(`url(${objectURL})`);
    
        this.kriteriaBackground = IMG
      }
    )

    this.getKriteria.getIlustrasi(this.idKriteria).subscribe(
      (blobKriteria :any ) =>{
       
        const objectURL = URL.createObjectURL(blobKriteria);
        const IMG = this.sanitizer.bypassSecurityTrustUrl(objectURL);
        this.kriteriaIcon = IMG
      }
    )

    this.serviceGlobal.getIpClient().subscribe(
      (resp:any) =>{
        this.ipClient = resp.ip;
      }
    )


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

  phone(e:any){}


  onSubmit(e:any){

    let DateFormat = new DatePipe('en-US').transform(this.tglLahir,'yyyy-MM-dd');
    this.daftarSchema.nama = this.nama;
    this.daftarSchema.alamat = this.alamat;
    this.daftarSchema.email = this.email;
    this.daftarSchema.noTlp = String(this.noTlp);
    this.daftarSchema.tempatLahir = this.tempatLahir;
    this.daftarSchema.tglLahir = DateFormat;
    this.daftarSchema.password = this.password;
    this.daftarSchema.note =  this.myBrowser() + ' ' + `Ip ${this.ipClient}`
    this.spin = true;
    
    //Post ke server
      this.getKriteria.postDaftar(this.daftarSchema).subscribe(
        (resp:any) => {
          this.spin = false;
          localStorage.setItem("token",resp.token);
          localStorage.setItem("lokerId",String(this.idKriteria))
          this.router.navigate(['../pertayaaan']);
          localStorage.setItem("authStatus", JSON.stringify(true))
          notify({
            message: resp.message,
            width:300,
        },"success",3000)

        },(error:HttpErrorResponse) =>{
          localStorage.setItem("authStatus", JSON.stringify(false))
          this.spin = false;
          notify({
            message: error.error,
            width:300
        },"error",3000)
        }
      )

    e.preventDefault();
   }

   goPertanyaan(){
     this.router.navigate(['../pertayaaan'])
   }

   //Get Browser
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
