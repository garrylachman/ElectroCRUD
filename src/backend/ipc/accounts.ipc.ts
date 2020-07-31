import { 
    IPC_CHANNEL_CHECK_CONNECTION, 
    IPCCheckConnectionRequestMessage, 
    IPCCheckConnectionResponseMessage,
    IPC_CHANNEL_CONNECT,
    IPCConnectRequestMessage,
    IPCConnectResponseMessage,
    IIPCConnectResponseMessage
} from '../../shared/ipc/accounts.ipc';

import { ipcMain } from 'electron-better-ipc';
import { JsonValue } from 'type-fest';
import { TunnelService } from '../services/tunnel.service';
import { DatabaseService, serverTypeIdAsEnum } from '../services/db.service';

export class AccountsIPC {

    private tunnel:TunnelService;

    constructor() {}
    
    public listen() {
        ipcMain.answerRenderer(IPC_CHANNEL_CHECK_CONNECTION, (req: JsonValue) => this.checkConnection(req));
        ipcMain.answerRenderer(IPC_CHANNEL_CONNECT, (req: JsonValue) => this.connect(req));
    }

    public async connect(req: JsonValue): Promise<JsonValue> {
        let reqMessage: IPCConnectRequestMessage = new IPCConnectRequestMessage(req);

        let isDatabaseValid: boolean | Error;
        let databaseError: string;
        let isTunnelValid: boolean;
        let tunnelError: string;

        let databaseHostname: string = reqMessage.toMessage().server.hostname;
        let databasePort: number = reqMessage.toMessage().server.port;
        
        if (reqMessage.toMessage().ssh.enabled) {
            try {
                if (this.tunnel != null) {
                    this.tunnel.close();
                }
            } catch(error) {
                console.log("close error: ", error)
            }

            this.tunnel = new TunnelService(
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
                let tunnelRes:any = await this.tunnel.start();
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
            await DatabaseService.getInstance().connect(
                serverTypeIdAsEnum(reqMessage.toMessage().server.server_type),
                databaseHostname,
                databasePort,
                reqMessage.toMessage().server.username,
                reqMessage.toMessage().server.password,
                reqMessage.toMessage().server.database
            );
    
            isDatabaseValid = await DatabaseService.getInstance().heartbeat();
            if (isDatabaseValid instanceof Error) {
                databaseError = isDatabaseValid.toString();
                isDatabaseValid = false;
            }
        }
        
        let resMessage: IPCConnectResponseMessage = new IPCConnectResponseMessage({
            valid: Boolean(isDatabaseValid),
            error: String(`${tunnelError||''} ${databaseError||''}`)
        });
        
        console.log("resMessage", resMessage.toMessage());
        return Promise.resolve(resMessage.toJsonValue());
    }

    public async checkConnection(req: JsonValue): Promise<JsonValue> {
        let reqMessage: IPCCheckConnectionRequestMessage = new IPCCheckConnectionRequestMessage(req);

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
                if (this.tunnel != null) {
                    this.tunnel.close();
                }
            } catch(error) {
                console.log("close error: ", error)
            }

            this.tunnel = new TunnelService(
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
                let tunnelRes:any = await this.tunnel.start();
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
            await DatabaseService.getInstance().connectSQLite(
                reqMessage.toMessage().server.filename
            );
        } else {
            await DatabaseService.getInstance().connect(
                serverTypeIdAsEnum(reqMessage.toMessage().server.server_type),
                databaseHostname,
                databasePort,
                reqMessage.toMessage().server.username,
                reqMessage.toMessage().server.password,
                reqMessage.toMessage().server.database
            );
        }

        isDatabaseValid = await DatabaseService.getInstance().heartbeat();
        if (isDatabaseValid instanceof Error) {
            databaseError = isDatabaseValid.toString();
            isDatabaseValid = false;
        }
        await DatabaseService.getInstance().disconnect();

        let resMessage: IPCCheckConnectionResponseMessage = new IPCCheckConnectionResponseMessage({
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