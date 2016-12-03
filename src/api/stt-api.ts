var ai = require("apiai");
var uuid = require('uuid');
import { config } from '../config';

var apiai = ai(config.apiai.token);

export namespace STT {
    export var intent = function (text: string, successCallback: (Object) => any, errorCallback: (Error?) => any) {
        //console.log("Getting intent from api.ai");
        var request = apiai.textRequest(text, {
            sessionId: uuid.v4()
        });

        request.on('response', function (response) {
            //console.log(response);
            successCallback(response);
        });

        request.on('error', function (error) {
            //console.error(error);
            errorCallback(error);
        });
        request.end();
    };
    export interface SpeechResponse {

        "id": string;
        "timestamp": Date;
        "result": {
            "source": "agent",
            "resolvedQuery": string,
            "action": string,
            "actionIncomplete": Boolean,
            "parameters": {
                source?: string,
                sort?: string,
                location?: string,
                priority?: string,
                thing?: string,
                date?: string, 
                search?: string,
                geocity?: string,
                place?: string
            },
            "contexts": Array<String>,
            "metadata": {
                "intentId": string,
                "webhookUsed": Boolean,
                "intentName": string
            },
            "fulfillment": {
                "speech": string,
                "messages": [
                    {
                        "type": number,
                        "speech": string
                    }
                ]
            },
            "score": number
        };
        "status": {
            "code": number,
            "errorType": string
        };
        "sessionId": string;

    }
}