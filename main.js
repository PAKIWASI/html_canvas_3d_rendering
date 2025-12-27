

/*
consider an imaginary 3d space behind your 2d screen
if (x, y, z) is a point in the 3d space, then to project it to your 2d screen
x' = x / z;
y' = y / z;
(x', y') is the 2d position on the screen. (the projected point) 

so we can do stuff in the 3d space like moving stuff around and rotating stuff
then we can display that on the screen using the above formula
*/


// if id is valid js var name, they act like global vars
const canvas = game;
console.log(game);

game.width = 1250;
game.height = 700;

// get the 2d context of the element "game" 
// the thing onto which drawing is rendered
const ctx = canvas.getContext("2d");
console.log(ctx);


const bg = "#101010";
const fg = "#50FF50";


// to clear the screen
const clear = () => {
    ctx.fillStyle = bg;
    ctx.fillRect(0, 0, game.width, game.height);
}

// we take point obj {x, y}
// for placing points on the screen
// expects coords in canvas system
const point = ({x, y}) => {
    const s = 15;     // point size
    ctx.fillStyle = fg;
    ctx.fillRect(x - s / 2, y - s / 2, s, s);
}


// make a line between 2 2d points
const line = (p1, p2) => {

}


/*
the formula assumes that the the middle of your screen is the (0, 0) point (the origin)
but in html canvas, the top left corner is (0, 0) and mid is (width/2, height/2)

so we need a function to convert from the (0, 0) coord system of the 2d projection (range [-1,1])
to the canvas coord system (w/2, h/2) 

also, y cord in canvas goes down on increaing values and vice versa
but in our system, y should go up when we increase value and vice versa
so we need to flip y cord when projecting to canvas
*/



// function to convert [-1, 1] (0, 0) => [0, w] & [0, h] (w/2, h/2)
// expects coords in formula system
// passed onj to point func
const screen = ({x, y}) => {
    // [-1, 1] => add 1 => [0, 2] => div by 2 => [0, 1]
    // xply by width/height => [0, w] & [0, h]
    
        // the nomalized coods (to pass to canvas)
    return { 
        x: ((x + 1) / 2) * game.width,
        // pos up and neg down (formula) => neg up pos down (canvas)
        y: (1 - (y + 1) / 2) * game.height,
    }
}



// takes a 3d point p3{x, y, z}
// applies formula on it
// passed obj to screen func
const project = ({x, y, z}) => {
    return {
        x: x / z,
        y: y / z,
    }
}

/*
formula assumes that your eye is located at 0 of z axis
z axis goes right throght the middle of the screen w/2, h/2


x/y             screen
|                   |
|                   |
0-------------------|--------------------> z axis
eye                 |
                    |

z = 0 means the obj is exactly in your eye (no where to project)
so we need to put z behind the screen so we can see it projected
so we set z = 0 to put it behind the screen
*/


const vertices = [

    // a plane of 4 points
    // points in from of eye at z = 0.25
    {x:  0.25, y:  0.25, z: 0.25},
    {x: -0.25, y:  0.25, z: 0.25},
    {x:  0.25, y: -0.25, z: 0.25},
    {x: -0.25, y: -0.25, z: 0.25},

    // points behind us at z = 0.25
    {x:  0.25, y:  0.25, z: -0.25},
    {x: -0.25, y:  0.25, z: -0.25},
    {x:  0.25, y: -0.25, z: -0.25},
    {x: -0.25, y: -0.25, z: -0.25},

    // now we have a cube (we are standing at the centre of the cube)
    // then cube starts to move away from us
];


// increase z offset by dz
const translate_z = ({x, y, z}, dz) => {
    return {
        x,
        y, 
        z: z + dz,
    }
}

// rotate around y axis
// we rotate x and z point using 2d rotation matrix
// we input x, z and an angle
// we get x', z' which are coords of rotated x,z by angle
const rotate_xz = ({x, y, z}, angle) => {
    const c = Math.cos(angle);
    const s = Math.sin(angle);
    
    return {
        x: x * c - z * s,
        y,
        z: x * s + z * c,
    }
}


const FPS = 60;
// delta time : amount of time between curr frame and previous frame in the loop
// this makes movement FPS independent
const dt = 1/FPS; // 1 second / no of frames per second

// by increasing z, we move the points away from the eye
// and more into the screen
let dz = 1; // z offset

let angle = 0; // angle offset


const frame = () => {

// sync offset with timing
//dz += 1 * dt;
angle += Math.PI * dt; // half rev per second

clear();
for (const v of vertices) {
    point(screen(project(translate_z(rotate_xz(v, angle), dz))));
    } 

    setTimeout(frame, 1000/FPS);
}

frame();


