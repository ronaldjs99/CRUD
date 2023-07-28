import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Profile } from '../models/profile';

@Injectable({
  providedIn: 'root',
})
export class ProfileService {
  private apiUrl = 'http://127.0.0.1:8000/v1/profile/';

  constructor(private http: HttpClient) {}

  //retrieve list of profiles
  retrieveProfiles(): Observable<Profile[]> {
    return this.http.get<Profile[]>(this.apiUrl);
  }

  //retrieve single profile
  retrieveProfile(id: number): Observable<any> {
    return this.http.get(`${this.apiUrl}${id}/`);
  }

  //add new profile
  createProfile(profile: any): Observable<Profile> {
    return this.http.post<Profile>(this.apiUrl, profile);
  }

  //updating existing profile
  updateProfile(id: number, profile: any): Observable<any> {
    return this.http.put(`${this.apiUrl}${id}/`, profile);
  }

  //deleting existing profile
  deleteProfile(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}${id}/`);
  }
}
