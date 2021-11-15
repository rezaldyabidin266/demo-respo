import { HttpClient, HttpEvent, HttpEventType, HttpHeaders } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import DataSource from 'devextreme/data/data_source';
import { PertanyaanService } from '../pertanyaan/servicePertanyaan/pertanyaan.service';
import { EndService } from './serviceEnd/end.service';
import 'devextreme/data/custom_store';
import { elementEventFullName } from '@angular/compiler/src/view_compiler/view_compiler';
import { DatePipe } from '@angular/common';
import { ProfileService } from '../profile/profileservice/profile.service';
import { MotivasiService } from '../service/motivasi.service';


@Component({
  selector: 'app-end',
  templateUrl: './end.component.html',
  styleUrls: ['./end.component.scss']
})
export class EndComponent implements OnInit {

  img:any;
  infoPelamar:any ="";
  pertanyaan:any = [];
  pengalaman:any;
  pengalamanArray:any = [];
  pengalamanLoop:any;
  pengalamanJson:any = {};
  pengalamanMobile:any = [];
  spinFoto:boolean = false;
  spinGetFoto:boolean = false;
  spinUploadFoto:boolean = false;
  imgMotivasi : any;

  httpOptions = {
    headers :  new HttpHeaders({
      "token" : `${localStorage.getItem("token")}`
    }),
  }

  constructor(
    private router : Router,
    private endService : EndService,
    private sanitizer : DomSanitizer,
    private pertanyaanService : PertanyaanService,
    private motivasiService : MotivasiService,
    private profileService : ProfileService
    ) { 
    }

  ngOnInit(): void {
    this.profileService.getGambar('').subscribe(
      (event:HttpEvent<any>) =>{
       switch (event.type) {
         case HttpEventType.DownloadProgress:
           this.spinGetFoto = true;
           this.img = 'assets/image/avatar.jpg'
           this.spinUploadFoto = false;
           break;
         case HttpEventType.Response:
           console.log(event.body);
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
   
    this.endService.getPelamar().subscribe(
      (resp:any) => {
        this.infoPelamar = resp
        
      }
    )

    this.pertanyaanService.getPertanyaan().subscribe(
      (resp:any)=>{
        this.pertanyaan = resp.pertanyaan
       
      }
    )

    this.endService.getPengalaman().subscribe(
      (resp:any) =>{
        // console.log(resp)
        this.pengalamanMobile = resp;
        resp.forEach(e => {
          let Dateawal = new DatePipe('en-US').transform(e.tglAwal,'yyyy-MM-dd');
          let Dateakhir = new DatePipe('en-US').transform(e.tglAkhir,'yyyy-MM-dd');
          let pengalamanObject = {
          tempatKerja : e.tempatKerja,
          posisi : e.posisi,
          keterangan: e.keterangan,
          nominal : e.nominal,
          tglAkhir : Dateakhir,
          tglAwal : Dateawal,
          }
          this.pengalamanArray.push(pengalamanObject)
        });
      }
    )

    this.motivasiService.getGambar().subscribe(
      (resp:any) =>{
        const objectURL = URL.createObjectURL(resp);
        const IMG = this.sanitizer.bypassSecurityTrustUrl(objectURL);
        this.imgMotivasi = IMG;
      }
    )

  }

  goLoker(){
    
    this.router.navigate(['../loker']);
  }

}
