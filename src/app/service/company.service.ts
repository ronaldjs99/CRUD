import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { company } from '../models/company';

@Injectable({
  providedIn: 'root',
})
export class CompanyService {
  private apiUrl = 'http://127.0.0.1:8000/v1/company/';

  constructor(private http: HttpClient) {}

  //retrieve list of company
  retrieveCompany(): Observable<company[]> {
    return this.http.get<company[]>(this.apiUrl);
  }

  createCompany(company: company): Observable<company> {
    return this.http.post<company>(this.apiUrl, company);
  }
}
