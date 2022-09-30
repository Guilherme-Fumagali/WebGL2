"use strict";

var canvas;
var gl;

/* Variáveis da câmera */
var cameraRotation = [180, 180, 0];
var cameraLocation;
/* ------------------- */
const cuboRotation = [false, false, false]; //objeto auxiliar para movimento do cubo

var vertices = [[
        vec4( 0.5,  0.5,  0.5, 1),
        vec4(-0.5,  0.5,  0.5, 1),
        vec4( 0.5, -0.5,  0.5, 1),
        vec4(-0.5, -0.5,  0.5, 1),
        vec4( 0.5,  0.5, -0.5, 1),
        vec4(-0.5,  0.5, -0.5, 1),
        vec4( 0.5, -0.5, -0.5, 1),
        vec4(-0.5, -0.5, -0.5, 1),
    ],
    [
        vec4( 0.1, -0.2,  0.1, 1),
        vec4( 0.1,  0.2,  0.1, 1),
        vec4( 0.5,  0.2,  0.1, 1),
        vec4( 0.5, -0.2,  0.1, 1),
        vec4(-0.5, -0.2, -0.5, 1),
        vec4(-0.5,  0.2, -0.5, 1),
        vec4(0.5,  0.35, -0.5, 1),
        vec4(0.5, -0.35, -0.5, 1),
    ],
    [
        vec4( 0.5,  0.5,   0, 1),
        vec4(-0.5,  0.5,   0, 1),
        vec4(   0,  0.5, 0.5, 1),
        vec4( 0.5, -0.5,   0, 1),
        vec4(-0.5, -0.5,   0, 1),
        vec4(   0, -0.5, 0.5, 1),
    ],
    [
        vec4(   0,    0,  0.5, 1),
        vec4(-0.5, -0.5, -0.5, 1),
        vec4(-0.5,  0.5, -0.5, 1),
        vec4( 0.5,  0.5, -0.5, 1),
        vec4( 0.5, -0.5, -0.5, 1),
    ],
];

var vertexColors = [
    [
        vec4(0.0, 0.0, 0.0, 1.0),  // preto
        vec4(1.0, 0.0, 0.0, 1.0),  // vermelho
        vec4(1.0, 1.0, 0.0, 1.0),  // amarelo
        vec4(0.0, 1.0, 0.0, 1.0),  // verde
        vec4(0.0, 0.0, 1.0, 1.0),  // azul
        vec4(1.0, 0.0, 1.0, 1.0),  // magenta
        vec4(1.0, 1.0, 1.0, 1.0),  // branco
        vec4(0.0, 1.0, 1.0, 1.0),  // ciano
    ],
    [
        vec4(0.6, 0.0, 0.0, 1.0),  //vermelho escuro
        vec4(1, 0.0, 0.0, 1.0),  //vermelho
        vec4(0.6, 0.0, 0.0, 1.0), //vermelho esucro
        vec4(1, 0.0, 0.0, 1.0), //vermelho
        vec4(0.8, 0.0, 0.0, 1.0), //vermelho escuro
        vec4(0.8, 0.0, 0.0, 1.0), //vermelho escuro
        vec4(0.8, 0.5, 0.5, 1.0), //branco
        vec4(0.8, 0.5, 0.5, 1.0)  //branco 
    ],
    [
        vec4(0.5, 0.0, 0.5, 1.0),  // roxo
        vec4(0.5, 0.0, 0.5, 1.0),  // roxo
        vec4(0.5, 0.0, 0.5, 0.0),  // roxo
        vec4(1.0, 0.0, 1.0, 1.0),  // roxo claro
        vec4(1.0, 0.0, 1.0, 1.0),  // roxo claro
        vec4(1.0, 0.0, 1.0, 0.0),  // roxo claro 
    ],
    [
        vec4(0.0, 0.0, 0.0, 1.0),  // preto
        vec4(0.0, 1.0, 1.0, 1.0),  // azul claro
        vec4(0.0, 0.0, 0.0, 1.0),  // preto
        vec4(0.0, 1.0, 1.0, 1.0),  // azul claro
        vec4(0.0, 1.0, 0.5, 1.0),  // verde claro
    ],
];

var indices = [
    [
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
    ],
    [
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
    ].map(x => x + 8),
    [
        0, 1, 2,
        3, 4, 5,
        2, 4, 5,
        1, 2, 4,
        0, 3, 1,
        1, 3, 4,
        0, 2, 3,
        2, 5, 3,
    ].map(x => x + 16),
    [
        1, 4, 0,
        4, 3, 0,
        3, 2, 0,
        2, 1, 0,
        1, 3, 4,
        1, 2, 3,
    ].map(x => x + 22),
];
const numElements = indices.flat().length //qtd de vértices usadas

/* BUFFERS */
var iBuffer
var cBuffer
var vBuffer
/* ------- */
window.onload = function init(){
    canvas = document.getElementById("gl-canvas");
    
    montaCena(); //posiciona e escalona os objetos na cena

    gl = canvas.getContext('webgl2');
    if (!gl) alert("WebGL 2.0 isn't available");

    gl.viewport(0, 0, canvas.width, canvas.height);
    gl.clearColor(0.15, 0.15, 0.15, 1.0);

    gl.enable(gl.DEPTH_TEST); //ativa z-buffer
    
    //  Load shaders and initialize attribute buffers
    var program = initShaders(gl, "vertex-shader", "fragment-shader");
    gl.useProgram(program);

    // array element buffer
    iBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, iBuffer);
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint8Array(indices.flat()), gl.STATIC_DRAW);

    // color array atrribute buffer
    cBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, cBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, flatten(vertexColors.flat()), gl.STATIC_DRAW);

    var colorLoc = gl.getAttribLocation(program, "aColor");
    gl.vertexAttribPointer(colorLoc, 4, gl.FLOAT, true, 0, 0);
    gl.enableVertexAttribArray(colorLoc);

    // vertex array attribute buffer
    vBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, vBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, flatten(vertices.flat()), gl.STATIC_DRAW);
    
    var positionLoc = gl.getAttribLocation( program, "aPosition");
    gl.vertexAttribPointer(positionLoc, 4, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(positionLoc);

    cameraLocation = gl.getUniformLocation(program, "uCamera");

    //event listeners for buttons
    document.getElementById( "xButton" ).onclick = function () {
        if(cuboRotation[0])
            cuboRotation[0] = false
        else
            cuboRotation[0] = true
    };
    document.getElementById( "yButton" ).onclick = function () {
        if(cuboRotation[1])
            cuboRotation[1] = false
        else
            cuboRotation[1] = true;
    };
    document.getElementById( "zButton" ).onclick = function () {
        if(cuboRotation[2])
            cuboRotation[2] = false
        else
            cuboRotation[2] = true
    };
    cameraX.onmousemove = function () {
        cameraRotation[0] = cameraX.value;
    };
    cameraY.onmousemove = function () {
        cameraRotation[1] = cameraY.value;
    };
    render();
}

function render(){
    gl.clear( gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
    gl.uniform3fv(cameraLocation, cameraRotation);

    gl.drawElements(gl.TRIANGLES, numElements, gl.UNSIGNED_BYTE, 0);
    requestAnimationFrame(render);

    if(cuboRotation[0])
        vertices[0] = rotaciona(vertices[0], m4.xRotation(radians(1)), 0.6, 0)
    if(cuboRotation[1])
        vertices[0] = rotaciona(vertices[0], m4.yRotation(radians(1)), 0.6, 0)
    if(cuboRotation[2])
        vertices[0] = rotaciona(vertices[0], m4.zRotation(radians(1)), 0.6, 0)
    
    /* Atualiza buffer dos vértices */
    gl.bindBuffer(gl.ARRAY_BUFFER, vBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, flatten(vertices.flat()), gl.STATIC_DRAW);
}

/* Recebe um vetor de vértices vec4 e multiplica por m2 */
function multiplica(vertices, m2){
    for (let i = 0; i < vertices.length; i++) { //para cada vértice 
        let vertice = vertices[i]
        let aux = [0, 0, 0, NaN]
        m4.multiply(m2, vertice, aux)
        for (let j = 0; j < 3; j++) 
            vertices[i][j] = aux[j]
    }
    return vertices
}

/* Rotaciona um objeto em qualquer lugar do plano*/
function rotaciona(vertices, matrizRotacao, eixoX, eixoY) {
    let verticesAncora = multiplica(vertices, m4.translation(-eixoX, -eixoY, 0)); //translada para origem
    let verticesRotacionados = multiplica(verticesAncora, matrizRotacao); //aplica transformação
    return multiplica(verticesRotacionados, m4.translation(eixoX, eixoY, 0));   //translada para sua posição original
}

/* Aplica transformações aos objetos, de modo a ajustá-las na cena */
function montaCena(){
    const positions = {
        objeto1: 0.6,
        objeto2: 0.2,
        objeto3: -0.2,
        objeto4: -0.6,
    }
    const scale = -0.28

    /* Diminuir a escala */
    for (let index = 0; index < vertices.length; index++) 
        multiplica(vertices[index], m4.scaling(scale, scale, scale))
    
    //objeto 1
    multiplica(vertices[0], m4.translation(positions.objeto1, 0, 0))
    rotaciona(vertices[0], m4.xRotation(radians(-125)), positions.objeto1, 0)
    rotaciona(vertices[0], m4.yRotation(radians(-45)), positions.objeto1, 0)

    //objeto 2
    multiplica(vertices[1], m4.translation(positions.objeto2, 0.1, 0))
    rotaciona(vertices[1], m4.xRotation(radians(270)), positions.objeto2, 0.1)
    rotaciona(vertices[1], m4.yRotation(radians(250)), positions.objeto2, 0.1)

    //objeto 3
    multiplica(vertices[2], m4.translation(positions.objeto3, 0, 0.1))
    rotaciona(vertices[2], m4.xRotation(radians(-90)), positions.objeto3, 0)
    rotaciona(vertices[2], m4.yRotation(radians(25)), positions.objeto3, 0)

    //objeto 4
    multiplica(vertices[3], m4.translation(positions.objeto4, 0.1, 0))
    rotaciona(vertices[3], m4.xRotation(radians(-95)), positions.objeto4, 0)
    rotaciona(vertices[3], m4.yRotation(radians(70)), positions.objeto4, 0)
}