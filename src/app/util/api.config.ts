/*
Saves the API access settings
*/
export class ApiConfig {

    //Add no tailing or leading slashes
    private server = "https://crmserver";
    private baseBackendApplicationUri="crmbackend";
    private baseApiUri = "api";

    get apiUrl(): string {
        return this.server + "/" +this.baseBackendApplicationUri + "/" + this.baseApiUri;
    }
}