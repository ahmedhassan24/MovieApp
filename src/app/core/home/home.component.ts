import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { delay } from 'rxjs/internal/operators/delay';
import { MovieService } from '../../service/movie.service';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  nowPlaying: any;
  tvShows: any;
  responsiveOptions;
  loader = true;

  constructor(private movies: MovieService) {}
  ngOnInit() {
    this.trendingMovies(1, 10);
  }

  trendingMovies(pageNumber: number, pageSize: number) {
    // debugger
    this.movies.getTopRatedMovies(pageNumber, pageSize).pipe(delay(2000)).subscribe((res: any) => {
      this.nowPlaying = res.content;
      console.log(this.nowPlaying);
      this.loader = false;
    });
  }


}