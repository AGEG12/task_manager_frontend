import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  private apiURL = 'https://task-manager-backend-gnmj.onrender.com/category'
  private apiURL2 = 'https://task-manager-backend-gnmj.onrender.com/dashboard'
  constructor(private http: HttpClient) { }

  createCategory(categoryData: any): Observable<any> {
    return this.http.post<any>(this.apiURL, categoryData);
  }
  getUserCategories(): Observable<any> {
    return this.http.get(this.apiURL);
  }
  getCategoryById(categoryId: string): Observable<any> {
    return this.http.get(`${this.apiURL}/${categoryId}`);
  }
  getUserData(): Observable<any> {
    return this.http.get(this.apiURL2);
  }
}
