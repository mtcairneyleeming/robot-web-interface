import { Arm } from '../api/ik-api';
import { serial } from '../api/arm-api';
import { config } from '../config';

let arm = new Arm();

// defined as following
// x - take the vertical plane. x is thus the extension of the arm
// y - as above
// theta - the base angle - a deviaton from the centre 
export function goTo(x, y, theta, claw) {
    // x & y in vertical plane
    let angles = arm.ik(x, y);
    let shoulder = arm.deg(angles.a1);
    let elbow = 180 - (270 - shoulder - arm.deg(angles.a2));//arm.deg(angles.a2) + shoulder + 180;// a90-(270-shoulder -arm.deg(angles.a2));
    let base = theta;
    serial.writeServos(base, shoulder, elbow, claw);
}

export function armRun() {
    serial.port.on('open', function() {
        handwrite("MAX");
    });
}
export function handwrite(rawText: string) {
    // writes in a circle - modifies theta to draw x on the flat plane, and x to draw y on the flat plane.
    // y is modified to raise/lift the pen. The gripper should not change.
    // reads letter data from config file in the following structure
    /*
        letter * 26
        -- instructions for each point
        ---- 3 values - the x & y values to add to the letter origin, and a 1 or 0 signifying whether this point should be reached with the pen up or not: 1 = up, 0 = down
        */
    let text = rawText.toLowerCase();
    let num = text.length; // length of string to writes
    // writes letters in 20 deg (40/2) sections - thus 180 / 20 = 9 letters per (curved) line
    for (var i = 0; i < num; i++) {
        writeLetter(text[i], i * 20, 120); // pass the letter, the x coord (on horizontal plane), and the y coord for the origin of the letter
    }
}
export function writeLetter(letter: string, theta: number, x: number) {
    var pattern = config.letterMappings[letter.charCodeAt(0) - 97];
    for (let point of pattern) {
        let yVal;
        if (point[3] === 1) {
            yVal = 60;
        } else {
            yVal = 30;
        }
        goTo(x + point[1], yVal, 180-(theta + point[0]/2), 45);
    }
}
