// declare module for package 'rcon'
// a class with 3 string as contructor as default export
declare module "modern-rcon" {
  export default class Rcon {
    constructor(ip: string, port: string, password: string);
    on(event: string, callback: (res: any) => void): Rcon;
    send(command: string): void;
    connect(): Promise<void>;
    disconnect(): Promise<void>;
  }
}
