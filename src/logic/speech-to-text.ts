import { STT } from '../api/stt-api';
import { tts } from '../api/tts-api';
import { Task, Promise } from '../rostasks/scheduling';
import { NewsSpeaker } from './say-news';

var uuid = require('uuid');

let news = new NewsSpeaker();

export function getIntent(socket: any, taskscheduler: any, data: string) {
    //console.log("getting intent (getIntent)");
    STT.intent(data, function (data: STT.SpeechResponse) {
        //console.log(data);
        switch (data.result.action) {
            case "getThing":
                // user has asked for an object - e.g. brownie
                let getTask = new Task({
                    name: "get Object",
                    identifier: uuid.v4(),
                    description: "Get an object",
                    code: function () {
                        return new Promise(function (resolve, reject) {
                            tts("I'm sorry, that's not supported at the moment", function () {
                                // task completed
                                reject(new Error("Unsupported action"));
                            });
                        });
                    },
                    successCallback() {
                        //
                    },
                    failureCallback() {
                        //
                    },
                    resources: [{ name: "speakers" }]
                });
                taskscheduler.lists[0].addTask(getTask);

                break;

            case "getNews":
                // say the news
                var code;
                let sort = data.result.parameters.sort;
                let source = data.result.parameters.source;
                if (source === "") {
                    code = new Promise(function (resolve, reject) {
                        news.sayNews(function () {
                            // it completed
                            resolve({});
                        });
                    });
                } else {
                    if (sort.charAt(sort.length - 1) === 's') {
                        code = new Promise(function (resolve, reject) {
                            news.sayNewArticles(sort, source, function () {
                                // task completed
                                resolve({});
                            });
                        });
                    } else {
                        code = new Promise(function (resolve, reject) {
                            news.sayArticle(sort, source, function () {
                                // task completed
                                resolve({});
                            });
                        });
                    }

                }
                let task = new Task({
                    identifier: uuid.v4(),
                    name: "get the news",
                    description: "I will read out the news from whatever source you select",
                    code: function () { return code; },
                    successCallback: function () {
                        // all done here - no need to alert the user or anything    
                    },
                    failureCallback: function () {
                        // logging of errors is automatic, but it's still worthh telling the user
                        tts("I'm sorry, something didn't work. Please check the console logs for more information", function () {
                            // if it breaks at this point, oh dear
                        });
                    },
                    persistent: false,
                    resources: [{ name: "speakers" }]
                });
                taskscheduler.lists[0].addTask(task);

                break;

            case "move":
                // go to a location
                // user has asked for an object - e.g. brownie
                let moveTask = new Task({
                    name: "get Object",
                    identifier: uuid.v4(),
                    description: "Go to a location",
                    code: function () {
                        return new Promise(function (resolve, reject) {
                            tts("I'm sorry, that's not supported at the moment", function () {
                                // task completed
                                reject(new Error("Unsupported action"));
                            });
                        });
                    },
                    successCallback() {
                        //
                    },
                    failureCallback() {
                        //
                    },
                    resources: [{ name: "speakers" }]
                });
                taskscheduler.lists[0].addTask(moveTask);
                break;

            case "getForecast":
                /**
                 * there are 3 possible search queries:
                 * date, location and query type, all of which are optional.
                 * e.g. - if date and location are omitted then now and current location are used.
                 * query types ask questions like is it going to rain or snow.     
                 */
                let date, location, querytype;
                if (data.result.parameters.date !== ""){
                    date = new Date(data.result.parameters.date);
                }
                if (data.result.parameters.geocity !== ""){
                    
                }

            default:
                tts(data.result.fulfillment.speech, function () {
                    // task completed
                });
                break;
        }

    }, function (err: Error) {

        console.error(err);


    });
}
export function speechToTextLogic(socket: any, taskscheduler: any) {
    socket.on('connection', function (socket) {
        socket.on('speech', function (data: string) {
            getIntent(socket, taskscheduler, data);
            //console.log(data);
            //console.info("Recieved speech");
        });
        console.info("Listening for speech commands");
    });
}
