import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  isEmpty(): boolean {
    return !this.data || this.data.datasets[0].data.length === 0;
  }
  private data: any = null;

  constructor(private http: HttpClient) {}

  fetchData(): Observable<any> {
    return this.http.get<any>('http://localhost:3002/budget');
  }

  setData(data: any): void {
    this.data = data;
  }
  getData(): any {
    return this.data;
  }

}
