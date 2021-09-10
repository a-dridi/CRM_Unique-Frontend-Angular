/*
Saves the API access settings
*/
export class ApiConfig {

    //Add no tailing or leading slashes
    private server = "https://crm.ardmail.net";
    private baseBackendApplicationUri="crmbackend";
    private baseApiUri = "data";

    get apiUrl(): string {
        return this.server + "/" +this.baseBackendApplicationUri + "/" + this.baseApiUri;
    }
}