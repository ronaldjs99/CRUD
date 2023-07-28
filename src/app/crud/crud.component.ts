import { Component, OnInit } from '@angular/core';
import { company } from '../models/company';
import { HttpClient } from '@angular/common/http';
import { CompanyService } from '../service/company.service';
import { Profile } from '../models/profile';
import { ProfileService } from '../service/profile.service';
import { ActivatedRoute, Router } from '@angular/router';
@Component({
  selector: 'app-crud',
  templateUrl: './crud.component.html',
  styleUrls: ['./crud.component.css'],
})
export class CrudComponent implements OnInit {
  //declare model variable array
  companys: company[] = [];
  newCompany: company = { name: '' };
  profiles: any[] = [];
  profile: any = {};
  editing: boolean = false;
  constructor(
    private companyService: CompanyService,
    private profileService: ProfileService,
    private http: HttpClient
  ) {}

  ngOnInit(): void {
    this.retrieveCompany();
    this.retrieveProfiles();
  }

  retrieveCompany(): void {
    this.companyService
      .retrieveCompany()
      .subscribe((companys) => (this.companys = companys));
  }

  createCompany(): void {
    this.companyService.createCompany(this.newCompany).subscribe((company) => {
      this.companys.push(company);
      this.newCompany = { name: '' };
    });
  }

  retrieveProfiles(): void {
    this.profileService.retrieveProfiles().subscribe((data: any) => {
      this.profiles = data;
    });
  }

  //using profileId get from route params to get specific profile
  retrieveProfile(profileId: number): void {
    this.profileService.retrieveProfile(profileId).subscribe((data: any) => {
      this.profile = data;
    });
  }

  createProfile() {
    this.editing = false;
    this.profile = {}; //initialize a new empty object
  }

  editProfile(profile: any): void {
    this.editing = true;
    this.profile = { ...profile }; //clone the profile object
  }

  saveProfile(): void {
    if (this.editing) {
      this.profileService
        .updateProfile(this.profile.id, this.profile)
        .subscribe(() => {
          this.retrieveProfiles(); //refresh the list
          this.profile = {}; //reset the profile to null
          this.editing = false; //exit the editing process
        });
    } else {
      this.profileService.createProfile(this.profile).subscribe(() => {
        this.retrieveProfiles();
        this.profile = {};
      });
    }
  }

  deleteProfile(profileId: number) {
    this.profileService.deleteProfile(profileId).subscribe(() => {
      this.retrieveProfiles();
    });
  }
}
