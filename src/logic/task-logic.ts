import { Task, Promise, TaskScheduler } from '../rostasks/scheduling';
import { tts } from '../api/tts-api';

export function tasksInit(taskscheduler: TaskScheduler) {
    let helloworld = new Task({
        identifier: "idsfuofhsrg",
        name: "Hello World",
        description: "Says hello world",
        code: function () {
            return new Promise(function (resolve, reject) {
                tts("Hello World!", function () {
                    resolve({});
                });
            });
        },
        successCallback: function () { },
        failureCallback: function () { },
        persistent: false,
        resources: [{ name: "speakers" }]
    });
    //taskscheduler.lists[0].addTask(helloworld);
}