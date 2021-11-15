import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot,RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import notify from 'devextreme/ui/notify'


@Injectable({
  providedIn: 'root'
})
export class AuthStatusRouterService implements CanActivate{

  constructor( private _router : Router ) { }

   canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {

      if (localStorage.getItem("authStatus") === "false")  {
      
        notify({
          message: "Anda tidak diizinkan masuk ke halaman ini. Anda di alihkan ke halaman login",
          width:300
       },"error",3000)
        this._router.navigate(["../login"]);             
        return false;  
    } 
    return true
    
  }
}
