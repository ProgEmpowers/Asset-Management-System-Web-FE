import { Component, ElementRef, EventEmitter, Output, ViewChild } from '@angular/core';
import { UploadImageService } from './upload-image.service';

@Component({
  selector: 'app-upload-image',
  templateUrl: './upload-image.component.html',
  styleUrl: './upload-image.component.scss'
})
export class UploadImageComponent {

  @ViewChild('file') file!: ElementRef;

  fileName = "an image to upload";
  imageUrl =  "";
  clicked = false;
  @Output() public onUploadFinished = new EventEmitter();

  constructor(private uploadImageService: UploadImageService) {}

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

    this.uploadImageService.uploadFile(formData)
    .subscribe(
      (res) => {
        this.imageUrl = "https://localhost:7095/" + res.dbPath;
        this.onUploadFinished.emit(this.imageUrl);
      }, err => {

      }
    )
  }
}
