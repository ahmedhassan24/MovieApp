import { Component, OnInit, ViewChild } from '@angular/core';
import { delay } from 'rxjs/internal/operators/delay';
import { MovieService } from '../../service/movie.service';
import { MatPaginator } from '@angular/material/paginator';

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
  totalElements: any;
  lastPageLoaded: any;
  totalPages: any;
  
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  constructor(private movieService: MovieService) {

  }

  ngOnInit() {
    this.getTopRatedMovies(this.paginator.pageIndex,10);
  }

  getTopRatedMovies(pageNumber: number, pageSize: number) {
    this.movieService.getTopRatedMovies(pageNumber, pageSize).pipe(delay(200)).subscribe((res: any) => {
        // this.searchRes = res.results;
        this.topRated = res.content;
        console.log(this.topRated);
        this.paginator.length = res.totalElements;
        this.totalResults = res.total_results;
        this.loader = false;
    },
    error => console.log(error));
  }

  changePage(event) {
    this.loader = true;
    this.getTopRatedMovies(this.paginator.pageIndex, 10);
  }
}