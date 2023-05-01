import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'upload-file',
  templateUrl: './upload-file.component.html',
  styleUrls: ['./upload-file.component.scss'],
})
export class UploadFileComponent implements OnInit {
  @Input() label = 'Arquivo';

  @Output() fileUploaded = new EventEmitter<File>();

  file!: File;

  constructor() {}

  ngOnInit(): void {}

  onFileSelected(event: any) {
    this.file = event.target.files[0];
  }

  uploadFile() {
    this.fileUploaded.emit(this.file);
  }
}
