import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { Observable, map, tap ,take} from "rxjs";
import { AuthenticationService } from "../service/auth.service";
import { state } from "@angular/animations";

@Injectable({providedIn: "root"})
export class LoggedInAuthGuard implements CanActivate {
    constructor(private authService: AuthenticationService, private router: Router){}
    canActivate(route: ActivatedRouteSnapshot, router: RouterStateSnapshot): boolean | UrlTree |  Promise<boolean | UrlTree > | Observable<boolean | UrlTree> {
        return this.authService.user.pipe(take(1), map(user => {
            const isAuth =  !!user;
            if (isAuth && route.routeConfig.path.includes('auth'))
            {
                return this.router.createUrlTree(['/home']);
            }
            else 
                return true;
        })

        );
    }


}