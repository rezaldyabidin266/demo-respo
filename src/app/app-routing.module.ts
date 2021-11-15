import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EndComponent } from './layout/menu-utama/end/end.component';
import { KriteriaComponent } from './layout/menu-utama/kriteria/kriteria.component';
import { MenuUtamaComponent } from './layout/menu-utama/menu-utama.component';
import { PengalamanComponent } from './layout/menu-utama/pengalaman/pengalaman.component';
import { PertanyaanComponent } from './layout/menu-utama/pertanyaan/pertanyaan.component';
import { ProfileComponent } from './layout/menu-utama/profile/profile.component';
import { BerkasDetailComponent } from './layout/menu-utama/upload-berkas/berkas/berkas-detail/berkas-detail.component';
import { BerkasComponent } from './layout/menu-utama/upload-berkas/berkas/berkas.component';
import { UploadBerkasComponent } from './layout/menu-utama/upload-berkas/upload-berkas.component';
import { CreatePasswordComponent } from './login/create-password/create-password.component';
import { LoginComponent } from './login/login.component';
import { LupaPasswordComponent } from './login/lupa-password/lupa-password.component';
import { OtpComponent } from './login/lupa-password/otp/otp.component';
import { UpdatePasswordComponent } from './login/update-password/update-password.component';
import { RegisterComponent } from './register/register.component';
import { AuthStatusRouterService } from './serviceGlobal/auth-status-router.service';
import { TestPdfComponent } from './testSesuatu/test-pdf/test-pdf.component';

const routes: Routes = [
  {path: '',redirectTo: '/loker', pathMatch: 'full'},
  {path: 'loker', component: MenuUtamaComponent},
  {path: 'kriteria/:id', component : KriteriaComponent},
  {path: 'not-lazy-loaded', component : TestPdfComponent},
  {path: 'login', component: LoginComponent},
  {path: 'resetPassword', component: LupaPasswordComponent},
  {path: 'otp', component: OtpComponent},
  {path: 'profile', component: ProfileComponent, canActivate :[AuthStatusRouterService]},
  {path: 'createPassword', component: CreatePasswordComponent},
  {path: 'updatePassword', component: UpdatePasswordComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'pertayaaan', component: PertanyaanComponent, canActivate :[AuthStatusRouterService]},
  {path: 'uploadBerkas', component: UploadBerkasComponent, canActivate :[AuthStatusRouterService]},
  {path: 'berkas', component: BerkasComponent, canActivate :[AuthStatusRouterService]},
  {path: 'berkas-detail/:id', component: BerkasDetailComponent, canActivate :[AuthStatusRouterService]},
  {path: 'pengalaman', component: PengalamanComponent, canActivate :[AuthStatusRouterService]},
  {path: 'end', component: EndComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
