import { Server, AddressInfo } from "net";
import { Config } from 'tunnel-ssh';
import * as TunnelSSH from 'tunnel-ssh';
import * as getPort from 'get-port';

export class TunnelService {
    
    private tunnel: Server;
    private config: Config;

    constructor(
        hostname: string,
        username: string,
        sshPort: number,
        dstHostname: string,
        dstPort: number,
        useKey: boolean,
        password?: string,
        key?: string
    ) {
        this.config = {
            'username': username,
            'host': hostname,
            'port': sshPort,
            'dstHost': dstHostname,
            'dstPort': dstPort,
            'localHost':'127.0.0.1'
        };

        if (useKey) {
            this.config.privateKey = key;
        } else {
            this.config.password = password;
        }

        console.log("this.config", this.config)
    }

    public async start():Promise<any> {
        let localPort = await getPort({port: getPort.makeRange(3000, 30000)});
        this.config.localPort = localPort;

        return new Promise((resolve, reject) => {
            this.tunnel = TunnelSSH(this.config, (error: Error, server: Server) => {
                console.log("error: ", error);
                console.log("server: ", server);
                if (error) {
                    return reject(error)
                }
                return resolve((server.address() as AddressInfo).port);
            });
        });
    }

    public close(): void {
        this.tunnel.close();
    }

}