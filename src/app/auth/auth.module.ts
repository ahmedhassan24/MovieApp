import { NgModule } from "@angular/core";
import { AuthComponent } from "./auth.component";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { LoggedInAuthGuard } from "./logged-in-auth.guard";
import { LoadingSpinnerComponent } from "../shared/loading-spinner/loading-spinner.component";
import { HttpClient } from "@angular/common/http";
import { TranslateModule, TranslateLoader } from "@ngx-translate/core";
import { HttpLoaderFactory } from "../app.module";

@NgModule({
    declarations: [AuthComponent, LoadingSpinnerComponent],
    imports: [CommonModule, FormsModule, RouterModule.forChild([{path: 'auth', component: AuthComponent, canActivate:[LoggedInAuthGuard]}]), TranslateModule.forRoot({
        loader: {
          provide: TranslateLoader,
          useFactory: HttpLoaderFactory,
          deps: [HttpClient],
        },})]
})
export class AuthModule{}