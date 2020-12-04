import "reflect-metadata";
import { fluentProvide } from "inversify-binding-decorators";

import { 
    IPCCheckConnection,
    IPCConnect
} from '../../shared/ipc/accounts.ipc';

import { ipcMain } from 'electron-better-ipc';
import { JsonValue } from 'type-fest';
import { TunnelService } from '../services/tunnel.service';
import { DatabaseService, serverTypeIdAsEnum } from '../services/db.service';

@fluentProvide(AccountsIPC).inSingletonScope().done()
export class AccountsIPC {

    private _tunnel:TunnelService;
    private _database: DatabaseService;

    constructor(
        database: DatabaseService,
        tunnel:TunnelService
    ) {
        this._database = database;
        this._tunnel = tunnel;
    }

    public listen() {
        ipcMain.handle(IPCCheckConnection.CHANNEL, async (event, req: JsonValue) => this.checkConnection(req));
        ipcMain.handle(IPCConnect.CHANNEL, async (event, req: JsonValue) => this.connect(req));
    }

    public async connect(req: JsonValue): Promise<JsonValue> {
        let reqMessage: IPCConnect.Request = new IPCConnect.Request(req);

        let isDatabaseValid: boolean | Error;
        let databaseError: string;
        let isTunnelValid: boolean;
        let tunnelError: string;

        let isSQLite = (reqMessage.toMessage().server.filename && 
            reqMessage.toMessage().server.filename.length > 0)

        let databaseHostname: string = reqMessage.toMessage().server.hostname;
        let databasePort: number = reqMessage.toMessage().server.port;
        
        if (!isSQLite && reqMessage.toMessage().ssh.enabled) {
            try {
                if (this._tunnel != null) {
                    this._tunnel.close();
                }
            } catch(error) {
                console.log("close error: ", error)
            }

            this._tunnel.init(
                reqMessage.toMessage().ssh.hostname,
                reqMessage.toMessage().ssh.username,
                reqMessage.toMessage().ssh.port,
                reqMessage.toMessage().server.hostname,
                reqMessage.toMessage().server.port,
                reqMessage.toMessage().ssh.use_key,
                reqMessage.toMessage().ssh.password,
                reqMessage.toMessage().ssh.key
            );

            databaseHostname = reqMessage.toMessage().ssh.hostname;

            try {
                let tunnelRes:any = await this._tunnel.start();
                console.log("tunnelRes", tunnelRes);
                isTunnelValid = true;
                databasePort = tunnelRes;
            } catch (error) {
                console.log("tunnel error", error);
                isTunnelValid = false;
                tunnelError = error.toString();
            }
        } else {
            isTunnelValid = true;
        }

        console.log("isTunnelValid", isTunnelValid)

        if (isTunnelValid) {
            if (isSQLite) {
                await this._database.connectSQLite(
                    reqMessage.toMessage().server.filename
                );
            } else {
                await this._database.connect(
                    serverTypeIdAsEnum(reqMessage.toMessage().server.server_type),
                    databaseHostname,
                    databasePort,
                    reqMessage.toMessage().server.username,
                    reqMessage.toMessage().server.password,
                    reqMessage.toMessage().server.database
                );
            }
    
            isDatabaseValid = await this._database.heartbeat();
            if (isDatabaseValid instanceof Error) {
                databaseError = isDatabaseValid.toString();
                isDatabaseValid = false;
            }
        }
        
        let resMessage: IPCConnect.Response = new IPCConnect.Response({
            valid: Boolean(isDatabaseValid),
            error: String(`${tunnelError||''} ${databaseError||''}`)
        });
        
        console.log("resMessage", resMessage.toMessage());
        return Promise.resolve(resMessage.toJsonValue());
    }

    public async checkConnection(req: JsonValue): Promise<JsonValue> {
        let reqMessage: IPCCheckConnection.Request = new IPCCheckConnection.Request(req);

        let isDatabaseValid: boolean | Error;
        let databaseError: string;
        let isTunnelValid: boolean;
        let tunnelError: string;

        let isSQLite = (reqMessage.toMessage().server.filename && 
            reqMessage.toMessage().server.filename.length > 0)
        
        let databaseHostname: string = reqMessage.toMessage().server.hostname;
        let databasePort: number = reqMessage.toMessage().server.port;
        
        if (!isSQLite && reqMessage.toMessage().ssh.enabled) {
            try {
                if (this._tunnel != null) {
                    this._tunnel.close();
                }
            } catch(error) {
                console.log("close error: ", error)
            }

            this._tunnel.init(
                reqMessage.toMessage().ssh.hostname,
                reqMessage.toMessage().ssh.username,
                reqMessage.toMessage().ssh.port,
                reqMessage.toMessage().server.hostname,
                reqMessage.toMessage().server.port,
                reqMessage.toMessage().ssh.use_key,
                reqMessage.toMessage().ssh.password,
                reqMessage.toMessage().ssh.key
            );

            databaseHostname = reqMessage.toMessage().ssh.hostname;

            console.log("databaseHostname", databaseHostname);
            console.log("databasePort", databasePort);

            try {
                let tunnelRes:any = await this._tunnel.start();
                console.log("tunnelRes", tunnelRes);
                isTunnelValid = true;
                databasePort = tunnelRes;
            } catch (error) {
                console.log(error);
                isTunnelValid = false;
                tunnelError = error.toString();
            }
        }

        if (isSQLite) {
            await this._database.connectSQLite(
                reqMessage.toMessage().server.filename
            );
        } else {
            await this._database.connect(
                serverTypeIdAsEnum(reqMessage.toMessage().server.server_type),
                databaseHostname,
                databasePort,
                reqMessage.toMessage().server.username,
                reqMessage.toMessage().server.password,
                reqMessage.toMessage().server.database
            );
        }

        isDatabaseValid = await this._database.heartbeat();
        if (isDatabaseValid instanceof Error) {
            databaseError = isDatabaseValid.toString();
            isDatabaseValid = false;
        }
        await this._database.disconnect();

        let resMessage: IPCCheckConnection.Response = new IPCCheckConnection.Response({
            server: {
                valid: isDatabaseValid,
                error: databaseError 
            },
            ssh: {
                valid: isTunnelValid,
                error: tunnelError
            }
        });
        
        console.log("resMessage", resMessage.toMessage());
        return Promise.resolve(resMessage.toJsonValue());
    }

}