import { Component, OnInit } from '@angular/core';
import { NbDialogRef } from '@nebular/theme';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-edit-account',
  templateUrl: './add-edit-account.component.html',
  styleUrls: ['./add-edit-account.component.scss']
})
export class AddEditAccountComponent implements OnInit {

  title: string;

  isSaveEnabled: boolean = false;

  basicDetailsForm: FormGroup;
  tunnelDetailsForm: FormGroup;
  databaseDetailsForm: FormGroup;

  databaseServers: any[] = [
    { name: 'MySQL', value:1 },
    { name: 'SQL Server', value:2 }
  ]

  constructor(
    protected ref: NbDialogRef<any>,
    private fb: FormBuilder
  ) { 
    this.title = "Add new account";
  }

  ngOnInit() {
    this.basicDetailsForm = this.fb.group({
      accountNameCtrl: ['', Validators.compose([Validators.required, Validators.minLength(3)])],
      databaseServerCtrl: ['', Validators.required],
    });
    
    this.tunnelDetailsForm = this.fb.group({
      isTunnelEnabledCtrl: [false, Validators.required],
      sshHostCtrl: ['', Validators.required],
      sshPortCtrl: ['', Validators.required],
      sshUsernameCtrl: ['', Validators.required],
      sshPasswordCtrl: ['', Validators.required],
    });

    this.databaseDetailsForm = this.fb.group({
      dbHostCtrl: ['', Validators.required],
      dbPortCtrl: ['', Validators.required],
      dbUsernameCtrl: ['', Validators.required],
      dbPasswordCtrl: ['', Validators.nullValidator],
      dbDbCtrl: ['', Validators.required],
    });

    this.tunnelDetailsForm.controls.isTunnelEnabledCtrl.valueChanges.subscribe((newVal) => {
      ['sshHostCtrl', 'sshPortCtrl', 'sshUsernameCtrl', 'sshPasswordCtrl'].forEach((item) => {
        let ctrl = this.tunnelDetailsForm.controls[item];
        if (newVal) {
          ctrl.enable();
        } else {
          ctrl.disable();
        }
      })
    });

    this.tunnelDetailsForm.controls.isTunnelEnabledCtrl.updateValueAndValidity();
  }

  onBasicDetailsSubmit() {
    this.basicDetailsForm.markAsDirty();
  }

  onTunnelDetailsSubmit() {
    this.tunnelDetailsForm.markAsDirty();
  }

  onDatabaseDetailsSubmit() {
    this.databaseDetailsForm.markAsDirty();
  }
  
  save() {

  }
}
