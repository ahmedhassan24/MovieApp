import { Component, OnInit } from '@angular/core';
import { delay } from 'rxjs/internal/operators/delay';
import { MovieService } from '../../service/movie.service';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.scss']
})
export class MoviesComponent implements OnInit {
  topRated: any;
  loader = true;
  totalResults: any;
  total_results: any;
  searchRes: any;
  searchStr: string;

  constructor(private movieService: MovieService) {

  }

  ngOnInit() {
    this.getTopRatedMovies(1);
  }

  getTopRatedMovies(page: number) {
    this.movieService.getTopRatedMovies(page).pipe(delay(2000)).subscribe((res: any) => {
        // this.searchRes = res.results;
        this.topRated = res.results;
        this.totalResults = res.total_results;
        this.loader = false;
    },
    error => console.log(error));
  }

  changePage(event) {
    this.loader = true;
    this.getTopRatedMovies(event.pageIndex + 1);
  }
}