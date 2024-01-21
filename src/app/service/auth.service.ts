import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { signalUpdateFn } from "@angular/core/primitives/signals";
import { BehaviorSubject, Subject, throwError } from "rxjs";
import { catchError, tap } from "rxjs/operators";
import { User } from "../auth/user.model";
import { Router } from "@angular/router";


export interface AuthResponseData {
    kind:string;
    idToken: string;
    email: string;
    refreshToken: string;
    expiresIn: string;
    localId: string;
    registered?: boolean
}
@Injectable({providedIn:'root'})
export class AuthenticationService  {
    user = new BehaviorSubject<User>(null);
    private tokenExpirationTimer: any;
    constructor(private http: HttpClient, private router: Router){

    }
    
    signUp(email: string, password: string){
        return this.http.post<AuthResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAq70xNf4HhPX1ro_JNrFDFGf2dQqjfTnY', 
        {
            email: email,
            password: password,
            returnSecureToken: true
        }
        ).pipe(catchError(this.handleError), tap(resData =>{
           this.handleAuthentication(resData.email,resData.localId, resData.idToken, +resData.expiresIn);
        }))
    }
    login(email: string, password: string){
        return this.http.post<AuthResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAq70xNf4HhPX1ro_JNrFDFGf2dQqjfTnY',
        {
            email: email,
            password: password,
            returnSecureToken: true
        }
        ).pipe(catchError(this.handleError), tap(resData =>{
            this.handleAuthentication(resData.email,resData.localId, resData.idToken, +resData.expiresIn);
         }))
    }
    logout(){
        console.log("HEEEYYY")
        this.user.next(null);
        this.router.navigate(['/auth']);
        localStorage.removeItem('userData');
        console.log("expiration timemr",this.tokenExpirationTimer)
        if(this.tokenExpirationTimer)
        {
            clearTimeout(this.tokenExpirationTimer);
        }
        this.tokenExpirationTimer = null;
    }
    autoLogout(expirationDuration: number){
        console.log("time",expirationDuration)
        this.tokenExpirationTimer = setTimeout(()=>{
            console.log("timout")
            this.logout();
        },expirationDuration);
    }
    
    autoLogin(){
        const userData :{ email:string,
            userId: string,
            _token: string,
            _tokenExpirationDate : string
        }= JSON.parse(localStorage.getItem('userData'));
        if(!userData)
        {
            return;
        }
        const loadedUser = new User(userData.email,userData.userId,userData._token,new Date(userData._tokenExpirationDate));
        if(loadedUser.token)
        {
            this.user.next(loadedUser);
            const expirationDuration = new Date(userData._tokenExpirationDate).getTime() - new Date().getTime(); 
           console.log("autologin", expirationDuration)
           this.autoLogout(expirationDuration);
        }
    }


    
    private handleAuthentication(email: string, userId: string, token: string, expiresIn: number){

        const expirationDate = new Date(new Date().getTime() + +expiresIn*1000)
        const user = new User(
            email,
            userId,
            token,
            expirationDate);
        this.user.next(user);
        console.log("handle auth")
       this.autoLogout(expiresIn * 1000);
        localStorage.setItem('userData', JSON.stringify(user));

    }
    private handleError(errorRes: HttpErrorResponse){
        let errorMessage = "An unknown error occured!"
        if(!errorRes.error || !errorRes.error.error)
        {
            return throwError(errorMessage);
        }
        switch (errorRes.error.error.message)
            {

                case 'EMAIL_EXISTS': 
                    errorMessage= "This email already exists!"; //sign up 
                    break;
                case 'INVALID_LOGIN_CREDENTIALS':
                    errorMessage = "Password or Email is Incorrect!"; //login
                    console.log(errorMessage);
                    break;
            }
        return throwError(errorMessage);

    }

}