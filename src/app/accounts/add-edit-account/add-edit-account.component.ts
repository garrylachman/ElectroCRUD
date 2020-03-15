import { Component, OnInit } from '@angular/core';
import { NbDialogRef } from '@nebular/theme';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IAccount } from '../../../shared/interfaces/accounts.interface';
import { IIPCCheckConnectionResponseMessage } from '../../../shared/ipc/accounts.ipc';
import { AccountsIPCService } from '../../services/ipc/accounts.service';
import { remote } from 'electron';
import { AccountsStoreX, Account } from '../../store/accounts.store';

@Component({
  selector: 'app-add-edit-account',
  templateUrl: './add-edit-account.component.html',
  styleUrls: ['./add-edit-account.component.scss']
})
export class AddEditAccountComponent implements OnInit {

  title: string = "Add new account";
  //accountId: number;
  editAccount: Account;

  isSaveEnabled: boolean = false;
  public testLog: [string, string][];

  basicDetailsForm: FormGroup;
  tunnelDetailsForm: FormGroup;
  databaseDetailsForm: FormGroup;

  databaseServers: any[] = [
    { name: 'MySQL', value: 1, port: 3306 },
    { name: 'Postgres', value: 3, port: 5432 }
  ]

  constructor(
    public ref: NbDialogRef<any>,
    private fb: FormBuilder,
    private accountsIPCService: AccountsIPCService,
    private accountsStore: AccountsStoreX
  ) { 
    this.testLog = [];
  }

  get isEdit(): boolean {
    return this.editAccount.id > 0;
  }

  ngOnInit() {
    console.log(this.ref);
    if (this.ref.componentRef.instance.account) {
      //this.editAccount = this.ref.componentRef.instance.account.id;
      this.editAccount = this.accountsStore.geById(this.ref.componentRef.instance.account)
      //this.accountId = this.editAccount.id;
    } else {
      this.editAccount = new Account();
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
      sshPasswordCtrl: [this.editAccount ? this.editAccount.ssh.password : null, Validators.nullValidator],
      isSSHKeyEnabledCtrl: [this.editAccount ? this.editAccount.ssh.use_key : false, Validators.required],
      sshPrivateKeyCtrl: [this.editAccount ? this.editAccount.ssh.key : null],
    });

    this.databaseDetailsForm = this.fb.group({
      dbHostCtrl: [this.editAccount ? this.editAccount.server.hostname : null, Validators.required],
      dbPortCtrl: [this.editAccount ? this.editAccount.server.port : null, Validators.required],
      dbUsernameCtrl: [this.editAccount ? this.editAccount.server.username : null, Validators.required],
      dbPasswordCtrl: [this.editAccount ? this.editAccount.server.password : null, Validators.nullValidator],
      dbDbCtrl: [this.editAccount ? this.editAccount.server.database : null, Validators.required],
    });

    this.basicDetailsForm.controls.databaseServerCtrl.valueChanges.subscribe((newVal) => {
      this.databaseServers.forEach((dbSrv) => {
        if (dbSrv.value == newVal) {
          this.databaseDetailsForm.controls.dbPortCtrl.setValue(dbSrv.port);
        }
      })
    })
    
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

    this.tunnelDetailsForm.controls.isSSHKeyEnabledCtrl.valueChanges.subscribe((newVal) => {
      let passCtrl = this.tunnelDetailsForm.controls.sshPasswordCtrl;
      let keyCtrl = this.tunnelDetailsForm.controls.sshPrivateKeyCtrl
      if (newVal) {
        passCtrl.disable();
        keyCtrl.enable();
      } else {
        passCtrl.enable();
        keyCtrl.disable();
      }
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

  fillAccountState() {
    const fromBasicForm = (ctrl: string) => this.basicDetailsForm.controls[ctrl].value;
    const fromTunnelForm = (ctrl: string) => this.tunnelDetailsForm.controls[ctrl].value;
    const fromDBForm = (ctrl: string) => this.databaseDetailsForm.controls[ctrl].value;

    this.editAccount.name = fromBasicForm('accountNameCtrl');

    // SERVER
    this.editAccount.server.server_type = fromBasicForm('databaseServerCtrl');
    this.editAccount.server.hostname = fromDBForm('dbHostCtrl');
    this.editAccount.server.port = fromDBForm('dbPortCtrl');
    this.editAccount.server.username = fromDBForm('dbUsernameCtrl');
    this.editAccount.server.password = fromDBForm('dbPasswordCtrl');
    this.editAccount.server.database = fromDBForm('dbDbCtrl');

    // SSH
    this.editAccount.ssh.enabled = fromTunnelForm('isTunnelEnabledCtrl');
    this.editAccount.ssh.hostname = fromTunnelForm('sshHostCtrl');
    this.editAccount.ssh.port = fromTunnelForm('sshPortCtrl');
    this.editAccount.ssh.username = fromTunnelForm('sshUsernameCtrl');
    this.editAccount.ssh.use_key = fromTunnelForm('isSSHKeyEnabledCtrl');
    this.editAccount.ssh.key = fromTunnelForm('sshPrivateKeyCtrl');
  }

  async testConnection() {
    this.fillAccountState();

    this.testLog = [];
    const res:IIPCCheckConnectionResponseMessage = await this.accountsIPCService.checkConnection(this.editAccount);
    this.isSaveEnabled = (this.editAccount.ssh.enabled) ? (res.ssh.valid && res.server.valid) : res.server.valid;
    if (this.editAccount.ssh.enabled) {
      if (res.ssh.valid) {
        this.testLog.push([`success`, `[OK] SSH`])
      } else {
        this.testLog.push([`danger`, `[FAIL] SSH, error: ${res.ssh.error}`]);
      }
    }
    if (res.server.valid) {
      this.testLog.push([`success`, `[OK] DATABASE`])
    } else {
      this.testLog.push([`danger`, `[FAIL] DATABASE,  error: ${res.server.error}`]);
    }
  }

  openElectronFileDialog() {
    let fileRes:any = remote.dialog.showOpenDialogSync({
      properties: ['openFile', 'showHiddenFiles']
    });

    if (fileRes && fileRes[0]) {
      this.tunnelDetailsForm.controls.sshPrivateKeyCtrl.setValue(fileRes[0]);
    }
    console.log(fileRes);
  }
  
  save() {
    //this.ref.close(this.formAsAccount());
    this.fillAccountState();
    this.accountsStore.updateOrAddAccount(this.editAccount);
    this.ref.close();
  }
}
