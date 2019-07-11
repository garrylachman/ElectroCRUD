import { Component, OnInit } from '@angular/core';
import { NbDialogRef } from '@nebular/theme';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IAccount } from '../../../shared/interfaces/accounts.interface';
import { IIPCCheckConnectionResponseMessage } from '../../../shared/ipc/accounts.ipc';
import { AccountsIPCService } from '../../services/ipc/accounts.service';

@Component({
  selector: 'app-add-edit-account',
  templateUrl: './add-edit-account.component.html',
  styleUrls: ['./add-edit-account.component.scss']
})
export class AddEditAccountComponent implements OnInit {

  title: string = "Add new account";
  accountId: number;
  editAccount: IAccount;

  isSaveEnabled: boolean = false;
  public testLog: [string, string][];

  basicDetailsForm: FormGroup;
  tunnelDetailsForm: FormGroup;
  databaseDetailsForm: FormGroup;

  databaseServers: any[] = [
    { name: 'MySQL', value:1 }
  ]

  constructor(
    public ref: NbDialogRef<any>,
    private fb: FormBuilder,
    private accountsIPCService: AccountsIPCService
  ) { 
    this.testLog = [];
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
      accountNameCtrl: [this.editAccount ? this.editAccount.name : null, Validators.compose([Validators.required, Validators.minLength(3)])],
      databaseServerCtrl: [this.editAccount ? String(this.editAccount.server.server_type) : null, Validators.required],
    });
    
    this.tunnelDetailsForm = this.fb.group({
      isTunnelEnabledCtrl: [this.editAccount ? this.editAccount.ssh.enabled : false, Validators.required],
      sshHostCtrl: [this.editAccount ? this.editAccount.ssh.hostname : null, Validators.required],
      sshPortCtrl: [this.editAccount ? this.editAccount.ssh.port : null, Validators.required],
      sshUsernameCtrl: [this.editAccount ? this.editAccount.ssh.username : null, Validators.required],
      sshPasswordCtrl: [this.editAccount ? this.editAccount.ssh.password : null, Validators.required],
    });

    this.databaseDetailsForm = this.fb.group({
      dbHostCtrl: [this.editAccount ? this.editAccount.server.hostname : null, Validators.required],
      dbPortCtrl: [this.editAccount ? this.editAccount.server.port : null, Validators.required],
      dbUsernameCtrl: [this.editAccount ? this.editAccount.server.username : null, Validators.required],
      dbPasswordCtrl: [this.editAccount ? this.editAccount.server.password : null, Validators.nullValidator],
      dbDbCtrl: [this.editAccount ? this.editAccount.server.database : null, Validators.required],
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

  formAsAccount(): IAccount {
    const fromBasicForm = (ctrl: string) => this.basicDetailsForm.controls[ctrl].value;
    const fromTunnelForm = (ctrl: string) => this.tunnelDetailsForm.controls[ctrl].value;
    const fromDBForm = (ctrl: string) => this.databaseDetailsForm.controls[ctrl].value;

    return {
      id: this.editAccount ? this.editAccount.id : null,
      name: fromBasicForm('accountNameCtrl'),
      creation_date: this.editAccount ? this.editAccount.creation_date : new Date().toISOString(),
      modify_date: this.editAccount ? this.editAccount.modify_date : new Date().toISOString(),
      server: {
        server_type: fromBasicForm('databaseServerCtrl'),
        hostname: fromDBForm('dbHostCtrl'),
        port: fromDBForm('dbPortCtrl'),
        username: fromDBForm('dbUsernameCtrl'),
        password: fromDBForm('dbPasswordCtrl'),
        database: fromDBForm('dbDbCtrl')
      },
      ssh: {
        enabled: fromTunnelForm('isTunnelEnabledCtrl'),
        hostname: fromTunnelForm('sshHostCtrl'),
        port: fromTunnelForm('sshPortCtrl'),
        username: fromTunnelForm('sshUsernameCtrl'),
        password: fromTunnelForm('sshPasswordCtrl')
      }
    }
  }

  async testConnection() {
    this.testLog = [];
    const res:IIPCCheckConnectionResponseMessage = await this.accountsIPCService.checkConnection(this.formAsAccount());
    this.isSaveEnabled = (this.formAsAccount().ssh.enabled) ? (res.ssh.valid && res.server.valid) : res.server.valid;
    if (this.formAsAccount().ssh.enabled) {
      if (res.ssh.valid) {
        this.testLog.push([`success`, `[OK] SSH`])
      } else {
        this.testLog.push([`danger`, `[FAIL] SSH, error: ${res.ssh.error}`]);
      }
      if (res.server.valid) {
        this.testLog.push([`success`, `[OK] DATABASE`])
      } else {
        this.testLog.push([`danger`, `[FAIL] DATABASE,  error: ${res.server.error}`]);
      }
    }
  }
  
  save() {
    this.ref.close(this.formAsAccount());
  }
}
