import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient, private cookieService: CookieService) {}

  login(credentials: { username: string, password: string }): Observable<any> {
    return this.http.post('localhost:8080/api/v1/auth/login', credentials);
  }

  saveToken(token: string): void {
    this.cookieService.set('auth_token', token, { path: '/', secure: true, sameSite: 'Strict' });
  }

  getToken(): string {
    return this.cookieService.get('auth_token');
  }

  logout(): void {
    this.cookieService.delete('auth_token', '/');
  }
  isLoggedIn(): boolean {
    return !!this.getToken();
  }
}
