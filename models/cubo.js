export var numElements = 36;
export var vertices = [
    vec3( 0.5,  0.5,  0.5),
    vec3(-0.5,  0.5,  0.5),
    vec3( 0.5, -0.5,  0.5),
    vec3(-0.5, -0.5,  0.5),
    vec3( 0.5,  0.5, -0.5),
    vec3(-0.5,  0.5, -0.5),
    vec3( 0.5, -0.5, -0.5),
    vec3(-0.5, -0.5, -0.5),
];

export var vertexColors = [
    vec4(0.0, 0.0, 0.0, 1.0),  // black
    vec4(1.0, 0.0, 0.0, 1.0),  // red
    vec4(1.0, 1.0, 0.0, 1.0),  // yellow
    vec4(0.0, 1.0, 0.0, 1.0),  // green
    vec4(0.0, 0.0, 1.0, 1.0),  // blue
    vec4(1.0, 0.0, 1.0, 1.0),  // magenta
    vec4(1.0, 1.0, 1.0, 1.0),  // white
    vec4(0.0, 1.0, 1.0, 1.0),  // cyan
];

// indices of the 12 triangles that compise the cube
export var indices = [
    2, 1, 0, //face da frente
    2, 1, 3, //face da frente
    3, 6, 2, //face de cima
    3, 6, 7, //face de cima
    6, 5, 4, //face de trás
    6, 5, 7, //face de trás
    4, 1, 0, //face de baixo
    4, 1, 5, //face de baixo
    6, 0, 2, //face da esquerda em relação a frente
    6, 0, 4, //face da esquerda em relação a frente
    7, 1, 3, //face da direita em relação a frente
    7, 1, 5  //face da direita em relação a frente
];