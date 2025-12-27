// cornor points of a cube 
const vertices = [

    // a plane of 4 points
    // points in front of eye at z
    {x:  0.15, y:  0.25, z: 0.15},
    {x: -0.15, y:  0.25, z: 0.15},
    {x: -0.15, y: -0.25, z: 0.15},
    {x:  0.15, y: -0.25, z: 0.15},

    // points behind us at -z
    {x:  0.15, y:  0.25, z: -0.15},
    {x: -0.15, y:  0.25, z: -0.15},
    {x: -0.15, y: -0.25, z: -0.15},
    {x:  0.15, y: -0.25, z: -0.15},

    // now we have a cube (we are standing at the centre of the cube)
    // then cube starts to move away from us
];

// the faces of the cube (how points are connected)
// values are indices of vertices array
const faces = [
    // back face of the cube
    [0, 1, 2, 3],

    // front face of the cube
    [4, 5, 6, 7],

    // the sides
    [0, 4],
    [1, 5],
    [2, 6],
    [3, 7],
];


