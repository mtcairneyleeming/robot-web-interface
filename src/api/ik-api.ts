

var sq = function (num: number) {
    return Math.pow(num, 2);
};


export class Arm {
    constructor(l1?, l2?, l3?) {
        this.l1 = l1 || 80;
        this.l2 = l2 || 80;
        this.l3 = l3 || 68;

    }

    l1;// = 80mm
    l2;// = 80mm
    l3;// = 68mm - the distance between the base pivot and the shoulder pivot plus the distance between the wrist and the gripping point - subtract from x before beginning this logic


    ik = function (gX_raw, gY) {
        var gX = gX_raw - this.l3;
        // theta angle between origin and x, y positions
        var gT = Math.atan2(gY, gX);

        // imaginary line joining origin and x, y ( the line gT is the angle between, with the x-axis)
        var Bsq = sq(gX) + sq(gY);
        var B = Math.sqrt(Bsq);

        // q is the angle between B and l1
        var q = Math.acos((sq(this.l1) + Bsq - sq(this.l2)) / (2 * this.l1 * B));
        // get the angle for the first arm
        var a1 = q + gT;


        // find the second angle
        var a2 = Math.acos((sq(this.l1) + sq(this.l2) - Bsq) / (2 * this.l1 * this.l2));

        return {
            a1: a1,
            a2: a2
        };

    };
    deg = function (num: number) {
        return num / (Math.PI / 180);
    };
}
// var test = ik(l1, l2, l3, gX_raw, gY_raw);
// console.log(test);
// console.log("A2: " + deg(Math.PI-test.a1-test.a2));