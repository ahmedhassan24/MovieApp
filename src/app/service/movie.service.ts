import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { TokenService } from "./token.service";


@Injectable({
    providedIn: 'root'
})
export class MovieService {
    baseUrl: string;
    apiKey: string;
    language: string;
    region: string;

    constructor(private http: HttpClient, private tokenService : TokenService){
        this.baseUrl = 'https://api.themoviedb.org/3/';
        this.apiKey = 'd08f242ecd2783c2d93e31f29871ac34';
        this.language = 'en-US';
        this.region = 'US';
    }
    // eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ0ZXN0MDFAdGVzdC5jb20iLCJpYXQiOjE3MDY4MDMxOTQsImV4cCI6MTcwNjgwNDYzNH0.bfjuCVUxZ7a48dCo4Qc3lzbeUxJZfAi-wCfTXGkMZcg
 
    getNowPlaying(page: number): Observable<any> {

        return this.http.get(`${this.baseUrl}movie/now_playing?api_key=${this.apiKey}&page=${page}&language=${this.language}&region=${this.region}`);
    }

    getMovie(id: string): Observable<any> {
      const headers = new HttpHeaders({
        'Authorization': `Bearer ${this.tokenService.getToken()}`
      });
    return this.http.get(`http://localhost:8090/api/movies/${id}`, { headers: headers});
    }

    getMovieReviews(id: string): Observable<any> {
    return this.http.get(`${this.baseUrl}movie/${id}/reviews?api_key=${this.apiKey}`);
    }

    getTopRatedMovies(pageNumber: number, pageSize: number): Observable<any> {
      const headers = new HttpHeaders({
        'Authorization': `Bearer ${this.tokenService.getToken()}`
      });
      console.log(headers);
      let queryParams= new HttpParams().append("size", String(pageSize)).append("page", String(pageNumber));

    return this.http.get('http://localhost:8090/api/movies', { headers: headers , params: queryParams});
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