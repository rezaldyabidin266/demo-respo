import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { EndService } from '../layout/menu-utama/end/serviceEnd/end.service';
import { HeaderService } from './serviceHeader/header.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, AfterViewInit {

  namaPelamar:any;
  logIn:boolean = true;
  img:any;
  notif:any[] = []
  constructor(
    private endService : EndService,
    private router : Router,
    private sanitizer : DomSanitizer,
    private headerService : HeaderService
  ) { }

  ngAfterViewInit(){
  }

  ngOnInit(): void {

    let navbar = (document.querySelector('.navbar') as HTMLElement);

    var prevScrollpos = window.pageYOffset;
    window.onscroll = () => {
      var currentScrollPos = window.pageYOffset;
      if (prevScrollpos > currentScrollPos) {
        navbar.style.top = "0";
      } else {
        navbar.style.top = "-80px";
      }
      prevScrollpos = currentScrollPos;
    }

    this.endService.getPelamar().subscribe(
      (resp:any) => {
        this.namaPelamar = resp.nama
       
      },error => console.log('belum daftar')
    )

    this.headerService.getList().subscribe(
      (resp:any) =>{
    
        this.notif = resp
      },error => console.log('belum daftar')
    )

    let logIn = localStorage.getItem("logIn") 
    if(localStorage.getItem("logIn") === "true"){
      this.logIn = true;
    }else{
      this.logIn = false;
    }
    

  }

  Logout(){
    this.router.navigate(['/login'])
    .then(() => {
      window.location.reload();
      localStorage.clear();
    });
  }


}

