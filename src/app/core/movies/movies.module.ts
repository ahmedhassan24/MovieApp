import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AuthGuard } from "../../auth/auth.guard";
import { MoviesComponent } from "./movies.component";
import { MatPaginatorModule } from "@angular/material/paginator";
import { CarouselModule } from "primeng/carousel";
import { TranslateLoader, TranslateModule } from "@ngx-translate/core";
import { HttpClient } from "@angular/common/http";
import { HttpLoaderFactory } from "../../app.module";
import { MatIconModule } from "@angular/material/icon";
import { MatTabsModule } from "@angular/material/tabs";

const routes : Routes = [
    { path: '', component: MoviesComponent, canActivate: [AuthGuard] }
]
@NgModule({
    declarations: [MoviesComponent],
    imports: [  CommonModule,
                MatPaginatorModule,
                CarouselModule,
                MatIconModule,
                MatTabsModule,
                TranslateModule.forRoot({
                    loader: {
                      provide: TranslateLoader,
                      useFactory: HttpLoaderFactory,
                      deps: [HttpClient],
                    },}),
                RouterModule.forChild(routes)],
    exports:[RouterModule]
})
export class MoviesModule{}