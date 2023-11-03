import {
    LightningElement
} from 'lwc';
import msal_lib from '@salesforce/resourceUrl/MSAL';
import {
    loadScript
} from 'lightning/platformResourceLoader';
export default class MSAL_Auth extends LightningElement {
    renderedCallback() {
        loadScript(this, msal_lib)
            .then(() => {
                console.log('MSAL Library Loaded');
            })
            .catch(error => {
                console.log('MSAL Failed to load library: ' + error);
            })
    }
    doAuth() {
        const msalConfig = {
            auth: {
                clientId: '101541ca-a50e-4fe0-a173-f69b87d3b3c7',
                authority: 'https://login.microsoftonline.com/32ab3551-1a8f-44bb-810a-f184227e3447',
            }
        };
        const loginRequest = {
            scopes: ["Device.Read.All"],
            prompt: "select_account"
        };
        const myMSALObj = new msal.PublicClientApplication(msalConfig);
        myMSALObj.loginPopup(loginRequest)
            .then(result => {
                console.log('Profile Name => ' + result.account.name);
                console.log('Access Token => ' + result.accessToken);
            })
            .catch(error => {
                console.log('error: ' + JSON.stringify(error));
            });
    }
}