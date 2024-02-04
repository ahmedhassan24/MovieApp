import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { signalUpdateFn } from "@angular/core/primitives/signals";
import { BehaviorSubject, Subject, throwError } from "rxjs";
import { catchError, min, tap } from "rxjs/operators";
import { User } from "../auth/user.model";
import { Router } from "@angular/router";
import { TokenService } from "./token.service";


export interface AuthResponseData {
    status: boolean;
    message: string;
    token: string;
    email: string;
    expiresIn: string;
}
@Injectable({providedIn:'root'})
export class AuthenticationService  {
    user = new BehaviorSubject<User>(null);
    private tokenExpirationTimer: any;
    constructor(private http: HttpClient, private router: Router, private tokenService: TokenService){

    }
    
    signUp(email: string, password: string){
        return this.http.post<AuthResponseData>('http://localhost:8080/api/auth/signup', 
        {
            email: email,
            password: password,
            returnSecureToken: true
        }
        ).pipe(catchError(this.handleError), tap(resData =>{
            console.log("result in catch sign ip", resData)

            this.handleError(resData.message)
           this.handleAuthentication(resData.email, resData.token, resData.expiresIn);
        }))
    }
    login(email: string, password: string){
        return this.http.post<AuthResponseData>('http://localhost:8080/api/auth/login',
        {
            email: email,
            password: password,
            returnSecureToken: true
        }
        ).pipe(catchError(this.handleError), tap(resData =>{
            console.log(resData)
            this.handleAuthentication(resData.email,resData.token, resData.expiresIn);
         }))
    }
    logout(){
        this.user.next(null);
        this.router.navigate(['/auth']);
        localStorage.removeItem('userData');
        if(this.tokenExpirationTimer)
        {
            clearTimeout(this.tokenExpirationTimer);
        }
        this.tokenExpirationTimer = null;
    }
    autoLogout(expirationDuration: number){
        // console.log("time",expirationDuration)
        this.tokenExpirationTimer = setTimeout(()=>{
            // console.log("timout")
            this.logout();
        },expirationDuration);
    }
    
    autoLogin(){
        const userData :{ 
            email:string,
            userId: string,
            _token: string,
            _tokenExpirationDate : Date
        }= JSON.parse(localStorage.getItem('userData'));
        if(!userData)
        {
            return;
        }
        const loadedUser = new User(userData.email,userData._token,userData._tokenExpirationDate);
        if(loadedUser.token)
        {
            this.user.next(loadedUser);
            const expirationDuration = new Date(userData._tokenExpirationDate).getTime() *24 * 60 - new Date().getTime(); 
           console.log("autologin", expirationDuration)
        //    this.autoLogout(expirationDuration);
        }
    }


    
    private handleAuthentication(email: string, token: string, expiresIn: string){
        console.log(expiresIn);
        if(expiresIn)
        {
            const dateComponents = expiresIn.split(' ');
        console.log(dateComponents, "Date components");

        this.tokenService.setToken(token);
        console.log(this.tokenService.getToken(), "token inside handleauthentication")
    // Get the month abbreviation and convert it to a month number (0-indexed)
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const month = months.indexOf(dateComponents[1]);

    // Extract the day, hour, minute, second, and year from the date string
    const day = parseInt(dateComponents[2]);
    const timeComponents = dateComponents[3].split(':');
    console.log(timeComponents, "timeComponents ");

    const hour = parseInt(timeComponents[0])-12;
    console.log(hour, "hour");
    const minute = parseInt(timeComponents[1]);
    console.log(minute,"minute");
    const second = parseInt(timeComponents[2]);
    console.log(second,"second");
    const year = parseInt(dateComponents[5]);
    console.log(year, " Year");
    const expirationDate = new Date(year, month, day, hour, minute, second);
    console.log(expirationDate);
    const user = new User(
        email,
        token,
        expirationDate);
    this.user.next(user);
    // console.log("handle auth")
//    this.autoLogout(4);
    localStorage.setItem('userData', JSON.stringify(user));
        }
        

    // Create a new Date object using the extracted components
   

    }
    private handleError(errorRes: string){
        let errorMessage = "An unknown error occured!"
        console.log("error resss", errorRes);
        return throwError(errorRes)
        // if(!errorRes.error || !errorRes.error.error)
        // {
        //     return throwError(errorMessage);
        // }
        // switch (errorRes.error.error.message)
        //     {

        //         case 'EMAIL_EXISTS': 
        //             errorMessage= "This email already exists!"; //sign up 
        //             break;
        //         case 'INVALID_LOGIN_CREDENTIALS':
        //             errorMessage = "Password or Email is Incorrect!"; //login
        //             // console.log(errorMessage);
        //             break;
        //     }

    }

}