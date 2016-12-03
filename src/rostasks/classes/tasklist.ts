import { Task } from './task';

export class TaskList {
    // a list of tasks

    constructor(priority: string) {
        this.priority = priority;
    }

    private _priority: string = "medium"; // high, medium, low
    get priority(): string {
        return this._priority;
    }
    set priority(setPriority: string) {
        if (["high", "medium", "low"].indexOf(setPriority) === -1) {
            console.error("Invalid priority. It should be 'high', 'medium', or 'low'. You set it as " + setPriority);
        } else {
            this._priority = setPriority;
        }
    }

    private _tasks: Task[] = [];
    get tasks(): Task[] {
        return this._tasks;
    }
    set tasks(tasks: Task[]) {
        console.warn("Setting tasks is dangerous. Add or remove them using the add / remove functions instead");
        this._tasks = tasks;
    }

    addTask(task: Task) {
        this._tasks.push(task);
    }

    removeTask(identifier: string) {
        for (let task of this.tasks) {
            if (task.identifier === identifier) {
                let index = this.tasks.indexOf(task);
                if (index > -1) {
                    this._tasks.splice(index);
                    return;
                }
            }
        }
        //failure - does not exist
        console.error("Task does not exist");
    }

    getTaskIndex(identifier: string) {
        for (let task of this.tasks) {
            if (task.identifier === identifier) {
                let index = this.tasks.indexOf(task);
                return index;
            }
        }
        //failure - does not exist
        console.error("Task does not exist");
    }
    
    moveTask(old_index: number, new_index: number) {
        while (old_index < 0) {
            old_index += this.tasks.length;
        }
        while (new_index < 0) {
            new_index += this.tasks.length;
        }
        this._tasks.splice(new_index, 0, this._tasks.splice(old_index, 1)[0]);
    }

}