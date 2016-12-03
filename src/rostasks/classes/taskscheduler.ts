import { TaskList } from './tasklist';
import { Task } from "./task";

export class TaskScheduler {
    lists: TaskList[] = [new TaskList("high"), new TaskList("medium"), new TaskList("medium")];
    foreground: Task | undefined;
    background: Task | undefined;
    runTasks() {
        // iterate over lists
        for (let list of this.lists) {
            // run first task ---------------------------------
            if (this.foreground === undefined) {
                if (list.tasks.length > 0) {
                    this.foreground = list.tasks[0];
                    this.run(this.foreground, false);
                    if (list.tasks[0].persistent === true) {
                        list.moveTask(0, (list.tasks.length - 1));
                    } else {
                        list.removeTask(list.tasks[0].identifier);
                    }
                }
            }
            // run background task, if possible ---------------
            // iterate through tasks, checking if there are resource collisions
            if (this.background === undefined) {
                var collision;
                // if there are still any tasks to carry out
                if (list.tasks.length > 0) {
                    for (let i = 1; i < list.tasks.length; i++) {
                        // simplicity
                        let task = list.tasks[i];
                        for (let resource of task.resources) {
                            // iterate through resources, checking if each collides
                            if (!(this.foreground.resources.indexOf(resource) === -1)) {
                                // failure - collision - break loop
                                collision = true;
                                break;
                            }
                        }
                        // no collisions
                        if (!collision) {
                            this.background = task;
                            this.run(this.background, true);
                            if (list.tasks[0].persistent === true) {
                                list.moveTask(0, (list.tasks.length - 1));
                            } else {
                                list.removeTask(list.tasks[0].identifier);
                            }
                            break;
                        }
                    }

                }
            }
        }
    }
    run(task: Task, background: Boolean) {
        var that = this;
        task.code().then(function (result) {
            console.info(task.name + " succeeded with no errors");
            if (background) {
                that.background = undefined;
            } else {
                that.foreground = undefined;
            }
            task.successCallback(result);
        }, function (reason) {
            console.error(reason);
            if (background) {
                that.background = undefined;
            } else {
                that.foreground = undefined;
            }
            task.failureCallback(reason);
        });
    }
}