import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'form-message',
  templateUrl: './form-message.component.html',
  styleUrls: ['./form-message.component.scss'],
})
export class FormMessageComponent implements OnInit {
  @Input()
  message = '';

  constructor() {}

  ngOnInit(): void {}
}
