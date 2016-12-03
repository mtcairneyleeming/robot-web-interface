import Promise from "ts-promise";

export interface TaskArguments {
    identifier: string;
    name: string;
    description: string;
    code: () => Promise<Object>; // true = success, false = failure, object is any information to pass to a callback
    successCallback: (data: Object) => any;
    failureCallback: (data: Object) => any;
    persistent?: Boolean;
    resources: Resource[];
}
// export interface codeReturnValue {
//     data: Object;
//     err?: Error;
// }
export interface ActionResult {
    status: {
        status: number;
        text: string
    };
    feedback: {

    };
    header: {

    };

}
export interface Resource {
    name: "robot" | "pi_camera" | "lidar" | "mearm" | "edge_arm" | "pixy" | "speakers" | "lcd" | "led_strip";
}