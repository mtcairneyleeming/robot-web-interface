import { TaskScheduler } from '../rostasks/scheduling';


export function taskInit(){
    var taskscheduler = new TaskScheduler();
    setInterval(function(){
        taskscheduler.runTasks();
    }, 500);
    return taskscheduler;
}