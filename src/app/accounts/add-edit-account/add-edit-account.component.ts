import { Component, OnInit } from '@angular/core';
import { NbDialogRef } from '@nebular/theme';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Account } from '../../../shared/interfaces/accounts.interface';
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
    private fb: FormBuilder,
    private accountsIPCService: AccountsIPCService
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

  formAsAccount(): Account {
    const fromBasicForm = (ctrl: string) => this.basicDetailsForm.controls[ctrl].value;
    const fromTunnelForm = (ctrl: string) => this.tunnelDetailsForm.controls[ctrl].value;
    const fromDBForm = (ctrl: string) => this.databaseDetailsForm.controls[ctrl].value;

    return {
      id: this.editAccount.id || null,
      name: fromBasicForm('accountNameCtrl'),
      creation_date: this.editAccount.creation_date || new Date().toISOString(),
      modify_date: this.editAccount.modify_date || new Date().toISOString(),
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
    console.log("testConnection")
    const res:IIPCCheckConnectionResponseMessage = await this.accountsIPCService.checkConnection(this.formAsAccount());
    console.log("res", res);
    this.isSaveEnabled = res.ssh.valid;
    console.log("testConnection res: ", res);
  }
  
  save() {
    this.ref.close(this.formAsAccount());
  }
}
