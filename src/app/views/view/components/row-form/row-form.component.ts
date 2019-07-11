import { Component, OnInit, Input, Output } from '@angular/core';
import { IView, IViewColumn } from '../../../../../shared/interfaces/views.interface';
import { FormGroup } from '@angular/forms';
import { FormlyFieldConfig } from '@ngx-formly/core';
import { Subject } from 'rxjs';
import { NbToastrService } from '@nebular/theme';

@Component({
  selector: 'app-row-form',
  templateUrl: './row-form.component.html',
  styleUrls: ['./row-form.component.scss']
})
export class RowFormComponent implements OnInit {

  @Input() view:IView;
  @Input() dataObserve: Subject<any>;
  @Input() ref: {
    save: Function
  };

  form = new FormGroup({});
  model = { };

  fields: FormlyFieldConfig[] = [];
  dateColNames: string[] = [];

  constructor(
    private tosatService:NbToastrService
  ) {
  }

  ngOnInit() {
    this.view.columns.forEach((col) => {
      console.log("type", col.type);
      this.model[col.name] = col.default;
      // string
      if (["char", "varchar"].includes(String(col.type))) {
        this.fields.push(this.generateInput(col));
      }
      // number 
      if (["int", "smallint", "tinyint", "mediumint"].includes(String(col.type))) {
        this.fields.push(this.generateInputNumeric(col));
      }
      // date
      if (["datetime", "timestamp"].includes(String(col.type))) {
        this.fields.push(this.generateDatepicker(col));
        this.model[col.name] = null;
        this.dateColNames.push(col.name);
      }
    });

    if (this.dataObserve) {
      this.initDataObserve();
    }
  }

  private initDataObserve() {
    this.dataObserve.subscribe((val) => {
      let row = val[0];
      let data = Object
        .keys(row)
        .reduce((obj, item) => {
          obj[item] = row[item];
          if (this.dateColNames.includes(item)) {
            obj[item] =  new Date(obj[item]);
          }
          return obj;
        }, {})
      this.model = data;
    })
  }

  generateBasic(col:IViewColumn): FormlyFieldConfig {
    return {
      key: col.name,
      templateOptions: {
        label: col.name,
        placeholder: col.name,
        required: !col.nullable
      }
    };
  }

  generateInput(col): FormlyFieldConfig {
    let input = this.generateBasic(col);
    input.type = 'nb-input';
    return input;
  }

  generateInputNumeric(col): FormlyFieldConfig {
    let input = this.generateBasic(col);
    input.type = 'nb-input';
    input.templateOptions.mask = "9".repeat(15);
    return input;
  }

  generateDatepicker(col): FormlyFieldConfig {
    let input = this.generateBasic(col);
    input.type = 'nb-datepicker';
    return input;
  }

  submit(model) {
    if (!this.form.valid) {
      this.tosatService.danger('Validation is not passed! Please check the form again.', 'Validation Error');
      return;
    }
    this.dateColNames.forEach(col => {
      model[col] = new Date(model[col]).toJSON().slice(0, 19).replace('T', ' ')
    })
    
    this.ref.save(model);
  }

}
