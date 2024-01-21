import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";


@Injectable({
    providedIn: 'root'
})
export class MovieService {
    baseUrl: string;
    apiKey: string;
    language: string;
    region: string;

    constructor(private http: HttpClient){
        this.baseUrl = 'https://api.themoviedb.org/3/';
        this.apiKey = 'd08f242ecd2783c2d93e31f29871ac34';
        this.language = 'en-US';
        this.region = 'US';
    }

    getNowPlaying(page: number): Observable<any> {
        return this.http.get(`${this.baseUrl}movie/now_playing?api_key=${this.apiKey}&page=${page}&language=${this.language}&region=${this.region}`);
    }

    getMovie(id: string): Observable<any> {
    return this.http.get(`${this.baseUrl}movie/${id}?api_key=${this.apiKey}`);
    }

    getMovieReviews(id: string): Observable<any> {
    return this.http.get(`${this.baseUrl}movie/${id}/reviews?api_key=${this.apiKey}`);
    }

    getTopRatedMovies(page: number): Observable<any> {
    return this.http.get(`${this.baseUrl}movie/top_rated?api_key=${this.apiKey}&page=${page}&language=${this.language}&region=${this.region}`);
    }
    getMovieCredits(id: string): Observable<any> {
        return this.http.get(`${this.baseUrl}movie/${id}/credits?api_key=${this.apiKey}`);
      }
    
      getBackdropsImages(id: string) {
        return this.http.get(`${this.baseUrl}movie/${id}/images?api_key=${this.apiKey}`);
      }
    
      getMovieVideos(id: string): Observable<any> {
        return this.http.get(`${this.baseUrl}movie/${id}/videos?api_key=${this.apiKey}`);
      }
    
      getRecomendMovies(id: string): Observable<any> {
        return this.http.get(`${this.baseUrl}movie/${id}/recommendations?api_key=${this.apiKey}`);
      }
    
      getPersonDetail(id: string): Observable<any> {
        return this.http.get(`${this.baseUrl}person/${id}?api_key=${this.apiKey}`);
      }
    
      getPersonExternalData(id: string) {
        return this.http.get(`${this.baseUrl}person/${id}/external_ids?api_key=${this.apiKey}`);
      }
    
      getPersonCast(id: string): Observable<any> {
        return this.http.get(`${this.baseUrl}person/${id}/movie_credits?api_key=${this.apiKey}`);
      }
    

}