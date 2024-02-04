import { Component, OnInit } from '@angular/core';
import { ActivatedRoute , Params} from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';
// import { MatDialog } from '@angular/material';
import { MovieService } from '../../service/movie.service';
import {MatTabsModule} from '@angular/material/tabs';


@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.component.html',
  styleUrls: ['./movie-details.component.scss'],
})
export class MovieDetailsComponent implements OnInit {
  public id: number;
  public video: boolean;
  movie: any;
  relatedvideo: any;
  casts: any = [];
  backdrops: any = [];
  recomendMovies: any = [];

  constructor(
    private movieService: MovieService,
    private router: ActivatedRoute,
    private sanitizer: DomSanitizer,
  ) {

  }

  ngOnInit() {
    this.router.params.subscribe((params: Params) => {
      this.id = params['id'];
      this.getSingleMoviesDetails(this.id);
      // this.getCast(this.id);
      // this.getBackropsImages(this.id);
      // this.getRecomendMovie(this.id);
    });
  }

  getSingleMoviesDetails(id){
    this.movieService.getMovie(id).subscribe((res: any) => {
      console.log(res);
      this.movie = res;
      console.log(this.movie);
    });
  }



  
  // getCast(id) {
  //   this.movieService.getMovieCredits(id).subscribe((res: any) => {
  //     this.casts = res.cast;
  //   });
  // }

  // getBackropsImages(id) {
  //   this.movieService.getBackdropsImages(id).subscribe((res: any) => {
  //     this.backdrops = res.backdrops;
  //   });
  // }

  // getRecomendMovie(id) {
  //   this.movieService.getRecomendMovies(id).subscribe((res: any) => {
  //     this.recomendMovies = res.results;
  //   });
  }