import { RouterModule,Routes } from "@angular/router";
import { NgModule } from '@angular/core';
import { AuthComponent } from "./auth/auth.component";
import { AuthGuard } from "./auth/auth.guard";
import { LoggedInAuthGuard } from "./auth/logged-in-auth.guard";



const routes: Routes = [
    {path: 'home', loadChildren: () => import('./core/home/home.module').then(x => x.HomeModule)},
    {path: 'movies', loadChildren: () => import('./core/movies/movies.module').then(x => x.MoviesModule)},
    {path: 'movies/:id', loadChildren: () => import('./core/movie-details/movie-details.module').then(x => x.MovieDetailsModule)},
    {path: '', redirectTo: '/home', pathMatch: "full"}
  ]

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports:[RouterModule]
})


export class AppRoutingModule{}