import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UploadService {

  baseUrl = "https://localhost:7095/api/Upload";

  constructor(private http:HttpClient) { }


  // Post a file upload
  uploadFile(formData: FormData): Observable<any> {
    return this.http.post(this.baseUrl, formData);
  }
}
