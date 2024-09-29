// 02.js

"use strict";

// Imports.
import {getShader} from './libs/prepShader.js';
import {initShaders} from './libs/cuon-utils.js';

let squareVAO;

async function main() {
  // Retrieve <canvas> element
    const canvas = document.getElementById('webgl-canvas');

  // Get the rendering context for WebGL
  const gl = canvas.getContext('webgl2');
  if (!gl) {
    console.log('Failed to get the rendering context for WebGL');
    return;
  }

  // Read shaders and create shader program executable.
  const vertexShader = await getShader(gl, "vertex", "Shaders/vertexShader.glsl");
  const fragmentShader = await getShader(gl, "fragment", "Shaders/fragmentShader.glsl");

   // Initialize shaders
  if (!initShaders(gl, vertexShader, fragmentShader)) {
     console.log('Failed to intialize shaders.');
     return;
   }

  // Write the positions of vertices to a vertex shader
  const n = initVertexBuffers(gl);
  if (n < 0) {
    console.log('Failed to set the positions of the vertices');
    return;
  }

  // Specify the color for clearing <canvas>
  gl.clearColor(0, 0, 0, 1);
  gl.viewport(0, 0, canvas.width, canvas.height);

  // Clear <canvas>
  gl.clear(gl.COLOR_BUFFER_BIT);

  // Bind the VAO
  gl.bindVertexArray(squareVAO);

  // Draw three points
  gl.drawArrays(gl.POINTS, 0, n);

  // Clean
  gl.bindVertexArray(null);
}

function initVertexBuffers(gl) {
    const n = 3; // The number of vertices

    const vertices = new Float32Array([0.0, 0.5, -0.5, -0.5, 0.5, -0.5]);

    //const vertices = new Float32Array(2 * n);

    //vertices[0] = 0.0;
    //vertices[1] = 0.5;
    //vertices[2] = -0.5;
    //vertices[3] = -0.5;
    //vertices[4] = 0.5;
    //vertices[5] = -0.5;

  // Create VAO instance
  squareVAO = gl.createVertexArray();
  // Bind it so we can work on it
  gl.bindVertexArray(squareVAO);

  // Create a buffer object
  const vertexBuffer = gl.createBuffer();
  if (!vertexBuffer) {
    console.log('Failed to create the buffer object');
    return -1;
  }

  // Bind the buffer object to target
  gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
  // Write date into the buffer object
  gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);

  // Provide instructions for VAO to use data later in draw
  const a_Position = gl.getAttribLocation(gl.program, 'a_Position');
  if (a_Position < 0) {
    console.log('Failed to get the storage location of a_Position');
    return -1;
  }
  // Assign the buffer object to a_Position variable
  gl.vertexAttribPointer(a_Position, 2, gl.FLOAT, false, 0, 0);

  // Enable the assignment to a_Position variable
  gl.enableVertexAttribArray(a_Position);

  // Clean
  gl.bindVertexArray(null);
  gl.bindBuffer(gl.ARRAY_BUFFER, null);

  return n;
}

window.onload = main;