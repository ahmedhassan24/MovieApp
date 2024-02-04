import { Component, OnDestroy, OnInit} from "@angular/core";
import { AuthenticationService } from "../service/auth.service";
import { Subscription } from "rxjs";
import { TranslateService } from "@ngx-translate/core";
import { HttpClient } from "@angular/common/http";
import { TranslateHttpLoader } from "@ngx-translate/http-loader";

@Component({
    selector:'app-header',
    templateUrl:'./header.component.html',
    styleUrl: './header.component.css'
})

export class HeaderComponent implements OnInit , OnDestroy {
    private userSub: Subscription
    isAuthenticated = false;
    constructor(private authService: AuthenticationService, private translate: TranslateService)
     {translate.setDefaultLang('en');}  

    ngOnInit(): void {
        this.userSub = this.authService.user.subscribe(user =>{
            // console.log(this.isAuthenticated);
            this.isAuthenticated = !user ? false : true;
            // console.log(this.isAuthenticated);
        });
    }
    ngOnDestroy(): void {
        this.userSub.unsubscribe();
    }
    onLogout(){
        this.authService.logout();
    }
    switchLanguageArabic(){
        this.translate.use("ar");
    }
    switchLanguageEnglish(){
        this.translate.use("en");
    }

}