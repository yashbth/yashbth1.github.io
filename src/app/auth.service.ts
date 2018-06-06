import { Injectable } from '@angular/core';
import {Observable,of} from 'rxjs'
import { HttpClient,HttpHeaders } from '@angular/common/http';
import {catchError, map, tap } from 'rxjs/operators';
import { JwtHelperService } from '@auth0/angular-jwt';
import { GlobalService } from './global.service';
import { Token } from './users';
import { variable } from '@angular/compiler/src/output/output_ast';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  jwtHelper = new JwtHelperService()
  session_variables:any;  
  private url: 'http://localhost/~yashbahetiiitk/swajal_dashboard/src/assets/Php/session.php';
  // private url: 'http://localhost:8000/assets/Php/session.php'
  
 
  constructor(private http : HttpClient,private global : GlobalService) { }

  getSessionVariables():Observable<Token[]>{
    return this.http.post<Token[]>(this.url,{});
  }
  
  isLoggedIn():boolean{
    return this.jwtHelper.isTokenExpired(this.global.token)?false:true;
  }
}
