import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl, SafeUrl } from '@angular/platform-browser';
import { TestPdfService } from '../serviceTest/test-pdf.service';

@Component({
  selector: 'app-test-pdf',
  templateUrl: './test-pdf.component.html',
  styleUrls: ['./test-pdf.component.scss']
})
export class TestPdfComponent implements OnInit {
  
  pdfCheat = "https://vadimdez.github.io/ng2-pdf-viewer/assets/pdf-test.pdf";

  urlGoogle:any = "";

  pdf: any;
  pdf2:any;
  fileUrl!: SafeResourceUrl;
  img:any;
  arahan:any

  constructor(
    private testPdf : TestPdfService,
    private sanitizer: DomSanitizer,
  ) { }

  ngOnInit(): void {

    this.testPdf.testpdf('').subscribe(
      (pdf : any) => {

        //Pdf sudah bisa tampil di browser lain
        let file = new Blob([pdf],{type: 'application/pdf'})
        console.log(URL.createObjectURL(file))
        this.arahan = (URL.createObjectURL(file));
        this.pdf = this.sanitizer.bypassSecurityTrustResourceUrl(URL.createObjectURL(file))
        console.log(this.pdf)

      }
    )

    this.testPdf.testGambar('').subscribe(
      (blob : any) =>{
        console.warn(blob)
        const objectURL = URL.createObjectURL(blob);
        const IMG = this.sanitizer.bypassSecurityTrustUrl(objectURL);
        this.img = IMG;
        console.warn(this.img)
      }
    )
  }

  pdfBlank(){
    this.testPdf.testpdf('').subscribe(
      (pdf : any) => {

        //Pdf sudah bisa tampil di browser lain
        let file = new Blob([pdf],{type: 'application/pdf'})
        this.pdf = this.sanitizer.bypassSecurityTrustResourceUrl(URL.createObjectURL(file))
        console.log(this.pdf)
      }
    )
  }
  
  windowPdf(){
    this.testPdf.testpdf('').subscribe(
      (pdf : any) => {

        //Pdf sudah bisa tampil di browser lain
        let file = new Blob([pdf],{type: 'application/pdf'})
        this.arahan = (URL.createObjectURL(file));
        window.open(this.arahan)
      }
    )
  }

}
