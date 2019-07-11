import { Server, AddressInfo } from "net";
import * as TunnelSSH from 'tunnel-ssh';
import * as getPort from 'get-port';

export class TunnelService {
    
    private tunnel: Server;
    private config: any;

    constructor(
        hostname: string,
        username: string,
        password: string,
        sshPort: number,
        dstHostname: string,
        dstPort: number
    ) {
        this.config = {
            'username': username,
            'password': password,
            'host': hostname,
            'port': sshPort,
            'dstHost': dstHostname,
            'dstPort': dstPort,
            'localHost':'127.0.0.1'
        };
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