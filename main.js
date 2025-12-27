

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
const point = (p2) => {
    const s = 15;     // point size
    ctx.fillStyle = fg;
    ctx.fillRect(p2.x - s / 2, p2.y - s / 2, s, s);
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
const screen = (p2) => {
    // [-1, 1] => add 1 => [0, 2] => div by 2 => [0, 1]
    // xply by width/height => [0, w] & [0, h]
    
        // the nomalized coods (to pass to canvas)
    return { 
        x: ((p2.x + 1) / 2) * game.width,
        // pos up and neg down (formula) => neg up pos down (canvas)
        y: (1 - (p2.y + 1) / 2) * game.height,
    }
}



// takes a 3d point p3{x, y, z}
// applies formula on it
// passed obj to screen func
const project = (p3) => {
    return {
        x: p3.x/p3.z,
        y: p3.y/p3.z,
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

clear();
point(screen(project({x: 0.1, y: 0.3, z: 1})));

