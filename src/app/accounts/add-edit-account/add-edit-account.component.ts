import { Component, OnInit } from '@angular/core';
import { NbDialogRef } from '@nebular/theme';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Account } from '../../../shared/interfaces/accounts.interface';

@Component({
  selector: 'app-add-edit-account',
  templateUrl: './add-edit-account.component.html',
  styleUrls: ['./add-edit-account.component.scss']
})
export class AddEditAccountComponent implements OnInit {

  title: string = "Add new account";
  accountId: number;
  editAccount: Account;

  isSaveEnabled: boolean = false;

  basicDetailsForm: FormGroup;
  tunnelDetailsForm: FormGroup;
  databaseDetailsForm: FormGroup;

  databaseServers: any[] = [
    { name: 'MySQL', value:1 },
    { name: 'SQL Server', value:2 }
  ]

  constructor(
    public ref: NbDialogRef<any>,
    private fb: FormBuilder
  ) { 

  }

  get isEdit(): boolean {
    return this.accountId > 0;
  }

  ngOnInit() {
    console.log(this.ref);
    if (this.ref.componentRef.instance.account) {
      this.editAccount = this.ref.componentRef.instance.account;
      this.accountId = this.editAccount.id;
    }

    this.basicDetailsForm = this.fb.group({
      accountNameCtrl: [this.editAccount.name, Validators.compose([Validators.required, Validators.minLength(3)])],
      databaseServerCtrl: [String(this.editAccount.server.server_type), Validators.required],
    });
    
    this.tunnelDetailsForm = this.fb.group({
      isTunnelEnabledCtrl: [this.editAccount.ssh.enabled, Validators.required],
      sshHostCtrl: [this.editAccount.ssh.hostname, Validators.required],
      sshPortCtrl: [this.editAccount.ssh.port, Validators.required],
      sshUsernameCtrl: [this.editAccount.ssh.username, Validators.required],
      sshPasswordCtrl: [this.editAccount.ssh.password, Validators.required],
    });

    this.databaseDetailsForm = this.fb.group({
      dbHostCtrl: [this.editAccount.server.hostname, Validators.required],
      dbPortCtrl: [this.editAccount.server.port, Validators.required],
      dbUsernameCtrl: [this.editAccount.server.username, Validators.required],
      dbPasswordCtrl: [this.editAccount.server.password, Validators.nullValidator],
      dbDbCtrl: [this.editAccount.server.database, Validators.required],
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

    if (this.isEdit) {
      this.title = `Edit Account: ${this.basicDetailsForm.controls['accountNameCtrl'].value}`;
    }
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
