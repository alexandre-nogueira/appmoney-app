/* eslint-disable no-prototype-builtins */
import { Posting, Postings } from './../../interfaces/posting';
import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import * as Papa from 'papaparse';
import { PostingService } from '../../services/posting.service';
import { AlertService } from 'src/app/shared/components/alert/alert.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Params } from '@angular/router';
import { RouteUtil } from 'src/app/shared/utils/route/route-util';

@Component({
  selector: 'posting-file-upload',
  templateUrl: './posting-file-upload.component.html',
  styleUrls: ['./posting-file-upload.component.scss'],
})
export class PostingFileUploadComponent implements OnInit {
  uploadForm!: FormGroup;

  @Input() routeParams!: Params;

  constructor(
    public activeModal: NgbActiveModal,
    private postingService: PostingService,
    private alertService: AlertService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.uploadForm = this.formBuilder.group({
      accountId: [0, Validators.required],
    });
  }

  fileUploaded(file: File) {
    const reader: FileReader = new FileReader();
    reader.readAsText(file);
    reader.onload = () => {
      const csvData = reader.result?.toString();
      if (csvData) {
        this.parseCSVToJson(csvData).then((result) => {
          const postings = this.validateFileStruture(result.data);
          if (postings) {
            this.createMultiplePostings(postings);
          }
          this.close();
        });
      }
    };
  }

  parseCSVToJson(csvData: string): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      Papa.parse(csvData, {
        header: true,
        skipEmptyLines: true,
        transformHeader: function (h) {
          return h.trim();
        },
        complete: (result) => {
          resolve(result);
        },
        error: (error: Error) => {
          reject(error);
        },
      });
    });
  }

  validateFileStruture(fileData: Postings): Postings | undefined {
    const postings: Postings = [];
    let fileIntegrit = true;
    const accountId = this.uploadForm.get('accountId')?.value ?? 0;

    for (let i = 0; i < fileData.length; i++) {
      fileIntegrit = fileData[i].hasOwnProperty('description')
        ? fileIntegrit
        : false;
      fileIntegrit = fileData[i].hasOwnProperty('value') ? fileIntegrit : false;
      fileIntegrit = fileData[i].hasOwnProperty('dueDate')
        ? fileIntegrit
        : false;
      fileIntegrit = fileData[i].hasOwnProperty('paymentDate')
        ? fileIntegrit
        : false;
      const posting: Posting = {
        description: fileData[i].description,
        value: fileData[i].value,
        dueDate: fileData[i].dueDate,
        paymentDate: fileData[i].paymentDate,
      };

      if (!fileIntegrit) break;
      posting.accountId = accountId;
      postings.push(posting);
    }

    if (fileIntegrit || !postings) {
      return postings;
    } else {
      this.alertService.danger('Erro de estrutura no arquivo.');
      return undefined;
    }
  }

  createMultiplePostings(postings: Postings) {
    this.postingService
      .createMultiple({
        postings: postings,
        ignoreDuplicated: false,
      })
      .subscribe({
        next: (massPostingsReturn) => {
          this.alertService.success('Lançamentos criados com sucesso');
          this.postingService.refreshList(
            RouteUtil.prepareQSParams(this.routeParams, {})
          );
        },
        error: (error) => {
          console.log(error);
          this.alertService.danger('Erro ao criar lançamentos');
        },
      });
  }

  close() {
    this.activeModal.dismiss();
  }
}
