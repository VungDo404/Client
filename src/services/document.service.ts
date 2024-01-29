import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DocumentService {
  baseURL = "http://localhost:8100/document"; 
  constructor(private httpClient: HttpClient) { }

  getDocumentByID(ID: string){
    return this.httpClient.get(this.baseURL+"/"+ID); 
  }
  getDocuments(take: number = 10, skip: number = 0, orderBy: string = 'Id', title: string='', type: string = ''){
    const q = `?take=${take}&skip=${skip}&orderBy=${orderBy}`
    return this.httpClient.get(this.baseURL+q);
  }
}
