import { Component, OnInit } from '@angular/core';
import { NbDialogRef, NbIconLibraries } from '@nebular/theme';
import { IView } from '../../../../../../../shared/interfaces/views.interface';
import { IWidget, WidgetFunction, WidgetWhereOpr, IWidgetWhere } from '../../../../../../../shared/interfaces/widgets.interface';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import * as UUID from 'uuid';

@Component({
  selector: 'app-add-edit-widget-modal',
  templateUrl: './add-edit-widget-modal.component.html',
  styleUrls: ['./add-edit-widget-modal.component.scss']
})
export class AddEditWidgetModalComponent implements OnInit {

  /**
   * The dialog title
   */
  public title: string = "Add a new widget";
  /**
   * The view we manipulating
   */
  public view:IView;
  /**
   * The widget we edit or new instance or widget to add
   */
  public widget:IWidget;

  /**
   * FormGroup instance to handle the form validation
   */
  public widgetForm:FormGroup;
  /**
   * List of all available icons we can use
   */
  public iconsListArr: string[]

  public isSaveEnabled: boolean = false;

  /**
   * 
   * @param ref NbDialogRef to the opener.
   * @param fb FormBuilder dependecy injection.
   * @param iconsLib NbIconLibraries dependecy injection.
   */
  constructor(
    public ref: NbDialogRef<any>,
    private fb: FormBuilder,
    private iconsLib: NbIconLibraries
  ) { }

  ngOnInit() {
    if (this.ref.componentRef.instance.view) {
      this.view = this.ref.componentRef.instance.view as IView;
    }
    if (this.ref.componentRef.instance.widget) {
      // We are in Edit mode
      this.widget = this.ref.componentRef.instance.widget as IWidget;
      // Set title
      this.title = `Edit '${this.widget.name}' widget`; 
    }
    // Check if we have widget instance, if not we are in Add mode.
    if (!this.widget) {
      // Add mode.
      // Create new widget instance.
      this.widget = {
        // null name as default in order to show the placeholder.
        name: null,
        // Disable distinct as default.
        distinct: false,
        // Set all (*) as default.
        column: '*',
        // Select default count(*) function.
        function: WidgetFunction.COUNT,
        // Init where array with a empty record in order to display one where in UI.
        where: [
          {
            // Null column as default in order to show the placeholder.
            column: null,
            // Equals operator as default ('=').
            opr: WidgetWhereOpr.EQ,
            // Null value as default in order to show the placeholder.
            value: null,
            // OR disabled as default, AND will be used in next where
            or: false,
            // Generate UUID
            uuid: UUID.v1()
          }
        ]
      }
    }

    // Init forms & validators
    this.initForms();
  }

  /**
   * Loads the form & the validators
   */
  private initForms(): void {
    
    // Init form group and the validators
    this.widgetForm = this.fb.group({
      // widget name input, required.
      nameCtrl: [this.widget.name, Validators.required],
      // widget is distinct checkbox, required.
      distinctCtrl: [this.widget.distinct, Validators.required],
      // the column we run the function on, can be column name or all (*). required
      columnCtrl: [this.widget.column, Validators.required],
      // the function we run on the column. required.
      functionCtrl: [this.widget.function, Validators.required],
      // select from list of colors
      colorCtrl: [this.widget.color, Validators.required],
      // select from list of icons
      iconCtrl: [this.widget.icon, Validators.required],
    });

    // Dynamic form, we can whh where caluses as many we want, each new where will 
    // definded by the where uuid that append to control name
    this.widget.where.forEach((where: IWidgetWhere) => {
      this.widgetForm.addControl(`whereColumnCtrl_${where.uuid}`, new FormControl(where.column, Validators.required));
      this.widgetForm.addControl(`whereOprCtrl_${where.uuid}`, new FormControl(where.opr, Validators.required));
      this.widgetForm.addControl(`whereValueCtrl_${where.uuid}`, new FormControl(where.value, Validators.required));
      this.widgetForm.addControl(`whereOrCtrl_${where.uuid}`, new FormControl(Number(where.or).toString(), Validators.required));
    });

    // Subscribe to widgetForm status changes observer
    this.widgetForm.statusChanges.subscribe((status) => {
      // Enable / Disable the save button according the form validity
      this.isSaveEnabled = (status == "VALID");
    });

    this.widgetForm.updateValueAndValidity();
  }

  /**
   * Create a new where clause with the default values
   */
  public addWhere(): void {
    this.widget.where.push(
      {
        // Null column as default in order to show the placeholder.
        column: null,
        // Equals operator as default ('=').
        opr: WidgetWhereOpr.EQ,
        // Null value as default in order to show the placeholder.
        value: null,
        // OR disabled as default, AND will be used in next where
        or: false,
        // Generate UUID
        uuid: UUID.v1()
     }
    );
    this.initForms();
  }

  /**
   * Delete a where clause by uuid and reload the form
   *  
   * @param uuid Where clause unique id
   */
  public deleteWhere(uuid: string): void {
    let whereIdx = this.widget.where.findIndex((where, idx) => where.uuid == uuid);
    this.widget.where.splice(whereIdx, 1);

    this.initForms();
  }

  /**
   * Convert the WidgetFunction ENUM to values array
   * 
   * @returns string[] Array of WidgetFunction
   */
  public get widgetFunctionVals(): string[] {
    // Ket the ENUM keys
    const keys = Object.keys(WidgetFunction);
    // Get the data by key
    return keys.map(el => Object(WidgetFunction)[el]);
  }

  /**
   * Convert the WidgetWhereOpr ENUM to values array
   * 
   * @returns string[] Array of WidgetWhereOpr
   */
  public get widgetWhereOprVals(): string[] {
    // Ket the ENUM keys
    const keys = Object.keys(WidgetWhereOpr);
    // Get the data by key
    return keys.map(el => Object(WidgetWhereOpr)[el]);
  }

  /**
   * Called by the icons select input, in first time loads all the
   * icons from Nebular library and store the names in local strings array.
   * 
   * @returns string[] Array of icon names
   */
  public get iconsList(): string[] {
    // Check if the array exist
    if (!this.iconsListArr) {
      // Init the array
      this.iconsListArr = [];
      // Get the icons interator from the library, loop till the end and add the name to our array.
      this.iconsLib.getPack("eva").icons.forEach((icon: any) => this.iconsListArr.push(icon.name));
    }
    return this.iconsListArr;
  }

  /**
   * Save button click, pass the widget instance back to opener
   */
  public save(): void {
    this.ref.close(this.widget);
  }
}
