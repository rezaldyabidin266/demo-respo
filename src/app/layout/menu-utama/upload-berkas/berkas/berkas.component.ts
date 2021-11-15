import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, Sanitizer } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { HeaderService } from 'src/app/header/serviceHeader/header.service';
import { KriteriaService } from '../../kriteria/serviceKriteria/kriteria.service';
import { ListLokerService } from '../../service/list-loker.service';
import { UploadBerkasService } from '../serviceUpload/upload-berkas.service';

@Component({
  selector: 'app-berkas',
  templateUrl: './berkas.component.html',
  styleUrls: ['./berkas.component.scss']
})
export class BerkasComponent implements OnInit {

  pdf: any;
  link:any
  cv:boolean = false;
  lokerDaftar:any= []

  constructor(
    private uploadService : UploadBerkasService,
    private sanitizer : DomSanitizer,
    private listLokerService : ListLokerService,
    private headerService : HeaderService,
    private router : Router
  ) { }

  ngOnInit(): void {
    this.headerService.getList().subscribe(
      (resp:any) =>{
        this.lokerDaftar = resp
      }
    )

  }

  goPertanyaan(idLoker:any){
    this.router.navigate(['/berkas-detail',idLoker]);
  }


  
}
