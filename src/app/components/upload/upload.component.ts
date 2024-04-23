import { Component, ElementRef, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { UploadService } from './upload.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrl: './upload.component.scss'
})
export class UploadComponent implements OnInit {

  @ViewChild('file') file!: ElementRef;

  fileName = "an image to upload";
  imageUrl =  "";
  clicked = false;
  @Output() public onUploadFinished = new EventEmitter();

  constructor(private uploadService: UploadService) {}

  ngOnInit() {
  }

  default(event: any){
    event.preventDefault();
  }

  uploadFile(files: any) {
    if (files.length === 0) {
      return;
    }

    let fileToUpload = <File>files[0];
    const formData = new FormData();
    formData.append('file', fileToUpload, fileToUpload.name);
    this.fileName = fileToUpload.name;

    this.uploadService.uploadFile(formData)
    .subscribe(
      (res) => {
        this.imageUrl = "https://localhost:7095/" + res.dbPath;
        this.onUploadFinished.emit(this.imageUrl);
      }, err => {

      }
    )
  }
}
