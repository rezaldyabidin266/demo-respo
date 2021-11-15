import { DatePipe } from '@angular/common';
import { HttpErrorResponse, HttpEvent, HttpEventType } from '@angular/common/http';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { DxDateBoxComponent } from 'devextreme-angular';
import { EndService } from '../end/serviceEnd/end.service';
import { pengalaman, PengalamanService } from '../pengalaman/servicePengalaman/pengalaman.service';
import notify from 'devextreme/ui/notify'
import { pelamarUpdate, ProfileService } from './profileservice/profile.service';
import { UploadBerkasService } from '../upload-berkas/serviceUpload/upload-berkas.service';
import { animate, animation, state, style, transition, trigger } from '@angular/animations';
import { UrlServiceService } from 'src/app/serviceGlobal/url-service.service';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
  animations : [    
    // trigger('pengalamanEnter', [
    //   state("in", style({ opacity: 0 })),
    //   transition(':enter', [
    //     animate(300, style({
    //        opacity:0,
    //        transform: 'translateX(100px)'
    //       })),
    //   ]),
    //   transition(':leave', [
    //     animate(300, style({ 
    //       opacity:0,
    //       transform: 'translateX(-100px)'
    //     }))
    //   ])
    // ]),
  ]
})
export class ProfileComponent implements OnInit,AfterViewInit {
  @ViewChild(DxDateBoxComponent) dateBox!: DxDateBoxComponent;

  //urlUpload
  apiFoto:string = UrlServiceService.apiUser + "Users/upload-foto";
  apiCv:string = UrlServiceService.apiUser + "Users/upload-cv";

  editProfile:boolean = true;
  stylingModeProfile = "outlined"
  dateCustom:boolean = false;
  img:any;
  pengalaman:any = [];
  salaryFormat:any ="";
  pengalamanId:any = [];
  profile:any = "";
  statusDelete:boolean = false;
  spin:boolean = false
  spinAdd:boolean = false;
  spinUpdate:boolean = false;
  spinCv:boolean = false;
  spinFoto:boolean = false;
  spinGetFoto:boolean = false;
  spinUploadFoto:boolean = false;
  spinSave:boolean = false;
  stylingMode = "outlined";

  pengalamanAnimasi:any[] = [];

  pdf:any;
  // gambar: any[] = [];
  gambar:any[] =[];
  cv:any[] =[];
  token:any; 

  alamatBr:any;

  //InterfaceUpdateProfile;
  nama:any;
  alamat:any;
  tempatLahir:any;
  tglLahir:any;
  noTlp:any;

  //InterfaceAdd
  tempatKerja:any;
  posisi:any;
  keterangan:any;
  salary:any;
  tglMasuk:any;
  tglAkhir:any;
  
  //InterfaceUpdate
  tempatKerjaUpdate:any;
  posisiUpdate:any;
  keteranganUpdate:any;
  salaryUpdate:any;
  tglMasukUpdate:any;
  tglAkhirUpdate:any;
  
  //Class Update
  profilUpdate = new pelamarUpdate('','','','','')
  pengalamanAdd = new pengalaman('','','',0,'','',);
  pengalamanUpdate = new pengalaman('','','',0,'','',);

  rules: any;
  constructor(
    private endService : EndService,
    private sanitizer : DomSanitizer,
    private pengalamanService : PengalamanService,
    private profileService : ProfileService,
    private berkasService : UploadBerkasService
  ) { 
    this.rules = { "X": /[02-9]/ };
  }

  ngOnInit(): void {

    this.token = localStorage.getItem("token");

    this.endService.getPengalaman().subscribe(
      (resp:any) =>{
        this.pengalaman = resp;
      }
    )

    this.profileService.getPelamar().subscribe(
      (resp:any) =>{
        //console.log(resp)
        this.profile = resp;
        this.nama = resp.nama;
        this.alamat = resp.alamat;
        this.noTlp = resp.noTlp;
        this.tglLahir = resp.tglLahir;
        this.tempatLahir = resp.tmptLahir;
        this.alamatBr = resp.alamat;
      }
    )
    
   this.profileService.getGambar('').subscribe(
     (event:HttpEvent<any>) =>{
      switch (event.type) {
        case HttpEventType.DownloadProgress:
          this.spinGetFoto = true;
          this.img = 'assets/image/avatar.jpg'
          this.spinUploadFoto = false;
          break;
        case HttpEventType.Response:
          //console.log(event.body);
          this.spinGetFoto = false;
          this.spinUploadFoto = false;
          const objectURL = URL.createObjectURL(event.body);
          const IMG = this.sanitizer.bypassSecurityTrustUrl(objectURL);
          this.img = IMG;
      }
     },error => {
       console.log(error)
       this.spinGetFoto = false;
       this.img = 'assets/image/avatar.jpg'
       this.spinUploadFoto = true
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

   onInitialized(e:any): void {
   
    e.component.option("calendarOptions", 
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
    });
  }

  profileEditCalendar(e:any): void {
   
    e.component.option("calendarOptions", 
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
    });
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

  progressFoto(e:any){
    this.spinFoto = true;
    this.spinUploadFoto = false;
  }

  prosesChange(e:any){
    this.profileService.getGambar('').subscribe(
      (event:HttpEvent<any>) =>{
       switch (event.type) {
         case HttpEventType.DownloadProgress:
           console.log('Dowload GantiFoto');
           this.spinGetFoto = true;
           break;
         case HttpEventType.Response:
           console.log(event.body);
           this.spinGetFoto = false;
           const objectURL = URL.createObjectURL(event.body);
           const IMG = this.sanitizer.bypassSecurityTrustUrl(objectURL);
           this.img = IMG;
       }
      }
    )
    this.spinUploadFoto = false;
    this.spinFoto = false;
    notify({
      message: "Sukses Changes",
      width:300
   },"success",4000)
  }

  progressCv(e:any){
    this.spinCv = true;
  }

  prosesChangeCv(e:any){
    this.spinCv = false;
    notify({
      message: "Sukses Upload Cv",
      width:300
   },"success",4000)
  }

 

  showPdf(){
    this.berkasService.getCv('').subscribe(
      (pdf : any) => {
        //Pdf sudah bisa tampil di browser lain
        let file = new Blob([pdf],{type: 'application/pdf'})
        this.pdf = (URL.createObjectURL(file));
        window.open(this.pdf)
      },(error: HttpErrorResponse) =>{
        notify({
          message: "Kamu belum upload Cv",
          width:300
       },"error",3000)
      }
    )
  }

  editProfileValue(e:any){
    let DateTglLahir = new DatePipe('en-US').transform(this.tglLahir,'yyyy-MM-dd');
    this.profilUpdate.nama = this.nama;
    this.profilUpdate.alamat = this.alamat;
    this.profilUpdate.noTlp = String(this.noTlp);
    this.profilUpdate.tempatLahir = this.tempatLahir;
    this.profilUpdate.tglLahir = DateTglLahir; 
    this.spinSave = true;
    this.profileService.putPelamar(this.profilUpdate).subscribe(
      (resp:any) =>{
          this.profileService.getPelamar().subscribe(
            (resp:any) =>{
              this.profile = resp;
              this.nama = resp.nama;
              this.alamat = resp.alamat;
              this.noTlp = resp.noTlp;
              this.tglLahir = resp.tglLahir;
              this.tempatLahir = resp.tmptLahir;
            }
          )
          this.spinSave = false;
      notify({
          message: resp,
          width:300
       },"success",4000)
       this.editProfile = true
      },(error: HttpErrorResponse) =>{
        this.spinSave = false;
        notify({
          message: error.error,
          width:300
       },"error",3000)
      }
    )
    e.preventDefault();
  }

  editPelamar(){
    this.editProfile = false;
  }

  editCancel(){
  
    this.editProfile = true;
  }


  addPengalaman(animasi:string){

    // this.pengalamanAnimasi = animasi
    // this.pengalamanAnimasi[animasi]= (this.pengalamanAnimasi[animasi] === 'addPengalaman' ? 'addPengalaman' : 'deletePengalaman');
    // console.log(this.pengalamanAnimasi)

    this.spinAdd = true
    let DateTglMsk = new DatePipe('en-US').transform(this.tglMasuk,'yyyy-MM-dd');
    let DateTglAkhir = new DatePipe('en-US').transform(this.tglAkhir,'yyyy-MM-dd');    
    this.pengalamanAdd.tempatKerja = this.tempatKerja;
    this.pengalamanAdd.posisi = this.posisi;
    this.pengalamanAdd.keterangan = this.keterangan;
    this.pengalamanAdd.nominal = this.salary;
    this.pengalamanAdd.tglAwal = DateTglMsk;
    this.pengalamanAdd.tglAkhir = DateTglAkhir;
   
    this.pengalamanService.postPengalaman(this.pengalamanAdd).subscribe(
      (resp:any) =>{
        this.spinAdd = false
        this.pengalamanService.getPengalaman().subscribe(
          (resp:any) =>{
            this.pengalaman = resp;
          },(error) => {
            console.log(error)
          }
        )
        notify({
          message: resp,
          width:300
       },"success",4000)
      },(error : HttpErrorResponse) =>{
        this.spinAdd = false
        notify({
          message: error.error,
          width:300
       },"error",3000)
      }
    )
  }

  deletePengalaman(id:any,index:any){



    this.statusDelete = true;
    this.pengalamanService.deletePengalaman(id).subscribe(
      (resp:any) => {
        this.statusDelete = false;
        this.pengalamanService.getPengalaman().subscribe(
          (resp:any) =>{
          
            this.pengalaman = resp;
          },(error) => {
            console.log(error)
          }
        )
        notify({
          message: resp,
          width:300
       },"success",4000)
      },(error: HttpErrorResponse) =>{
        notify({
          message: error.error,
          width:300
       },"error",4000)
        this.statusDelete = false;
      }
    )
  }


  modalPengalaman(id:any){
    this.endService.getPengalaman().subscribe(
      (resp:any) =>{
        resp.forEach(e => {
          if(e.id === id){
            this.pengalamanId = e
            this.tempatKerjaUpdate = e.tempatKerja;
            this.posisiUpdate = e.posisi;
            this.keteranganUpdate = e.keterangan;
            this.salaryUpdate = e.nominal;
            this.tglMasukUpdate = e.tglAwal;
            this.tglAkhirUpdate = e.tglAkhir;
          }
        });
      }
    )
  }

  onUpdate(e:any){
    this.spinUpdate = true
    let DateTglMsk = new DatePipe('en-US').transform(this.tglMasukUpdate,'yyyy-MM-dd');
    let DateTglAkhir = new DatePipe('en-US').transform(this.tglAkhirUpdate,'yyyy-MM-dd');    
    let id = e;
    this.pengalamanUpdate.tempatKerja = this.tempatKerjaUpdate;
    this.pengalamanUpdate.posisi = this.posisiUpdate;
    this.pengalamanUpdate.keterangan = this.keteranganUpdate;
    this.pengalamanUpdate.nominal = this.salaryUpdate;
    this.pengalamanUpdate.tglAwal = DateTglMsk;
    this.pengalamanUpdate.tglAkhir = DateTglAkhir;
    console.log(this.pengalamanUpdate)
    this.pengalamanService.updatePengalaman(this.pengalamanUpdate,id).subscribe(
      (resp:any) =>{
        this.spinUpdate = false;
        this.pengalamanService.getPengalaman().subscribe(
          (resp:any) =>{
            console.log(resp)
            this.pengalaman = resp;
          },(error) => {
            console.log(error)
          }
        )
        notify({
          message: resp,
          width:300
       },"success",4000)
      },(error :HttpErrorResponse) =>{
        notify({
          message: error.error,
          width:300
       },"error",3000)
      }
    )
  }

  trackByFn(index, item) {
    return index; // or item.id
  }
}
