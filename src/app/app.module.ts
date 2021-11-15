import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';//animasi component
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { HeaderComponent } from './header/header.component';
import { MenuUtamaComponent } from './layout/menu-utama/menu-utama.component';
import { FooterComponent } from './footer/footer.component';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { KriteriaComponent } from './layout/menu-utama/kriteria/kriteria.component';
import { TestPdfComponent } from './testSesuatu/test-pdf/test-pdf.component';
import { PertanyaanComponent } from './layout/menu-utama/pertanyaan/pertanyaan.component';
import { UploadBerkasComponent } from './layout/menu-utama/upload-berkas/upload-berkas.component';
import { PengalamanComponent } from './layout/menu-utama/pengalaman/pengalaman.component';
import { EndComponent } from './layout/menu-utama/end/end.component';
import { LoginComponent } from './login/login.component';
import { LayoutIndukComponent } from './layout-induk/layout-induk.component';
import { RegisterComponent } from './register/register.component';
import { LupaPasswordComponent } from './login/lupa-password/lupa-password.component';
import { OtpComponent } from './login/lupa-password/otp/otp.component';
import { CreatePasswordComponent } from './login/create-password/create-password.component';
import { UpdatePasswordComponent } from './login/update-password/update-password.component'
import { BerkasComponent } from './layout/menu-utama/upload-berkas/berkas/berkas.component';
import { ProfileComponent } from './layout/menu-utama/profile/profile.component';
import { BerkasDetailComponent } from './layout/menu-utama/upload-berkas/berkas/berkas-detail/berkas-detail.component';

//Pipe
import { SafePipe } from './testSesuatu/safe.pipe';

// DevExpress
import { DxFormModule } from 'devextreme-angular';
import { DxTextBoxModule, 
        DxValidatorModule,
        DxValidationSummaryModule,
        DxValidationGroupModule,
        DxLoadIndicatorModule
        } from 'devextreme-angular';
import { DxButtonModule } from "devextreme-angular"; 
import { DxDateBoxModule, DxCalendarModule } from 'devextreme-angular';
import { DxNumberBoxModule } from 'devextreme-angular';
import { DxRadioGroupModule,DxTextAreaModule,DxTagBoxModule } from 'devextreme-angular';
import { DxDataGridModule } from 'devextreme-angular';
import { DxFileUploaderModule } from 'devextreme-angular';

//Library
import { LoginModule } from 'login';
import { PertanyaanService } from './layout/menu-utama/pertanyaan/servicePertanyaan/pertanyaan.service';
import { AuthStatusRouterService } from './serviceGlobal/auth-status-router.service';
import { Component1Component } from './testSesuatu/component1/component1.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    MenuUtamaComponent,
    FooterComponent,
    KriteriaComponent,
    TestPdfComponent,
    SafePipe,
    PertanyaanComponent,
    UploadBerkasComponent,
    PengalamanComponent,
    EndComponent,
    LoginComponent,
    LayoutIndukComponent,
    RegisterComponent,
    LupaPasswordComponent,
    OtpComponent,
    CreatePasswordComponent,
    UpdatePasswordComponent,
    BerkasComponent,
    ProfileComponent,
    BerkasDetailComponent,
    Component1Component,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    DxFormModule,
    DxValidatorModule,
    DxTextBoxModule,
    DxValidationSummaryModule,
    DxValidationGroupModule,
    DxButtonModule,
    DxDateBoxModule,
    DxCalendarModule,
    DxNumberBoxModule,
    DxRadioGroupModule,
    DxTextAreaModule,
    DxTagBoxModule,
    DxFileUploaderModule,
    DxDataGridModule,
    LoginModule,
    DxLoadIndicatorModule
  ],
  providers: [
    {provide: LocationStrategy, useClass: HashLocationStrategy},
    PertanyaanService,
    AuthStatusRouterService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
