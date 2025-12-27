

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

game.width = 800;
game.height = 600;
const s = 15;     // point size

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
const point = (p) => {
    ctx.fillStyle = fg;
    ctx.fillRect(p.x, p.y, s, s);
}



/*
the formula assumes that the the middle of your screen is the (0, 0) point (the origin)
but in html canvas, the top left corner is (0, 0) and mid is (width/2, height/2)

so we need a function to convert from the (0, 0) coord system of the 2d projection (range [-1,1])
to the canvas coord system (w/2, h/2) 
*/



// function to convert [-1, 1] (0, 0) => [0, w] & [0, h] (w/2, h/2)
// expects coords in formula system
const screen = (p) => {
    // [-1, 1] => add 1 => [0, 2] => div by 2 => [0, 1]
    // xply by width/height => [0, w] & [0, h]
    return {
        x: (p.x + 1) / 2 * game.width,
        y: (p.y + 1) / 2 * game.height,
    }
}



