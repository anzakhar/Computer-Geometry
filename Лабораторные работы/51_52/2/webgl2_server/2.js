// 02.js

"use strict";

// Imports.
import {getShader} from './libs/prepShader.js';
import {initShaders} from './libs/cuon-utils.js';

async function main() {
  // Retrieve <canvas> element
    const canvas = document.getElementById('mycanvas');

  // Get the rendering context for WebGL
  const gl = canvas.getContext('webgl2');
  if (!gl) {
    console.log('Failed to get the rendering context for WebGL');
    return;
  }

  // Set clear color
  gl.clearColor(0.0, 0.0, 0.0, 1.0);

  // Read shaders and create shader program executable.
  const vertexShader = await getShader(gl, "vertex", "Shaders/vertexShader.glsl");
  const fragmentShader = await getShader(gl, "fragment", "Shaders/fragmentShader.glsl");

   // Initialize shaders
  if (!initShaders(gl, vertexShader, fragmentShader)) {
     console.log('Failed to intialize shaders.');
     return;
   }

  // // Get the storage location of a_Position
  // const a_Position = gl.getAttribLocation(gl.program, 'a_Position');
  // if (a_Position < 0) {
  //    console.log('Failed to get the storage location of a_Position');
  //    return;
  // }

  //  // Pass vertex position to attribute variable
  // gl.vertexAttrib3f(a_Position, 0.5, 0.0, 0.0);

    // Clear <canvas>
  gl.clear(gl.COLOR_BUFFER_BIT);

   // Draw a point
  gl.drawArrays(gl.POINTS, 0, 1);
}

window.onload = main;