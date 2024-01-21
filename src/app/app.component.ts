import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from './service/auth.service';
import { HomeComponent } from './core/home/home.component';
import { TranslateService } from '@ngx-translate/core';
// import { MoviesComponent } from './core/movies/movies/movies.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit{
  constructor(private authService : AuthenticationService, private translate: TranslateService){
    translate.setDefaultLang('en');
  }
  title = 'Movie-App';
  switchLanguage(language: string) {
    this.translate.use(language);
  }
  ngOnInit(): void {
    this.authService.autoLogin();
  }
}
