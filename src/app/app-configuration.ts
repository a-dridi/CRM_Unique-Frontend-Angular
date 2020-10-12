/**
 * Configuration of this app. API URL and API settings. 
 */

export class AppConfiguration {

    public locale: string = "en-US";
    public apiPort: string = "";
    public apiProtocol: string;
    public apiHostName: string;
    public apiBasePath: string;

    constructor() {
        if (this.apiBasePath === undefined || this.apiBasePath === "") {
            this.apiBasePath = this.apiProtocol + "//" + this.apiHostName + ":" + this.apiPort + "/"; 
        }
    }

}