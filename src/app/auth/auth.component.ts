import { Component } from "@angular/core";
import { NgForm } from "@angular/forms";
import { AuthResponseData, AuthenticationService } from "../service/auth.service";
import { Observable } from "rxjs";
import { Router } from "@angular/router";
@Component({
    selector: 'app-auth',
    templateUrl: './auth.component.html'
})
export class AuthComponent{
    
    isLoggedIn = true;
    isLoading = false;
    error: string = null;

    constructor(private authService: AuthenticationService, private router: Router){}
    onSwitchMode(){
        this.isLoggedIn = !this.isLoggedIn;
    }

    onSubmit(form: NgForm){
        if(!form.valid)
        {
            return;
        }
        const email = form.value.email;
        const password = form.value.password;

        let authObs: Observable<AuthResponseData>           

        this.isLoading = true;
        if(this.isLoggedIn){
           authObs = this.authService.signUp(email, password)
           console.log(authObs);
        }
        else{
            authObs = this.authService.login(email,password)
        }
        
        authObs.subscribe(resData =>{
            if(!resData.status)
            this.error = resData.message
            this.isLoading = false;
            this.router.navigate(['/home']);
        }, errorMessage =>{
            console.log(errorMessage);
            this.error = errorMessage;
            this.isLoading = false;
        });
        
        form.reset();
    }
}