import { NgModule } from "@angular/core";
import { MovieDetailsComponent } from "./movie-details.component";
import { CommonModule } from "@angular/common";
import { RouterModule, Routes } from "@angular/router";
import { AuthGuard } from "../../auth/auth.guard";
import { CarouselModule } from "primeng/carousel";
import { HttpClient } from "@angular/common/http";
import { MatIconModule } from "@angular/material/icon";
import { MatPaginatorModule } from "@angular/material/paginator";
import { MatTabsModule } from "@angular/material/tabs";
import { TranslateModule, TranslateLoader } from "@ngx-translate/core";
import { HttpLoaderFactory } from "../../app.module";

const routes: Routes = [
    { path: '', component: MovieDetailsComponent, canActivate: [AuthGuard] },
  ];
@NgModule({
    declarations:[MovieDetailsComponent],
    imports:[CommonModule,
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
        RouterModule.forChild(routes), RouterModule.forChild(routes)],
    exports:[RouterModule]
})
export class MovieDetailsModule{}