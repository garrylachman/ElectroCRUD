export interface Account {
    id?: number;
    name: string;
    creation_date: string;
    modify_date: string;
    ssh: AccountSSH;
    server: AccountServer;
}

export interface AccountSSH {
    enabled: boolean;
    hostname?: string;
    port?: number;
    username?: string;
    password?: string;
}

export interface AccountServer {
    server_type: number;
    hostname: string;
    port: number;
    username: string;
    password?: string;
    database: string;
}