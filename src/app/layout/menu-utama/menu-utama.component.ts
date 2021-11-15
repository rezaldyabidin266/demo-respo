import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ListLokerService } from './service/list-loker.service';
import { MotivasiService } from './service/motivasi.service';
import Typewriter from 't-writer.js'
import { Router } from '@angular/router';
import { animate, state, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'app-menu-utama',
  templateUrl: './menu-utama.component.html',
  styleUrls: ['./menu-utama.component.scss'],
  animations: [
    trigger('effectAnimation',[
      state('keluar',style({
        transform: 'scale(1)'  
      })),
      state('masuk',style({
        transform: 'scale(1.1)'  
      })),
      transition('keluar => masuk',animate('300ms ease-in')),
      transition('masuk => keluar',animate('100ms ease-in')),
    ]),
    trigger('fade', [
      transition('void => active', [ // using status here for transition
        style({ opacity: 0 }),
        animate(1000, style({ opacity: 1 }))
      ]),
      transition('* => void', [
        animate(1000, style({ opacity: 0 }))
      ])
    ])
  ]
})
export class MenuUtamaComponent implements OnInit {
  @ViewChild('kalimat') kalimatTwit: any;
  
  img:any;
  idRandom :any ;
  kalimat:any = "";
  lokerList : any = [];
  idNumber:any;
  kalimatGloba:string | undefined;
  mathTeks:any;
  effectAnim:string = "keluar";
  randomTeks:any;
  intervalTest2;

  status:any;


  constructor( 
    private motivasi : MotivasiService,
    private sanitizer: DomSanitizer,
    private loker : ListLokerService,
    private router : Router) {
     }

  effect(state:string){
    this.effectAnim = state;
  }

  
  ngOnInit(): void {

    let id: number;
    let kalimatKetik = (document.getElementById('kalimat') as HTMLElement);
    this.motivasi.getGambar().subscribe(
      (blob:any) => {
        const objectURL = URL.createObjectURL(blob);
        const img = this.sanitizer.bypassSecurityTrustUrl(objectURL);
        this.img = img;
      },error => console.log(error)
    );

    this.motivasi.getKalimat().subscribe(
      (resp:any) =>{
        resp.forEach((value:any) => {
          this.idRandom = value.id;
        });
      //RandomTeks
        let getTeks = () =>{
          this.idNumber = Math.floor(Math.random() * this.idRandom) + 1;
          this.kalimat = resp[ this.idNumber ].kalimat
          this.kalimatGloba = this.kalimat

         return this.kalimatGloba
        }

        setInterval(() =>{
          getTeks();
        },500)

        //setting type
        const target = this.kalimatTwit.nativeElement
        const writer = new Typewriter(target, {
          loop: true,
          typeColor: 'black',
          typeSpeed: 90,
        
        })

        writer
        .type(getTeks())
        .rest(1000)
        .clear()
        .type(getTeks())
        .rest(1000)
        .start()
      }
    )
   
    this.loker.getLoker().subscribe(
      (resp:any) =>{
        this.lokerList = resp
      },(error) =>{
        console.log(error)
      }
    )

  

  }


  refresh(){
    location.reload()
  }

  goKriteria(idkriteria : any){
    this.router.navigate(['/kriteria',idkriteria]);
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


statusFade(){

  this.status ='active'

}


}


