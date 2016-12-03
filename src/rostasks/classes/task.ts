import { TaskArguments, Resource } from './interfaces';
import Promise from "ts-promise";

export class Task {
    readonly identifier: string; // not necessarily human readable
    name: string; // a human readable name for the Task
    description: string; // description
    persistent: Boolean = false; // whether it should remain in the list, but be pushed to the back
    resources: Resource[] = []; // what resources it needs to run

    code: () => Promise<Object>; // actual task

    successCallback: (data: Object) => void = function (data) { };
    failureCallback: (err: Error) => void = function (data) { };

    constructor(args: TaskArguments) {
        this.identifier = args.identifier;
        this.name = args.name;
        this.description = args.description;
        this.code = args.code;
        this.successCallback = args.successCallback;
        this.failureCallback = args.failureCallback;
        this.persistent = args.persistent || false;
        this.resources = args.resources;
    }

    
}