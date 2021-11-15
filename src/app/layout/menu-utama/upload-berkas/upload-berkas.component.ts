import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import notify from 'devextreme/ui/notify'
import { UrlServiceService } from 'src/app/serviceGlobal/url-service.service';
@Component({
  selector: 'app-upload-berkas',
  templateUrl: './upload-berkas.component.html',
  styleUrls: ['./upload-berkas.component.scss']
})
export class UploadBerkasComponent implements OnInit {
  gambar: any[] = [];
  cv:any[] = []
  fileLoop:any;
  token:any;
  spin:boolean =false;

  //ApiURL
  apiFoto:string = UrlServiceService.apiUser + "Users/upload-foto";
  apiCv:string = UrlServiceService.apiUser + "Users/upload-cv";
  
  constructor(
    private router : Router
  ) { }

  ngOnInit(): void {
    this.token = localStorage.getItem("token");


  }
  
  prosesChange(e:any){
  
    notify({
      message: "Sukses Changes",
      width:300
   },"success",4000)
  }


  prosesChangeCv(e:any){

    notify({
      message: "Sukses Upload Cv",
      width:300
   },"success",4000)
  }

  onSubmit(){

    this.spin=true;
    this.router.navigate(['../pengalaman']);
  
  }

}

