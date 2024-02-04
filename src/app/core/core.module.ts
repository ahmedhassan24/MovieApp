import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { MatPaginatorModule } from "@angular/material/paginator";
import { MatIconModule } from "@angular/material/icon";
import { MatTabsModule } from "@angular/material/tabs";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { CarouselModule } from "primeng/carousel";
import { TranslateLoader, TranslateModule } from "@ngx-translate/core";
import { HttpLoaderFactory } from "../app.module";
import { HttpClient } from "@angular/common/http";
import { NgxSkeletonLoaderModule } from "ngx-skeleton-loader";
import { CoreRoutingModule } from "./core-routing.module";
import { AuthGuard } from "../auth/auth.guard";
import { LoggedInAuthGuard } from "../auth/logged-in-auth.guard";
import { AuthenticationService } from "../service/auth.service";
import { MovieService } from "../service/movie.service";
import { MoviesModule } from "./movies/movies.module";
import { MovieDetailsModule } from "./movie-details/movie-details.module";
import { HomeModule } from "./home/home.module";

@NgModule({
    declarations: [
    // HomeComponent,
    // MoviesComponent,
    // MovieDetailsComponent,
    // SkeletonComponent
    ],
    imports:[
        RouterModule,
        // MatPaginatorModule,
        // NgxSkeletonLoaderModule,
        // MatIconModule,
        // MatTabsModule,
        CommonModule,
        FormsModule,
        MoviesModule,
        MovieDetailsModule,
        HomeModule,
        TranslateModule.forRoot({
            loader: {
              provide: TranslateLoader,
              useFactory: HttpLoaderFactory,
              deps: [HttpClient],
            },}),
        CoreRoutingModule
    ],
    providers: [AuthGuard,LoggedInAuthGuard, AuthenticationService, MovieService]
})
export class CoreModule {}