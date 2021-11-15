import { DatePipe } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { PertanyaanService } from '../../../pertanyaan/servicePertanyaan/pertanyaan.service';
import { UploadBerkasService } from '../../serviceUpload/upload-berkas.service';
import notify from 'devextreme/ui/notify'
@Component({
  selector: 'app-berkas-detail',
  templateUrl: './berkas-detail.component.html',
  styleUrls: ['./berkas-detail.component.scss']
})
export class BerkasDetailComponent implements OnInit {

  idLoker:any;
  pertanyaan:any;
  valueGanda!: string[];
  checkValue!: string[];
  spin:boolean = false;
  stylingMode = "underlined";
  saveJawabanArray:Array<any> = [];
  min:number = 0;
  dateCustom:boolean = false;
  number:number = 0;
  checkbox :any[] = [];

  constructor(
    private route : ActivatedRoute,
    private berkasService: UploadBerkasService,
    private getPertanyaan : PertanyaanService,
  ) {
    this.valueGanda = [
      "Yes",
      "No",
    ]
   }

  ngOnInit(): void {

  //getIdloOker
  this.route.params.subscribe(
    (params : Params) =>{
      this.idLoker = +params['id'];
      console.log(this.idLoker)

      this.berkasService.getPertanyaan(this.idLoker).subscribe(
        (resp:any) =>{
          this.pertanyaan = resp.pertanyaan
         this.pertanyaan.forEach(e => {
           if(e.bentukIsian === "Nominal"){
            this.number = parseFloat(e.jawaban.replace(/,/g,''))
           }

           if(e.bentukIsian === "Checkbox"){
             console.log(e.jawaban)
            this.checkbox = e.jawaban.split(',');
           }
         });
        }
      )
    }
  )
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
  this.getPertanyaan.saveJawaban(this.saveJawabanArray).subscribe(
    (resp:any) =>{
      this.berkasService.getPertanyaan(this.idLoker).subscribe(
        (resp:any) =>{
          this.pertanyaan = resp.pertanyaan
         this.pertanyaan.forEach(e => {
           if(e.bentukIsian === "Nominal"){
            this.number = parseFloat(e.jawaban.replace(/,/g,''))
           }

           if(e.bentukIsian === "Checkbox"){
             console.log(e.jawaban)
            this.checkbox = e.jawaban.split(',');
           }
         });
        }
      )
      this.spin= false;
      notify({
        message: "Berhasil Ubah Jawaban",
        width:300,
     },"success",3000)
    },(error : HttpErrorResponse) => {
      this.spin = false;
      console.log(error)
      notify({
        message: "Gagal Ubah Jawaban, Tolong Cek Jaringan Anda, Dan Reload halaman kembali",
        width:300
     },"error",3000)
    }
  )
}


}
