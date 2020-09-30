import { Component, OnInit, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-validation-message',
  templateUrl: './validation-message.component.html',
  styleUrls: ['./validation-message.component.scss']
})
export class ValidationMessageComponent implements OnInit {

  @Input() public MessageArray: any[];

  @Input() public propertyName: string;

  @Input() public FormGroupName : FormGroup;
  constructor() { }

  ngOnInit() {}
  GetMessageArray()
  {
    return this.MessageArray[this.propertyName];
  }
  CheckValidation(validation : any)
  {
    return this.FormGroupName.get(this.propertyName).hasError(validation.type) && (this.FormGroupName.get(this.propertyName).dirty || this.FormGroupName.get(this.propertyName).touched)
  }

}
