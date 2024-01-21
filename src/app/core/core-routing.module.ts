import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AuthComponent } from "../auth/auth.component";
import { AuthGuard } from "../auth/auth.guard";
import { LoggedInAuthGuard } from "../auth/logged-in-auth.guard";
import { HomeComponent } from "./home/home.component";
import { MovieDetailsComponent } from "./movie-details/movie-details.component";
import { MoviesComponent } from "./movies/movies.component";

const routes: Routes = [
    // {path: 'home', component: HomeComponent, canActivate: [AuthGuard]},
    // {path: 'movies/:id' , component: MovieDetailsComponent, canActivate: [AuthGuard]},
    // {path: 'movies', component: MoviesComponent , canActivate: [AuthGuard]},
];
@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports:[RouterModule]
})
export class CoreRoutingModule{}