import { FamilyMember } from './../interfaces/family-member';
import { FamilyInvitation } from '../interfaces/family-invitation';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

const API = environment.apiURL;

@Injectable({
  providedIn: 'root',
})
export class FamilyService {
  constructor(private httpClient: HttpClient) {}

  getMemberInvitation(token: string) {
    return this.httpClient.get<FamilyInvitation>(
      `${API}/family/getMemberInvitation/${token}`
    );
  }

  getMembers() {
    return this.httpClient.get<FamilyMember[]>(`${API}/family/members`);
  }
}
