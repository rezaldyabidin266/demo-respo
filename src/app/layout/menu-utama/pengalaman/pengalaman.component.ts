import { DatePipe } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { DxDateBoxComponent } from 'devextreme-angular';
import { pengalaman, PengalamanService } from './servicePengalaman/pengalaman.service';
import notify from 'devextreme/ui/notify'
@Component({
  selector: 'app-pengalaman',
  templateUrl: './pengalaman.component.html',
  styleUrls: ['./pengalaman.component.scss']
})
export class PengalamanComponent implements OnInit {
  @ViewChild(DxDateBoxComponent) dateBox!: DxDateBoxComponent;

  spin:boolean = false
  statusDelete:boolean = false
  stylingMode = "outlined"
  dateCustom:boolean = false;
  //Interface
  tempatKerja:any;
  posisi:any;
  keterangan:any;
  salary:any;
  tglMasuk:any;
  tglAkhir:any;

  //Class
  pengalaman = new pengalaman('','','',0,'','',)

  //valuePengalaman
  pengalamanValue:any[] = [];

  constructor(
    private router : Router,
    private pengalamanService : PengalamanService
  ) { }
  ngOnInit(): void {
    this.pengalamanService.getPengalaman().subscribe(
      (resp:any) =>{
        this.pengalamanValue = resp
     
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
    let DateTglMsk = new DatePipe('en-US').transform(this.tglMasuk,'yyyy-MM-dd');
    let DateTglAkhir = new DatePipe('en-US').transform(this.tglAkhir,'yyyy-MM-dd');    
    let DataLocal = new DatePipe('en-US').transform(Date(),'yyyy-MM-dd')
    this.pengalaman.tempatKerja = this.tempatKerja || "---";
    this.pengalaman.posisi = this.posisi || "---";
    this.pengalaman.nominal = this.salary ;
    this.pengalaman.keterangan = this.keterangan || "---";
    this.pengalaman.tglAwal = DateTglMsk
    this.pengalaman.tglAkhir = DateTglAkhir || DataLocal
    this.spin = true;
   
    if(this.pengalaman.tglAwal === null || this.pengalaman.tglAwal === ""){
      this.spin = false;
      notify({
        message: "Tanggal Masuk Wajib di isi",
        width:300
     },"error",4000)
    }else{
    this.pengalamanService.postPengalaman(this.pengalaman).subscribe(
        (resp:any) =>{
          this.spin = false;
          notify({
            message: "Sukses Save Pengalaman",
            width:300
         },"success",4000)
          this.pengalamanService.getPengalaman().subscribe(
            (resp:any) =>{
              this.pengalamanValue = resp;
            },(error) => {
              console.log(error)
              notify({
                message: "Gagal Save, Harap Reload Browser",
                width:300
             },"error",4000)
            }
          )
        },(error)=>{
          this.spin = false;
          console.log(error)
          notify({
            message: "Gagal Save, Harap Reload Browser",
            width:300
         },"error",4000)
        }
      )
    }
  
  }

  deletePengalaman(idPengalaman : any){
    this.statusDelete = true
    this.pengalamanService.deletePengalaman(idPengalaman).subscribe(
      (resp:any) => {
        this.statusDelete = false
        notify({
          message: "Sukses Delete Pengalaman",
          width:300
       },"success",4000)
        this.pengalamanService.getPengalaman().subscribe(
          (resp:any) =>{
            this.pengalamanValue = resp;
          },(error) => {
            console.log(error)
          }
        )
      },error =>{
        notify({
          message: "Gagal Save, Harap Reload Browser",
          width:300
       },"error",4000)
        this.statusDelete = false
      }
    )
  }

}
