import { AfterViewInit, Component, ElementRef, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { Router } from '@angular/router';
import { PertanyaanService } from './servicePertanyaan/pertanyaan.service';
import { DatePipe } from '@angular/common';
import notify from 'devextreme/ui/notify'
import { HttpErrorResponse, HttpEvent } from '@angular/common/http';
@Component({
  selector: 'app-pertanyaan',
  templateUrl: './pertanyaan.component.html',
  styleUrls: ['./pertanyaan.component.scss']
})
export class PertanyaanComponent implements OnInit,AfterViewInit {
  pertanyaan:any
  valueGanda!: string[];
  checkValue!: string[];
  spin:boolean = false;
  stylingMode = "underlined";
  saveJawabanArray:Array<any> = [];
  min:number = 0;
  dateCustom:boolean = false;

  constructor(
    private router : Router,
    private getPertanyaan : PertanyaanService,
  ) {
    this.valueGanda = [
      "Yes",
      "No",
    ]
   }

  ngOnInit(): void {
    this.getPertanyaan.getPertanyaan().subscribe(
      (resp:any) => {
        this.pertanyaan = resp.pertanyaan
      }
    )


  }

  ngAfterViewInit(){
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


  onValueGanda(id:number,e :any, pertanyaan : string){
    let DataLocal = new DatePipe('en-US').transform(Date(),'yyyy-MM-dd');
    let save = {
      id : id,
      pertanyaan : pertanyaan,
      jawaban: e.value,
      jawabanTambahan : "kosong",
      nominal :  1,
      tanggal : DataLocal,
      filePendukung : "kosong"
     }
    
     this.saveJawabanArray.push(save)
  
  }

  onValueParagraf(id:number,e :any, pertanyaan : string){
    let DataLocal = new DatePipe('en-US').transform(Date(),'yyyy-MM-dd');
    let save = {
      id : id,
      pertanyaan : pertanyaan,
      jawaban: e.value,
      jawabanTambahan : "kosong",
      nominal :  1,
      tanggal : DataLocal,
      filePendukung : "kosong"
     }
     this.saveJawabanArray.push(save)
  
  }

 
  onValueNominal(id:number,e :any, pertanyaan : string){
    let DataLocal = new DatePipe('en-US').transform(Date(),'yyyy-MM-dd');
    let save = {
      id : id,
      pertanyaan : pertanyaan,
      jawaban: String(e.value),
      jawabanTambahan : "kosong",
      nominal :  e.value,
      tanggal : DataLocal,
      filePendukung : "kosong"
     }
     this.saveJawabanArray.push(save)
  
  }

  onValueSimpleText(id:number,e :any, pertanyaan : string){
    let DataLocal = new DatePipe('en-US').transform(Date(),'yyyy-MM-dd');
    let save = {  
      id : id,
      pertanyaan : pertanyaan,
      jawaban: e.value,
      jawabanTambahan : "kosong",
      nominal : 1,
      tanggal : DataLocal,
      filePendukung : "kosong"
     }
     this.saveJawabanArray.push(save)
  
  }

  onValueDate(id:number,e :any, pertanyaan : string){
    let DataLocal = new DatePipe('en-US').transform(Date(),'yyyy-MM-dd');
    let DataJawaban = new DatePipe('en-US').transform(e.value,'yyyy-MM-dd');
    let save = {
      id : id,
      pertanyaan : pertanyaan,
      jawaban: DataJawaban,
      jawabanTambahan : "kosong",
      nominal : 1,
      tanggal : DataLocal,
      filePendukung : "kosong"
     }
     this.saveJawabanArray.push(save)
  
  }

  onValueCheckBox(id:number,e :any, pertanyaan : string){
    let DataLocal = new DatePipe('en-US').transform(Date(),'yyyy-MM-dd');
    let value:string = "";
    
    e.value.forEach(element => {
      
      value += (element + ', ')
    });

    let save = {
      id : id,
      pertanyaan : pertanyaan,
      jawaban: value,
      jawabanTambahan : "kosong",
      nominal : 1,
      tanggal : DataLocal,
      filePendukung : "kosong"
     }
     this.saveJawabanArray.push(save)
  
  }

  onValuePilihanGanda(id:number,e :any, pertanyaan : string){
    let DataLocal = new DatePipe('en-US').transform(Date(),'yyyy-MM-dd');
    
    let save = {
      id : id,
      pertanyaan : pertanyaan,
      jawaban: e.value,
      jawabanTambahan : "kosong",
      nominal : 1,
      tanggal : DataLocal,
      filePendukung : "kosong"
     }
     this.saveJawabanArray.push(save)
  
  }

  onSubmit(){
    this.spin= true;
    console.log(this.saveJawabanArray)
    this.getPertanyaan.saveJawaban(this.saveJawabanArray).subscribe(
      (resp:any) =>{
        
        this.spin= false;
        this.router.navigate(['../uploadBerkas']);
        notify({
          message: resp,
          width:300,
       },"success",3000)
      },(error : HttpErrorResponse) => {
        this.spin = false;
        console.log(error)
        notify({
          message: "Gagal Pengirim, Tolong Cek Jaringan Anda, Dan Reload halaman kembali",
          width:300
       },"error",3000)
      }
    )
  }

}
