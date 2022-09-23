"use strict";

var canvas;
var gl;

var axis = 0;
const xAxis = 0;
const yAxis = 1;
const zAxis = 2;
var cameraRotation = [0, 0, 0];
var cameraLocation;
var flag = true;
var numElements = 36;
var vertices = [
    vec3(0.1, -0.2,  0.1),
    vec3(0.1,  0.2,  0.1),
    vec3(0.5,  0.2,  0.1),
    vec3(0.5, -0.2,  0.1),
    vec3(-0.5, -0.2, -0.5),
    vec3(-0.5,  0.2, -0.5),
    vec3(0.5,  0.5, -0.5),
    vec3(0.5, -0.5, -0.5)
];
var vertexColors = [
    vec4(0.5, 0.1, 0.0, 1.0),  // black
    vec4(0.0, 0.2, 0.0, 1.0),  // red
    vec4(0.0, 0.3, 0.5, 1.0),  // yellow
    vec4(0.1, 0.4, 0.1, 1.0),  // green
    vec4(0.5, 0.5, 0.0, 1.0),  // blue
    vec4(0.9, 0.6, 0.2, 1.0),  // magenta
    vec4(0.0, 0.7, 0.5, 1.0),  // white
    vec4(0.5, 0.8, 0.5, 1.0)   // cyan
];

// indices of the 12 triangles that compise the cube
var indices = [
    1, 0, 3,
    3, 2, 1,
    2, 3, 7,
    7, 6, 2,
    3, 0, 4,
    4, 7, 3,
    6, 5, 1,
    1, 2, 6,
    4, 5, 6,
    6, 7, 4,
    5, 4, 0,
    0, 1, 5
];

window.onload = function init(){
    canvas = document.getElementById("gl-canvas");

    gl = canvas.getContext('webgl2');
    if (!gl) alert("WebGL 2.0 isn't available");


    gl.viewport(0, 0, canvas.width, canvas.height);
    gl.clearColor(1.0, 1.0, 1.0, 1.0);

    gl.enable(gl.DEPTH_TEST);;

    //  Load shaders and initialize attribute buffers
    var program = initShaders(gl, "vertex-shader", "fragment-shader");
    gl.useProgram(program);

    // array element buffer
    var iBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, iBuffer);
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint8Array(indices), gl.STATIC_DRAW);

    // color array atrribute buffer
    var cBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, cBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, flatten(vertexColors), gl.STATIC_DRAW);

    var colorLoc = gl.getAttribLocation(program, "aColor");
    gl.vertexAttribPointer(colorLoc, 4, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(colorLoc);

    // vertex array attribute buffer
    var vBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, vBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, flatten(vertices), gl.STATIC_DRAW);

    var positionLoc = gl.getAttribLocation( program, "aPosition");
    gl.vertexAttribPointer(positionLoc, 3, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(positionLoc );

    cameraLocation = gl.getUniformLocation(program, "uCamera");

    //event listeners for buttons
    document.getElementById( "xButton" ).onclick = function () {
        vertices = rotacionaObjeto(vertices, m4.xRotation(radians(5)))
        gl.bindBuffer(gl.ARRAY_BUFFER, vBuffer);
        gl.bufferData(gl.ARRAY_BUFFER, flatten(vertices), gl.STATIC_DRAW);
    };
    document.getElementById( "yButton" ).onclick = function () {
        vertices = rotacionaObjeto(vertices, m4.yRotation(radians(5)))
        gl.bindBuffer(gl.ARRAY_BUFFER, vBuffer);
        gl.bufferData(gl.ARRAY_BUFFER, flatten(vertices), gl.STATIC_DRAW);
    };
    document.getElementById( "zButton" ).onclick = function () {
        vertices = rotacionaObjeto(vertices, m4.zRotation(radians(5)))
        gl.bindBuffer(gl.ARRAY_BUFFER, vBuffer);
        gl.bufferData(gl.ARRAY_BUFFER, flatten(vertices), gl.STATIC_DRAW);
    };
    document.getElementById("ButtonT").onclick = function(){flag = !flag;};

    render();
}

function render(){
    gl.clear( gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
    if(flag) cameraRotation[axis] += 2.0;
    gl.uniform3fv(cameraLocation, [0,0,0]);

    gl.drawElements(gl.TRIANGLES, numElements, gl.UNSIGNED_BYTE, 0);
    requestAnimationFrame(render);
}

function radians( degrees ) {
    return degrees * Math.PI / 180.0;
}

function rotacionaObjeto(vertices, matrizRotacao){
    for (let i = 0; i < vertices.length; i++) {
        let vertice = vec4(vertices[i][0], vertices[i][1], vertices[i][2], 1)
        let aux = vec4(1, 1, 1, 1)
        m4.multiply(matrizRotacao, vertice, aux)
        for (let j = 0; j < 3; j++) {
            vertices[i][j] = aux[j]
        }
    }
    return vertices
}