import { Component, OnInit } from '@angular/core';
import { NbDialogRef, NbIconLibraries } from '@nebular/theme';
import { IView } from '../../../../../../../shared/interfaces/views.interface';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import * as UUID from 'uuid';
import { IViewFilter, ViewFilterWhereOpr, IViewFilterWhere } from '../../../../../../../shared/interfaces/filters.interface';

@Component({
  selector: 'app-add-edit-filter-modal',
  templateUrl: './add-edit-filter-modal.component.html',
  styleUrls: ['./add-edit-filter-modal.component.scss']
})
export class AddEditFilterModalComponent implements OnInit {

  /**
   * The dialog title
   */
  public title: string = "Add a new filter";
  /**
   * The view we manipulating
   */
  public view:IView;
  /**
   * The filter we edit or new instance or filter to add
   */
  public filter:IViewFilter;

  /**
   * FormGroup instance to handle the form validation
   */
  public filterForm:FormGroup;
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
    if (this.ref.componentRef.instance.filter) {
      // We are in Edit mode
      this.filter = this.ref.componentRef.instance.filter as IViewFilter;
      // Set title
      this.title = `Edit '${this.filter.name}' filter`; 
    }
    // Check if we have widget instance, if not we are in Add mode.
    if (!this.filter) {
      // Add mode.
      // Create new widget instance.
      this.filter = {
        // null name as default in order to show the placeholder.
        name: null,
        // Init where array with a empty record in order to display one where in UI.
        where: [
          {
            // Null column as default in order to show the placeholder.
            column: null,
            // Equals operator as default ('=').
            opr: ViewFilterWhereOpr.EQ,
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
    this.filterForm = this.fb.group({
      // widget name input, required.
      nameCtrl: [this.filter.name, Validators.required],
      // select from list of colors
      colorCtrl: [this.filter.color, Validators.required],
      // select from list of icons
      iconCtrl: [this.filter.icon, Validators.required],
    });

    // Dynamic form, we can whh where caluses as many we want, each new where will 
    // definded by the where uuid that append to control name
    this.filter.where.forEach((where: IViewFilterWhere) => {
      this.filterForm.addControl(`whereColumnCtrl_${where.uuid}`, new FormControl(where.column, Validators.required));
      this.filterForm.addControl(`whereOprCtrl_${where.uuid}`, new FormControl(where.opr, Validators.required));
      this.filterForm.addControl(`whereValueCtrl_${where.uuid}`, new FormControl(where.value, Validators.required));
      this.filterForm.addControl(`whereOrCtrl_${where.uuid}`, new FormControl(Number(where.or).toString(), Validators.required));
    });

    // Subscribe to filterForm status changes observer
    this.filterForm.statusChanges.subscribe((status) => {
      // Enable / Disable the save button according the form validity
      this.isSaveEnabled = (status == "VALID");
    });

    this.filterForm.updateValueAndValidity();
  }

  /**
   * Create a new where clause with the default values
   */
  public addWhere(): void {
    this.filter.where.push(
      {
        // Null column as default in order to show the placeholder.
        column: null,
        // Equals operator as default ('=').
        opr: ViewFilterWhereOpr.EQ,
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
    let whereIdx = this.filter.where.findIndex((where, idx) => where.uuid == uuid);
    this.filter.where.splice(whereIdx, 1);

    this.initForms();
  }

  /**
   * Convert the ViewFilterWhereOpr ENUM to values array
   * 
   * @returns string[] Array of WidgetWhereOpr
   */
  public get viewFilterWhereOprVals(): string[] {
    // Ket the ENUM keys
    const keys = Object.keys(ViewFilterWhereOpr);
    // Get the data by key
    return keys.map(el => Object(ViewFilterWhereOpr)[el]);
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
   * Save button click, pass the filter instance back to opener
   */
  public save(): void {
    this.ref.close(this.filter);
  }
}

