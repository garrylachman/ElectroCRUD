import { Component, OnInit } from '@angular/core';
import { FieldType } from '@ngx-formly/core';

@Component({
  selector: 'app-formly-field-nb-filepicker',
  templateUrl: './formly-field-nb-filepicker.component.html',
  styleUrls: ['../../row-form.component.scss', './formly-field-nb-filepicker.component.scss']
})
export class FormlyFieldNbFilepickerComponent extends FieldType {
  getFileBase64(event: any) {
    if (event.target.files && event.target.files[0]) {
      var reader = new FileReader();

      reader.onload = (event: any) => {
        this.formControl.patchValue(event.target.result);
      }

      reader.readAsDataURL(event.target.files[0]);
    }
  }
}
