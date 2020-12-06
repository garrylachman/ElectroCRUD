import { fluentProvide } from "inversify-binding-decorators";

import { Server, AddressInfo } from "net";
import { Config } from 'tunnel-ssh';
import * as TunnelSSH from 'tunnel-ssh';
import * as openSshTunnel from 'open-ssh-tunnel';
import * as getPort from 'get-port';
import { readFileSync } from 'fs';

const sleep = m => new Promise(r => setTimeout(r, m))

@fluentProvide(TunnelService).inSingletonScope().done()
export class TunnelService {
    
    private tunnel: Server;
    private config: any;

    constructor()  {

    }
    

    public init(
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
            'dstAddr': dstHostname,
            'dstPort': dstPort,
            'localAddr':'127.0.0.1',
            'srcAddr':'127.0.0.1',
            'keepAlive': true,
            'readyTimeout': 5000,
            'forwardTimeout': 2000
        };

        if (useKey) {
            this.config.privateKey = readFileSync(key);
        } else {
            this.config.password = password;
        }

        console.log("this.config", this.config)
    }



    public async start():Promise<any> {
        let localPort = await getPort({port: getPort.makeRange(5000, 30000)});
        this.config.localPort = localPort;

        console.log("public async start():Promise<any>",this.config);

        return new Promise(async (resolve, reject) => {
            console.log("openSshTunnel")
            openSshTunnel(this.config)
                .then(async (server: Server) => {
                    console.log("server: ", server);
                    this.tunnel = server;
                    await sleep(1000);
                    return resolve((server.address() as AddressInfo).port);
                })
                .catch((error) => {
                    console.log("ssh error", error);
                    return reject(error);
                })
            });
    }

    public close(): void {
        if (this.tunnel) {
            this.tunnel.close();
        }
    }

}