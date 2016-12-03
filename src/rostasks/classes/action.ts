import { ActionResult } from './interfaces';
import Promise from "ts-promise";

export function MoveBaseActionTask(ROSLIB: any, ros: any, serverName: string, actionName: string, goalMessage: Object) {
    return new Promise(function (resolve, reject) {
        var client = new ROSLIB.ActionClient({
            ros: ros,
            serverName: serverName,
            actionName: actionName
        });
        // Create a goal.
        var goal = new ROSLIB.Goal({
            actionClient: client,
            goalMessage: goalMessage
        });
        // Print out their output into the terminal.
        goal.on('feedback', function (feedback: ActionResult) {
            //console.log(feedback);
        });
        goal.on('result', function (result: ActionResult) {
            if (result.status.status === 3) {
                resolve(result);
            } else {
                let error = new Error(result.status.text);
                reject(error);
            };
        });
        // Send the goal to the action server.
        goal.send();
        //console.log("Sent")
    });
}

export function ActionTask(ROSLIB: any, ros: any, serverName: string, actionName: string, goalMessage: Object) {
    return new Promise(function (resolve, reject) {
        var client = new ROSLIB.ActionClient({
            ros: ros,
            serverName: serverName,
            actionName: actionName
        });
        // Create a goal.
        var goal = new ROSLIB.Goal({
            actionClient: client,
            goalMessage: goalMessage
        });
        // Print out their output into the terminal.
        goal.on('feedback', function (feedback: ActionResult) {
            //console.log(feedback);
        });
        goal.on('result', function (result: Object) {
            // succeeds, as I know of no general way of testing success
            resolve(result);

            // let error = new Error(result.status.text)
            // reject(error)
        });
        // Send the goal to the action server.
        goal.send();
        //console.log("Sent")
    });
}